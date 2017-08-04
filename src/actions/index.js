export const noneSelected = () => {
    return {
        type: 'NONE_SELECTED',
    };
};

export const selectOrder = (salesorderid) => {
    return {
        type: 'SELECTED_ORDER',
        payload: salesorderid
    }
}

export const loadOrders = () => {
    return {
        type: 'LOAD_ORDERS'
    };
}

export const updateOrder = (salesorderid) => {
    return {
        type: 'UPDATE_ORDER',
        payload: salesorderid
    }
}