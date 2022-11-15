const _state = new WeakMap();
const _listeners = new WeakMap();

class CustomStore {
  constructor(reducer) {
    _state.set(this, reducer());
    _listeners.set(this, []);

    this.dispatch = (action) => {
      const results = reducer(_state.get(this), action);
      _state.set(this, results);

      for (let i of _listeners.get(this)) i();
    };

    this.subscribe = (cb) => {
      const listeners = _listeners.get(this);
      _listeners.set(this, [...listeners, cb]);

      return () =>
        _listeners.set(
          this,
          listeners.filter((cbRemove) => cbRemove !== cb)
        );
    };
  }

  get getState() {
    return _state.get(this);
  }
}

export const createStore = (reducer) => {
  return new CustomStore(reducer);
};
