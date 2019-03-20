export default {
  beforeCreate() {
    const raf = window.requestAnimationFrame

    window.requestAnimationFrame = function(args) {
      console.log('requestAnimationFrame')
      return raf(args)
    }
  },

  methods: {
    promisedNextTick(cb) {
      return new Promise(resolve => this.$nextTick(_ => {
          cb()
          resolve()
      }))
    },

    promisedRequestAnimationFrame(cb) {
      // adapted from https://medium.com/@samthor/js-callbacks-to-promises-541adc46c07c
      return new Promise(resolve => window.requestAnimationFrame(_ => {
        cb()
        resolve()
      }))
    },
  },
}