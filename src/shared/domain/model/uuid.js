import { v4 as uuid, validate as uuidValidate} from "uuid";

export function generateUuid() {
    return uuid();
}

export function validateUuid(value) {
    return uuidValidate(value);
}
