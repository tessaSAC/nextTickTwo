export default {
  data: _ => ({
    timeline: [{
        queue: 'task',
        steps: [],
      },
      // { queue: 'flushQueue', steps: [], },
      // { queue: 'microtask', steps: [], },
    ],
  }),

  computed: {
    hasOpenMicrotaskQueue() {
      return (
        this.lastEl.queue === 'microtask' ||
        this.hasOpenTaskQueue && this.secondToLastEl.queue === 'microtask'
      )
    },

    hasOpenTaskQueue() { return this.lastEl.queue === 'task' },

    lastEl() { return this.timeline[this.lastIdx] },

    lastIdx() { return this.lenTimeline ? this.lenTimeline - 1 : 0 },

    lenTimeline() { return this.timeline.length },

    secondToLastEl() { return this.timeline[this.secondToLastIdx] },

    secondToLastIdx() {
      if(this.lenTimeline > 1) return this.lenTimeline - 2
      return 0
    },
  },

  created() {
    window.timeline = this.timeline
  },

  methods: {
    // rules:
    // task is first no matter what and/or last
    // push(nT) goes into last of mT or flushQueue -- if not in queue then it goes in mT
    // new flushQ or mTQ are last except for task queues (when length > 1)

    log(queue, step) {
      // Short-circuit tasks first
      if (queue === 'task') {
        if (this.lastEl.queue !== queue) this.timeline.push({ queue, steps: [], })
        return this.lastEl.steps.push(step)
      }

      // What remains are either nextTicks or microtasks
      if (queue === 'microtask') {
        if (!this.hasOpenMicrotaskQueue) {
          const newMicrotaskQueue = { queue: 'microtask', steps: [step, ], }
          if (this.hasOpenTaskQueue) {
            this.timeline.splice(this.secondToLastIdx, newMicrotaskQueue)
            return console.log(this.timeline, newMicrotaskQueue)
          }
          return this.timeline.push(newMicrotaskQueue)
        }

        const microtaskQueue = lastEl().queue === 'microtask' ? lastEl() : secondToLastEl()
        microtaskQueue.push(step)
      }

      if (queue === 'flushQueue') {
        console.log('flush')
        let flushQueue

        for (let i = this.lenTimeline - 1; i > 0; --i) {
          if (this.timeline[i].queue === queue) {
            flushQueue = this.timeline[i]
            return flushQueue.steps.push(step)
          }
        }
      }
    },
  },
}