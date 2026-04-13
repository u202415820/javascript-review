import {ValidationError} from "../../../shared/domain/model/errors";

export class PurchaseOrderState {
    static #VALID_STATES = {
        DRAFT: 'Draft',
        SUBMITTED: 'Submitted',
        APPROVED: 'Approved',
        SHIPPED: 'Shipped',
        COMPLETED: 'Completed',
        CANCELED: 'Cancelled'
    }
    #value;

    constructor(value = PurchaseOrderState.#VALID_STATES.DRAFT) {
        this.#validateState(value);
        this.#value = value;
    }

    #validateState(value) {
        if (!Object.values(PurchaseOrderState.#VALID_STATES).includes(state))
            throw new ValidationError(`Invalid purchase order state: ${state}. Must be one of ${Object.values(PurchaseOrderState.#VALID_STATES).join(', ')}`)

    }
    toSubmittedFrom(currentState){
        if(currentState.value !== PurchaseOrderState.#VALID_STATES.DRAFT)
            throw new ValidationError("Purchase order can only be submitted from Draft state.");
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.SUBMITTED);
    }

    toApprovedFrom(currentState){
        if(currentState.value !== PurchaseOrderState.#VALID_STATES.SUBMITTED)
            throw new ValidationError("Purchase order can only be approved from Submitted state.");
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.APPROVED);
    }

    toShippedFrom(currentState){
        if(currentState.value !== PurchaseOrderState.#VALID_STATES.APPROVED)
            throw new ValidationError("Purchase order can only be shipped from Approved state.");
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.SHIPPED)
    }

    toCompletedFrom(currentState){
        if(currentState.value !== PurchaseOrderState.#VALID_STATES.SHIPPED)
            throw new ValidationError("Purchase order can only be completed from Shipped state.");
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.COMPLETED);
    }

    toCancelledFrom(currentState){
        if(currentState.value !== PurchaseOrderState.#VALID_STATES.COMPLETED)
            throw new ValidationError("Purchase order can not be cancelled once is Completed.");
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.CANCELED);
    }

    isDraft() {
        return this.#value === PurchaseOrderState.#VALID_STATES.DRAFT;
    }

    get value() {
        return this.#value;
    }

    equals(other) {
        return other instanceof PurchaseOrderState && this.value === other.value;
    }
}
