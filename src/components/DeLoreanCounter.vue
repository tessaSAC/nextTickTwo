<script>
import DeLoreanLabeledSlot from './DeLoreanLabeledSlot'

export default {
  components: { DeLoreanLabeledSlot, },

  props: {
    labelColor: String,
    textColor: String,

    counterColor: {
      type: String,
      default: '#ec352a',
    },
    counterValue: [ Number, String, ],
  },

  computed: {
    counterValueChars() {
      let counterValue = '' + this.counterValue
      if(this.counterValueIsNumber && counterValue.length === 1) counterValue = '0' + counterValue
      return counterValue.split('')
    },
    counterValueIsNumber() { return parseInt(this.counterValue) },
  },

  methods: {
    flip(char) {
      if(isNaN(parseInt(char)) && char.toLowerCase() === 'v') return 'flip'
    },
  },
}
</script>

<template>
<DeLoreanLabeledSlot class="DeLoreanCounter">
  <slot slot="labelText" />

  <div slot="clockUi" class="counter">
    <div
      v-for="(char, idx) in counterValueChars"
      :key="idx"
      class="char"
      :style="{ color: counterColor }"
    >
      <div v-if="counterValueIsNumber" class="transparent">
        0<span class="dot">.</span>
      </div>

      <div ref="char" class="opaque" :class="flip(char)">{{ char }}</div>
    </div>
  </div>
</DeLoreanLabeledSlot>
</template>


<style lang="scss">
.DeLoreanCounter {
  .counter {
    display: flex;
    background: #040203;
    padding-right: 0.2rem;
  }

  .char {
    position: relative;
    top: -0.3rem;
    width: 3.1rem;
    font-family: LCD14;
    font-size: 4rem;
    line-height: 3.5rem;
    text-transform: uppercase;

    .opaque {
      position: relative;
      text-shadow: rgba(250, 250, 250, 0.3) 0 0 1rem;
    }

    .flip {
      transform: scaleX(-1) rotateZ(-26deg);
      position: relative;
      top: 0.5rem;
      left: 0.45rem;
    }

    .transparent {
      opacity: 0.1;
      position: absolute;
    }
  }

  .dot {
    position: relative;
    left: -0.4rem;
    font-family: Roboto;
  }
}
</style>
