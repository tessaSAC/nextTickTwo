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

  methods: {
    destinationHour() { return this.getPresentTime('hour') },

    destinationMinute() {
      console.log('theoretically via refs', this.$refs.destination.$refs.minute)
      console.log('idk what this is; is it the same?', this.$refs.destination.minute)
      console.log(this.$refs.destination.$refs.minute === this.$refs.destination.minute)  // no

      return this.getPresentTime('minute')
    },

    getPresentTime(timeCounter) {
      const tens = (this.$refs.destination.$refs[timeCounter].$refs.char[0].textContent)
      const ones = (this.$refs.destination.$refs[timeCounter].$refs.char[1].textContent)

      return tens + ones
    },

    setPresentTime() {
      Object.assign(this.present, {
        hour: this.destinationHour(),
        minute: this.destinationMinute(),
      })
    },

    nextTickToRaf() {
      // this.promisedNextTick(this.travel)
      // .then(_ => this.promisedRequestAnimationFrame(this.setPresentTime))
      // .catch(console.error)

      this.$nextTick(_ => {
        this.travel()
        window.requestAnimationFrame(this.setPresentTime)
      })
    },

    rafToNextTick() {
      // this.promisedRequestAnimationFrame(this.travel)
      // .then(_ => this.promisedNextTick(this.setPresentTime))
      // .catch(console.error)

      window.requestAnimationFrame(_ => {
        this.travel()
        this.$nextTick(this.setPresentTime)
      })
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

  .DeLoreanButton + .DeLoreanButton { margin-left: 1vw; }
}
</style>
