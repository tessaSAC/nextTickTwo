<template>
<div id="app">
  <div id="nav">
    <router-link to="/vbuckets">nextTick(DTB)</router-link>
    |
    <router-link to="/divya">nextTick vs rAF with Divya</router-link>
    |
    <router-link to="/delorean">back to the Vueture</router-link>
  </div>
  <router-view class="content" />
</div>
</template>

<style lang="scss">
#app {
  font-family: Roboto;
  height: 100vh;

  #nav {
    display: flex;
    justify-content: center;
    padding: 0.5rem 5rem;

    a { margin: 0 0.5rem; }
  }

  .content {
    padding: 1rem 5rem;
    height: calc(100% - 4.15rem);
    overflow: hidden;
  }
}
</style>
