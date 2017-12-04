import Vue from 'vue'
import WeightTracking from '@/components/WeightTracking'

describe('WeightTracking.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(WeightTracking)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.jumbotron h1').textContent)
    .to.equal('Weight Tracker')
  })
})
