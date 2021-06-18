const initialState = {
  currentOrder: {},
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_ORDER_SUCCESS': {
      return { ...state, currentOrder: action.payload };
    }
    case 'POST_ORDER_FAILED': {
      return { ...state, currentOrder: initialState.currentOrder };
    }
    case 'RESET_CURRENT_ORDER': {
      return { ...state, currentOrder: initialState.currentOrder };
    }
    default: {
      return state;
    }
  }
};

export default order;
