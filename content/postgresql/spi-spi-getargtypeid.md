[#id](#SPI-SPI-GETARGTYPEID)

## SPI\_getargtypeid

SPI\_getargtypeid — return the data type OID for an argument of a statement prepared by `SPI_prepare`

## Synopsis

```
Oid SPI_getargtypeid(SPIPlanPtr plan, int argIndex)
```

[#id](#id-1.8.12.8.13.5)

## Description

`SPI_getargtypeid` returns the OID representing the type for the *`argIndex`*'th argument of a statement prepared by `SPI_prepare`. First argument is at index zero.

[#id](#id-1.8.12.8.13.6)

## Arguments

* `SPIPlanPtr plan`

  prepared statement (returned by `SPI_prepare`)

* `int argIndex`

  zero based index of the argument

[#id](#id-1.8.12.8.13.7)

## Return Value

The type OID of the argument at the given index. If the *`plan`* is `NULL` or invalid, or *`argIndex`* is less than 0 or not less than the number of arguments declared for the *`plan`*, `SPI_result` is set to `SPI_ERROR_ARGUMENT` and `InvalidOid` is returned.