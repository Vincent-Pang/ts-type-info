﻿import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {PropertyWriter} from "./../../writers";
import {BasePropertyDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";
import {WriteFlags} from "./../../write-flags";

function getPropertyAsString(prop: BasePropertyDefinition, flags: WriteFlags) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new PropertyWriter(codeBlockWriter);

    writer.write(prop, flags);

    return codeBlockWriter.toString();
}

describe("PropertyWriter", () => {
    const code = `
class MyClass {
    nonOptionalString = "text";
    optionalNumber?: number;
    protected protectedString: string;
    private privateString: string;
}
`;
    const myClass = getStringInfo(code).classes[0];

    describe("write()", () => {
        describe("nonOptionalString", () => {
            it("should contain the property written out", () => {
                assert.equal(getPropertyAsString(myClass.properties[0], WriteFlags.None), `nonOptionalString: string;\n`);
            });

            it("should contain the property written out with the default expression", () => {
                assert.equal(getPropertyAsString(myClass.properties[0], WriteFlags.PropertyExpressions), `nonOptionalString: string = "text";\n`);
            });
        });

        describe("optionalNumber", () => {
            it("should contain the property written out", () => {
                assert.equal(getPropertyAsString(myClass.properties[1], WriteFlags.None), "optionalNumber?: number;\n");
            });
        });

        describe("protectedString", () => {
            it("should contain the property written out", () => {
                assert.equal(getPropertyAsString(myClass.properties[2], WriteFlags.None), "protected protectedString: string;\n");
            });
        });

        describe("privateString", () => {
            it("should contain the property written out", () => {
                assert.equal(getPropertyAsString(myClass.properties[3], WriteFlags.None), "private privateString: string;\n");
            });
        });
    });
});
