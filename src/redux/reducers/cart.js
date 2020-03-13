const INITIAL_STATE = {
    products: [],
}

export default function cartReducer(state=INITIAL_STATE, action) {
    switch(action.type) {
        case 'cart/ADD_ITEM':
            return { ...state, products: [...state.products, ...[action.payload]] };
        case 'cart/REMOVE_ITEM':
            return { ...state, products: state.products.filter((item)=> item.id!==action.payload) };
        case 'cart/CLEAR':
            return INITIAL_STATE;
        default:
            return state;
    }
}
