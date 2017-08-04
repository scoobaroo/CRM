const initialState = {
    salesorders: [],
    salesorderdetail: {
      quantity: 0,
      priceperunit: 0,
      amount: 0,
      salesorderdetailid: '',
      salesorderid: '',
      product: '',
      devicespa: ''
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_ORDERS':
            return {
                ...state,
                salesorders: action.payload,
            }
        case 'SELECTED_ORDER':
            return {
                ...state,
                orderSelected: action.payload
            }
        case 'UPDATE_ORDER':
            return {
                ...state,
                orderSelected: action.payload
            }
        case 'NONE_SELECTED':
            return {
                ...state
            }
        default:
            return state;
    }
}
