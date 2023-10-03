<template>
        <icon :icon="icon" :height="height" :width="height" />
</template>

<script>
    import {Icon} from '@iconify/vue'
    export default {
        components: {
            Icon
        },
        props: {
            icon: {
                type: String,
                required: true
            },
            height: {
                type: String,
                default: '1em'
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>