<template>
  <div class="gv-panel-title gv-color-scheme">
    <span :title="fullTitle" class="gv-color-scheme">{{ title }}</span>
    <el-button
      v-if="!noClose"
      class="gv-close gv-color-scheme"
      icon="el-icon-close"
      type="button"
      @click="closePanel"
      title="Chiudi Panello"
    ></el-button>
    <button
      v-if="collapsible"
      :class="toggleCollapseClass()"
      size="mini"
      @click="collapse"
      title="Mostra/Nascondi Pannello"
    ></button>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'gv-title',
  props: [
    'divId',
    'title',
    'fullTitle',
    'hide',
    'noClose',
    'collapsible',
    'width',
    'collapsedWidth',
  ],
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    closePanel: function() {
      let div = document.getElementById(this.divId);
      if (!div) return;
      this.hide ? (div.style.display = 'none') : div.parentNode.removeChild(div);
      GV.eventBus.$emit('title-close-panel', {
        divId: this.divId,
      });
    },
    collapse: function() {
      if (this.collapsed) {
        document.getElementById(this.collapsible).style.display = 'block';
        // if (this.width) {
        //   this.$el.style.width = this.width;
        // } else {
        this.$el.style.width = null;
        // }
      } else {
        document.getElementById(this.collapsible).style.display = 'none';
        if (this.collapsedWidth) {
          this.$el.style.width = this.collapsedWidth;
        }
      }
      this.collapsed = !this.collapsed;
    },
    toggleCollapseClass() {
      return this.collapsed
        ? 'gv-title-collapse gv-color-scheme el-icon-arrow-down'
        : 'gv-title-collapse gv-color-scheme el-icon-arrow-up';
    },
  },
  mounted: function() {
    this.$el.id = this.divId + '-title';
    // if (this.width) {
    //   this.$el.style.width = this.width;
    // } else {
    // const parentWidth = document.getElementById(this.divId).style.width;
    // this.$el.style.width = parentWidth;
    // }
  },
};
</script>

<style scoped>
.gv-panel-title {
  position: relative;
  display: block;
  padding: 0.3rem 0.5rem;
  margin-bottom: -1px;
  color: #ccc;
  font-weight: bold;
}

.gv-panel-title :focus {
  outline: -webkit-focus-ring-color auto 0px;
}

.gv-panel-title span {
  font-size: 14px;
  font-weight: bold;
  height: 20px;
}

.gv-title-collapse {
  cursor: pointer;
  border: 0;
  -webkit-appearance: none;
  float: right;
  font-size: 14px;
  margin-right: -4px;
  margin-top: 3px;
  opacity: 1;
}

.gv-close {
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
  -webkit-appearance: none;
  float: right;
  font-size: 1rem;
  line-height: 1;
  font-weight: bold;
  color: #ffffff;
  margin-left: 5px;
  margin-right: 3px;
  margin-top: 3px;
  opacity: 0.5;
}
</style>
