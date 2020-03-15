export function addItemToCartStore(item) {
    return { type: 'cart/ADD_ITEM', payload: item };
}

export function removeItemOfCartStore(id) {
    return { type: 'cart/REMOVE_ITEM', payload: id };
}

export function clearCartStore() {
    return { type: 'cart/CLEAR' };
}
