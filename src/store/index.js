import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAction, firebaseMutations } from 'vuexfire'

Vue.use(Vuex)

const strict = false

const state = {
  weights: [],  // will be bound as a list via VuexFire
  user: null,
  firebaseApp: null,
  firebaseUIApp: null
}

const getters = {
  user: state => state.user,
  weights: state => state.weights,
  firebaseApp: state => state.firebaseApp,
  firebaseUIApp: state => state.firebaseUIApp
}

const mutations = {
  save_new_weight (state, newWeighing) {
    store.weightsRef.push(newWeighing)
  },
  remove_weight (state, key) {
    store.weightsRef.child(key).remove()
  },
  update_weight (state, {key, newWeight}) {
    store.weightsRef.child(key).child('weight').set(newWeight)
  },
  set_user (state, user) {
    state.user = user
  },
  set_firebase_app (state, firebaseApp) {
    state.firebaseApp = firebaseApp
  },
  set_firebase_ui_app (state, firebaseUIApp) {
    state.firebaseUIApp = firebaseUIApp
  },
  ...firebaseMutations
}

const actions = {
  setWeightsRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    store.weightsRef = ref
    bindFirebaseRef('weights', ref, { wait: true })
  })
}

const store = new Vuex.Store({
  strict,
  state,
  getters,
  mutations,
  actions
})

export default store
