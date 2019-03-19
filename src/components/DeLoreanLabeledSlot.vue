<script>
import DeLoreanLabel from './DeLoreanLabel'

export default {
  components: { DeLoreanLabel, },

  props: {
    tapeColor: String,
    textColor: String,
  },
}
</script>

<template>
<div class="DeLoreanLabeledSlot">
  <div class="centeredYColumn">
    <div class="labelContainer">
      <DeLoreanLabel>
        <slot name="labelText" />
      </DeLoreanLabel>
    </div>

    <slot name="clockUi" />
  </div>
</div>
</template>

<style lang="scss">
.DeLoreanLabeledSlot {
  display: inline-block;

  .labelContainer {
    line-height: 0.6rem;
    margin-bottom: 0.3rem;
  }
}
</style>
