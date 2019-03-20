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

    lcdCommonSelector: '#app > div.DeLorean.content > div.dashboard > div:nth-child(1) > div > div.lcds > div.DeLoreanLabeledSlot.DeLoreanCounter.',
  }),

  computed: {
    // wonder why this only gets updated once (why not never or all the time?)
    // TODO: figure out a way to drill down via ref
    // If this works I'll be annoyed because it worked both ways on NextTickVsRaf
    // It didn't work
    destinationHour() {
      const tens = this.$refs.destination.$refs.minute.$refs.char[0].textContent
      const ones = this.$refs.destination.$refs.minute.$refs.char[1].textContent  // this has the same issue where it only updates once
      // '$refs are only populated after the component has been rendered, and they are not reactive. It is only meant as an escape hatch for direct child manipulation - you should avoid accessing $refs from within templates or computed properties.'
      // So why does it work in NextTickVsRaf? Is it working? It does seem to be changing.....
      // It doesn't work there anymore either (in methods). Agh....

      return tens + ones
    },
  },

  methods: {
    destinationMinute() {
      console.log('theoretically via refs', this.$refs.destination.$refs.minute)
      console.log('idk what this is; is it the same?', this.$refs.destination.minute)
      console.log(this.$refs.destination.$refs.minute === this.$refs.destination.minute)  // no

      console.log('char via refs', this.$refs.destination.$refs.minute.$refs.char)
      console.log('theoretically via refs', this.$refs.destination.$refs.minute.$refs.char[0].textContent)
      console.log('theoretically via refs', this.$refs.destination.$refs.minute.$refs.char[1].textContent)

      const tens = this.getTextContent(document.querySelector(`${ this.lcdCommonSelector }minute > div > div.counter > div:nth-child(1) > div.opaque`))
      const ones = this.getTextContent(document.querySelector(`${ this.lcdCommonSelector }minute > div > div.counter > div:nth-child(2) > div.opaque`))

      return tens + ones
    },

    getPresentTime() {
      console.log(this.destinationMinute() + '')
      Object.assign(this.present, {
        hour: this.destinationHour,
        minute: this.destinationMinute(),
      })
    },

    getTextContent(node) {
      return node.textContent  // this doesn't reflect what's on the page!
    },

    nextTickToRaf() {
      this.promisedNextTick(this.travel)
      .then(_ => this.promisedRequestAnimationFrame(this.getPresentTime))
      .catch(console.error)
    },

    rafToNextTick() {
      this.promisedRequestAnimationFrame(this.travel)  // fsr a separate nextTick is being triggered before $nextTick
      .then(_ => this.promisedNextTick(this.getPresentTime))  // but that happens in the other example too
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
