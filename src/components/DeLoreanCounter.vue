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
    counterValue: Number,
  },

  computed: {
    counterValueChars() { return ('' + this.counterValue).split('') },
  },
}
</script>

<template>
<DeLoreanLabeledSlot class="DeLoreanCounter">
  <!-- <div class="centeredYColumn"> -->
    <slot slot="labelText" />

    <div slot="clockUi" class="counter">
      <div
        v-for="(digit, idx) in counterValueChars"
        :key="idx"
        class="digit"
        :style="{ color: counterColor }"
      >
        <div class="transparent">
          0<span class="dot">.</span>
        </div>

        <div class="opaque">{{ digit }}</div>
      </div>
    </div>
  <!-- </div> -->
</DeLoreanLabeledSlot>
</template>


<style lang="scss">
.DeLoreanCounter {
  .counter {
    display: flex;
    background: #040203;
    padding-right: 0.2rem;
  }

  .digit {
    position: relative;
    top: -0.3rem;
    width: 3.1rem;
    font-family: LCD14;
    font-size: 4rem;
    line-height: 3.5rem;

    .opaque { position: relative; }

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
