<script>
import DeLoreanButton from '../components/DeLoreanButton'
import DeLoreanClock from '../components/DeLoreanClock'
import promisedMethods from '../mixins/promisedMethods'

export default {
  components: { DeLoreanButton, DeLoreanClock, },

  mixins: [ promisedMethods, ],

  data: _ => ({
    destination: {
      month: 'Oct',
      day: 26,
      year: 1985,
      hour: 1,
      minute: 21,
      labelText: 'destination time',
    },

    present: {
      month: 'Oct',
      day: 26,
      year: 1985,
      hour: 1,
      minute: 20,
      textColor: '#67fd48',
      ledColor: 'green',
      labelText: 'present time',
    },

    departed: {
      month: 'Oct',
      day: 26,
      year: 1985,
      hour: 1,
      minute: 20,
      textColor: '#f8ef4f',
      labelText: 'time last departed',
    },
  }),

  computed: {
  },

  methods: {
    destinationHour() {
      const tens = this.getInnerHtml(document.querySelector('#app > div.DeLorean.content > div.dashboard > div:nth-child(1) > div > div.lcds > div.DeLoreanLabeledSlot.DeLoreanCounter.hour > div > div.counter > div:nth-child(1) > div.opaque'))
      const ones = this.getInnerHtml(document.querySelector('#app > div.DeLorean.content > div.dashboard > div:nth-child(1) > div > div.lcds > div.DeLoreanLabeledSlot.DeLoreanCounter.hour > div > div.counter > div:nth-child(2) > div.opaque'))

      return tens + ones
    },

    destinationMinute() {
      const tens = this.getInnerHtml(document.querySelector('#app > div.DeLorean.content > div.dashboard > div:nth-child(1) > div > div.lcds > div.DeLoreanLabeledSlot.DeLoreanCounter.minute > div > div.counter > div:nth-child(1) > div.opaque'))
      const ones = this.getInnerHtml(document.querySelector('#app > div.DeLorean.content > div.dashboard > div:nth-child(1) > div > div.lcds > div.DeLoreanLabeledSlot.DeLoreanCounter.minute > div > div.counter > div:nth-child(2) > div.opaque'))

      return tens + ones
    },

    getPresentTime() {
      Object.assign(this.present, {
        hour: this.destinationHour(),
        minute: this.destinationMinute(),
      })
    },

    getInnerHtml(node) {
      return node.innerHTML
    },

    nextTickToRaf() {
      this.promisedNextTick(this.travel)
      .then(_ => this.promisedRequestAnimationFrame(this.getPresentTime))
      .catch(console.error)
    },

    rafToNextTick() {
      this.promisedRequestAnimationFrame(this.travel)
      .then(_ => this.promisedNextTick(this.getPresentTime))
      .catch(console.error)
    },

    travel() { ++this.destination.minute },
  },
}
</script>

<template>
<div class="DeLorean">
  <div class="dashboard">
    <DeLoreanClock v-bind="destination" ref="destination" />
    <DeLoreanClock v-bind="present" ref="present" />
    <DeLoreanClock v-bind="departed" ref="departed" />
  </div>

  <div class="controls">
    <DeLoreanButton @click="nextTickToRaf">nextTick</DeLoreanButton>
    <DeLoreanButton @click="rafToNextTick">rAF</DeLoreanButton>
  </div>
</div>
</template>

<style lang="scss" scoped>
.DeLorean {
  background: #100c0b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .dashboard {
    margin-bottom: 1rem;
    width: 70vw;
  }

  .DeLoreanClock {
    filter: drop-shadow(0 0.5rem 0.3rem #000);

    + .DeLoreanClock {
      margin-top: 0.2rem;
    }
  }
}
</style>
