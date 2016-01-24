var main_1 = require("./../../../main");
var test_helpers_1 = require("./../../test-helpers");
describe("enum tests", function () {
    var code = "\nenum MyEnum {\n    MyImplicit,\n    MyExplicit = 7\n}\n\nexport enum MyExportedEnum {\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        enums: [{
                name: "MyEnum",
                members: [{
                        name: "MyImplicit",
                        value: 0
                    }, {
                        name: "MyExplicit",
                        value: 7
                    }]
            }, {
                name: "MyExportedEnum",
                isExported: true,
                hasExportKeyword: true
            }]
    });
});

//# sourceMappingURL=enum-tests.js.map
