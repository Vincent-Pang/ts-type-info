var main_1 = require("./../../../main");
var assert = require("assert");
describe("function type parameters", function () {
    var code = "\nfunction myTypeParameterFunction<T, U extends string>(param1: T, param2: U) {\n    console.log(param1);\n    console.log(param2);\n}";
    var def = main_1.getStringInfo(code);
    it("should have a type parameter name of T", function () {
        assert.equal(def.functions[0].typeParameters[0].name, "T");
    });
    it("should have a second type parameter name of U", function () {
        assert.equal(def.functions[0].typeParameters[1].name, "U");
    });
    it("it should extend a type string", function () {
        assert.equal(def.functions[0].typeParameters[1].constraint.text, "string");
    });
});

//# sourceMappingURL=type-parameter-tests.js.map