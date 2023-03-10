import { auth } from "../../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const registerStart = () => ({
  type: "REGISTER_START",
});

const registerSuccess = (user) => ({
  type: "REGISTER_SUCCESS",
  payload: user,
});

const registerFail = (error) => ({
  type: "REGISTER_FAIL",
  payload: error,
});

const loginStart = () => ({
  type: "LOGIN_START",
});

const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

const loginFail = (error) => ({
  type: "LOGIN_FAIL",
  payload: error,
});

const logoutStart = () => ({
  type: "LOGOUT_START",
});

const logoutSuccess = (user) => ({
  type: "LOGOUT_SUCCESS",
  payload: user,
});

const logoutFail = (error) => ({
  type: "LOGOUT_FAIL",
  payload: error,
});

export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const registerInitiate = (email, password, userName, phone) => {
  return function (dispatch) {
    dispatch(registerStart());
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, {
          displayName: userName,
          phoneNumber: phone,
        });
        dispatch(registerSuccess(user));
        toast("Signed up successfuly");
        console.log("added successfuly from auth");
      })
      .catch((error) => {
        dispatch(registerFail(error.message));
        // auth/internal-error
        console.log(error);
        if (error.code === "auth/invalid-email") toast("invalid-email");
        else if (error.code === "auth/email-already-in-use")
          toast("email-already-in-use");
        else toast("please check you entered all the fields and try agian!");
      });
  };
};

export const loginInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(loginStart());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user));
        console.log(user);
        toast("logged in successfully");
      })
      .catch((error) => {
        dispatch(loginFail(error.message));
        console.log(error);
        if (error.code === "auth/wrong-password") toast("wrong-password");
        else if (error.code === "auth/user-not-found") toast("user-not-found");
        else if (error.code === "auth/invalid-email") toast("invalid-email");
        else if (error.code === "auth/too-many-requests")
          toast(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
          );
        else {
          toast("something goes wrong please try again later!");
          console.log("object");
        }
      });
  };
};

export const logoutInitiate = () => {
  return function (dispatch) {
    dispatch(logoutStart());
    signOut(auth)
      .then((res) => {
        dispatch(logoutSuccess());
        toast("logged out successfully");
        console.log("logged out successfully");
      })
      .catch((error) => dispatch(logoutFail(error.message)));
  };
};
