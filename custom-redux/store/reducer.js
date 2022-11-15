import { BUG_ADDED, BUG_DELETED, BUG_RESOLVED } from "./actionTypes";

const initialState = [];
let lastId = 0;

export default (store = initialState, action) => {
  switch (action?.type) {
    case BUG_ADDED:
      return [
        ...store,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case BUG_RESOLVED: {
      const updatedStore = store.map((bug) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );

      return updatedStore;
    }

    case BUG_DELETED: {
      const updatedStore = store.filter((bug) => bug.id !== action.payload.id);
      return updatedStore;
    }

    default:
      return store;
  }
};
