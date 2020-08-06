export const CREATE_TOAST = "CREATE_TOAST";

export const createToast = (name, description) => ({
  type: CREATE_TOAST,
  payload: {
    name,
    description,
  },
});
