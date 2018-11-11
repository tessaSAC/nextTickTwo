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

  beforeCreate() {
    console.log('beforeCreate')
  },

  created() {
  },

  beforeMount() {
    console.log('beforeMount')
  },

  mounted() {
    console.log('mounted')

    this.arr.push(this.count)
    this.count++

    console.log(this.count)
    console.log(this.arr)

    setTimeout(_ => {
      this.arr.push(this.count)
      this.count++

      console.log(this.count)
      console.log(this.arr)
    }, 1000)

    setTimeout(_ => {
      this.arr[this.count - 1] = this.count
      this.count++

      console.log(this.count)
      console.log(this.arr)
    }, 2000)

    setTimeout(_ => {
      this.arr.push(this.count)
      this.count++

      console.log(this.count)
      console.log(this.arr)
    }, 3000)

    setTimeout(_ => {
      this.arr.push(this.count)
      this.count++
      console.log(this.count)
      console.log(this.arr)

      this.arr[this.count - 3] = this.count
      this.count++
      console.log(this.count)
      console.log(this.arr)
    }, 4000)

    setTimeout(_ => {
      this.arr.push(this.count)
      this.count++
      this.arr.push(this.count)
      this.count++

      console.log('2nd to last')
      console.log(this.count)
      console.log(this.arr)

      // setTimeout(_ => {
      //   this.arr.push(this.count)
      //   this.count++

      //   console.log(this.count)
      //   console.log(this.arr)
      // }, 0);  // this is still counted as within the same task no matter what timeout
      // It causes this whole microtask to be deferred
    }, 5000)

    setTimeout(_ => {
      this.arr.push(this.count)
      this.count++

      console.log('test')
      console.log(this.count)
      console.log(this.arr)
    }, 5000)  // even with same/shorter timeout it's deferred to a different microtask cycle
  },

  beforeUpdate() {
    console.log('beforeUpdate')
    // console.log(this.count)
    // console.log(this.arr)
  },

  updated() {
    console.log('updated')
    // console.log(this.count)
    // console.log(this.arr)
  },

  beforeDestroy() {
    console.log('beforeDestroy')
  },

  destroyed() {
    console.log('destroyed')
  },
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
