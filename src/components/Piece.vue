<template>
  <div>

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
    },
  }
</script>

<style lang="scss" scoped>

</style>