<script>
import promisedMethods from '../mixins/promisedMethods'

export default {
  mixins: [ promisedMethods, ],

  data: _ => ({
    output: [],
    show: true,
    watchedVal: true,
  }),

  methods: {
    boxPosLeft() { return this.$refs.box.getBoundingClientRect().left },

    flipIt() { this.watchedVal = !this.watchedVal },

    flipWithNextTick() {
      this.output.unshift(`starting value: ${ this.watchedText() }`)
      this.promisedNextTick(_ => {
          this.flipIt()
          this.output.unshift(`nextTicked data value: ${ this.watchedVal }`)
      })
      .then(_ => this.promisedRequestAnimationFrame(_ => this.output.unshift(`rAF DOM value: ${ this.watchedText() }`)))
      .then(_ => this.output.unshift('STAGE CLEAR 🏰'))
      .catch(console.error)
    },

    flipWithRaf() {
      this.output.unshift(`starting value: ${ this.watchedText() }`)
      this.promisedRequestAnimationFrame(_ => {
        this.flipIt()
        this.output.unshift(`rAF data value: ${ this.watchedVal }`)
      })
      .then(_ => this.promisedNextTick(_ => this.output.unshift(`nextTicked DOM value: ${ this.watchedText() }`)))
      .then(_ => this.output.unshift('STAGE CLEAR 🏰'))
      .catch(console.error)
    },

    hijackedNextTick() {
      // From Divya:
      this.moveBox('1000px')
      const vm = this

      this.$nextTick(_ => {
        this.moveBox('500px')  // this is what will get rendered at first
        new Promise(resolve => {
          setTimeout(function () {  // this task will circumvent the intended use/timing of nextTick as it is a Task
            vm.$refs.box.style.transform = 'translateX(1000px)'
            resolve('divyahhh')
          }, 1000)
        })
        .catch(console.error)
      })
    },

    moveBox(distanceX) { this.$refs.box.style.transform = `translateX(${ distanceX })` },

    moveSetTimeout() {
      this.moveBox('1000px')
      // debugger  // not needed; definitely shudders
      setTimeout(_ => this.moveBox('500px'), 0)
    },

    moveSingleRaf() {
      this.moveBox('1000px')
      // debugger  // does move to 1000; just too fast to see
      requestAnimationFrame(_ => this.moveBox('500px'))
    },

    moveNestedRaf() {
      this.moveBox('1000px')
      // debugger  // no need to test; does shudder. TODO: Log rAF and see if this is just more fps
      requestAnimationFrame(_ => {
        requestAnimationFrame(_ => this.moveBox('500px'))
      })
    },

    moveSingleNextTick() {
      this.moveBox('1000px')
      // debugger  // this one moves too
      this.$nextTick(_ => {
        console.log('nextTick callback');
        this.moveBox('500px')
      })
    },

    moveSingleNextTickTwiceInside() {
      // debugger  // this one only moves 500
      this.$nextTick(_ => {
        this.moveBox('1000px')
        this.moveBox('500px')
      })
    },

    moveDoubleNextTick() {
      // debugger  // It does move!!
      this.$nextTick(_ => this.moveBox('1000px'))
      this.$nextTick(_ => this.moveBox('500px'))
    },

    moveNestedNextTick() {
      this.moveBox('1000px')
      // debugger  // this one also moves; are they different nexTicks or not? TODO: check two nextTicks in a row as well
      this.$nextTick(_ => {
        this.$nextTick(_ => this.moveBox('500px'))
      })
    },

    moveNestedNextTickInterleaved() {
      // debugger  // this one also moves; are they different nexTicks or not?
      this.$nextTick(_ => {
        this.moveBox('1000px')
        this.$nextTick(_ => this.moveBox('500px'))
      })
    },

    moveLoopedNextTick() {
      this.moveBox('1000px')
      // debugger  // this moves the box

      // this.$nextTick(_ => {
      //   console.log('first tick')
      //   requestAnimationFrame(_ => {})  // this doesn't cause execution to slow down enough to see this render
      //   window.getComputedStyle(this.$refs.box)
      //   this.moveBox('500px')
      // })

      for(let i = 0; i < 1000; ++i) {
        this.$nextTick(_ => {
          console.count('nextTick')
          console.log(this.boxPosLeft())  // This shows the 1000px movement
        })
      }

      this.$nextTick(_ => {
        console.log('second next tick')
        this.moveBox('500px')
        console.log(this.boxPosLeft())
      })
    },

    rerender() {
      console.log('RERENDERING')
      this.$forceUpdate()  // why doesn't this work inline?? wth
    },

    reset() { this.moveBox(0) },

    watchedText() { return this.$refs.watchedValue.textContent },
  },
}
</script>

<template>
<div class="NextTickVsRaf">
  <div class="controls">
    <button @click="rerender">RERENDER</button>
    <button @click="show = !show">v-if</button>
  </div>
  <div class="controls">
    <button @click="moveSetTimeout">Move Box with setTimeout</button>
    <button @click="moveSingleRaf">Move Box with Single rAF</button>
    <button @click="moveNestedRaf">Move Box with Nested rAF</button>
    <button @click="moveSingleNextTick">Move Box with Single nextTick</button>
    <button @click="moveSingleNextTickTwiceInside">Move Box with Single nextTick Twice Inside</button>
    <button @click="moveDoubleNextTick">Move Box with Double nextTick</button>
    <button @click="moveNestedNextTick">Move Box with Nested nextTick</button>
    <button @click="moveNestedNextTickInterleaved">Move Box with Nested nextTick Interleaved</button>
    <button @click="moveLoopedNextTick">Move Box with Looped nextTick</button>
    <button @click="hijackedNextTick">Move Box with Divya's Hijacked nextTick</button>
    <button @click="reset">Reset</button>
  </div>

  <div ref="box" class="box" />
  <h1 v-if="show" class="centeredX">⏱</h1>

  <div class="logger">
    <div class="controls">
      <button @click="flipWithNextTick">Flip value with nextTick</button>
      <button @click="flipWithRaf">Flip value with rAF</button>
      <button @click="output = []">Clear logger</button>
    </div>
    <div class="scroller">
      <p v-for="(line, idx) in output" :key="idx">{{ `${ output.length - (idx + 1) }: ${ line }` }}</p>
    </div>
    <p ref="watchedValue" class="watchedValue centeredX">{{ watchedVal }}</p>
  </div>
</div>
</template>


<style lang="scss" scoped>
.NextTickVsRaf {
  .controls {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;

    button { margin: 0 0.5rem; }
  }

  .box {
    background: palegreen;
    width: 100px;
    height: 100px;
  }

  .logger {
    display: flex;
    justify-content: space-evenly;
    background: peachpuff;
    height: 200px;
    padding: 1vw;

    div { width: 30%; }

    .controls {
      display: flex;
      flex-direction: column;
      align-items: center;

      button {
        width: 10rem;
        margin: 1vw 0;
      }
    }

    .scroller {
      background: powderblue;
      overflow-y: scroll;
      padding: 0.5vw 2vw;
    }

    .watchedVal {
      min-width: 3rem;
    }
  }
}
</style>
