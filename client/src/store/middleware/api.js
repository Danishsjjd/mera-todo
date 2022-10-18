import { createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { API } from "../../../libs/axios";

export const apiCallBegan = createAction("api/callBegan");

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);

    const {
      apiCall,
      data,
      headers,
      onStart,
      onError,
      onSuccess,
      onUploadProgress,
      onDownloadProgress,
      params,
      query,
      showError,
      funcs,
      funcsFailure,
    } = action.payload;

    if (onStart) dispatch({ type: onStart, payload: data });
    next(action);

    try {
      const response = await API[apiCall](
        {
          data,
          params,
          query,
          headers,
        },
        onUploadProgress,
        onDownloadProgress
      );

      if (onSuccess)
        dispatch({
          type: onSuccess,
          payload: { data, response: response.data },
        });
      if (funcs)
        funcs.forEach((func) => func({ data, response: response.data }));
    } catch (e) {
      const error = e?.response?.data?.message || e.message;
      if (onError) dispatch({ type: onError, payload: { data, error } });
      if (showError) toast.error(error);
      if (funcsFailure) funcsFailure.forEach((func) => func({ data, error }));
    }
  };

export default api;
