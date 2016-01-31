import * as assert from "assert";
import {DecoratedDefinitions} from "./../../../../definitions";
import {runDecoratorDefinitionTests} from "./../general";
import {DecoratableStructure} from "./../../structures";

export function runDecoratableDefinitionTests(definition: DecoratedDefinitions, structure: DecoratableStructure) {
    describe("decorators", () => {
        structure.decorators = structure.decorators || [];

        it(`should have ${structure.decorators.length} parameters`, () => {
            assert.equal(definition.decorators.length, structure.decorators.length);
        });

        structure.decorators.forEach((decoratorStructure, i) => {
            runDecoratorDefinitionTests(definition.decorators[i], structure.decorators[i]);
        });
    });
}
