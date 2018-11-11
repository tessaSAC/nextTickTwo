<template>
<div class="VArr">
  <ul>
    <li
      v-for="(elem, i) in arr"
      :key="i"
    >
      {{ elem }}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'VArr',

  data() {
    return {
      arr: [],
      count: 0
    }
  },

  watch: {
    $nextTick() {
      console.log('nextTick')
    },
  },

  beforeCreate() {
    console.log('beforeCreate')
  },

  created() {
    console.log('created')

    this.$nextTick = function(...args) {
      console.log('nextTick')
      this.$nextTick(...args)
    }
  },

  beforeMount() {
    console.log('beforeMount')
  },

  mounted() {
    console.log('mounted')

    this.arr.push(this.count)
    this.count++

    console.log(this.count)

    setTimeout(_ => {
      this.arr.push(this.count)
      this.count++

      console.log(this.count)
    }, 1000)

    setTimeout(_ => {
      this.arr[this.count - 1] = this.count
      this.count++

      console.log(this.count)
    }, 2000)

    setTimeout(_ => {
      this.arr.push(this.count)
      this.count++

      console.log(this.count)
    }, 3000)

    setTimeout(_ => {
      this.arr.push(this.count)
      this.count++
      console.log(this.count)

      this.arr[this.count - 3] = this.count
      this.count++
      console.log(this.count)
    }, 4000)
  },

  beforeUpdate() {
    console.log('beforeUpdate')
  },

  updated() {
    console.log('updated')
  },

  beforeDestroy() {
    console.log('beforeDestroy')
  },

  destroyd() {
    console.log('destroyed')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
