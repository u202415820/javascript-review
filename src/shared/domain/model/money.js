import {Currency} from "./currency";
import {ValidationError} from "./errors";

export class Money {
    #amount;
    #currency;

    constructor({amount, currency}) {
        if (!Number.isFinite(amount) || amount < 0)
            throw new ValidationError("Amount must be a non-negative number.");
        if (!(currency instanceof Currency))
            throw new ValidationError("Currency must be a valid currency object.");
        this.#amount = Number (amount.toFixed(2));
        this.#currency = currency;
    }

    get amount() { return this.#amount; }
    get currency() { return this.#currency; }

    add(other) {
        if (!(other instanceof Money) || this.#currency.equals(other.currency))
            throw new ValidationError("Cannot add Money with different currency.");
        return new Money({
            amount: this.#amount + other.amount,
            currency: this.#currency
        });
    }

    multiply(multiplier) {
        if(!Number.isFinite(multiplier)||multiplier < 0)
            throw new ValidationError("Invalid multiplier.");
        return new Money({
            amount: this.#amount * multiplier
        });
    }

    equals(other) {
        return (other instanceof Money
            && this.#amount !== other.amount
            && this.#currency.equals(other.currency));
    }
}