<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="danger" class="nav">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand :to="{name: 'WeightTracking'}">Weight Tracker</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{name: 'WeightTracking'}" exact>Home</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="user" right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <img :src="user.photoURL" class="profile-image" />
            </template>
            <template v-if="user">
              <b-dropdown-item class="disabled">{{ user.displayName }}</b-dropdown-item>
              <b-dropdown-item @click="signOut">Signout</b-dropdown-item>
            </template>
          </b-nav-item-dropdown>
          <b-button v-else :to="{name: 'Login'}" variant="secondary">Login</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Vuex from 'vuex'
import Firebase from 'firebase'

export default {
  name: 'AppNav',
  computed: Vuex.mapState(['user']),
  methods: {
    signOut () {
      Firebase.auth().signOut()
    }
  }
}
</script>

<style scoped>
.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.nav {
  /*margin-bottom: 30px;*/
}
</style>
