<template>
    <div v-html="html"></div> 
</template>

<script>
export default {
  name: 'gv-inner-html',
  props: ['html'],
  data() {
    return {
      // html: '<div class="gv-color-scheme" id="logo"></div>'
    }
  },
  methods: {},
  mounted: function() {},
}
</script>

<style scoped>
</style>