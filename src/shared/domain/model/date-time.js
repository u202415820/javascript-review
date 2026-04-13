import {ValidationError} from "./errors";

export class DateTime {
    #date;
    constructor(date = new Date()) {
        const parsedDate = date instanceof Date ? date: new Date(date);
        if (isNaN(parsedDate.getTime()))
            throw new ValidationError(`Invalid date format : ${parsedDate}`);
        this.#date = parsedDate;
    }

    get date() {
        return this.#date;
    }

    toISOString() {
        return this.#date.toISOString();
    }

    toString() {
        let options = { year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true };
        return this.#date.toLocaleDateString('en-US', options);
    }
    equals(other) {
        return other instanceof DateTime &&
            this.#date.getTime() === other.#date.getTime();
    }
}