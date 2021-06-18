const initialState = {
  apiRequestInProgress: false,
};

const api = (state = initialState, action) => {
  switch (action.type) {
    case 'API_REQUEST_IN_PROGRESS': {
      return {
        ...state,
        apiRequestInProgress: true,
      };
    }
    case 'API_REQUEST_FINISHED': {
      return {
        ...state,
        apiRequestInProgress: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default api;
