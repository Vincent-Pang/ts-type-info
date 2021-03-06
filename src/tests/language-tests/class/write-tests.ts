﻿import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {ClassDefinition} from "./../../../definitions";
import {getStringInfo} from "./../../../main";
import {ClassWriter} from "./../../../writers";
import {classWriterTestCode} from "./../../writers/test-code";

function getWriterString(c: ClassDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new ClassWriter(codeBlockWriter);

    writer.write(c);

    return codeBlockWriter.toString();
}

describe("ClassDefinition", () => {
    const file = getStringInfo(classWriterTestCode);

    describe("write()", () => {
        file.classes.forEach(c => {
            it(`should write the same thing as a class writer for the class ${c.name}`, () => {
                assert.equal(c.write(), getWriterString(c));
            });
        });
    });
});
