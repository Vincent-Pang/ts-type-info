﻿TSTypeInfo
==========

[![Build Status](https://travis-ci.org/dsherret/ts-type-info.svg?branch=master)](https://travis-ci.org/dsherret/ts-type-info?branch=master)
[![Coverage Status](https://coveralls.io/repos/dsherret/ts-type-info/badge.svg?branch=master&service=github)](https://coveralls.io/github/dsherret/ts-type-info?branch=master)
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Uses the [TypeScript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) to get the type and structure information of TypeScript code in an easily usable format.

This is a very experimental library.

```
npm install ts-type-info --save-dev
tsd link
```

## Example

### Input

```typescript
// V:/TestFile.ts
﻿
function myDecorator(str: string) {
    return (target: typeof MyClass) => {
        target.myStaticProperty = str;
    };
}

@myDecorator("My decorator value")
export class MyClass {
    static myStaticProperty: string;
    
    myProperty = 253;

    myMethod(myParameter: string) {
        return `Test: ${myParameter}`;
    }
}

```

Get the file info:

```typescript
import * as TsTypeInfo from "ts-type-info";

console.log(TsTypeInfo.getFileInfo([ "V:/TestFile.ts" ]));
```

### Output

```text
{
	"fileName": "V:/TestFile.ts",
	"imports": [],
	"reExports": [],
	"namespaces": [],
	"functions": [{
		"name": "myDecorator",
		"isExported": false,
		"typeParameters": [],
		"parameters": [{
			"name": "str",
			"isOptional": false,
			"isRestParameter": false,
			"defaultExpression": null
		}],
		"returnTypeExpression": {
			"types": [{
				"text": "(target: typeof MyClass) => void",
				"callSignatures": [{ /* omitted */ }],
				"properties": [],
				"typeArguments": [],
				"definition": { /* omitted */ }
			}],
			"text": "(target: typeof MyClass) => void"
		}
	}],
	"classes": [{
		"name": "MyClass",
		"isExported": true,
		"typeParameters": [],
		"extendsTypeExpressions": [],
		"implementsTypeExpressions": [],
		"decorators": [{
			"arguments": [{ "text": "\"My decorator value\"" }],
			"name": "myDecorator"
		}],
		"methods": [{
			"name": "myMethod",
			"parameters": [{
				"name": "myParameter",
				"typeExpression": {
					"text": "string",
					"types": [{
						"text": "string",
						"properties": [],
						"callSignatures": [],
						"typeArguments": []
					}]
				},
				"isOptional": false,
				"isRestParameter": false,
				"defaultExpression": null,
				"decorators": []
			}],
			"typeParameters": [],
			"decorators": [],
			"scope": 0
		}],
		"properties": [{
			"name": "myProperty",
			"typeExpression": {
				"text": "number",
				"types": [{
					"text": "number",
					"properties": [],
					"callSignatures": [],
					"typeArguments": []
				}]
			},
			"isOptional": false,
			"decorators": [],
			"scope": 0,
			"isAccessor": false,
			"isReadonly": false
		}],
		"staticMethods": [],
		"staticProperties": [{
			"name": "myStaticProperty",
			"isOptional": false,
			"decorators": [],
			"scope": 0
		}]
	}],
	"enums": [],
	"interfaces": [],
	"variables": []
}
```
