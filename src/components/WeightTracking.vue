<template>
  <div>
    <b-container fluid>
      <b-jumbotron header="Weight Tracker"
                   lead="Food is yummy">
      </b-jumbotron>

      <!-- Add new weight form -->
      <b-form-row v-if="show">
        <b-col cols="12">
          <b-form id="newWeighingForm"
                  inline
                  @submit.prevent="saveNewWeight"
                  @reset.prevent="resetNewWeight">
            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
              <b-input plaintext style="font-weight: bold;"
                       value="Add New Weight:" />
            </b-input-group>
            <label class="sr-only" for="newWeight">Add new weight</label>
            <b-input-group left="kg" class="mb-2 mr-sm-2 mb-sm-0">
              <b-input id="newWeight"
                       placeholder="Enter a recent weight"
                       type="number"
                       step="0.1"
                       required
                       v-model.trim="newWeighing.weight" />
            </b-input-group>
            <label class="sr-only" for="newWeighingDate">Weighing date</label>
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

      <b-row v-if="weights.length > 0">
        <b-col xs="3" lg="6" xl="8">
          <Chart :chartData="chartData" :options="chartOptions" />
        </b-col>
        <b-col cols="1">
        </b-col>
        <b-col xs="8" lg="6" xl="3">
          <!-- Edit existing weights form -->
          <b-container fluid>
            <b-form-row v-for="item in sorted_weights"
                        :key="item['.key']">
              <b-col>
                <b-input plaintext
                         :value="`On ${item.date}:`" />
              </b-col>
              <b-col>
                <label :for="`weight${item['.key']}`" class="sr-only">
                  Weight on {{ item.date }}
                </label>
                <b-input-group right="kg" class="mb-2 mr-sm-2 mb-sm-0">
                  <b-input :id="`weight${item['.key']}`"
                           type="number"
                           step="0.1"
                           required
                           @change="updateWeight(item['.key'])"
                           :value="item.weight" />
                </b-input-group>
              </b-col>
              <b-col cols="1">
                <b-button @click="removeWeight(item['.key'])"
                          variant="outline-secondary"
                          class="delete-button"
                          size="sm">&#10006;</b-button>
              </b-col>
            </b-form-row>
          </b-container>
        </b-col>
      </b-row>
      <b-row v-if="weights.length == 0 && user && user.displayName">
        <b-col>
          <p class="no-data-msg">No weights data for {{ user.displayName }}</p>
        </b-col>
      </b-row>
      <b-row v-if="weights.length == 0 && (!user || !user.displayName)">
        <b-col>
          <p class="no-data-msg">No weights data for anonymous user</p>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
import Vuex from 'vuex'
import Chart from '@/components/Chart'

export default {
  name: 'WeightTracking',
  components: {
    Chart
  },
  data () {
    return {
      show: false,
      newWeighing: {
        weight: null,
        date: null
      }
    }
  },
  computed: {
    sorted_weights () {
      return this.weights.sort((a, b) => {
        let keyA = new Date(a.date)
        let keyB = new Date(b.date)
        return (keyA < keyB ? -1 : (keyA > keyB ? 1 : 0))
      })
    },
    chartOptions () {
      return {
        scales: {
          xAxes: [{
            type: 'time',
            unit: 'day',
            unitStepSize: 1,
            time: {
              unit: 'day'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    },
    chartData () {
      let datesArray = []
      let weightsArray = []
      let weights = this.sorted_weights
      for (let key in weights) {
        datesArray.push(new Date(weights[key].date))
        weightsArray.push(weights[key].weight)
      }
      return {
        labels: datesArray,
        datasets: [
          {
            label: 'Weights',
            backgroundColor: '#f87979',
            data: weightsArray,
            fill: false,
            borderWidth: 3,
            borderColor: '#f87979'
          }
        ]
      }
    },
    ...Vuex.mapGetters(['weights', 'user'])
  },
  methods: {
    saveNewWeight () {
      this.$store.commit('save_new_weight', this.newWeighing)
      this.resetNewWeight()
    },
    resetNewWeight () {
      this.newWeighing.weight = null
      this.newWeighing.date = new Date().toISOString().split('T')[0]
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => { this.show = true })
    },
    updateWeight (key) {
      let field = document.getElementById(`weight${key}`)
      this.$store.commit('update_weight', {key, newWeight: field.value})
    },
    removeWeight (key) {
      this.$store.commit('remove_weight', key)
    }
  },
  watch: {
    user (newUser) {
      let weightsRef = this.$store.state.firebaseApp.database().ref(
          (newUser ? `user/${newUser.uid}/weights` : 'public/weights'))
      this.$store.dispatch('setWeightsRef', weightsRef)
    }
  },
  created () {
    this.resetNewWeight()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col {
  border: 1px solid transparent;
}
.delete-button {
  font-size: 1.2rem;
  border-radius: 70%;
  margin-top: 2px;
  border: hidden;
}
.no-data-msg {
  margin: 30px;
}
</style>
