﻿import {ClassConstructorParameterStructure} from "./../../structures";
import {ClassConstructorParameterDefinition} from "./../../../../definitions";
import {runBaseParameterDefinitionTests} from "./../function";

export function runClassConstructorParameterDefinitionTests(definition: ClassConstructorParameterDefinition, structure: ClassConstructorParameterStructure) {
    describe(`parameter ${structure.name}`, () => {
        runBaseParameterDefinitionTests(definition, structure);
    });
}
