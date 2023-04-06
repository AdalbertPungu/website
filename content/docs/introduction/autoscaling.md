---
title: Autoscaling
subtitle: Learn how Neon automatically and transparently scales compute on demand
enableTableOfContents: true
---

A Beta version of Neon's _Autoscaling_ feature is now available for [paid plan](https://neon.tech/docs/introduction/billing#neon-plans) users in selected regions. The Autoscaling feature dynamically adjusts the allocation of vCPU and RAM for a Neon compute endpoint in response to the current load, eliminating the need for manual intervention.

## Autoscaling benefits

Neon's Autoscaling feature offers the following benefits:

- **On-demand scaling:** Autoscaling helps with workloads that experience variations over time, such as applications with region or time-based changes in demand.
- **Cost effectiveness**: Autoscaling optimizes resource utilization, ensuring that organizations only pay for required resources, rather than over-provisioning to handle peak loads.
- **Resource and cost control**: Autoscaling operates within a user-defined range, providing reassurance that your compute resources and associated costs do not scale indefinitely.
- **No manual intervention**: After you enable Autoscaling and set scaling limits, no manual intervention is required, allowing you to focus on your applications.

## How to enable Autoscaling

You can enable Autoscaling when creating a Neon project or afterward using a simple compute configuration dialog. If you have multiple computes, you can enable and configure Autoscaling for each compute individually. For instructions, see:

- [Create a project](/docs/manage/projects#create-a-project)
- [Edit a compute endpoint](/docs/manage/endpoints#edit-a-compute-endpoint)

## How Autoscaling works

A Neon project can have one or more computes, each representing an individual PostgreSQL instance. Storage is decoupled from these computes, meaning that the PostgreSQL servers executing queries are physically separate from the data storage location. This separation offers numerous advantages, including enablement of Neon's autoscaling feature.

![High-level architecture diagram](/docs/introduction/autoscale-high-level-architecture.webp)

Looking more closely, you can see that each PostgreSQL instance operates within its own virtual machine inside a [Kubernetes cluster](/docs/reference/glossary#kubernetes-cluster), with multiple VMs hosted on each node of the cluster. Autoscaling is implemented by allocating and deallocating vCPU and RAM to each VM.

![Autoscaling diagram](/docs/introduction/autoscale-architecture.webp)

### The autoscaler-agent

Each [Kubernetes node](/docs/reference/glossary#kubernetes-node) hosts a single instance of the [autoscaler-agent](/docs/reference/glossary#autoscaler-agent), which serves as the control mechanism for Neon's autoscaling system. The agent collects metrics from the VMs on its node, makes scaling decisions, and performs the necessary checks and requests to implement those decisions.

A Neon-modified [Kubernetes scheduler](/docs/reference/glossary#kubernetes-scheduler) coordinates with the autoscaler-agent and is the single source of truth for resource allocation. The autoscaler-agent obtains approval for all upscaling from the scheduler. The scheduler maintains a global view of all resource usage changes and approves requests for additional resources from the autoscaler-agent or standard scheduling. In this way, the scheduler assumes responsibility for preventing overcommitting of memory resources. In the rare event that a node exhausts its resources, new pods are not scheduled on the node, and the autoscaler-agent is denied permission to allocate more resources.

### NeonVM

Kubernetes does not support the creation or management of VMs. To address this limitation, Neon uses a tool called [NeonVM](/docs/reference/glossary#neonvm). This tool is a custom resource definition and controller for VMs, handling tasks such as adding or removing CPUs and memory. Internally, NeonVM utilizes [QEMU](/docs/reference/glossary#qemu) and [KVM](/docs/reference/glossary#kvm) (where available) to achieve near-native performance.

When an autoscaler-agent needs to modify a VM's resource allocation, it simply updates the corresponding NeonVM object in Kubernetes, and the VM controller then manages the rest of the process.

### Live migration

In cases where a Kubernetes node becomes saturated, the NeonVM tool uses a hypervisor such as QEMU to manage the process of [live migrating](/docs/reference/glossary#live-migration) a VM, transferring the VM from one machine to another with minimal interruptions (typically around 100ms). In essence, live migration transmits the internal state of the original VM to a new one while the former continues to operate, swiftly transitioning to the new VM once there is little data left to be copied. From within the VM, the only indication that a migration occurred might be a minor performance reduction. Importantly, the VM retains its IP address, ensuring that connections are preserved and queries remain uninterrupted.

This allows for the proactive reduction of node load by migrating VMs away before reaching capacity. Although it is still possible for the node to fill up in the interim, Neon's separation of storage and compute means that VMs typically use minimal disk space, resulting in faster migrations.

### Memory scaling

Memory consumption on a VM can escalate rapidly in specific scenarios. Fortunately, Neon's Autoscaling system is able to detect memory usage increases without constantly requesting metrics from the VM. This is accomplished using [cgroups](/docs/reference/glossary#cgroup), which provide notification when memory usage crosses a specified threshold. Running PostgreSQL within a cgroup inside the VM allows for the receipt of such notifications. Using cgroups in this way requires running a [vm-informant](/docs/reference/glossary#vm-informant) in the VM alongside PostgreSQL to both (a) request more resources from the autoscaler-agent when PostgreSQL consumes too much memory and (b) verify that downscaling requests from an autoscaler-agent will leave sufficient memory.

When the cgroup `memory.high` signal is activated, the vm-informant temporarily freezes the cgroup (halting the PostgreSQL instance) to prevent further allocations and requests additional memory from the autoscaler-agent. The autoscaler-agent then seeks memory from the scheduler and NeonVM. If memory is allocated swiftly, the cgroup is unfrozen, allowing PostgreSQL to resume execution. The vm-informant also lifts the freeze after a brief timeout (currently 20ms) if memory is not made available in time.

### Local File Cache

To expedite queries, the Autoscaling system incorporates a PostgreSQL extension then places a cache in front of the storage layer.
Many queries benefit from this additional memory, particularly those requiring multiple database scans (such as creating an index). The [local file cache](/docs/reference/glossary#local-file-cache) capitalizes on the additional memory allocated to the VM by dedicating a portion to the cache. The cache is stored in a single file within a [tmpfs](/docs/reference/glossary#tmpfs) to minimize disk usage, with entries maintained as 1 MB chunks and evicted using a [Least Recently Used (LRU) policy](/docs/reference/glossary#lru-policy). Due to the storage model, writebacks are not required, resulting in near-instant evictions. The vm-informant adjusts the file cache size when scaling occurs through the autoscaler-agent, ensuring seamless operation.

## Autoscaling source code

To further explore Neon's autoscaling implementation, visit Noen's [Autoscaling](https://github.com/neondatabase/autoscaling) GitHub repository. While not primarily designed for external use, Neon welcomes exploration and contributions.
