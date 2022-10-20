<template>
    <el-select v-model="activeBaseLayer" @change="onChange" size="mini" placeholder="Sfondo">
        <el-option v-for="item in baseLayers" :label="item.label" :value="item.name" :key="item.name">
            <span style="float: left">
                <img class="gv-sfondi-icon" :src="item.icon" />
                <span class="gv-sfondi-label">{{ item.label }}</span>
            </span>
        </el-option>
    </el-select>
</template>


<script>
import Vue from 'vue'
import { Select, Option } from 'element-ui'
Vue.use(Select)
Vue.use(Option)

export default {
  name: 'gv-base-layer-switcher',
  data() {
    return {
      baseLayers: GV.config.baseLayers,
      activeBaseLayer: GV.config.activeBaseLayer,
    }
  },
  methods: {
    onChange(value) {
      GV.eventBus.$emit('change-base-layer', {
        layer: value,
      })
    },
  },
  mounted() {
    GV.baseLayerSwitcher = this
  },
}
</script>

<style scoped>
.gv-sfondi-label {
  vertical-align: top;
}

.gv-sfondi-icon {
  width: 24px;
  height: 24px;
  border: thin solid black;
}
</style>