﻿import {MethodDefinitions, MethodParameterDefinitions, ClassMethodDefinition} from "./../definitions";
import {TypeParameterWriter} from "./type-parameter-writer";
import {TypeExpressionWriter} from "./type-expression-writer";
import {ParameterWriter} from "./parameter-writer";
import {ScopeWriter} from "./scope-writer";
import {BaseWriter} from "./base-writer";
import {WriteFlags} from "./../write-flags";

export class MethodWriter extends BaseWriter {
    private typeParameterWriter = new TypeParameterWriter(this.writer);
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);
    private parameterWriter = new ParameterWriter(this.writer);
    private scopeWriter = new ScopeWriter(this.writer);

    write(func: MethodDefinitions, flags: WriteFlags) {
        this.scopeWriter.write((func as ClassMethodDefinition).scope);
        this.writer.spaceIfLastNotSpace();
        this.writer.write(func.name);
        this.typeParameterWriter.write(func.typeParameters);
        this.parameterWriter.write(func.parameters, flags);
        this.writer.write(": ");
        this.typeExpressionWriter.write(func.returnTypeExpression);
        this.writer.write(";").newLine();
    }
}
