﻿import {TypeAliasStructure} from "./../../structures";
import {TypeAliasDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests, runTypeExpressionedDefinitionTests,
        runTypeParameteredDefinitionTests, runAmbientableDefinitionTests, runParentedDefinitionTests} from "./../base";
import {ensureNotNull} from "./../../ensure-not-null";

export function runTypeAliasDefinitionTests(definition: TypeAliasDefinition, structure: TypeAliasStructure) {
    describe(`type expression ${structure.name}`, () => {
        ensureNotNull(definition, () => {
            structure.isAmbient = structure.isAmbient == null ? true : structure.isAmbient;
            if (structure.typeExpression == null) {
                // default always to expect a string (for simplicity)
                structure.typeExpression = { text: "string" };
            }

            runNamedDefinitionTests(definition, structure);
            runExportableDefinitionTests(definition, structure);
            runTypeExpressionedDefinitionTests(definition, structure);
            runAmbientableDefinitionTests(definition, structure);
            runTypeParameteredDefinitionTests(definition, structure);
            runParentedDefinitionTests(definition);
        });
    });
}
