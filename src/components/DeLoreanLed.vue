<!-- https://austinrobertson.com/blog/2013/01/30/css-led/ -->

<script>
export default {
  props: { color: String, },
}
</script>

<template>
<div class="DeLoreanLed">
  <div class="led" :class="color" />
</div>
</template>


<style lang="scss">
.DeLoreanLed {
  .led {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.25);
      box-shadow: #000 0 -1px 6px 1px;
  }

  .green {
      background-color: #80FF00;
      box-shadow: #000 0 -1px 6px 1px, inset #460 0 -1px 8px, #80FF00 0 3px 11px;
  }

  .yellow {
      background-color: #FF0;
      box-shadow: #000 0 -1px 6px 1px, inset #660 0 -1px 8px, #FF0 0 3px 11px;
  }
}
</style>
