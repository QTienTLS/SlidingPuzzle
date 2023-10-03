<template>
  <div :style="{ width: size + 'px', height: size + 'px' }" class="piece" :class="value?'':'empty',active?'active':''">
    {{ value }}
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: Number,
        required: true,
        default: 1,
      },
      value: {
        type: Number,
        required: true,
        default: 0,
      },
      active: {
        type: Boolean,
        required: true,
        default: false,
      },
      size: {
        type: Number,
        required: true,
        default: 50,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .piece{
    border: 1px solid $gray;  
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: 700;
    font-size: 18px
  }
  .active{
    background-color: $primary-lighter;
    color: $primary;
    border: 1px solid $primary;
  }
  .empty{
    background-color: $gray;
    color: $gray;
  }
</style>