export default {
  data: _ => ({
    timeline: [
      { queue: "task", steps: [] }
      // { queue: 'flushQueue', steps: [], },
      // { queue: 'microtask', steps: [], },
    ]
  }),

  computed: {
    hasOpenMicrotaskQueue() {
      return (
        this.lastEl.queue === "microtask" ||
        (this.hasOpenTaskQueue && this.secondToLastEl.queue === "microtask")
      );
    },
    hasOpenTaskQueue() {
      return this.lastEl.queue === "task";
    },
    lastEl() {
      return this.timeline[this.lastIdx];
    },
    lastIdx() {
      return this.lenTimeline ? this.lenTimeline - 1 : 0;
    },
    lenTimeline() {
      return this.timeline.length;
    },
    secondToLastEl() {
      return this.timeline[this.lenTimeline - 2];
    }
  },

  created() {
    window.timeline = this.timeline;
  },

  methods: {
    // rules:
    // task is first no matter what and/or last
    // push(nT) goes into last of mT or flushQueue -- if not in queue then it goes in mT
    // new flushQ or mTQ are last except for task queues (when length > 1)

    log(queue, step) {
      const lastIdx = _ =>
        this.timeline.length ? this.timeline.length - 1 : 0;
      const lastEl = _ => this.timeline[lastIdx()];
      const hasOpenTaskQueue = _ => lastEl().queue === "task";
      const lenTimeline = _ => this.timeline.length;
      const secondToLastEl = _ => this.timeline[lenTimeline() - 2];
      const hasOpenMicrotaskQueue = _ =>
        lastEl().queue === "microtask" ||
        (hasOpenTaskQueue() && secondToLastEl().queue === "microtask");

      // Short-circuit tasks first
      if (queue === "task") {
        if (lastEl().queue !== queue) this.timeline.push({ queue, steps: [] });
        return lastEl().steps.push(step);
      }

      // What remains are either nextTicks or microtasks
      if (queue === "microtask") {
        if (!hasOpenMicrotaskQueue()) {
          const newMicrotaskQueue = { type: "microtask", queue: [step] };

          if (hasOpenTaskQueue())
            return this.timeline.splice(lenTimeline() - 2, newMicrotaskQueue);
          return timeline.push(newMicrotaskQueue);
        }

        const microtaskQueue =
          lastEl().queue === "microtask" ? lastEl() : secondToLastEl();
        microtaskQueue.push(step);
      }

      if (queue === "flushQueue") {
        console.log("flush");
        let flushQueue;

        for (let i = lenTimeline() - 1; i > 0; --i) {
          if (this.timeline[i].queue === queue) {
            flushQueue = this.timeline[i];
            return flushQueue.steps.push(step);
          }
        }
      }
    }
  }
};
