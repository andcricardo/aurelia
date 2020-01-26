import { $BuiltinFunction, $Function } from '../types/function';
import { Realm, ExecutionContext } from '../realm';
import { $AnyNonEmpty, $AnyNonEmptyNonError } from '../types/_shared';
import { $Undefined } from '../types/undefined';
import { $FunctionPrototype } from './function';
import { $List } from '../types/list';
export declare class $IsNaN extends $BuiltinFunction<'%isNaN%'> {
    constructor(realm: Realm, proto: $FunctionPrototype);
    performSteps(ctx: ExecutionContext, thisArgument: $AnyNonEmptyNonError, argumentsList: $List<$AnyNonEmpty>, NewTarget: $Function | $Undefined): $AnyNonEmpty;
}
//# sourceMappingURL=is-nan.d.ts.map