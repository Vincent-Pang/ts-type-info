﻿import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {ClassDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {ClassWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {classWriterTestCode} from "./test-code";

function getClassAsString(c: ClassDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new ClassWriter(codeBlockWriter, flags);

    writer.write(c);

    return codeBlockWriter.toString();
}

describe("ClassWriter", () => {
    const file = getStringInfo(classWriterTestCode);

    describe("write()", () => {
        describe("MyClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyClass {
    myString: string;
    private myPrivateString: string;

    myMethod(): void {
    }

    private myPrivateMethod(): void {
    }
}
`;
                assert.equal(getClassAsString(file.classes[0], WriteFlags.Default), expected);
            });
        });

        describe("MyTypeParameterClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyTypeParameterClass<T> {
}
`;
                assert.equal(getClassAsString(file.classes[1], WriteFlags.Default), expected);
            });
        });

        describe("MyChildClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyChildClass extends MyTypeParameterClass<string> {
}
`;
                assert.equal(getClassAsString(file.classes[2], WriteFlags.Default), expected);
            });
        });

        describe("MyImplementsClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyImplementsClass implements MyChildClass {
}
`;
                assert.equal(getClassAsString(file.classes[3], WriteFlags.Default), expected);
            });
        });

        describe("MyExtendsImplementsClass", () => {
            it("should contain the class written out", () => {
                const expected =
`class MyExtendsImplementsClass extends MyChildClass implements MyImplementsClass {
}
`;
                assert.equal(getClassAsString(file.classes[4], WriteFlags.Default), expected);
            });
        });
    });
});
