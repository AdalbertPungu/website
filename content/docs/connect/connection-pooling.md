---
title: Connection pooling
subtitle: Learn how to enable connection pooling in Neon
enableTableOfContents: true
redirectFrom:
  - /docs/get-started-with-neon/connection-pooling
updatedOn: '2024-01-05T18:59:15.317Z'
---

Neon uses [PgBouncer](https://www.pgbouncer.org/) to offer support for connection pooling, enabling up to 10,000 concurrent connections. PgBouncer is a lightweight connection pooler for Postgres.

This topic describes Neon's default connection limits, how connection pooling works, and how you can enable connection pooling for your applications.

## Default connection limits

Each Postgres connection creates a new process in the operating system, which consumes resources. Postgres limits the number of open connections for this reason. The Postgres connection limit is defined by the `max_connections` parameter.

In Neon, the size of your compute determines the `max_connections` setting. The formula used to calculate `max_connections` is `RAM in bytes / 9531392 bytes`. For a Neon Free Tier compute, which has 1 GB of RAM, this works out to approximately 100 connections. Larger computes offered with the [Neon Pro Plan](/docs/introduction/pro-plan) have more RAM and therefore support a larger number of connections. For example, a compute with 12 GB of RAM supports 1351 connections. You can check the `max_connections` limit for your compute by running the following query from the Neon SQL Editor or a client connected to Neon:

```sql
SHOW max_connections;
```

Even with the largest compute size, the `max_connections` limit may not be sufficient for some applications, such as those that use serverless functions. To increase the number of connections that Neon supports, you can use _connection pooling_. All Neon plans, including the [Neon Free Tier](/docs/introduction/free-tier), support connection pooling.

## Connection pooling

Some applications open numerous connections, with most eventually becoming inactive. This behavior can often be attributed to database driver limitations, running many instances of an application, or applications with serverless functions. With regular Postgres, new connections are rejected when reaching the `max_connections` limit. To overcome this limitation, Neon supports connection pooling using [PgBouncer](https://www.pgbouncer.org/), which allows Neon to support up to 10,000 concurrent connections.

PgBouncer is an open-source connection pooler for Postgres. When an application needs to connect to a database, PgBouncer provides a connection from the pool. Connections in the pool are routed to a smaller number of actual Postgres connections. When a connection is no longer required, it is returned to the pool and is available to be used again. Maintaining a pool of available connections improves performance by reducing the number of connections that need to be created and torn down to service incoming requests. Connection pooling also helps avoid rejected connections. When all connections in the pool are being used, PgBouncer queues a new request until a connection from the pool becomes available.

Neon uses `PgBouncer` in `transaction mode`. For limitations associated with `transaction mode`, see [Connection pooling notes and limitations](#connection-pooling-notes-and-limitations). For more information about `PgBouncer`, refer to [https://www.pgbouncer.org/](https://www.pgbouncer.org/).

## Enable connection pooling

Enabling connection pooling in Neon requires adding a `-pooler` suffix to the compute endpoint ID, which is part of the Neon hostname. Connections that specify the `-pooler` suffix in the connection string use a pooled connection.

You can add the `-pooler` suffix to the endpoint ID in your connection string as shown:

<CodeBlock shouldWrap>

```text
postgres://alex:AbC123dEf@ep-cool-darkness-123456-pooler.us-east-2.aws.neon.tech/dbname
```

</CodeBlock>

The **Connection Details** widget on the Neon **Dashboard** provides **Pooled connection** checkbox that adds the `-pooler` option to a connection string that you can copy and paste.

![Connection Details pooled connection string](/docs/connect/connection_details_pooled.png)

## Optimize queries with PgBouncer and prepared statements

Protocol-level prepared statements are supported with Neon and PgBouncer as of the [PgBouncer 1.22.0 release](https://github.com/pgbouncer/pgbouncer/releases/tag/pgbouncer_1_21_0). Using prepared statements can help boost query performance while providing an added layer of protection against potential SQL injection attacks.

### Understanding prepared statements

A prepared statement in Postgres allows for the optimization of an SQL query by defining its structure once and executing it multiple times with varied parameters. Here's an SQL-level example to illustrate. Note that direct SQL-level `PREPARE` and `EXECUTE` are not supported with PgBouncer (see [below](#use-prepared-statements-with-pgbouncer)), so you can't use this query from the SQL editor. It is meant to give you a clear idea of how a prepared statement works. Refer to the protocol-level samples below to see how this SQL-level example translates to different protocol-level examples.

```sql
PREPARE fetch_plan (TEXT) AS
SELECT * FROM users WHERE username = $1;

EXECUTE fetch_plan('alice');
```

`fetch_plan` here is the prepared statement's name, and `$1` acts as a parameter placeholder.

The benefits of using prepared statements include:

- **Performance**: Parsing the SQL and creating the execution plan happens just once, speeding up subsequent executions. This performance benefit would be most noticeable on databases with heavy and repeated traffic.
- **Security**: By sending data values separately from the query, prepared statements reduce the risk of SQL injection attacks.

You can learn more about prepared statements in the PostgreSQL documentation. See [PREPARE](https://www.postgresql.org/docs/current/sql-prepare.html).

### Use prepared statements with PgBouncer

Since pgBouncer supports protocol-level prepared statements only, you must rely on PostgreSQL client libraries instead (direct SQL-level `PREPARE` and `EXECUTE` are not supported). Fortunately, most PostgreSQL client libraries support prepared statements. Here are a couple of examples showing how to use prepared statements with Javascript and Python client libraries:

<CodeTabs labels={["pg", "psycopg2"]}>

```javascript
const query = {
   // give the query a unique name
   name: 'fetch-plan',
      text: 'SELECT * FROM users WHERE username = $1',
      values: ['alice'],
  };
  client.query(query);
```

```python
cur = conn.cursor()
  query = "SELECT * FROM users WHERE username = %s;"
  cur.execute(query, ('alice',), prepare=True)
  results = cur.fetchall()
```

</CodeTabs>

## Neon PgBouncer configuration settings

Neon's PgBouncer configuration is shown below. The settings are not user-configurable.

```ini
[pgbouncer]
pool_mode=transaction
max_client_conn=10000
default_pool_size=64
max_prepared_statements=0
query_wait_timeout=120
```

The following list describes each setting. For a full explanation of each parameter, please refer to the official [PgBouncer documentation](https://www.pgbouncer.org/config.html).

- `pool_mode=transaction`: The pooling mode PgBouncer uses, set to `transaction` pooling.
- `max_client_conn=10000`: Maximum number of client connections allowed.
- `default_pool_size=64`: Default number of server connections to allow per user/database pair.
- `max_prepared_statements=0`: Maximum number of prepared statements a connection is allowed to have at the same time. `0` means prepared statements are disabled.
- `query_wait_timeout=120`: Maximum time queries are allowed to spend waiting for execution. Neon uses the default setting of `120` seconds.

## Connection pooling notes and limitations

Neon uses PgBouncer in _transaction mode_, which limits some functionality in Postgres. For a complete list of limitations, refer to the "_SQL feature map for pooling modes_" section in the [pgbouncer.org Features](https://www.pgbouncer.org/features.html) documentation.

<NeedHelp/>
