import {ClassMethodParameter} from "./../structures";
import {ClassMethodParameterDefinition} from "./../../../definitions";
import {runBaseParameterDefinitionTests} from "./../function";

export function runClassMethodParameterDefinitionTests(definition: ClassMethodParameterDefinition, param: ClassMethodParameter) {
    if (definition == null) {
        throw "Class method parameter definition should not be null.";
    }

    describe(`parameter ${param.name}`, () => {
        runBaseParameterDefinitionTests(definition, param);
    });
}
