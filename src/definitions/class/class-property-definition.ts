import {ISymbolNode} from "./../../wrappers";
import {MainCache} from "./../../utils";
import {DefinitionType} from "./../base";
import {BaseClassPropertyDefinition} from "./base";
import {ClassDefinition} from "./class-definition";

export class ClassPropertyDefinition extends BaseClassPropertyDefinition {
    isAccessor: boolean;
    isReadonly: boolean;
    isConstructorParameter: boolean;

    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent?: ClassDefinition) {
        super(mainCache, symbolNode, parent, DefinitionType.ClassProperty);

        this.isAccessor = symbolNode.isPropertyAccessor();
        this.isReadonly = symbolNode.isPropertyReadonly();
        this.isConstructorParameter = symbolNode.isConstructorParameter();
    }
}
