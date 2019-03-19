<script>
import DeLoreanCounter from './DeLoreanCounter'

export default {
  components: { DeLoreanCounter, },
}
</script>

<template>
<div class="DeLoreanClock">
  <DeLoreanCounter
    counterValue="198V"
  >month</DeLoreanCounter>
</div>
</template>

<style lang="scss" scoped>
.DeLoreanClock {
  // width: 100%;

  &:before {
    content: "";
    width: 1px;
    margin-left: -1px;
    float: left;
    height: 0;
    padding-top: 339px / 1829px * 100%;
  }

  &:after {
    content: "";
    display: table;
    clear: both;
  }

  background-color: #28252a;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='48' viewBox='0 0 60 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='fancy-rectangles' fill='%23393842' fill-opacity='0.27'%3E%3Cpath d='M6 12h6v12H6V12zm12 0h6v12h-6V12zm6-12h6v12h-6V0zM12 0h6v12h-6V0zm0 24h6v12h-6V24zM0 0h6v12H0V0zm6 36h6v12H6V36zm12 0h6v12h-6V36zm12-12h6v12h-6V24zM42 0h6v12h-6V0zm-6 12h6v12h-6V12zm12 0h6v12h-6V12zM36 36h6v12h-6V36zm12 0h6v12h-6V36zm-6-12h6v12h-6V24zm12 0h6v12h-6V24z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

h2 {
  font-family: LCD14;
}

h1 {
  font-family: Syncopate;
}
</style>


