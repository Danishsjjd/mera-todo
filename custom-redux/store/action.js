import * as actionType from "./actionTypes";

export const addBug = (payload) => ({
  type: actionType.BUG_ADDED,
  payload,
});
export const deleteBug = (payload) => ({
  type: actionType.BUG_DELETED,
  payload,
});
export const resolveBug = (payload) => ({
  type: actionType.BUG_RESOLVED,
  payload,
});
