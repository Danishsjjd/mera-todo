import { createStore } from "./store/store";
import { addBug, deleteBug, resolveBug } from "./store/action";
import reducer from "./store/reducer.js";

const store = createStore(reducer);

const unsubscribe = store.subscribe(() => {
  console.log("store changed", store.getState);
});

store.dispatch(addBug({ description: "bug1" }));

store.dispatch(addBug({ description: "bug2" }));

store.dispatch(deleteBug({ id: 1 }));

unsubscribe();

store.dispatch(resolveBug({ id: 2 }));

console.log(store.getState);
