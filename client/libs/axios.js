import axios from "axios";

import SERVICES from "./api";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9001/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const API = {};

for (const [keys, values] of Object.entries(SERVICES)) {
  API[keys] = (
    { data, headers, query, params },
    uploadProgress,
    downloadProgress
  ) => {
    return axiosInstance({
      ...(params ? { url: `${values.uri + params}` } : { url: values.uri }),
      method: values.method,
      ...(query ? { params: query } : {}),
      headers: {
        ...(headers && {
          headers,
        }),
      },
      ...(data && { data: data }),
      onUploadProgress: (progressEvent) => {
        if (uploadProgress) {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          uploadProgress(percentage);
        }
      },
      onDownloadProgress: (progressEvent) => {
        if (downloadProgress) {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log("inside axios progress is", percentage, progressEvent);
          downloadProgress(percentage);
        }
      },
    });
  };
}

export { API };
