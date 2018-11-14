<template>
  <div id="app">
    <VBuckets />
  </div>
</template>

<script>
// https://stackoverflow.com/questions/47634258/what-is-nexttick-or-what-does-it-do-in-vuejs
// https://vuejs.org/v2/api/#Vue-nextTick

import VBuckets from './components/VBuckets'

export default {
  name: 'App',
  components: {
    VBuckets,
  },
}
</script>

<style>
#app {
  padding: 5rem;
  font-family: Roboto;
}
</style>
