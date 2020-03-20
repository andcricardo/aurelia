(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "@aurelia/runtime", "../validation-controller", "./common"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require("tslib");
    const runtime_1 = require("@aurelia/runtime");
    const validation_controller_1 = require("../validation-controller");
    const common_1 = require("./common");
    let ValidationContainerCustomElement = class ValidationContainerCustomElement {
        constructor(host, controller) {
            this.controller = controller;
            this.errors = [];
            this.host = host;
        }
        handleValidationEvent(event) {
            for (const { result } of event.removedResults) {
                const index = this.errors.findIndex(x => x.result === result);
                if (index !== -1) {
                    this.errors.splice(index, 1);
                }
            }
            for (const { result, targets: elements } of event.addedResults) {
                if (result.valid) {
                    continue;
                }
                const targets = elements.filter(e => this.host.contains(e));
                if (targets.length > 0) {
                    this.errors.push(new validation_controller_1.ValidationResultTarget(result, targets));
                }
            }
            this.errors.sort((a, b) => {
                if (a.targets[0] === b.targets[0]) {
                    return 0;
                }
                return common_1.compareDocumentPositionFlat(a.targets[0], b.targets[0]);
            });
        }
        beforeBind() {
            this.controller.addSubscriber(this);
        }
        beforeUnbind() {
            this.controller.removeSubscriber(this);
        }
    };
    tslib_1.__decorate([
        runtime_1.bindable,
        tslib_1.__metadata("design:type", Array)
    ], ValidationContainerCustomElement.prototype, "errors", void 0);
    ValidationContainerCustomElement = tslib_1.__decorate([
        runtime_1.customElement({
            name: 'validation-container',
            shadowOptions: { mode: 'open' },
            hasSlots: true,
            // TODO: customize template from plugin registration
            template: `
<slot></slot>
<slot name='secondary'>
  <span repeat.for="error of errors">
    \${error.result.message}
  </span>
</slot>
`
        }),
        tslib_1.__param(0, runtime_1.INode),
        tslib_1.__param(1, validation_controller_1.IValidationController),
        tslib_1.__metadata("design:paramtypes", [Object, Object])
    ], ValidationContainerCustomElement);
    exports.ValidationContainerCustomElement = ValidationContainerCustomElement;
});
//# sourceMappingURL=validation-container-custom-element.js.map