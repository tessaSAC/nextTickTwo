<!-- https://codepen.io/jerryb_jr/pen/bpORQK -->

<template>
<button v-on="$listeners" class="DeLoreanButton">
  <slot />
</button>
</template>


<style lang="scss">
.DeLoreanButton {
  border-radius: 50px;
  border: 1px solid $orange;
  background: transparent;
  padding: 0.4rem 0.8rem 0.3rem;
  color: $orange;
  font-family: Syncopate;
  font-size: 1.2rem;
  text-transform: uppercase;

  &:active {
    position: relative;
    top: 1px;
    left: 1px;
  }
}
</style>
