import { 
  REQUEST_INGREDIENTS_SUCCESS,
  REQUEST_INGREDIENTS_FAILED,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  API_REQUEST_IN_PROGRESS,
  API_REQUEST_FINISHED,
  SET_CURRENT_ERROR,
} from '../../utils/constants';
import { 
  getIngredientsRequest,
  postOrderRequest,
} from '../../utils/api'


export const getIngredients = () => {
  return function(dispatch) {
    dispatch({ type: API_REQUEST_IN_PROGRESS });
    getIngredientsRequest()
      .then(res => dispatch({
        type: REQUEST_INGREDIENTS_SUCCESS,
        payload: res.data,
      })
    )
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

export const postOrder = data => {
  return function(dispatch) {
    dispatch({ type: API_REQUEST_IN_PROGRESS });
    postOrderRequest(data)
      .then(res => dispatch({
        type: POST_ORDER_SUCCESS,
        payload: res,
      }))
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
