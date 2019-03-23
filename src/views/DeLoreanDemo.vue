<script>
import DeLoreanButton from '../components/DeLoreanButton'
import DeLoreanClock from '../components/DeLoreanClock'
import promisedMethods from '../mixins/promisedMethods'
import { setImmediate, } from 'timers'

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

    timeline: [],
    uselessParam: null,
  }),

  computed: {
    logLength() { return this.timeline.length },
  },

  watch: {
    logLength() { setImmediate(_ => this.$refs.timeline.scrollLeft = this.$refs.timeline.scrollWidth) },
  },

  created() {
    window.timeline = this.timeline

    const rAF = window.requestAnimationFrame
    window.requestAnimationFrame = (...args) => {
      this.timeline.push({ char: 'p(r)', type: 'push', })
      rAF(...args)
    }
  },

  methods: {
    async clearTimeline() {
      this.timeline = []

      await this.$nextTick()  // don't include timeline rerender call in the timeline
      window.timeline = this.timeline
    },

    getColor(type) {
      switch(type) {
        case 'push': return '#9d8f8a'
        case 'task': return '#e06b2a'
        case 'flush': return '#f3c446'
        case 'microtask': return '#2766a4'
        case '$': return '#FCD1E1'
        case 'nT': return '#e16ba0ff'
        case 'rAF': return '#e6ac6fff'
        case 'timer': return '#53c6baff'
      }
    },

    pushTimer() {  this.timeline.push({ char: 'push(⏱)', type: 'timer', }) },
    pushPromise() {  this.timeline.push({ char: 'push(P)', type: 'timer', }) },

    nextTickToRaf() {
      this.$nextTick(_ => {
        ++this.destination.minute
      })
    },
  },
}
</script>

<template>
<div class="DeLorean">
  <div class="centeredYRow">
    <div ref="timeline" class="timeline">
      <!-- Need this div to force to scroll further left fsr --> <div ref="allSteps">
        <span
          v-for="({ char, type, }, idx) in timeline"
          :key="idx"
          :style="{ color: getColor(type) }"
          class="step"
        >{{ char }}</span>
      </div>
    </div>
    <DeLoreanButton @click="clearTimeline">x</DeLoreanButton>
  </div>

  <div class="dashboard">
    <DeLoreanClock v-bind="destination" ref="destination" />
    <DeLoreanClock v-bind="present" ref="present" />
    <DeLoreanClock v-bind="departed" ref="departed" />
  </div>

  <div class="controls">
    <DeLoreanButton @click="nextTickToRaf">nextTick</DeLoreanButton>
  </div>
</div>
</template>

<style lang="scss" scoped>
.DeLorean {
  background: $theme-black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .centeredYRow {
    width: 80%;
    position: absolute;
    top: 1.5rem;
  }

  .timeline {
    margin-right: 0.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid $theme-green;
    border-radius: 50px;
    height: 2rem;
    padding: 0 3%;
    overflow-x: auto;
    white-space:nowrap;
    font-size: 1rem;
    font-family: Nova;

    .step { margin-right: 0.5rem; }
  }

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
