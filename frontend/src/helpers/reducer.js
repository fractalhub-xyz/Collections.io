export const initialState = {
  user: "",
  modal: false,
  form: null,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        modal: action.modal,
        form: action.form,
      };
    default:
      return state;
  }
};

export default reducer;
