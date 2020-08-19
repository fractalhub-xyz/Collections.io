export const initialState = {
  user: "",
  modal: false,
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
      };
    default:
      return state;
  }
};

export default reducer;
