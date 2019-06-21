<script>
import DeLoreanButton from "../components/DeLoreanButton";
import DeLoreanClock from "../components/DeLoreanClock";
import promisedMethods from "../mixins/promisedMethods";
import timelineMethods from "../mixins/timelineMethods";
import { setImmediate } from "timers";

export default {
  components: { DeLoreanButton, DeLoreanClock },

  mixins: [promisedMethods, timelineMethods],

  data: _ => ({
    legend: [
      { label: "[ ]", type: "task" },
      { label: "{ }", type: "flushQueue" },
      { label: "( )", type: "microtask" }
    ],

    destination: {
      month: "Oct",
      day: 26,
      year: 1985,
      hour: 1,
      minute: 21,
      labelText: "destination time"
    },

    present: {
      month: "Oct",
      day: 26,
      year: 1985,
      hour: 1,
      minute: 20,
      textColor: "#67fd48",
      ledColor: "green",
      labelText: "present time"
    },

    departed: {
      month: "Oct",
      day: 26,
      year: 1985,
      hour: 1,
      minute: 15,
      textColor: "#f8ef4f",
      labelText: "time last departed"
    },

    uselessParam: null
  }),

  computed: {
    logLength() {
      return this.timeline.length;
    }
  },

  watch: {
    logLength() {
      setImmediate(
        _ => (this.$refs.timeline.scrollLeft = this.$refs.timeline.scrollWidth)
      );
    }
  },

  created() {
    // const rAF = window.requestAnimationFrame
    // window.requestAnimationFrame = (...args) => {
    //   this.timeline.push({ char: 'p(r)', type: 'push', })
    //   rAF(...args)
    // }

    // TODO: Move to mixin
    const sI = setImmediate;
    // setImmediate = args => {
    //   console.log('setImmediate')
    //   sI(args)
    // }
  },

  methods: {
    async clearTimeline() {
      this.timeline = [{ queue: "task", steps: [] }];

      await this.$nextTick(); // don't include timeline rerender call in the timeline
      window.timeline = this.timeline;
    },

    getColor(type) {
      switch (type) {
        case "push":
          return "#9d8f8a";
        case "task":
          return "#e06b2a";
        case "flushQueue":
          return "#f3c446";
        case "microtask":
          return "#2766a4";
        case "promise":
          return "#ba7bccff";
        case "$":
          return "#FCD1E1";
        case "nT":
          return "#e16ba0ff";
        case "rAF":
          return "#e6ac6fff";
        case "timer":
          return "#53c6baff";
      }
    },

    pushTimer() {
      this.timeline.push({ char: "push(⏱)", type: "push" });
    },
    pushPromise() {
      this.timeline.push({ char: "push(P)", type: "push" });
    },

    destinationHour() {
      return this.getPresentTime("hour");
    },
    destinationMinute() {
      return this.getPresentTime("minute");
    },

    getPresentTime(timeCounter) {
      const tens = this.$refs.destination.$refs[timeCounter].$refs.char[0]
        .textContent;
      const ones = this.$refs.destination.$refs[timeCounter].$refs.char[1]
        .textContent;

      return tens + ones;
    },

    // setImmediate(fn) {
    //   console.log('pushing setImmediate')

    //   const func = function(...args) {
    //     console.log('sI()')
    //     fn(...args)
    //   }
    //   setImmediate(func)
    // },

    setDestinationTime({ hour, minute } = {}) {
      console.log("set dest time");
      if (hour) this.destination.hour = hour;
      if (minute) this.destination.minute = minute;
      else ++this.destination.minute;
    },

    travel() {
      console.log("calling travel");
      // Set Last Departed time
      const { hour, minute } = this.present;
      Object.assign(this.departed, { hour, minute });

      // Set Present time
      Object.assign(this.present, {
        hour: this.destinationHour(),
        minute: this.destinationMinute()
      });
    },

    setImmediate(...args) {
      console.log("running setImmediate");
      return setImmediate(...args);
    },

    floorIt() {
      if (!this.hasOpenTaskQueue)
        this.timeline.push({ queue: "task", steps: [] });
      this.twoInARow();
    },

    // two in a row
    twoInARow() {
      this.$nextTick(this.setDestinationTime);
      this.$nextTick(this.travel);
    }

    // consecutive $nextTick
    // floorIt() {
    //   this.promisedNextTick(this.setDestinationTime)
    //   .then(_ => this.$nextTick(this.travel))
    // },

    // nested $nextTick
    // floorIt() {
    //   this.$nextTick(_ => {
    //     this.setDestinationTime()
    //     this.$nextTick(this.travel)
    //   })
    // },

    // $nextTick and rAF
    // floorIt() {
    //   this.$nextTick(_ => {
    //     this.setDestinationTime()
    //     window.requestAnimationFrame(this.travel)
    //   })
    // },

    // $nextTick and setImmediate
    // floorIt() {
    //   this.$nextTick(_ => {
    //     this.setDestinationTime()
    //     this.setImmediate(this.travel)
    //   })
    // },

    // Promised requestAnimationFrame doesn't work
    // floorIt() {
    //   this.promisedRequestAnimationFrame(this.setDestinationTime)
    //   .then(this.travel)
    // },

    // promisedRequestAnimationFrame(cb) {
    //   return new Promise(resolve => window.requestAnimationFrame(_ => {
    //     cb()
    //     resolve()
    //   }))
    // },

    // This works but at that point might as well just use rAF
    // floorIt() {
    //   this.$nextTick(_ => {
    //     this.setDestinationTime()

    //     window.requestAnimationFrame(_ => window.requestAnimationFrame(this.travel))
    //   })
    // },

    // Works
    // floorIt() {
    //   window.requestAnimationFrame(_ => {
    //     this.setDestinationTime()
    //     window.requestAnimationFrame(this.travel)
    //   })
    // },

    // fs

    // floorIt() {  // order
    //   this.$nextTick(_ => {  // 1

    //     setTimeout(  // 2
    //       this.setDestinationTime, (0))  // 15

    //     setImmediate(_ => {  // 3
    //       this.$nextTick(  // 13
    //         this.travel  // 14
    //       )
    //     })

    //     this.$nextTick(_ => {  // 4
    //       this.$nextTick(  // 8
    //         this.travel  // 11
    //       )
    //     })

    //     setTimeout(_ => {  // 5
    //       this.$nextTick(this.travel)  // 16
    //     })

    //     this.$nextTick(_ => {  // 6
    //       Promise.resolve()  // 9
    //       .then(this.setDestinationTime)  // 12
    //     })

    //     Promise.resolve(2)  // 7
    //     .then(this.setDestinationTime)  // 10
    //   })
    // },
  }
};
</script>

<template>
  <div class="DeLorean">
    <div class="centeredYRow">
      <div ref="timeline" class="timeline">
        <!-- Need this div to force to scroll further left fsr -->
        <div ref="allSteps">
          <span
            v-for="({ queue, steps, }, idx) in timeline"
            :key="idx"
            :style="{ color: getColor(queue) }"
            class="step"
          >
            {{ queue === 'task' ? '[' : queue === 'flushQueue' ? '{' : '(' }}
            <span
              v-for="({ char, type, }, idx) in steps"
              :key="idx"
              :style="{ color: getColor(type) }"
              class="step"
            >{{ char }}</span>
            {{ queue === 'task' ? ']' : queue === 'flushQueue' ? '}' : ')' }}
          </span>
        </div>
      </div>
      <DeLoreanButton @click="clearTimeline">x</DeLoreanButton>
    </div>

    <div class="legend">
      <span>key:</span>
      <span
        v-for="{ label, type } in legend"
        :key="label"
        :style="{ color: getColor(type) }"
      >{{ `${ type }: ${ label }` }}</span>
    </div>

    <div class="dashboard">
      <DeLoreanClock v-bind="destination" ref="destination"/>
      <DeLoreanClock v-bind="present" ref="present"/>
      <DeLoreanClock v-bind="departed" ref="departed"/>
    </div>

    <DeLoreanButton @click="floorIt">88 mph</DeLoreanButton>
  </div>
</template>

<style lang="scss" scoped>
.DeLorean {
  background: $theme-black;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  justify-content: space-evenly; // for when timeline is visible

  .centeredYRow {
    width: 80%;
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
    white-space: nowrap;
    font-size: 1rem;
    font-family: Nova;

    .step:not(:last-child) {
      margin-right: 0.5rem;
    }
  }

  .dashboard {
    // margin-bottom: 1rem;  // remove when timeline is visible
    width: 70vw;
  }

  .DeLoreanClock {
    filter: drop-shadow(0 0.5rem 0.3rem #000);

    + .DeLoreanClock {
      margin-top: 0.2rem;
    }
  }

  .DeLoreanButton + .DeLoreanButton {
    margin-left: 1vw;
  }

  .legend {
    color: #fff;
    :not(:last-child) {
      margin-right: 1rem;
    }
  }
}
</style>
