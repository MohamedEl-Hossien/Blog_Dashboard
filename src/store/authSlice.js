import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.currentUser = action.payload.currentUser;
    },
    clearUser(state) {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export const initAuthListener = () =>
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const currentUser = {
        uid: user.uid,
        email: user.email,
      };
      const token = await user.getIdToken();
      localStorage.setItem("firebaseToken", token);
      store.dispatch(
        authActions.setUser({ currentUser, isAuthenticated: true })
      );
    } else {
      localStorage.removeItem("firebaseToken");
      store.dispatch(authActions.clearUser());
    }
    store.dispatch(authActions.setLoading(false));
  });

export default store;
