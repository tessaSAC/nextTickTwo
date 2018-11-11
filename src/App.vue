<template>
  <div id="app"><VArr /></div>
</template>

<script>
// https://stackoverflow.com/questions/47634258/what-is-nexttick-or-what-does-it-do-in-vuejs
// https://vuejs.org/v2/api/#Vue-nextTick

import VArr from './components/VArr'

export default {
  name: 'App',
  components: {
    VArr,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
