[#id](#SPI-SPI-RESULT-CODE-STRING)

## SPI\_result\_code\_string

SPI\_result\_code\_string — return error code as string

## Synopsis

```
const char * SPI_result_code_string(int code);
```

[#id](#id-1.8.12.9.12.5)

## Description

`SPI_result_code_string` returns a string representation of the result code returned by various SPI functions or stored in `SPI_result`.

[#id](#id-1.8.12.9.12.6)

## Arguments

* `int code`

  result code

[#id](#id-1.8.12.9.12.7)

## Return Value

A string representation of the result code.