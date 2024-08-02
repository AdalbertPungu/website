---
title: Roadmap
enableTableOfContents: true
redirectFrom:
  - /docs/cloud/roadmap
  - /docs/conceptual-guides/roadmap
  - /docs/reference/roadmap
updatedOn: '2024-07-30T18:51:45.480Z'
---

Our development teams are focused on helping you ship faster with Postgres. This roadmap describes committed features that we're working on right now, and a peak at some of the upcoming features we'll be taking on next &#8212; working hard on making Neon your default choice for serverless Postgres.

## What we've just launched

For the latest features and fixes, check our [Changelog](/docs/changelog), updated every Friday. Or watch for our Changelog email, also sent regularly on Fridays. You can also subscribe to updates using our [RSS feed](https://neon.tech/docs/changelog/rss.xml).

## What's around the corner

Here's a snapshot of what we're working on now:

### Database-as-a-Service

- **Autoscaling GA**: One of our defining features, Autoscaling is soon going GA. Look for an announcement with details coming out soon!
- **Autoscaling on the Free Tier**: Users on the Free Tier will soon be able to try Neon's Autoscaling feature.
- **Read Replicas**: We're refining our read replica functionality to make it dead-on suitable for various use cases.
- **Database Deploy Previews**: Our GitHub App is available now for all users, with more refinements to come. Including better integration with GitHub Actions to make it easy to include your database in your development workflow.
- **Data Lake Export**: We're committed to full CDC export using Logical Replication.
- **Better deletes**: We're adding support for deleting obsolete branches, especially after [restore](/docs/guides/branch-restore) operations.

  If you have other branch management ideas, [let us know](#share-your-thoughts).

- **Migrations (Beta)**: We're also soon adding inbound replication to support different migration scenarios and Neon-as-dev-platform environment configurations.
- **SQL Editor improvements**: Stay tuned for interesting updates we have planned for our SQL Editor.

### Plans & Billing

We’re always looking for ways to improve our pricing model to make it as developer-friendly as possible. You can expect to see development in this area, including:

- A new plan offering
- Storage-related optimizations

### Backend-as-a-Service

- **Neon CLI**: We've recently added a [create-app](/docs/reference/cli-create-app) command that lets you bootstrap your application with common dev stacks. `create-app` is maturing fast, with new frameworks, ORMs, and features coming out regularly.
- **Neon Authentication**: Look for the ability to run SQL directly from the front end of your application. We're building an API with all the necessary security measures needed to safely include database operations on the client side. This feature will extend Neon’s robust authentication framework to ensure secure access directly from your application's front end.
- **An email app service**: This service will provide support for email verification and password recovery workflows

## What's on the horizon

And here's a quick list of what we'll be taking on in the near future:

### Database-as-a-service

- **Staging Environments**: Anonymizing PII Data
- **AWS Integrated Platform**: VPC, Backups, Export Metrics + Logs
- **Neon for Teams**: We're exploring adding a new business-level plan, with key features like Organizations, Integrated Platform, and Staging solutions. This plan will also offer usage allowances that fit the needs of business-focused development teams and more complex workflows.
- **Postgres 17**: We've been at work on this for a while now. We plan to support Postgres 17 the day it's released. Postgres 17 will support direct SSL connections, which can eliminate one round-trip from establishing a connection.
- **Support for exporting logs and metrics**: We'd like to enable users to integrate Neon into their monitoring platforms and services with exportable logs and metrics.
- **Support for soft deletions**: Work is underway to build a deletion workflow for Neon projects. As part of this workflow, we'll support a recovery grace period for unintended deletions, and we'll also add a little friction to the deletion process to avoid accidental deletions &#8212; something similar to the steps required to delete a repository in GitHub.

### Backend-as-a-service

- **Neon Authorization:** We're looking at accepting third-party signed JWTs (JSON Web tokens) for authentication via HTTP proxy, intended for Row Level Security (RLS).
- **Auth rate limiting:** Limit network access...
- **Database Functions:** Background Jobs, Automation

## Join the Neon Early Access Program

If you would like to get a little more involved, consider signing up for the **Neon Early Access Program**.

Benefits of joining:

- **Exclusive early access**: Get a first look at upcoming features before they go live.
- **Private community**: Gain access to a dedicated Discord channel to connect with the Neon team and provide feedback to help shape what comes next.
- **Weekly insights**: Receive updates on Neon's latest developments and future plans.

[Sign Up Now](https://neon.tech/early-access-program) and start influencing the future of Neon!

## A note about timing

We are as excited as you are to see new features in Neon, but their development, release, and timing are at our discretion.

## Share your thoughts

As always, we are listening. If you see something you like, something you disagree with, or something you'd love for us to add, let us know in our Discord feedback channel.

<CommunityBanner buttonText="Leave feedback" buttonUrl="https://discord.com/channels/1176467419317940276/1176788564890112042" logo="discord">Share your ideas in&nbsp;Discord</CommunityBanner>

## A brief history of Neon

The Neon **Limited Preview** started in February 2022 and was made available to a small number of select users and friends.

On June 15th, 2022, the Neon team announced a [Technical Preview](#technical-preview), making Neon available to a wider audience. Thousands of users were able to try Neon's [Free Tier](/docs/introduction/free-tier).

On December 6th, 2022, Neon released its branching feature and dropped the invite gate, welcoming everyone to try Neon's Free Tier.

In the first quarter of 2023, Neon launched [paid plans](https://neon.tech/pricing) with new features like Project Sharing, [Autoscaling](/docs/introduction/autoscaling), and [Autosuspend](/docs/introduction/auto-suspend). We also added support for US East (N. Virginia)

In the second quarter of 2023, we released the [Neon CLI](/docs/reference/neon-cli). Enhancements included a configurable [history retention](/docs/introduction/point-in-time-restore) window, support for Postgres 16, and [SOC 2 Type 1](https://neon.tech/blog/soc2-type-1#our-journey-to-soc2) compliance.

In the third quarter of 2023, we added [IP allowlisting](/docs/introduction/ip-allow), email signup, and [logical replication](/docs/introduction/logical-replication). We also announced [SOC 2 Type 2](https://neon.tech/blog/soc2-type2) compliance.

In the fourth quarter of 2023, we added support for the Asia Pacific (Sydney) region, [Branch Restore](/docs/guides/branch-restore) with Time Travel Assist, and new [Pricing](https://neon.tech/pricing) plans.

On April 15th, 2024, Neon announced [General Availability](https://neon.tech/blog/neon-ga).
