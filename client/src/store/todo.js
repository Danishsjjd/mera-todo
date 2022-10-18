import { createSlice } from "@reduxjs/toolkit";
// createSelector
import { apiCallBegan } from "./middleware/api";

const initialState = {
  fetchLoading: true,
  todo: [],
  modifyLoading: false,
  addLoading: false,
};

const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // loading
    addRequestBegin: (state) => {
      state.addLoading = true;
    },
    addRequestFailed: (state) => {
      state.addLoading = false;
    },
    fetchRequestFailed: (state) => {
      state.fetchLoading = false;
    },
    requestTodoModify: (state) => {
      state.modifyLoading = true;
    },
    FailedTodoModify: (state) => {
      state.modifyLoading = false;
    },
    // initial
    setTodo: (state, action) => {
      state.fetchLoading = false;
      state.todo = action.payload.response;
    },
    // events
    todoAdded: (state, action) => {
      state.addLoading = false;
      state.todo.push(action.payload.response);
    },
    todoDeleted: (state, action) => {
      state.modifyLoading = false;
      const _id = action.payload.data._id;
      const newState = state.todo.filter(
        (singleTodo) => singleTodo._id !== _id
      );
      state.todo = newState;
    },
    todoUpdated: (state, action) => {
      state.modifyLoading = false;
      const updatedTodo = action.payload.data;
      state.todo = state.todo.map((singleTodo) => {
        if (singleTodo._id === updatedTodo._id) {
          return updatedTodo;
        }
        return singleTodo;
      });
    },
  },
});

// actions
const {
  fetchRequestFailed,
  requestTodoModify,
  setTodo,
  todoAdded,
  todoDeleted,
  todoUpdated,
  FailedTodoModify,
  addRequestBegin,
  addRequestFailed,
} = todo.actions;

// commands || api calls
export const addTodo = (data, funcs, onUpload, onDownloadProgress) =>
  apiCallBegan({
    apiCall: "addTodo",
    onSuccess: todoAdded.type,
    onStart: addRequestBegin.type,
    onError: addRequestFailed.type,
    data,
    showError: true,
    funcs,
    onUploadProgress: onUpload,
    onDownloadProgress,
  });

export const deleteTodo = (data, funcs) =>
  apiCallBegan({
    apiCall: "deleteTodo",
    onStart: requestTodoModify.type,
    onSuccess: todoDeleted.type,
    onError: FailedTodoModify.type,
    showError: true,
    data,
    funcs,
    funcsFailure: funcs,
  });

export const updateTodo = (data, funcs) =>
  apiCallBegan({
    apiCall: "updateTodo",
    onStart: requestTodoModify.type,
    onSuccess: todoUpdated.type,
    onError: FailedTodoModify.type,
    showError: true,
    data,
    funcs,
    funcsFailure: funcs,
  });

export const getTodo = (onUpload, onDownloadProgress) =>
  apiCallBegan({
    apiCall: "getTodo",
    onSuccess: setTodo.type,
    onError: fetchRequestFailed.type,
    showError: true,
    onUploadProgress: onUpload,
    onDownloadProgress,
  });

export default todo.reducer;
