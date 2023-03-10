const initialState = {
  loading: false,
  currentUser: null,
  error: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_START":
    case "LOGIN_START":
    case "LOGOUT_START":
      return {
        ...state,
        loading: true,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        currentUser: null,
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "LOGOUT_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "SET_USER":
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
