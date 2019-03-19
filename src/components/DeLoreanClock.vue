<script>
import DeLoreanCounter from './DeLoreanCounter'
import DeLoreanLabel from './DeLoreanLabel'
import DeLoreanLed from './DeLoreanLed'
import DeLoreanLedLabeled from './DeLoreanLedLabeled'

export default {
  components: {
    DeLoreanCounter,
    DeLoreanLabel,
    DeLoreanLed,
    DeLoreanLedLabeled,
  },

  props: {
    month: String,
    day: {
      Number,
      default: 0,
    },

    year: {
      Number,
      default: 0,
    },

    hour: {
      Number,
      default: 0,
    },

    minute: {
      Number,
      default: 0,
    },

    textColor: String,

    ledColor: {
      type: String,
      default: 'yellow',
    },

    labelText: String,
  }
}
</script>

<template>
<div class="DeLoreanClock">
  <div class="centeredYColumn clock">
    <div class="lcds">
      <DeLoreanCounter
        :counterValue="month"
        :counterColor="textColor"
      >month</DeLoreanCounter>

      <DeLoreanCounter
        :counterValue="day"
        :counterColor="textColor"
      >day</DeLoreanCounter>

      <DeLoreanCounter
        :counterValue="year"
        :counterColor="textColor"
      >year</DeLoreanCounter>

      <div class="centeredYColumn ledContainer">
        <DeLoreanLedLabeled :ledColor="ledColor">AM</DeLoreanLedLabeled>
        <DeLoreanLedLabeled>PM</DeLoreanLedLabeled>
      </div>

      <DeLoreanCounter
        :counterValue="hour"
        :counterColor="textColor"
      >hour</DeLoreanCounter>

      <div class="centeredYColumn ledContainer">
        <DeLoreanLed />
        <DeLoreanLed />
      </div>

      <DeLoreanCounter
        :counterValue="minute"
        :counterColor="textColor"
      >min</DeLoreanCounter>
    </div>

    <DeLoreanLabel tapeColor="#050405">{{ labelText }}</DeLoreanLabel>
  </div>
</div>
</template>

<style lang="scss" scoped>
.DeLoreanClock {
  display: flex;
  align-items: center;

  .centeredYColumn {
    justify-content: center;
  }

  .clock { width: 100%; }

  .lcds {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .DeLoreanLabel {
    position: relative;
    top: 0.7rem;
    font-size: 0.9em;
  }

  .ledContainer { padding-top: 0.8rem; }
  .DeLoreanLed + .DeLoreanLed { margin-top: 0.3rem; }
  .DeLoreanLedLabeled + .DeLoreanLedLabeled { margin-top: 0.3rem; }

  // Proportional component size
  &:before {
    content: "";
    width: 1px;
    margin-left: -1px;
    float: left;
    height: 0;
    padding-top: 18.5%;
  }
  &:after {
    content: "";
    display: table;
    clear: both;
  }

  // Textured background
  background-color: #28252a;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='48' viewBox='0 0 60 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='fancy-rectangles' fill='%23393842' fill-opacity='0.27'%3E%3Cpath d='M6 12h6v12H6V12zm12 0h6v12h-6V12zm6-12h6v12h-6V0zM12 0h6v12h-6V0zm0 24h6v12h-6V24zM0 0h6v12H0V0zm6 36h6v12H6V36zm12 0h6v12h-6V36zm12-12h6v12h-6V24zM42 0h6v12h-6V0zm-6 12h6v12h-6V12zm12 0h6v12h-6V12zM36 36h6v12h-6V36zm12 0h6v12h-6V36zm-6-12h6v12h-6V24zm12 0h6v12h-6V24z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>


