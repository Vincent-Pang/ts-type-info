import * as ts from "typescript";
import {Scope} from "./../scope";
import {applyMixins, TypeChecker} from "./../../../utils";
import {DecoratorDefinition} from "./../../../definitions";
import {BaseFunctionDefinition, BaseParameterDefinitionConstructor} from "./../../function";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType} from "./../../base";
import {IScopedDefinition, ScopedDefinition} from "./scoped-definition";
import {ClassDefinition} from "./../class-definition";

export class BaseClassMethodDefinition<ParameterType> extends BaseFunctionDefinition<ClassDefinition, ParameterType> implements IDecoratableDefinition, IScopedDefinition {
    constructor(
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        parameterDefinition: BaseParameterDefinitionConstructor<BaseFunctionDefinition<ClassDefinition, ParameterType>, ParameterType>,
        parent: ClassDefinition,
        definitionType: DefinitionType
    ) {
        super(typeChecker, symbol, parameterDefinition, definitionType);
        this.fillDecorators(typeChecker, symbol, this);
        this.fillScope(symbol);
        this.parent = parent;
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition<this>[];
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol, parent: this) => void;
    // ScopeDefinition
    scope: Scope;
    fillScope: (symbol: ts.Symbol) => void;
}

applyMixins(BaseClassMethodDefinition, [DecoratableDefinition, ScopedDefinition]);
