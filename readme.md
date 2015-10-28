TypeInfoTS
==========

Uses the [TypeScript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) to get the type and structure information of TypeScript code in an easily usable format.

This is a very experimental library. Currently you can only get basic type information out of files that export a class.

## Example

### Input

```typescript
// V:/TestFile.ts
@myDecorator("My decorator value")
export class MyClass {
    myMethod(myParameter: string) {
        return `Test: ${myParameter}`; 
    }
}
```

Get the file info:

```typescript
import * as TypeInfoTS from "type-info-ts";

console.log(JSON.stringify(TypeInfoTS.getFileInfo("V:/TestFile.ts")));
```

### Output

```text
[{
    "name": "V:/TestFile.ts",
    "classes": [{
        "name": "MyClass",
        "decorators": [{
            "name": "myDecorator",
            "arguments": [{ "text": "My decorator value" }]
        }],
        "methods": [{
            "name": "myMethod",
            "decorators": [],
            "parameters": [{
                "name": "myParameter",
                "decorators": [],
                "type": { "name":"string" }
            }],
            "returnType": {
                "name": "string"
            }
        }],
        "properties": []
    }]
}]
```
