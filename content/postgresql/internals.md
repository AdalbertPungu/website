# Part VII. Internals

This part contains assorted information that might be of use to PostgreSQL developers.

**Table of Contents**

* [52. Overview of PostgreSQL Internals](overview)

  * *   [52.1. The Path of a Query](query-path)
    * [52.2. How Connections Are Established](connect-estab)
    * [52.3. The Parser Stage](parser-stage)
    * [52.4. The PostgreSQL Rule System](rule-system)
    * [52.5. Planner/Optimizer](planner-optimizer)
    * [52.6. Executor](executor)

* [53. System Catalogs](catalogs)

  * *   [53.1. Overview](catalogs-overview)
    * [53.2. `pg_aggregate`](catalog-pg-aggregate)
    * [53.3. `pg_am`](catalog-pg-am)
    * [53.4. `pg_amop`](catalog-pg-amop)
    * [53.5. `pg_amproc`](catalog-pg-amproc)
    * [53.6. `pg_attrdef`](catalog-pg-attrdef)
    * [53.7. `pg_attribute`](catalog-pg-attribute)
    * [53.8. `pg_authid`](catalog-pg-authid)
    * [53.9. `pg_auth_members`](catalog-pg-auth-members)
    * [53.10. `pg_cast`](catalog-pg-cast)
    * [53.11. `pg_class`](catalog-pg-class)
    * [53.12. `pg_collation`](catalog-pg-collation)
    * [53.13. `pg_constraint`](catalog-pg-constraint)
    * [53.14. `pg_conversion`](catalog-pg-conversion)
    * [53.15. `pg_database`](catalog-pg-database)
    * [53.16. `pg_db_role_setting`](catalog-pg-db-role-setting)
    * [53.17. `pg_default_acl`](catalog-pg-default-acl)
    * [53.18. `pg_depend`](catalog-pg-depend)
    * [53.19. `pg_description`](catalog-pg-description)
    * [53.20. `pg_enum`](catalog-pg-enum)
    * [53.21. `pg_event_trigger`](catalog-pg-event-trigger)
    * [53.22. `pg_extension`](catalog-pg-extension)
    * [53.23. `pg_foreign_data_wrapper`](catalog-pg-foreign-data-wrapper)
    * [53.24. `pg_foreign_server`](catalog-pg-foreign-server)
    * [53.25. `pg_foreign_table`](catalog-pg-foreign-table)
    * [53.26. `pg_index`](catalog-pg-index)
    * [53.27. `pg_inherits`](catalog-pg-inherits)
    * [53.28. `pg_init_privs`](catalog-pg-init-privs)
    * [53.29. `pg_language`](catalog-pg-language)
    * [53.30. `pg_largeobject`](catalog-pg-largeobject)
    * [53.31. `pg_largeobject_metadata`](catalog-pg-largeobject-metadata)
    * [53.32. `pg_namespace`](catalog-pg-namespace)
    * [53.33. `pg_opclass`](catalog-pg-opclass)
    * [53.34. `pg_operator`](catalog-pg-operator)
    * [53.35. `pg_opfamily`](catalog-pg-opfamily)
    * [53.36. `pg_parameter_acl`](catalog-pg-parameter-acl)
    * [53.37. `pg_partitioned_table`](catalog-pg-partitioned-table)
    * [53.38. `pg_policy`](catalog-pg-policy)
    * [53.39. `pg_proc`](catalog-pg-proc)
    * [53.40. `pg_publication`](catalog-pg-publication)
    * [53.41. `pg_publication_namespace`](catalog-pg-publication-namespace)
    * [53.42. `pg_publication_rel`](catalog-pg-publication-rel)
    * [53.43. `pg_range`](catalog-pg-range)
    * [53.44. `pg_replication_origin`](catalog-pg-replication-origin)
    * [53.45. `pg_rewrite`](catalog-pg-rewrite)
    * [53.46. `pg_seclabel`](catalog-pg-seclabel)
    * [53.47. `pg_sequence`](catalog-pg-sequence)
    * [53.48. `pg_shdepend`](catalog-pg-shdepend)
    * [53.49. `pg_shdescription`](catalog-pg-shdescription)
    * [53.50. `pg_shseclabel`](catalog-pg-shseclabel)
    * [53.51. `pg_statistic`](catalog-pg-statistic)
    * [53.52. `pg_statistic_ext`](catalog-pg-statistic-ext)
    * [53.53. `pg_statistic_ext_data`](catalog-pg-statistic-ext-data)
    * [53.54. `pg_subscription`](catalog-pg-subscription)
    * [53.55. `pg_subscription_rel`](catalog-pg-subscription-rel)
    * [53.56. `pg_tablespace`](catalog-pg-tablespace)
    * [53.57. `pg_transform`](catalog-pg-transform)
    * [53.58. `pg_trigger`](catalog-pg-trigger)
    * [53.59. `pg_ts_config`](catalog-pg-ts-config)
    * [53.60. `pg_ts_config_map`](catalog-pg-ts-config-map)
    * [53.61. `pg_ts_dict`](catalog-pg-ts-dict)
    * [53.62. `pg_ts_parser`](catalog-pg-ts-parser)
    * [53.63. `pg_ts_template`](catalog-pg-ts-template)
    * [53.64. `pg_type`](catalog-pg-type)
    * [53.65. `pg_user_mapping`](catalog-pg-user-mapping)

* [54. System Views](views)

  * *   [54.1. Overview](views-overview)
    * [54.2. `pg_available_extensions`](view-pg-available-extensions)
    * [54.3. `pg_available_extension_versions`](view-pg-available-extension-versions)
    * [54.4. `pg_backend_memory_contexts`](view-pg-backend-memory-contexts)
    * [54.5. `pg_config`](view-pg-config)
    * [54.6. `pg_cursors`](view-pg-cursors)
    * [54.7. `pg_file_settings`](view-pg-file-settings)
    * [54.8. `pg_group`](view-pg-group)
    * [54.9. `pg_hba_file_rules`](view-pg-hba-file-rules)
    * [54.10. `pg_ident_file_mappings`](view-pg-ident-file-mappings)
    * [54.11. `pg_indexes`](view-pg-indexes)
    * [54.12. `pg_locks`](view-pg-locks)
    * [54.13. `pg_matviews`](view-pg-matviews)
    * [54.14. `pg_policies`](view-pg-policies)
    * [54.15. `pg_prepared_statements`](view-pg-prepared-statements)
    * [54.16. `pg_prepared_xacts`](view-pg-prepared-xacts)
    * [54.17. `pg_publication_tables`](view-pg-publication-tables)
    * [54.18. `pg_replication_origin_status`](view-pg-replication-origin-status)
    * [54.19. `pg_replication_slots`](view-pg-replication-slots)
    * [54.20. `pg_roles`](view-pg-roles)
    * [54.21. `pg_rules`](view-pg-rules)
    * [54.22. `pg_seclabels`](view-pg-seclabels)
    * [54.23. `pg_sequences`](view-pg-sequences)
    * [54.24. `pg_settings`](view-pg-settings)
    * [54.25. `pg_shadow`](view-pg-shadow)
    * [54.26. `pg_shmem_allocations`](view-pg-shmem-allocations)
    * [54.27. `pg_stats`](view-pg-stats)
    * [54.28. `pg_stats_ext`](view-pg-stats-ext)
    * [54.29. `pg_stats_ext_exprs`](view-pg-stats-ext-exprs)
    * [54.30. `pg_tables`](view-pg-tables)
    * [54.31. `pg_timezone_abbrevs`](view-pg-timezone-abbrevs)
    * [54.32. `pg_timezone_names`](view-pg-timezone-names)
    * [54.33. `pg_user`](view-pg-user)
    * [54.34. `pg_user_mappings`](view-pg-user-mappings)
    * [54.35. `pg_views`](view-pg-views)
    * [54.36. `pg_wait_events`](view-pg-wait-events)

* [55. Frontend/Backend Protocol](protocol)

  * *   [55.1. Overview](protocol-overview)
    * [55.2. Message Flow](protocol-flow)
    * [55.3. SASL Authentication](sasl-authentication)
    * [55.4. Streaming Replication Protocol](protocol-replication)
    * [55.5. Logical Streaming Replication Protocol](protocol-logical-replication)
    * [55.6. Message Data Types](protocol-message-types)
    * [55.7. Message Formats](protocol-message-formats)
    * [55.8. Error and Notice Message Fields](protocol-error-fields)
    * [55.9. Logical Replication Message Formats](protocol-logicalrep-message-formats)
    * [55.10. Summary of Changes since Protocol 2.0](protocol-changes)

* [56. PostgreSQL Coding Conventions](source)

  * *   [56.1. Formatting](source-format)
    * [56.2. Reporting Errors Within the Server](error-message-reporting)
    * [56.3. Error Message Style Guide](error-style-guide)
    * [56.4. Miscellaneous Coding Conventions](source-conventions)

* [57. Native Language Support](nls)

  * *   [57.1. For the Translator](nls-translator)
    * [57.2. For the Programmer](nls-programmer)

  * *   [58. Writing a Procedural Language Handler](plhandler)
  * [59. Writing a Foreign Data Wrapper](fdwhandler)

    

  * *   [59.1. Foreign Data Wrapper Functions](fdw-functions)
    * [59.2. Foreign Data Wrapper Callback Routines](fdw-callbacks)
    * [59.3. Foreign Data Wrapper Helper Functions](fdw-helpers)
    * [59.4. Foreign Data Wrapper Query Planning](fdw-planning)
    * [59.5. Row Locking in Foreign Data Wrappers](fdw-row-locking)

* [60. Writing a Table Sampling Method](tablesample-method)

  * [60.1. Sampling Method Support Functions](tablesample-support-functions)

* [61. Writing a Custom Scan Provider](custom-scan)

  * *   [61.1. Creating Custom Scan Paths](custom-scan-path)
    * [61.2. Creating Custom Scan Plans](custom-scan-plan)
    * [61.3. Executing Custom Scans](custom-scan-execution)

* [62. Genetic Query Optimizer](geqo)

  * *   [62.1. Query Handling as a Complex Optimization Problem](geqo-intro)
    * [62.2. Genetic Algorithms](geqo-intro2)
    * [62.3. Genetic Query Optimization (GEQO) in PostgreSQL](geqo-pg-intro)
    * [62.4. Further Reading](geqo-biblio)

  * *   [63. Table Access Method Interface Definition](tableam)
  * [64. Index Access Method Interface Definition](indexam)

    

  * *   [64.1. Basic API Structure for Indexes](index-api)
    * [64.2. Index Access Method Functions](index-functions)
    * [64.3. Index Scanning](index-scanning)
    * [64.4. Index Locking Considerations](index-locking)
    * [64.5. Index Uniqueness Checks](index-unique-checks)
    * [64.6. Index Cost Estimation Functions](index-cost-estimation)

  * *   [65. Generic WAL Records](generic-wal)
  * [66. Custom WAL Resource Managers](custom-rmgr)
  * [67. B-Tree Indexes](btree)

    

  * *   [67.1. Introduction](btree-intro)
    * [67.2. Behavior of B-Tree Operator Classes](btree-behavior)
    * [67.3. B-Tree Support Functions](btree-support-funcs)
    * [67.4. Implementation](btree-implementation)

* [68. GiST Indexes](gist)

  * *   [68.1. Introduction](gist-intro)
    * [68.2. Built-in Operator Classes](gist-builtin-opclasses)
    * [68.3. Extensibility](gist-extensibility)
    * [68.4. Implementation](gist-implementation)
    * [68.5. Examples](gist-examples)

* [69. SP-GiST Indexes](spgist)

  * *   [69.1. Introduction](spgist-intro)
    * [69.2. Built-in Operator Classes](spgist-builtin-opclasses)
    * [69.3. Extensibility](spgist-extensibility)
    * [69.4. Implementation](spgist-implementation)
    * [69.5. Examples](spgist-examples)

* [70. GIN Indexes](gin)

  * *   [70.1. Introduction](gin-intro)
    * [70.2. Built-in Operator Classes](gin-builtin-opclasses)
    * [70.3. Extensibility](gin-extensibility)
    * [70.4. Implementation](gin-implementation)
    * [70.5. GIN Tips and Tricks](gin-tips)
    * [70.6. Limitations](gin-limit)
    * [70.7. Examples](gin-examples)

* [71. BRIN Indexes](brin)

  * *   [71.1. Introduction](brin-intro)
    * [71.2. Built-in Operator Classes](brin-builtin-opclasses)
    * [71.3. Extensibility](brin-extensibility)

* [72. Hash Indexes](hash-index)

  * *   [72.1. Overview](hash-intro)
    * [72.2. Implementation](hash-implementation)

* [73. Database Physical Storage](storage)

  * *   [73.1. Database File Layout](storage-file-layout)
    * [73.2. TOAST](storage-toast)
    * [73.3. Free Space Map](storage-fsm)
    * [73.4. Visibility Map](storage-vm)
    * [73.5. The Initialization Fork](storage-init)
    * [73.6. Database Page Layout](storage-page-layout)
    * [73.7. Heap-Only Tuples (HOT)](storage-hot)

* [74. Transaction Processing](transactions)

  * *   [74.1. Transactions and Identifiers](transaction-id)
    * [74.2. Transactions and Locking](xact-locking)
    * [74.3. Subtransactions](subxacts)
    * [74.4. Two-Phase Transactions](two-phase)

* [75. System Catalog Declarations and Initial Contents](bki)

  * *   [75.1. System Catalog Declaration Rules](system-catalog-declarations)
    * [75.2. System Catalog Initial Data](system-catalog-initial-data)
    * [75.3. BKI File Format](bki-format)
    * [75.4. BKI Commands](bki-commands)
    * [75.5. Structure of the Bootstrap BKI File](bki-structure)
    * [75.6. BKI Example](bki-example)

* [76. How the Planner Uses Statistics](planner-stats-details)

  * *   [76.1. Row Estimation Examples](row-estimation-examples)
    * [76.2. Multivariate Statistics Examples](multivariate-statistics-examples)
    * [76.3. Planner Statistics and Security](planner-stats-security)

* [77. Backup Manifest Format](backup-manifest-format)

  * *   [77.1. Backup Manifest Top-level Object](backup-manifest-toplevel)
    * [77.2. Backup Manifest File Object](backup-manifest-files)
    * [77.3. Backup Manifest WAL Range Object](backup-manifest-wal-ranges)