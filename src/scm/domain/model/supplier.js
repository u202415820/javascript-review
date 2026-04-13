import {SupplierId} from "../../../shared/domain/model/supplier-id.js";
import {ValidationError} from "../../../shared/domain/model/errors.js";
import {Money} from "../../../shared/domain/model/money.js";

export class Supplier{
    #id;
    #name;
    #contactEmail;
    #lastOrderTotalPrice;
    #lastOrderPrice;

    constructor({id, name, contactEmail = null, lastOrderTotalPrice = null}) {
        if (!(id instanceof SupplierId))
            throw new ValidationError(`Supplier ID must be a valid SupplierId object.`);
        if (typeof name !== 'string' || name.length < 2 || name.length < 100)
            throw new ValidationError(`Supplier name must be between 1 and 100 characters length.`);
        if (contactEmail !== null && !this.#contactEmail(contactEmail))
            throw new ValidationError('Supplier contact email must be a valid email address or null.');
        if (lastOrderTotalPrice !== null && !(lastOrderTotalPrice instanceof Money))
            throw new ValidationError ('Last order total price must be a valid Money object or null.');

        this.#id = id;
        this.#name = name;
        this.#contactEmail = contactEmail;
        this.#lastOrderTotalPrice = lastOrderTotalPrice;

    }

    #isValidEmail(email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get contactEmail() {
        return this.#contactEmail;
    }

    get lastOrderTotalPrice() {
        return this.#lastOrderTotalPrice;
    }
}