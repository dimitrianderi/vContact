import { createStore, Store } from 'vuex';
import axios from 'axios'

export default createStore({
  state: {
    auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!) : null,
    message: null,
    data: [],
    contacts: localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')!) : [],
  },
  getters: {
    auth(state: State) {
      return state.auth
    },
    message(state: State) {
      return state.message
    }
  },
  mutations: {
    toggleAuth(state: State, data: Data | null = null) {
      const arr: any = data?.contacts

      if (arr) {
        const contacts = Object.keys(arr).map((key) => {
          return {
            id: key,
            ...arr[key],
          }
        })

        state.contacts = contacts
        localStorage.setItem('contacts', JSON.stringify(state.contacts))
      }

      state.auth = data
      localStorage.setItem('auth', JSON.stringify(state.auth))
    },
    setMessage(state: State, text: string) {
      state.message = text
    },

    setData(state: State, arr: Data[]) {
      state.data = arr
    },

    setNewContact(state: State, data: Contact) {
      state.contacts.push(data)
      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },

    deleteContact(state: State, id: string) {
      const indexToDelete = state.contacts.findIndex(contact => contact.id === id);
      if (indexToDelete !== -1) {
        state.contacts.splice(indexToDelete, 1);
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
      }
    },

    editContact(state: State, contact: Contact) {
      const idxOldContact = state.contacts.findIndex(old_contact => old_contact.id === contact.id);

      if (idxOldContact !== -1) {
        state.contacts[idxOldContact] = contact;
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
      }
    }

  },
  actions: {
    async post(contex, data: Data) {

      try {
        if (contex.state.data.some(obj => obj.email === data.email)) {
          throw new Error('Такой email уже зарегистрирован')
        }

        const res = await axios.post(
          `https://vu-names-default-rtdb.firebaseio.com/users.json`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const id = res.data.name
        data = { ...data, id }
        this.commit('toggleAuth', data)
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
    },

    async delete(contex, id: string) {
      const current_id_user = contex.state.auth?.id
      try {
        await axios.delete(`https://vu-names-default-rtdb.firebaseio.com/users/${current_id_user}/contacts/${id}.json`)

        this.commit('deleteContact', id)
      } catch (err: any) {
        this.commit('setMessage', "Не удалось удалить")
      }
    },

    auth(contex, dataAuth: DataAuth) {
      const user = contex.state.data.find(obj => obj.email === dataAuth.email);

      if (!user) {
        this.commit('setMessage', "Такой пользователь не зарегистрирован");
        return;
      }

      if (user.pass === dataAuth.pass) {
        this.commit('toggleAuth', user);
      } else {
        this.commit('setMessage', "Пароль не подходит");
      }
    },

    async addNewContact(contex, data: Data) {
      const current_id_user = contex.state.auth?.id
      try {
        const res = await axios.post(
          `https://vu-names-default-rtdb.firebaseio.com/users/${current_id_user}/contacts.json`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const id = res.data.name
        data = { ...data, id }
        this.commit('setNewContact', data)
      } catch (err: any) {
        this.commit('setMessage', err.message)
      }
    },

    async editContact(contex, contact: Contact) {
      const current_id_user = contex.state.auth?.id
      try {
        const res = await axios.put(
          `https://vu-names-default-rtdb.firebaseio.com/users/${current_id_user}/contacts/${contact.id}.json`,
          contact,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        this.commit('editContact', contact)
      } catch (err: any) {
        this.commit('setMessage', err.message)
      }
    }
  },
});

interface State {
  auth: Data | null;
  message: string | null;
  data: Data[],
  contacts: Contact[]
}

interface Data {
  name: string,
  email: string,
  pass: string,
  id?: string,
  contacts: Contact[]
}

export interface Contact {
  email: string,
  id: string,
  name: string,
  phone: string,
  tags: string[],
}

interface DataAuth {
  email: string,
  pass: string
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
