"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LetBinding = void 0;
const runtime_1 = require("@aurelia/runtime");
class LetBinding {
    constructor(sourceExpression, targetProperty, observerLocator, locator, toBindingContext = false) {
        this.sourceExpression = sourceExpression;
        this.targetProperty = targetProperty;
        this.observerLocator = observerLocator;
        this.locator = locator;
        this.toBindingContext = toBindingContext;
        this.interceptor = this;
        this.isBound = false;
        this.$scope = void 0;
        this.$hostScope = null;
        this.task = null;
        this.target = null;
        runtime_1.connectable.assignIdTo(this);
    }
    handleChange(_newValue, _previousValue, flags) {
        if (!this.isBound) {
            return;
        }
        if (flags & 8 /* updateTarget */) {
            const target = this.target;
            const targetProperty = this.targetProperty;
            const previousValue = target[targetProperty];
            this.obs.version++;
            const newValue = this.sourceExpression.evaluate(flags, this.$scope, this.$hostScope, this.locator, this.interceptor);
            this.obs.clear(false);
            if (newValue !== previousValue) {
                target[targetProperty] = newValue;
            }
            return;
        }
        throw new Error('Unexpected handleChange context in LetBinding');
    }
    $bind(flags, scope, hostScope) {
        if (this.isBound) {
            if (this.$scope === scope) {
                return;
            }
            this.interceptor.$unbind(flags | 32 /* fromBind */);
        }
        this.$scope = scope;
        this.$hostScope = hostScope;
        this.target = (this.toBindingContext ? (hostScope ?? scope).bindingContext : (hostScope ?? scope).overrideContext);
        const sourceExpression = this.sourceExpression;
        if (sourceExpression.hasBind) {
            sourceExpression.bind(flags, scope, hostScope, this.interceptor);
        }
        // sourceExpression might have been changed during bind
        this.target[this.targetProperty]
            = this.sourceExpression.evaluate(flags | 32 /* fromBind */, scope, hostScope, this.locator, this.interceptor);
        // add isBound flag and remove isBinding flag
        this.isBound = true;
    }
    $unbind(flags) {
        if (!this.isBound) {
            return;
        }
        const sourceExpression = this.sourceExpression;
        if (sourceExpression.hasUnbind) {
            sourceExpression.unbind(flags, this.$scope, this.$hostScope, this.interceptor);
        }
        this.$scope = void 0;
        this.$hostScope = null;
        this.obs.clear(true);
        // remove isBound and isUnbinding flags
        this.isBound = false;
    }
}
exports.LetBinding = LetBinding;
runtime_1.connectable(LetBinding);
//# sourceMappingURL=let-binding.js.map