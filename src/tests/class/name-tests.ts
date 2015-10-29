import {getStringInfo} from "./../../main";
import * as assert from "assert";

describe("class tests", () => {
    const code = `
class MyClass {
    str: string;
}`;

    const def = getStringInfo(code);

    it("should have a name of MyClass", () => {
        assert.equal(def.classes[0].name, "MyClass");
    });
});
