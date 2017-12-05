<script>
import { Line, mixins } from 'vue-chartjs'
// import { Bar } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options)
  }
}

    // this.renderChart({
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //   datasets: [
    //     {
    //       label: 'GitHub Commits',
    //       backgroundColor: '#f87979',
    //       data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    //     }
    //   ]
    // })

// export default Line.extend({
//   mixins: [mixins.reactiveProp],
//   props: ['chartData', 'options'],
//   mounted () {
//     // Overwriting base render method with actual data.
//     this.renderChart(this.chartData, this.options)
//   }
// })
</script>
