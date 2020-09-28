export const initialState = {
  user: "",
  modal: false,
  form: null,
  isDesktop: true,
  id: null,
  refreshSnippets: true
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
    case "REFRESH_SNIPPETS":
      return {
        ...state,
        refreshSnippets: action.refresh,
      };
    case "OPEN_FORM":
      return {
        ...state,
        modal: true,
        form: action.form,
        id: action.id
      };
    default:
      return state;
  }
};

export default reducer;
