---
title: The pgvector extension
subtitle: Learn how to use the pgvector extension for embeddings and vector similarity
enableTableOfContents: true
isDraft: true
---

The `pgvector` extension enables vector similarity search and embeddings storage in PostgreSQL. It is particularly useful for applications involving natural language processing, such as those built on top of OpenAI's GPT models. This article covers the concepts of vector similarity and embeddings, explains how to enable the `pgvector` extension, and demonstrates how to create, store, and query vectors.

## Concepts

### Vector similarity

Vector similarity is a method used to measure how similar two items are by representing them as vectors, which are series of numbers. This approach can be applied to various types of data, such as words, images, or other elements. By using a mathematical model, each item is converted into a vector, and then these vectors are compared to determine their similarity. The closer the vectors are in terms of distance, the more alike the items.

### Embeddings

An embedding is a technique that transforms data points into vectors, enabling machine learning algorithms to efficiently process and analyze them. This transformation captures the relationships and similarities between data points, allowing algorithms to identify patterns and make accurate predictions.

A widely used example of embeddings is in natural language processing, where words are represented as vectors. For instance, consider the words "apple", "orange", and "car". By representing each word as a vector in a 2-dimensional space, you can visually observe their relationships:

Apple: (1.2, 0.8)
Orange: (1.1, 0.9)
Car: (0.3, 1.5)

In this space, the vectors for "apple" and "orange" are closer together than either is to "car", indicating that they are more similar to each other than to "car". This relationship is captured by vectors in a way that machine learning algorithms can easily understand and utilize for a variety of tasks.

## Enable the pgvector extension

You can enable the `pgvector` extension by running the following `CREATE EXTENSION` statement in the Neon **SQL Editor** or from a client such as `psql` that is connected to Neon.

```sql
CREATE EXTENSION vector;
```

For information about using the Neon SQL Editor, see [Query with Neon's SQL Editor](/docs/get-started-with-neon/query-with-neon-sql-editor). For information about using the `psql` client with Neon, see [Connect with psql](https://neon.tech/docs/connect/query-with-psql-editor).

## Create a table to store vectors

To create a table for storing vectors, use the following SQL command, adjusting the dimensions as needed:

```sql
CREATE TABLE items (
  id BIGSERIAL PRIMARY KEY,
  embedding VECTOR(3)
);
```

This command generates a table named `items` with an `embedding` column capable of storing vectors with 3 dimensions. OpenAI's  `text-embedding-ada-002` model supports 1536 dimensions for each piece of text, which creates more accurate embeddings for natural language processing tasks. For more information, see [Embeddings](https://platform.openai.com/docs/guides/embeddings/what-are-embeddings), in the _OpenAI documentation_.

## Storing vectors and embeddings

Once you have generated an embedding using a service like the OpenAI API, you can store the resulting vector in the database. Using a PostgreSQL client library in your preferred programming language, you can execute an `INSERT` statement similar to the following:

```sql
INSERT INTO items (embedding) VALUES ('[1,2,3]'), ('[4,5,6]');
```

This command inserts two new rows into the items table with the provided embeddings.

## Querying vectors

To retrieve vectors and calculate similarity, use `SELECT` statements and the built-in vector operators. For instance, you can find the top 5 most similar items to a given embedding using the following query:

```sql
SELECT * FROM items ORDER BY embedding <-> '[3,1,2]' LIMIT 5;
```

This query computes the Euclidean distance (L2 distance) between the given vector and the vectors stored in the items table, sorts the results by the calculated distance, and returns the top 5 most similar items. 

`pgvector` also supports inner product (`<#>`) and cosine distance (`<=>`). `<#>` returns the negative inner product since PostgreSQL only supports `ASC` order index scans on operators.

For more information about querying vectors, refer to the [pgvector README](https://github.com/pgvector/pgvector).

## Indexing vectors

Using an index on the vector column can improve query performance at the cost of some recall. Add an index for each distance function you want to use. For example, the following adds an index to the embedding column for the L2 distance distance function:

```sql
CREATE INDEX ON items USING ivfflat (embedding vector_l2_ops) WITH (lists = 100);
```

For additional indexing guidance and examples, see [Indexing](https://github.com/pgvector/pgvector/tree/8bf360ed84bfdeba9caa19e9f193fd9ad8dd9e73#indexing), in the _pgvector README_.

## Conclusion

The `pgvector` extension is a powerful addition to PostgreSQL databases for implementing vector similarity searches and managing embeddings. By understanding the underlying concepts, enabling the extension, and tuning the database configuration, you can harness the full potential of `pgvector` for a wide range of applications, including those built on top of cutting-edge machine learning models such as OpenAI's GPT models. With the ability to create tables specifically designed to store vectors, store embeddings effectively, and perform advanced queries to calculate similarity, `pgvector` is a valuable tool for anyone working with PostgreSQL databases.

## Resources

- [pgvector source code: github.com/pgvector/pgvector](github.com/pgvector/pgvector)
