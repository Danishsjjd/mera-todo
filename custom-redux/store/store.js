class CustomStore {
  #state
  #listeners

  constructor(reducer) {
    this.#state = reducer()
    this.#listeners = []

    this.dispatch = (action) => {
      const results = reducer(this.#state, action);
      this.#state = results

      for (let i of this.#listeners) i();
    };

    this.subscribe = (cb) => {
      this.#listeners = [...this.#listeners, cb]

      return () =>
        this.#listeners = this.#listeners.filter((cbRemove) => cbRemove !== cb)

    };
  }

  get getState() {
    return this.#state
  }
}

export const createStore = (reducer) => {
  const store = new CustomStore(reducer);
  return store
};
