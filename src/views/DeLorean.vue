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

    uselessParam: null,
  }),

  methods: {
    changeNonRenderedData() {
      console.log('nonDep func running')
      // this.promisedNextTick(_ => this.uselessParam = 'geiss')  // flushes queue but doesn't trigger DOM patch
      // .then(_ => {
      //   console.log('finsished nextTick phase')

        window.requestAnimationFrame(_ => this.uselessParam = null)  // this also doesn't trigger DOM patch
      // })
      console.log('nonDep func end')
    },

    destinationHour() { return this.getPresentTime('hour') },

    destinationMinute() { return this.getPresentTime('minute') },

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

    setImmediate(...args) {
      console.log('running setImmediate')
      return setImmediate(...args)
    },

    setTimeout(cb, timeout) {
      console.log('running settimeout')
      return setTimeout(cb, timeout)
    },

    prom() {
      console.log('running promise')
      return Promise.resolve().then(console.log('resolved promise'))
    },

    interceptQueue() {
      // Because behavior is different when not deeply nested as in rafToNextTick
      this.$nextTick(_ => {
        console.log('interceptQueue: running $nextTick')  // flush 01
        this.setImmediate(_ => { console.log('this.$nextTick(setImmediate)') }, (0))  // after final flush

        this.setImmediate(this.$nextTick(_ => console.log('this.$nextTick(setImmediate(this.$nextTick))')))  // flush 02
        this.setTimeout(_ => console.log('in setTimeout'), 0)  // after final flush

        this.$nextTick(_ => console.log('INNER $NEXTTICK'))  // flush 02
        this.$nextTick(_ => this.prom().then(_ => console.log('nested this.$nextTick => Promise.then')))  // after final flush?
        this.$nextTick(_ => this.$nextTick(this.$nextTick))  // let's see...

        this.prom().then(_ => console.log('Promise.then'))  // after final flush before prev. line maybe bc it gets into microtask queue one step faster?
      })

      this.setImmediate(_ => { console.log('in setImmediate') }, (0))  // after final
      this.setImmediate(this.$nextTick(_ => console.log('setImmediate(this.$nextTick)')))  // INSIDE flush 01?!??

      // CONCLUSIONS:
      // 1. timers run after flushes 👌
      // 2. nextTick runs during flushes
      //    output goes... (task) ? after flushes : in next flush
      // 3. promise inside flushQueue is treated as a t̶a̶s̶k̶(̶!̶?̶)̶ normal non-nextTick microtask
      // 4. nextTick called by timer runs BEFOR timer(!?)
    },

    nextTickToRaf() {
      // Synchronous nextTicks
      // this.promisedNextTick(this.travel)
      // .then(_ => this.promisedRequestAnimationFrame(this.setPresentTime))
      // .catch(console.error)

      // Asynchronous nextTicks
      // this.$nextTick(_ => {
      //   this.travel()
      //   window.requestAnimationFrame(this.setPresentTime)
      // })

      // Trying to make it into the same queue flush phase
      this.$nextTick(_ => {
        this.$nextTick(_ => {
          console.log('nextTickToRaf 01: did I make it into the same queue?')

          this.$nextTick(_ => {
            console.log('nextTickToRaf 02: how about me?')
            this.travel()
            console.log('nextTickToRaf 03: and me')
            window.requestAnimationFrame(this.setPresentTime)
            console.log('nextTickToRaf 04: and me')
          })
        })
      })
    },

    rafToNextTick() {
      // Synchronous rAFs
      // this.promisedRequestAnimationFrame(this.travel)
      // .then(_ => this.promisedNextTick(this.setPresentTime))
      // .catch(console.error)

      // Asynchronous rAFs
      // window.requestAnimationFrame(_ => {
      //   this.travel()
      //   this.$nextTick(this.setPresentTime)
      // })


      // Trying to make it into the same queue flush phase
      window.requestAnimationFrame(_ => {
        window.requestAnimationFrame(_ => {
          console.log('rafToNextTick 01: did I make it into the same queue?')  // these all run right away

          window.requestAnimationFrame(_ => {
            console.log('rafToNextTick 02: how about me?')
            this.travel()  // unsurprisingly (and obviously in retrospect 😑) since the console.logs are showing right away function calls inside the callback run too, i.e. *** the callback runs immediately *** meaning NEXTTICK GETS PUSHED at the end of the function (task end(???))

            // new theory: nextTick only gets pushed if dep value is changed (should be true since console.log doesn't cause this?)
            // => YES
            this.changeNonRenderedData()

            console.log('rafToNextTick 03: and me')
            this.$nextTick(this.setPresentTime)
            console.log('rafToNextTick 04: and me')  // these all print as the cbs get pushed

            // theory: this one will print inside the first flushQueue call:
            // => YES
            this.$nextTick(_ => console.log('rafToNextTick 05: inside $nextTick'))

            this.$nextTick(_ => {
              console.log('rafToNextTick 06: inside $nextTick before timeout')
              setImmediate(_ => { console.log('in timeout') }, (0))  // whether long or short, setImmediate or setTimeout, as a task it doesn't make it into the current queue
              setImmediate(this.$nextTick(_ => console.log('go in current queue?')))  // what if I schedule a microtask?
              // This goes into the next queue

              // If I nest nextTicks will they go into the same or different flushed queues?
              // => separate queues!
              // So it seems like you can't push into the current queue from within the queue
              // Whether nextTick is running a Task or a Microtask it seems like it can't intercept the currently flushing queue
              this.$nextTick(_ => {
                console.log('OUTER $NEXTTICK')
                this.$nextTick(_ => console.log('INNER $NEXTTICK'))
              })
              console.log('rafToNextTick 07: inside $nextTick after timeout')
              // Try one more style just to be extra-sure => this comes outside the queue just like with setTimeout and setImmediate(!?)
              this.$nextTick(_ => Promise.resolve().then(_ => console.log('inside resolved promise to be exxxxxtra sureeee')))
              Promise.resolve().then(_ => console.log('ok how about this promise'))
              // Whoa this one comes between queues wtf I guess because it's going into the microtask queue before nextTick? 🤔
              // is this a separate microtask queue => YES
            })
          })
        })
      })
    },

    travel({ hour, minute, } = {}) {  // making destructured args optional, e.g. https://stackoverflow.com/a/53930370
      console.log('travel running')
      this.departed = { ...this.present, }

      if(hour) this.destination.hour = hour
      if(minute) this.destination.minute = minute
      else ++this.destination.minute
    },
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
    <DeLoreanButton @click="changeNonRenderedData">!rerender</DeLoreanButton>
    <DeLoreanButton @click="interceptQueue">MI:Vue</DeLoreanButton>
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
