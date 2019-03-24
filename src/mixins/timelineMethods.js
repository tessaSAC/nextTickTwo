export default {
  data: _ => ({
    timeline: [
      {
        queue: 'task',
        steps: [],
      }, {
        queue: 'nextTick',
        steps: [],
      }, {
        queue: 'microtask',
        steps: [],
      },
    ]
  }),

  computed: {
    hasOpenMicrotaskQueue() { return this.lastEl.queue === 'microtask' || this.hasOpenTaskQueue && this.secondToLastEl.queue === 'microtask' },
    hasOpenTaskQueue() { return this.lastEl.queue === 'task' },
    lastEl() { return this.timeline[ this.lenTimeline - 1 ] },
    lenTimeline() { return this.timeline.length },
    secondToLastEl() { return this.timeline[ this.lenTimeline - 2 ] }
  },

  methods: {
    // rules:
    // task is first no matter what and/or last
    // push(nT) goes into last of mT or flushQueue -- if not in queue then it goes in mT
    // new flushQ or mTQ are last except for task queues (when length > 1)

    push(queue, step) {
      // Short-circuit tasks first
      if(queue === 'task') {
        if(lastEl.queue !== queue) this.timeline.push({ queue, steps: [], })
        return this.lastEl.push(step)
      }

      // What remains are either nextTicks or microtasks
      if(queue === 'microtask') {
        if(!this.hasOpenMicrotaskQueue) {
          const newMicrotaskQueue = { type: 'microtask', queue: [ step, ], }

          if(this.hasOpenTaskQueue) return this.timeline.splice(this.lenTimeline - 2, newMicrotaskQueue)
          return this.timeline.push(newMicrotaskQueue)
        }

        const microtaskQueue = this.lastEl.queue === 'microtask' ? this.lastEl : this.secondToLastEl
        microtaskQueue.push(step)
      }

      if(queue === 'nextTick') {
        let nextTickQueue

        for(let i = lenTimeline - 1; i > 0; --i) {
          if(this.timeline[i].queue === 'nextTick') nextTickQueue = this.timeline[i]
        }

        nextTickQueue.push(step)
      }
    },
  },
}