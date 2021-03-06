﻿import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("export default tests", () => {
    describe("expression", () => {
        const code = `export default 23;`;

        const def = getStringInfo(code);

        runFileDefinitionTests(def, {
            defaultExport: {
                text: "23"
            }
        });
    });

    describe("on same line", () => {
        const code = `export default class MyOnSameLineClass {}`;
        const def = getStringInfo(code);

        runFileDefinitionTests(def, {
            defaultExport: {
                name: "MyOnSameLineClass",
                isExported: true,
                isDefaultExportOfFile: true
            }, classes: [{
                name: "MyOnSameLineClass",
                isExported: true,
                isDefaultExportOfFile: true
            }]
        });
    });

    describe("on different line", () => {
        const code = `class MyOnDifferentLineClass {}\r\nexport default MyOnDifferentLineClass;`;
        const def = getStringInfo(code);

        runFileDefinitionTests(def, {
            defaultExport: {
                name: "MyOnDifferentLineClass",
                isExported: true,
                isDefaultExportOfFile: true
            }, classes: [{
                name: "MyOnDifferentLineClass",
                isExported: true,
                isDefaultExportOfFile: true
            }]
        });
    });

    describe("expression with class", () => {
        const code = `class MyOnDifferentLineClass {}\r\nexport default new MyOnDifferentLineClass();`;
        const def = getStringInfo(code);

        runFileDefinitionTests(def, {
            defaultExport: {
                text: "new MyOnDifferentLineClass()"
            },
            classes: [{
                name: "MyOnDifferentLineClass"
            }]
        });
    });
});
