<script>
export default {
  name: 'VBuckets',

  data() {
    return {
      pulley: [[], ],
      count: 0,
    }
  },

  computed: {
    lastBucket() {
      return this.pulley[this.pulley.length - 1]
    },

    tickCount() {
      // $nextTick and nextTick count as one; don't count initial tick
      return this.pulley.slice(1)
    },
  },

  beforeCreate() {
    console.log('beforeCreate')
  },

  created() {
    console.log('created')
    window.pulley = this.pulley
    // this.$nextTick(_ => console.log('👻👻👻👻👻👻👻'))
  },

  beforeMount() {
    console.log('beforeMount')
  },

  mounted() {
    console.log('mounted')
    // this.$nextTick(_ => console.log('👻👻👻👻👻👻👻'))

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
    fillTick(num) {
      return num === 6 ? '$' : num + 1
    },

    increment() {
      return ++this.count
    },

    badd() {
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
<div class="VBuckets">
  <div class="title">
    <p>nextTicks</p>
  </div>
  <div class="nextTicks">
    <div
      v-for="(tick, idx) in tickCount"
      class="tick"
      :key="idx"
    >
      <p>{{ fillTick(idx) }}</p>
    </div>
  </div>
  <div class="title">
    <p>buckets</p>
  </div>
  <div class="pulley" ref="hi">
    <template
      v-for="(bucket, idx) in pulley"
    >
      <div
        v-if="bucket.length"
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
    </template>
  </div>
</div>
</template>

<style lang="scss" scoped>
@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

.VBuckets {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 0.5rem;

  > div {
    border-radius: 0.2rem;
    background: mistyrose;
    padding: 1rem;
  }
}

.title {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: 500;

  .p {
    display: inline-block;
    margin: 0;
  }
}

.nextTicks {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.tick {
  animation: fadein 2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  border: mistyrose 1px solid;
  border-radius: 0.2rem;
  background: indianred;
  width: 1.5rem;
  height: 1.5rem;

  p {
    display: inline-block;
    margin: 0;
    color: white;
    font-size: 0.4;
  }

  &:nth-child(7) {
    background: #42b983;
  }
}

.pulley {
  display: flex;
  flex-wrap: wrap;
}

.bucket {
  animation: fadein 1s;
  display: flex;
  align-items: center;
  margin: 0.5rem;
  border-radius: 0.2rem;
  background: midnightblue;
  padding: 0.5rem;
}

.supply {
  animation: fadein 2s;
  margin: 0.5rem;
  border-radius: 0.2rem;
  width: 2rem;
  height: 2rem;
}

.good {
  background: #42b983;
}

.bad {
  background: tomato;
}
</style>
