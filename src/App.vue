<template>
  <div id="app">
    <VBuckets />
  </div>
</template>

<script>
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
