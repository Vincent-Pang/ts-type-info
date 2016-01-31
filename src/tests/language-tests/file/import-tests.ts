﻿import * as path from "path";
import * as assert from "assert";
import {getFileInfo} from "./../../../main";
import {runImportDefinitionTests} from "./../../test-helpers";
import {ClassDefinition, EnumDefinition, InterfaceDefinition, VariableDefinition} from "./../../../definitions";

describe("file import tests", () => {
    const fileName = path.join(__dirname, "../../../../src/tests/language-tests/file/test-files/import.ts");
    const fileDef = getFileInfo([fileName]).filter(def => /import/.test(def.fileName))[0];
    const NUM_IMPORTS = 12;

    it(`should have ${NUM_IMPORTS} imports`, () => {
        assert.equal(fileDef.imports.length, NUM_IMPORTS);
    });

    runImportDefinitionTests(fileDef.imports[0], {
        definitionName: "TestClass",
        definitionType: ClassDefinition,
        fileName: "test-class.ts"
    });

    runImportDefinitionTests(fileDef.imports[1], {
        definitionName: "TestEnum",
        definitionType: EnumDefinition,
        fileName: "test-enum.ts"
    });

    runImportDefinitionTests(fileDef.imports[2], {
        definitionName: "Class1",
        definitionType: ClassDefinition,
        fileName: "test-multiple-classes.ts"
    });

    runImportDefinitionTests(fileDef.imports[3], {
        definitionName: "Class2",
        definitionType: ClassDefinition,
        fileName: "test-multiple-classes.ts"
    });

    runImportDefinitionTests(fileDef.imports[4], {
        definitionName: "TestDefaultClass",
        definitionType: ClassDefinition,
        fileName: "test-default-class.ts"
    });

    runImportDefinitionTests(fileDef.imports[5], {
        definitionName: "TestDefaultSeparateClass",
        definitionType: ClassDefinition,
        fileName: "test-default-separate-class.ts"
    });

    runImportDefinitionTests(fileDef.imports[6], {
        definitionName: "Test",
        definitionType: InterfaceDefinition,
        fileName: "definition.d.ts"
    });

    runImportDefinitionTests(fileDef.imports[7], {
        definitionName: "TestClass",
        definitionType: ClassDefinition,
        fileName: "test-class.ts"
    });

    runImportDefinitionTests(fileDef.imports[8], {
        definitionName: "TestEnum",
        definitionType: EnumDefinition,
        fileName: "test-enum.ts"
    });

    runImportDefinitionTests(fileDef.imports[9], {
        definitionName: "MyInterface",
        definitionType: InterfaceDefinition,
        fileName: "test-interface.ts"
    });

    runImportDefinitionTests(fileDef.imports[10], {
        definitionName: "Test",
        definitionType: InterfaceDefinition,
        fileName: "definition-namespace.d.ts"
    });

    runImportDefinitionTests(fileDef.imports[11], {
        definitionName: "METHODS",
        definitionType: VariableDefinition,
        fileName: "definition-var.d.ts"
    });
});
