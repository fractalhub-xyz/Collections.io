import * as actions from "./actions";

const initialState = {
  toasts: [],
};

export function toastsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.CREATE_TOAST:
      const newToast = {
        name: payload.name,
        description: payload.description,
      };

      return {
        ...state,
        toasts: [...toasts, newToast],
      };
    default:
      return state;
  }
}
