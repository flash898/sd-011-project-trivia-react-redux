import { SAVE_LOGIN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_ERROR } from '../actions';

const INNITIAL_STATE = {
  name: '',
  email: '',
  avatarURL: '',
  token: '',
};

function user(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_LOGIN:
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  case REQUEST_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload.token,
    };
  case REQUEST_TOKEN_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
}

export default user;
