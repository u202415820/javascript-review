import {ValidationError} from "../../../shared/domain/model/errors";
import {Money} from "../../../shared/domain/model/money";
import {ProductId} from "../../../shared/domain/model/product-id";

export class PurchaseOrderItem {
    #orderId;
    #productId;
    #quantity;
    #unitPrice;

    constructor({orderId, productId, quantity, unitPrice}) {
        if (typeof orderId !== 'string' || orderId.trim() === '')
            throw new ValidationError('Order ID is required for PurchaseOrderItem.');
        if (!(productId instanceof ProductId))
            throw new ValidationError('Product ID must be a valid ProductId object.');
        if (!Number.isInteger(quantity) || quantity < 0 || quantity > 1000)
            throw new ValidationError('Quantity must be a positive integer between 0 and 999.');
        if (!unitPrice instanceof Money ) {
            throw new ValidationError('Unit Price must be a valid Money object.');
        }

        this.#orderId = orderId;
        this.#productId = productId;
        this.#quantity = quantity;
        this.#unitPrice = unitPrice;
        this._orderId = orderId;
        this._productId = productId;
        this._quantity = quantity;
        this._unitPrice = unitPrice;
    }

    get productId() {
        return this.#productId
    }
    get quantity() {
        return this.#quantity;
    }
    get unitPrice() {
        return this.#unitPrice;
    }
    calculateSubtotal() {
        return this.#unitPrice.multiply(this.#quantity);
    }
}