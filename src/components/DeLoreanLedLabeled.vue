<script>
import DeLoreanLabeledSlot from './DeLoreanLabeledSlot'
import DeLoreanLed from './DeLoreanLed'

export default {
  components: { DeLoreanLabeledSlot, DeLoreanLed, },

  props: {
    labelColor: String,
    textColor: String,
    ledColor: String,
  },
}
</script>

<template>
<DeLoreanLabeledSlot class="DeLoreanLedLabeled">
  <slot slot="labelText" />

  <div slot="clockUi" class="led">
    <DeLoreanLed :color="ledColor" />
  </div>
</DeLoreanLabeledSlot>
</template>


<style lang="scss">
.DeLoreanLedLabeled {

}
</style>
