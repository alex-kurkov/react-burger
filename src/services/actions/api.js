import { 
  API_URL,
  REQUEST_INGREDIENTS_SUCCESS,
  REQUEST_INGREDIENTS_FAILED

} from '../../utils/constants';

export const getIngredients = () => {
  return function(dispatch) {
    fetch(`${API_URL}/ingredients`, {})
      .then(res => res.json())
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: REQUEST_INGREDIENTS_SUCCESS,
            payload: res.data,
          });
      } else {
        dispatch({
          type: REQUEST_INGREDIENTS_FAILED,
          payload: 'что-то пошло не так при запросе на сервер'
        });
      }
    })
    .catch(e => dispatch({
      type: REQUEST_INGREDIENTS_FAILED,
      payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
    }))
  };
}