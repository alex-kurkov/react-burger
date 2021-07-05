import { finishRequest, startRequest } from '../reducers/api/apiSlice'
import { setCurrentOrder } from '../reducers/cart/cartSlice'
import { setCurrentError, setIngredients } from '../reducers/content/contentSlice'
import { clearForms } from '../reducers/form/formSlice'
import { confirmPasswordResetReducer, resetPasswordReducer, setUser, signout } from '../reducers/user/userSlice'
import { confirmPasswordReset } from './auth'
import { wsInit, wsAuthInit, wsSendAuthMessage, wsSendMessage } from './ws'

export type TApplicationActions = typeof wsInit 
  | typeof wsAuthInit 
  | typeof wsSendAuthMessage 
  | typeof wsSendMessage
  | typeof startRequest
  | typeof finishRequest
  | typeof setCurrentError
  | typeof setIngredients
  | typeof resetPasswordReducer
  | typeof confirmPasswordReset
  | typeof confirmPasswordResetReducer
  | typeof setUser
  | typeof signout
  | typeof clearForms
  | typeof setCurrentOrder