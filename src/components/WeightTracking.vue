<template>
  <div>
    <b-container fluid>
      <b-jumbotron header="Weight Tracker"
                   lead="Food is yummy">
      </b-jumbotron>
      <b-form-row>
        <b-col cols="12">
          <b-form id="newWeighingForm" inline v-on:submit.prevent="saveNewWeight">
            <label class="sr-only" for="newWeight">Weight</label>
            <b-input-group left="kg" class="mb-2 mr-sm-2 mb-sm-0">
              <b-input id="newWeight"
                       placeholder="Enter a recent weight"
                       type="number"
                       step="0.1"
                       required
                       v-model.trim="newWeighing.weight" />
            </b-input-group>
            <label class="sr-only" for="newWeighingDate">Date</label>
            <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
              <b-input id="newWeighingDate"
                       placeholder="Weighing Date"
                       type="date"
                       required
                       v-model.trim="newWeighing.date" />
            </b-input-group>
            <b-button type="submit" variant="primary">Save</b-button>
          </b-form>
        </b-col>
      </b-form-row>
    </b-container>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: 'WeightTracking',
  data () {
    return {
      newWeighing: {
        weight: null,
        date: new Date().toISOString().split('T')[0]
      }
    }
  },
  computed: Vuex.mapGetters(['weights', 'user']),
  methods: {
    saveNewWeight () {
      this.$store.commit('save_new_weight', this.newWeighing)
      this.newWeighing.weight = null
      this.newWeighing.date = new Date().toISOString().split('T')[0]
    }
  },
  watch: {
    user (newUser) {
      let weightsRef = this.$store.state.firebaseApp.database().ref(
          (newUser ? `user/${newUser.uid}/weights` : 'public/weights'))
      this.$store.dispatch('setWeightsRef', weightsRef)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col { border: 1px solid transparent; }
</style>
