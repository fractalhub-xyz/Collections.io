export const initialState = {
  user: "",
  modal: false,
  form: null,
  page: null,
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
    case "SET_PAGE":
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
};

export default reducer;
