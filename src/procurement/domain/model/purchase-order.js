import {Currency} from "../../../shared/domain/model/currency";
import {ValidationError} from "../../../shared/domain/model/errors";
import {generateUuid} from "../../../shared/domain/model/uuid";
import {PurchaseOrderState} from "./purchase-order-state";
import {DateTime} from "../../../shared/domain/model/date-time";
import {Money} from "../../../shared/domain/model/money";
import {PurchaseOrderItem} from "./purchase-order-item";

export class PurchaseOrder {
    #MAX_ITEMS = 50;
    #id;
    #supplierId;
    #currency;
    #orderDate;
    #items;
    #state;

    constructor({supplierId, currency, orderDate}) {
        if (!supplierId)
            throw new ValidationError("Supplier Id is required for PurchaseOrder");
        if (!(currency instanceof Currency))
            throw new ValidationError("Currency must be a valid Currency object.");
        this.#id = generateUuid();
        this.#supplierId = supplierId;
        this.#currency = currency;
        this.#orderDate = orderDate instanceof DateTime ? orderDate : new DateTime();
        this.#items = [];
        this.#state = new PurchaseOrderState();

    }

    addItem({productId, quantity, unitPrice}) {
        if (!this.#state.isDraft())
            throw new ValidationError('Items can only be added to a PurchaseOrder in Draft State.');
        if (this.#items.length >= this.#MAX_ITEMS)
            throw new ValidationError(`PurchaseOrder cannot have more than ${this.#MAX_ITEMS} items.`);
        if (!Number.isFinite(unitPrice) || unitPrice < 0)
            throw new ValidationError(`Unit price must be greater than 0`);
        this.#items.push(new PurchaseOrderItem({
            orderId: this.#id,
            productId, quantity, unitPrice: new Money({amount: unitPrice, currency: this.#currency})
        }));

    }
    calculateTotalPrice() {
        if (this.#items.length === 0)
            throw new ValidationError('Cannot calculate total price for a PurchaseOrder with no items.');
        return this.#items.reduce((sum, item) => sum.add(item.calculateSubtotal()),
            new Money({amount: 0, currency: this.#currency}));
    }

}