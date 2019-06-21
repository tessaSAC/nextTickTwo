import timelineMethods from './timelineMethods'

export default {
  mixins: [ timelineMethods, ],

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
      console.log('pushing promise')

      return new Promise(resolve => this.$nextTick(_ => {
        console.log('promised nexttick')
        this.log('microtask', { char: 'p(P)', type: 'push', })
        cb()
        resolve()
      }))
    },

    promisedRequestAnimationFrame(cb) {
      // this.log('microtask', { char: 'p(P)', type: 'push', })

      // adapted from https://medium.com/@samthor/js-callbacks-to-promises-541adc46c07c

      console.log('running promise')
      return new Promise(resolve => window.requestAnimationFrame(_ => {
        console.log('promised rAF')
        cb()
        resolve()
      }))
    },
  },
}