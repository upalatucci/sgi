import {SHOW_MODAL, HIDE_MODAL, SET_TEXT_SIZE} from './mutations';

export const possibleTextSizes = [0, 1, 2];

const initialState = {
  modalIsVisible: false,
  modalMessage: null,
  textSize: possibleTextSizes[0],
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
    case SET_TEXT_SIZE:
      const index = possibleTextSizes.findIndex((t) => t === state.textSize);
      const nextIndex = (index + 1) % possibleTextSizes.length;
      return {
        ...state,
        textSize: possibleTextSizes[nextIndex],
      };
    default:
      return state;
  }
}
