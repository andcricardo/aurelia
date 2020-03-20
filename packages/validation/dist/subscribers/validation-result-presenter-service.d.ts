import { ValidationResultsSubscriber, ValidationEvent } from '../validation-controller';
import { ValidationResult } from '../rule-provider';
export declare class ValidationResultPresenterService implements ValidationResultsSubscriber {
    handleValidationEvent(event: ValidationEvent): void;
    remove(target: Element, results: ValidationResult[]): void;
    add(target: Element, results: ValidationResult[]): void;
    getValidationMessageContainer(target: Element): Element | null;
    showResults(messageContainer: Element, results: ValidationResult[]): void;
    removeResults(messageContainer: Element, results: ValidationResult[]): void;
    private reverseMap;
}
//# sourceMappingURL=validation-result-presenter-service.d.ts.map