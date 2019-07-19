interface Action {
  type: string;
  payload?: any;
}

interface Reducer<T> {
  (state: T, action: Action): T;
}
interface ListenerCallback {
  (): void;
}

interface UnsubscribeCallback {
  (): void;
}
class Store<T> {
  private _state: T;
  private _listeners: ListenerCallback[] = [];

  constructor(private reducer: Reducer<T>, initialState: T) {
    this._state = initialState;
  }

  getState(): T {
    return this._state;
  }

  dispatch(action: Action): void {
    this._state = this.reducer(this._state, action);
  }
}

let reducer: Reducer<number> = (state: number, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "PLUS":
      return state + action.payload;
    default:
      return state; // <-- dont forget!
  }
};

// create a new store
let store = new Store<number>(reducer, 0);
console.log(store.getState()); // -> 0

store.dispatch({ type: "INCREMENT" });
console.log(store.getState()); // -> 1

store.dispatch({ type: "INCREMENT" });
console.log(store.getState()); // -> 2

store.dispatch({ type: "DECREMENT" });
console.log(store.getState()); // -> 1

// let incrementAction: Action = { type: "INCREMENT" };

// console.log(reducer(0, incrementAction)); // -> 1
// console.log(reducer(1, incrementAction)); // -> 2

// let decrementAction: Action = { type: "DECREMENT" };

// console.log(reducer(100, decrementAction)); // -> 99

// let unknownAction: Action = { type: "UNKNOWN" };
// console.log(reducer(100, unknownAction)); // -> 100

// console.log(reducer(3, { type: "PLUS", payload: 7 })); // -> 10
// console.log(reducer(3, { type: "PLUS", payload: 9000 })); // -> 9003
// console.log(reducer(3, { type: "PLUS", payload: -2 })); // -> 1
