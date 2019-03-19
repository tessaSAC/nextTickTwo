<script>
import DeLoreanClock from '../components/DeLoreanClock'

export default {
  components: { DeLoreanClock, },
}
</script>

<template>
<div class="DeLorean">
  <DeLoreanClock />
</div>
</template>

<style lang="scss" scoped>
.DeLorean {
  width: 80vw;
  display: flex;
  flex-direction: column;
}
</style>
