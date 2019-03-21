export default {
  beforeCreate() {
    if(!window.mutatedRaf) {  // prevent stacking console.logs every hot reload
      const raf = window.requestAnimationFrame

      window.requestAnimationFrame = function(args) {
        console.log('requestAnimationFrame')
        return raf(args)
      }

      window.mutatedRaf = true
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