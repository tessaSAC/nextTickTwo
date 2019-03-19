<script>
import DeLoreanClock from '../components/DeLoreanClock'

export default {
  components: { DeLoreanClock, },

  data: _ => ({
    red: {
      month: 'Oct',
      day: 26,
      year: 1985,
      hour: 1,
      minute: 21,
      labelText: 'destination time',
    },

    green: {
      month: 'Oct',
      day: 26,
      year: 1985,
      hour: 1,
      minute: 22,
      textColor: '#67fd48',
      ledColor: 'green',
      labelText: 'present time',
    },

    yellow: {
      month: 'Oct',
      day: 26,
      year: 1985,
      hour: 1,
      minute: 20,
      textColor: '#f8ef4f',
      labelText: 'time last departed',
    },
  }),
}
</script>

<template>
<div class="DeLorean">
  <div class="dashboard">
    <DeLoreanClock v-bind="red" />
    <DeLoreanClock v-bind="green" />
    <DeLoreanClock v-bind="yellow" />
  </div>
</div>
</template>

<style lang="scss" scoped>
.DeLorean {
  background: #100c0b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .dashboard { width: 70vw; }

  .DeLoreanClock {
    filter: drop-shadow(0 0.5rem 0.3rem #000);

    + .DeLoreanClock {
      margin-top: 0.2rem;
    }
  }
}
</style>
