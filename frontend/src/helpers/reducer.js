export const initialState = {
  user: "",
  modal: false,
  form: null,
  isDesktop: false
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: false,
      };
    case "OPEN_FORM":
      return {
        ...state,
        modal: true,
        form: action.form,
      };
    default:
      return state;
  }
};

export default reducer;
