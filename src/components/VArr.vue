<template>
<div class="VArr">
  <ul>
    <li
      v-for="(bucket, i) in pulley"
      :key="i"
    >
      {{ bucket }}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'VArr',

  data() {
    return {
      pulley: [[]],
      count: 0
    }
  },

  computed: {
    lastBucket() {
      return this.pulley[this.pulley.length - 1]  // this doesn't work idky
      // return this.pulley.length - 1
    }
  },

  beforeCreate() {
    console.log('beforeCreate')
  },

  created() {
    console.log('created')
  },

  beforeMount() {
    console.log('beforeMount')
  },

  mounted() {
    console.log('mounted')

    this.radd()
    this.badd()  // It seems like cheating reactivity only works on the root level; idky
    this.radd()

    // setTimeout(this.radd, 1000)

    // setTimeout(this.badd(this.lastBucket.length - 1), 2000)

    // setTimeout(this.radd, 3000)

    // setTimeout( _ => {

    //   this.radd()
    //   this.badd(this.lastBucket.length - 2)

    // }, 4000)

    // setTimeout( _ => {
    //   this.radd()
    //   this.radd()

    //   // TODO: use this before moving to next step but not during
    //   // setTimeout(this.radd, 0);  // this is still counted as within the same task no matter what timeout
    //   // It causes this whole microtask to be deferred
    // }, 5000)

    // setTimeout(this.radd, 5000)  // even with same/shorter timeout it's deferred to a different task cycle
  },

  beforeUpdate() {
    console.log('beforeUpdate')
    this.prant()
  },

  updated() {
    console.log('updated')
    this.prant()
  },

  beforeDestroy() {
    console.log('beforeDestroy')
  },

  destroyed() {
    console.log('destroyed')
  },

  methods: {
    increment() {
      return ++this.count
    },

    badd(idx) {
      // this.lastBucket[idx] = this.increment()
      this.lastBucket.push[this.increment()]
      this.prant()
    },

    radd() {
      this.$set(this.lastBucket, this.lastBucket.length, this.increment())
      this.prant()
    },

    prant() {
      console.log(`count: ${ this.count }`)
      console.log('buckets')
      console.dir(this.pulley)
    }
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
