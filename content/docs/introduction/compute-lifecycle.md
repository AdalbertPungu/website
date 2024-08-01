---
title: Compute lifecycle
enableTableOfContents: true
redirectFrom:
  - /docs/conceptual-guides/compute-lifecycle
updatedOn: '2024-07-25T12:53:42.430Z'
---

A compute in Neon is a stateless Postgres process due to the separation of storage and compute. It has two main states: `Idle` and `Active`.

Generally, an `Idle` compute has been suspended by Neon's Autosuspend feature due to inactivity, while an `Active` compute has been activated by a connection, indicating that Postgres is currently running.

## Autosuspend

If there are no active queries for 5 minutes, which is the default autosuspend setting in Neon, your compute is automatically placed into an `Idle` state. Users on paid plans can disable this autosuspension behavior so that a compute always remains active, or they can increase or decrease the amount of time after which a compute is placed into an `Idle` state. Autosuspension behavior is controlled by your compute's **Autosuspend** setting. 

![Autosuspend configuration dialog](/docs/introduction/autosuspend_config.png)

For information about configuring this setting, see [Edit a compute](/docs/manage/endpoints#edit-a-compute).

<Admonition type="note">
Neon's _Autosuspend_ feature is conservative. It treats an "idle-in-transaction" connection as active to avoid breaking application logic that involves long-running transactions. Only the truly inactive connections are closed after the defined period of inactivity.
</Admonition> 

## Compute activation

When you connect to an idle compute, Neon automatically activates it. Activation generally takes a few hundred milliseconds. 

Considering this activation time, your first connection may have a slightly higher latency than subsequent connections to an already-active compute. Also, Postgres memory buffers are cold after a compute wakes up from the `Idle` state, which means that initial queries may take longer until the memory buffers are warmed.

After a period of time in the `Idle` state, Neon occasionally activates your compute to check for data availability. The time between checks gradually increases if the compute does not receive any client connections over an extended period.

In the **Branches** widget on your **Project Dashboard**, you can check if a compute is active or idle and watch as it transitions from one state to another.

![Compute state](/docs/introduction/compute_state.png)

## Compute configuration

Neon only supports modifying session-level configuration parameters. Parameters are reset when the session terminates, such as when the compute suspends due to inactivity.

For information about Neon's Postgres server configuration, see [Neon Postgres parameter settings](/docs/reference/compatibility#neon-postgres-parameter-settings).
