import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  adminGetAllUsersReq,
  adminDeleteUserReq,
  adminUpdateUserReq,
} from "../../apis/index";

export const adminGetAllUsers = createAsyncThunk(
  "user/adminGetAllUsers",
  async (arg, thunkAPI) => {
    try {
      const { data } = await adminGetAllUsersReq();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const adminDeleteUser = createAsyncThunk(
  "user/adminDeleteUser",
  async (id, thunkAPI) => {
    try {
      const { data } = await adminDeleteUserReq(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const adminUpdateUser = createAsyncThunk(
  "user/adminUpdateUser",
  async ({ id, userData }, thunkAPI) => {
    try {
      const { data } = await adminUpdateUserReq(id, userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isRegistering: false,
  registrationError: null,
  registrationSuccess: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userLoginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    },
    userLoginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },
    userRegisterRequest: (state) => {
      state.isRegistering = true;
      state.registrationError = null;
      state.registrationSuccess = false;
    },
    userRegisterSuccess: (state) => {
      state.isRegistering = false;
      state.registrationSuccess = true;
      state.registrationError = null;
    },
    userRegisterFailed: (state, action) => {
      state.isRegistering = false;
      state.registrationError = action.payload;
      state.registrationSuccess = false;
    },
    userLogout: (state) => {
      Cookies.remove("token");
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.isRegistering = false;
      state.registrationError = null;
      state.registrationSuccess = false;
    },
    userLoadRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    userLoadFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },
    userLoadSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    },
    userUpdateRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = true;
    },
    userUpdateFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    },
    userUpdateSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    },
    userUpdatePasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = true;
    },
    userUpdatePasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    },
    userUpdatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminGetAllUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminGetAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(adminGetAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(adminDeleteUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminDeleteUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(adminDeleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(adminUpdateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminUpdateUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(adminUpdateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailed,
  userRegisterFailed,
  userRegisterRequest,
  userRegisterSuccess,
  userLogout,
  userLoadRequest,
  userLoadFailed,
  userLoadSuccess,
  userUpdateRequest,
  userUpdateFailed,
  userUpdateSuccess,
  userUpdatePasswordFailed,
  userUpdatePasswordRequest,
  userUpdatePasswordSuccess,
} = userSlice.actions;

export default userSlice.reducer;
