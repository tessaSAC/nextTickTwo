<script>
export default {
  props: {
    tapeColor: {
      type: String,
      default: '#2d0109',
    },
    textColor: {
      type: String,
      default: '#fff',
    },
  },
}
</script>

<template>
<div class="DeLoreanLabel" :style="{ background: tapeColor }">
  <p :style="{ color: textColor }"><slot /></p>
</div>
</template>


<style lang="scss">
.DeLoreanLabel {
  display: inline-block;
  padding: 0.1rem 0.6rem;

  text-transform: uppercase;
  font-family: Syncopate;
  font-size: 0.8rem;

  p {
    margin: 0;
    position: relative;
    top: 1px;
  }
}
</style>
