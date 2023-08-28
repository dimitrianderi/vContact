import { createStore, Store } from 'vuex';
import axios from 'axios'

export default createStore({
  state: {
    isAuth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!) : null,
    message: null,
    data: [],
  },
  getters: {
    isAuth(state: State) {
      return state.isAuth
    },
    message(state: State) {
      return state.message
    }
  },
  mutations: {
    toggleAuth(state: State, name: string | null = null) {
      state.isAuth = name
      localStorage.setItem('auth', JSON.stringify(state.isAuth))
    },
    setMessage(state: State, text: string) {
      state.message = text
    },

    setData(state: State, arr: Data[]) {
      state.data = arr
      console.log(arr)
    }
  },
  actions: {
    async post(contex, data: Data) {

      try {
        if (contex.state.data.some(obj => obj.email === data.email)) {
          throw new Error('Такой email уже зарегистрирован')
        }

        await axios.post(
          `https://vu-names-default-rtdb.firebaseio.com/users.json`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        this.commit('toggleAuth', data.name)
      } catch (err: any) {
        this.commit('setMessage', err.message)
      }
    },

    async get() {
      try {
        const res = (await axios.get(`https://vu-names-default-rtdb.firebaseio.com/users.json`)).data

        const data = Object.keys(res).map((key) => {
          return {
            id: key,
            ...res[key],
          }
        })

        this.commit('setData', data)
      } catch (err: any) {
        this.commit('setMessage', "Не удалось загрузить данные")
      }
    }
  },
});

interface State {
  isAuth: string | null;
  message: string | null;
  data: Data[]
}

interface Data {
  name: string,
  email: string,
  pass: string
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
