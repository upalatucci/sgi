import {SHOW_MODAL, HIDE_MODAL} from './mutations';

const initialState = {
  modalIsVisible: false,
  modalMessage: null,
};

export default function (state = initialState, {type, payload}) {
  switch (type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalIsVisible: true,
        modalMessage: payload,
      };
    case HIDE_MODAL:
      return {
        ...state,
        modalIsVisible: false,
        modalMessage: null,
      };
    default:
      return state;
  }
}
