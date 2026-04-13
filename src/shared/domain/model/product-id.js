import {validateUuid} from "./uuid.js";
import {ValidationError} from "./errors.js";

export class ProductId {
    #value;

    constructor(value) {
        if (!validateUuid(value))
            throw new ValidationError(`Invalid Product Id: ${value}. Must be a valid UUI.`)
        this.#value = value;
    }

    static generate() {
        return new ProductId(generateUuid());
    }

    get value() {
        return this.#value
    };

    equals(other) {
        return other instanceof ProductId && this.#value === other.value;
    }

}