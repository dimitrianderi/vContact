import { createStore, Store } from 'vuex';
import axios from 'axios'

export default createStore({
  state: {
    isAuth: localStorage.getItem('auth') ? localStorage.getItem('auth') : ''
  },
  getters: {
    isAuth(state: State) {
      return state.isAuth
    }
  },
  mutations: {
    toggleAuth(state: State) {
      state.isAuth = !state.isAuth
      localStorage.setItem('auth', JSON.stringify(state.isAuth))
    },
  },
  actions: {
    post(state: State, data: JSON) {
      axios.post(
        `https://vu-names-default-rtdb.firebaseio.com/users.json`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
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
