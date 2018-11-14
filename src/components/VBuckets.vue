<script>
export default {
  name: 'VBuckets',

  data() {
    return {
      pulley: [[]],
      count: 0,
    }
  },

  computed: {
    lastBucket() {
      return this.pulley[this.pulley.length - 1]
    },
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
    window.pulley = this.pulley
    console.log('created')
  },

  beforeMount() {
    console.log('beforeMount')
  },

  mounted() {
    console.log('mounted')

    this.radd()

    setTimeout(this.radd, 1000)

    setTimeout(this.badd, 3000)  // Doesn't trigger watcher; gets lumped in with next line
    setTimeout(this.radd, 5000)

    setTimeout(_ => {
      this.radd()
      this.radd()
      this.badd()
    }, 7000)

    setTimeout(_ => {
      this.radd()
      this.radd()

      // TODO: use this before moving to next step but not during
      // setTimeout(this.radd, 0);  // this is still counted as within the same task no matter what timeout
      // It causes this whole microtask to be deferred
    }, 9000)

    setTimeout(this.radd, 9000) // even with same/shorter timeout it's deferred to a different task cycle

    setTimeout(_ => this.pulley[1][1] = 'bad', 11000)

    setTimeout(this.$nextTick, 13000)
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

  destroyed() {
    console.log('destroyed')
  },

  methods: {
    increment() {
      return ++this.count
    },

    badd(idx) {
      const whichIdx = this.lastBucket.length > 1 ? this.lastBucket.length - 2 : 0
      this.lastBucket[whichIdx] = 'bad'
      this.prant()
    },

    radd() {
      this.$set(this.lastBucket, this.lastBucket.length, this.increment())
      this.prant()
    },

    prant() {
      console.log(`count: ${this.count}`)
      console.log('buckets')
      console.dir(this.pulley)
    },
  },
}
</script>

<template>
  <div class="VBuckets" ref="hi">
    <div
      v-if="bucket.length"
      v-for="(bucket, idx) in pulley"
      :key="idx"
      class="bucket"
    >
      <div
        v-for="(supply, idx) in bucket"
        :key=idx
        class="supply"
        :class="typeof supply === 'number' ? 'good' : 'bad'"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.VBuckets {
  display: flex;
  flex-wrap: wrap;
}

.bucket {
  display: flex;
  padding: 1rem;
  background: midnightblue;
  border-radius: 1rem;
  margin: 2rem;
}

.supply {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: 1rem;
}

.good {
  background: #42b983;
}

.bad {
  background: tomato;
}
</style>
