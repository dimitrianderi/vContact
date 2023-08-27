import { createStore, Store } from 'vuex';

export default createStore({
  state: {
    isAuth: true
  },
  getters: {
    isAuth (state: State) {
      return state.isAuth
    }
  },
  mutations: {
    toggleAuth (state: State) {
      state.isAuth = !state.isAuth
    }
  }
});

export interface State {
  isAuth: boolean;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
