import { 
  API_URL,
  REQUEST_INGREDIENTS_SUCCESS,
  REQUEST_INGREDIENTS_FAILED,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  API_REQUEST_IN_PROGRESS,
  API_REQUEST_FINISHED,
  SET_CURRENT_ERROR
} from '../../utils/constants';

export const getIngredients = () => {
  return function(dispatch) {
    dispatch({ type: API_REQUEST_IN_PROGRESS });
    fetch(`${API_URL}/ingredients`, {})
      .then(res => res.json())
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: REQUEST_INGREDIENTS_SUCCESS,
            payload: res.data,
          });
      } else {
        dispatch({ type: REQUEST_INGREDIENTS_FAILED });
        dispatch({
          type: SET_CURRENT_ERROR,
          payload: 'что-то пошло не так при запросе на сервер'
        });
      }
    })
    .catch(e => {
      dispatch({ type: REQUEST_INGREDIENTS_FAILED })
      dispatch({
        type: SET_CURRENT_ERROR,
        payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
      });
    })
    .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
  };
}
export const postOrder = (data) => {
  return function(dispatch) {
    dispatch({ type: API_REQUEST_IN_PROGRESS });
    fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          payload: res,
        });
      } else {
        dispatch({ type: POST_ORDER_FAILED });
        dispatch({
          type: SET_CURRENT_ERROR,
          payload: 'что-то пошло не так при запросе на сервер'
        });
      }
    })
    .catch(e => {
      dispatch({ type: POST_ORDER_FAILED })
      dispatch({
        type: SET_CURRENT_ERROR,
        payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
      });
    })
    .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
  };
}