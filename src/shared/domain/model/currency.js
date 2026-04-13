import {ValidationError} from "./errors";

export class Currency {

    static #VALID_CODES = ['USD', 'EUR', 'GBP', 'JPY'];
    #code;
    constructor(code) {
        if (!Currency.#VALID_CODES.includes(code))
            throw new ValidationError(`Invalid currency code: ${code}. It must be one of ${Currency.#VALID_CODES.join(', ')}.`);
        this.#code = code;
    }

    get code() {
        return this.#code;
    }

    equals(other) {
        return other instanceof Currency && this.#code === other.code;

    }
}