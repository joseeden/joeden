---
title: "YAML"
description: "Yet Another Markup Language"
tags: [Computer Science, Application Development, Software Development]
sidebar_position: 13
last_update:
  date: 3/14/2022
---



## Overview

YAML (short for "YAML Ain't Markup Language") is a data serialization format designed for ease of reading and writing, especially for configuration files. It is widely used in tools like Ansible for writing declarative automation templates.

YAML is a **superset of JSON**, meaning that YAML parsers can also process JSON documents, but the reverse is not true (JSON parsers cannot process YAML). This makes YAML more flexible for tasks like configuration management.

## Key Advantages of YAML Over JSON

Some key advantages of YAML over JSON:

- **Improved readability**  
  
  - Designed to be more human-readable, asier to read and write.  
  - Uses less punctuation like brackets, commas, and quotes.
  - Example (YAML vs. JSON):

      ```yaml
      # YAML
      name: Alice
      age: 30
      ```
      ```json
      // JSON
      {
        "name": "Alice",
        "age": 30
      }
      ```

- **Supports embedding JSON**  

  - Can be embedded directly in YAML, with minimal modification.
  - No need for escaping quotes or special encoding, unlike in JSON.

      ```yaml
      json-data: { "name": "Bob", "age": 25 }
      ```


## Example: JSON to YAML Conversion

Here’s an example of the JSON file, and it's equivalent YAML form:

```json title="JSON"
{
  "edit-config": {
    "a-boolean": true,
    "default-operation": "merge",
    "more-numbers": [225.0, -1.0735],
    "some-integers": [2, 3, 5, 7, 9],
    "test-operation": "set"
  }
}
```

```yaml title="YAML"
---
edit-config:
  a-boolean: true
  default-operation: merge
  more-numbers:
    - 225.0
    - -1.0735
  some-integers:
    - 2
    - 3
    - 5
    - 7
    - 9
  test-operation: set
```

**Notice the differences**:
- No need for quotes around strings (unless special characters are involved).
- Use of indentation to represent structure, rather than brackets (`{}`) or commas.
- Arrays are denoted by dashes (`-`) instead of being enclosed in square brackets (`[]`). 

This makes YAML cleaner and more compact for human readers, especially for nested or complex structures.




## YAML File Structure

YAML files often start with three dashes (`---`) and may end with three dots (`...`). These symbols mark the start and end of the file.

- YAML allows more than one document in a single file.  
- Each new document starts with three dashes (`---`).

Example:

```yaml
---  # Start of the first document
name: Alice
age: 30
---
name: Bob  # Start of the second document
age: 25
...
```

## YAML Data Types

YAML supports several basic data types for representing information.

- **Numbers**  
  
  - Can be integers, decimals, or written in scientific notation.  
  - Example:  

    ```yaml
    age: 30
    temperature: -5.6
    large-number: 1.23e+6
    ```

- **Strings**  
  
  - Typically unquoted, but quotes are required for special characters.  
  - Example (unquoted):  

    ```yaml
    name: Alice
    ```

  - Example (quoted with special characters):  

    ```yaml
    special: "This is a string with a newline \n character"
    ```

- **Booleans**  
  
  - Represent `true` or `false`.  
  - Example:  

    ```yaml
    isStudent: true
    isAdmin: false
    ```

- **Null**  
  
  - Null values are represented by leaving the value blank.  
  - Example:  

    ```yaml
    middleName: null
    ```

- **Multi-line strings**  
  
  - YAML provides options to handle long blocks of text across multiple lines.  
  - Example:

    ```yaml
    description: |
      This is a multi-line string.
      It can contain paragraphs and other content.
    ```

## Basic Objects

In YAML, objects are defined using key/value pairs. Keys are usually unquoted but can be quoted if they contain special characters like colons (`:`).

  - Keys are normally unquoted.  
  - Quotes are needed for special characters (like `:`).
  - Keys also do not need to begin with a letter
  - A colon (`:`) separates the key from the value.

Example:

```yaml
my_integer: 2                                 # Unquoted key with an integer value
my_float: 2.1                                 # Unquoted key with a float value
my_exponent: 2e+5                             # Exponent value

'my_complex:key': "my quoted string value\n"  # Quoted key with a special character
0.2: "can you believe that's a key?"          # Numeric key

my_boolean: true                              # Boolean value
my_null: null                                 # Null value
```

## YAML Indentation

YAML uses indentation to show structure, instead of brackets or tags. Indented items are "members" of the element above them.

- Any amount of indentation can be used, but consistency is key.  
- Best practice: use **two spaces** for each level.  
- **Spaces, not tabs** should be used.

Example:

```yaml
person:
  name: Alice             # 'name' is a member of 'person'
  age: 30                 # 'age' is also a member of 'person'
  address:
    street: 123 Main St   # 'street' is a member of 'address'
    city: Exampleville    # 'city' is a member of 'address'
```

## Maps and Lists

YAML can represent complex data types like maps (equivalent to dictionaries in Python) and ordered lists (arrays) with ease.

- **Maps**:  
  - Represent multiple key/value pairs over multiple lines.  
  - Start with a key followed by a colon.  
  - Members are indented on the following lines.
  - Example:

      ```yaml
      mymap:
        myfirstkey: 5
        mysecondkey: The quick brown fox
      ```

- **Lists**:  
  - Uses indented members, each preceded by a dash and space.  
  - Items can be listed on separate lines.
  - Example:
  
      ```yaml
      mylist:
        - 1
        - 2
        - 3
      ```

Maps and lists can also be represented in a so-called "flow syntax," which looks very much like JavaScript or Python:

```yaml
mymap: { myfirstkey: 5, mysecondkey: The quick brown fox}
mylist: [1, 2, 3]
```

## Multiline Strings in YAML

YAML supports multiline strings using **block scalar formats**. These formats help keep line breaks and indentation intact, which makes them useful for configurations, logs, and CI/CD scripts.

- Two styles: **Literal (|) and Folded (>)**
- Three chomping indicators: **Clip (default), Strip (-), Keep (+)**

### Literal Style (`|`)

Also called **Non-folding syntax**, the **literal style** keeps all line breaks and indentation exactly as written. This is useful for commands, formatted text, or logs.

Example:

```yaml
log_message: |
  Line 1
  Line 2
  
  Indented line
```

Output:

```
Line 1
Line 2

  Indented line
```

### Folded Style (`>`)

The **folded style** or **folding syntax** replaces line breaks with spaces, making text more compact while keeping readability.

Example:

```yaml
description: >
  This is a long message
  split into multiple lines
  for better readability.
```

Output:

```
This is a long message split into multiple lines for better readability.
```

### Chomping Indicators

Chomping indicators **control extra blank lines** at the end of multiline strings. They are placed **after** the style indicator.

- **Clip (default):** Keeps a single newline at the end.
- **Strip (`-|` or `->`)**: Removes all newlines at the end.
- **Keep (`|+` or `>+`)**: Retains all newlines at the end.

Strip Example:

```yaml
message: |-
  This is a message
  with no extra newlines.
```

Output:

```
This is a message
with no extra newlines.
```

Keep Example:

```yaml
message: |+
  This is a message
  with preserved newlines.

```

Output:

```
This is a message
with preserved newlines.

```

## Dynamic Value Injection

Some YAML implementations support **expressions** to dynamically insert values from environment variables or other YAML fields.

Example:

```yaml
database:
  host: ${DB_HOST}
  port: ${DB_PORT}
```
> **Note:** Not all YAML parsers support this feature.

## Multi-Document YAML

YAML allows storing multiple independent documents in **one file**, separated by `---`.

Example:

```yaml
---
name: Alice
age: 30
---
name: Bob
age: 25
occupation: Engineer
```


## Comments

In YAML, comments can be placed almost anywhere except within long string literals. They start with a hash sign (`#`) followed by a space and are ignored by parsers, so they do not affect the data structure or functionality.

- Added before or after key-value pairs and on their own lines.
- Clarify structures, document intentions, and more.
- Enhance readability and maintainability of YAML files.

Example:

```yaml
# This is a standalone comment
name: Alice  # This comment follows a key-value pair
age: 30      # User's age
```

## More YAML Features

YAML offers additional features that are often utilized when integrated with specific programming languages, like Python, or when converting to JSON and other formats. 

- YAML 1.2 introduces support for schemas and tags/
- Schemas and tags help clarify how values should be interpreted. 
- To ensure a number is treated as a string, use the `!!str` tag.

Example:

```yaml
mynumericstring: !!str 0.1415  # Forces interpretation as a string
```


