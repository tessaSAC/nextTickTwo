<script>
export default {
  computed: {
    boxPosLeft() { return this.$refs.box.getBoundingClientRect().left }
  },

  beforeUpdate() {
    console.log('beforeUpdate', boxPosLeft)  // these don't do anything
  },

  updated() {
    this.$nextTick(function () {  // This doesn't do anything either
      console.log('updated', boxPosLeft)
    })
  },

  methods: {
    moveBox(distanceX) {this.$refs.box.style.transform = `translateX(${ distanceX })` },

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
        this.moveBox('500px')
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
          console.log(this.boxPosLeft)  // This shows the 1000px movement
        })
      }

      this.$nextTick(_ => {
        console.log('second next tick')
        this.moveBox('500px')
        console.log(this.boxPosLeft)
      })
    },

    reset() { this.moveBox(0) },
  },
}
</script>

<template>
<div class="NextTickVsRaf">
  <div class="controls">
    <button @click="moveSetTimeout">Move Box with setTimeout</button>
    <button @click="moveSingleRaf">Move Box with Single rAF</button>
    <button @click="moveNestedRaf">Move Box with Nested rAF</button>
    <button @click="moveSingleNextTick">Move Box with Single nextTick</button>
    <button @click="moveSingleNextTickTwiceInside">Move Box with Single nextTick Twice Inside</button>
    <button @click="moveDoubleNextTick">Move Box with Double nextTick</button>
    <button @click="moveNestedNextTick">Move Box with Nested nextTick</button>
    <button @click="moveLoopedNextTick">Move Box with Looped nextTick</button>
    <button @click="reset">Reset</button>
  </div>
  <div ref="box" class="box" />
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
}
</style>
