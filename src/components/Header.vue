<template>
        <div id="gv-header" :style="style">
          <slot></slot>
        </div>
</template>


<script>

export default {
  name: 'gv-header',
  computed: {
    style() { return `height:${GV.config.application.layout.header.height}`}
  },
  mounted() {
    this.$el.innerHTML=GV.config.application.layout.header.html
  },
}
</script>

<style scoped>
</style>