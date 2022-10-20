<template>
  <div id="gv-search" class="gv-search">
    <el-select
      id="gv-seach-input"
      v-model="address"
      filterable
      clearable
      remote
      size="mini"
      :placeholder="placeHolder"
      :remote-method="search"
      @change="onChange"
      :loading="loading"
      loading-text="Caricamento... "
      no-match-text="Nessun elemento trovato"
      no-data-text="Nessun elemento trovato"
    >
      <el-option v-for="item in results" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import Vue from 'vue';
import { Select, Option } from 'element-ui';
Vue.use(Select);
Vue.use(Option);

export default {
  data() {
    return {
      results: [],
      address: [],
      recordsCache: {},
      layers: null,
      cachedLayers: [],
      propertyName: null,
      loading: false,
      marker: null,
      placeHolder: 'Ricerca...',
    };
  },
  mounted: function() {
    this.layers = GV.config.getToolOptions('gv-search').layers;
    this.propertyName = GV.config.getToolOptions('gv-search').propertyName;
    this.additionalLabel = GV.config.getToolOptions('gv-search').additionalLabel;
    this.placeHolder = GV.config.getToolOptions('gv-search').placeHolder || 'Ricerca...';
  },
  methods: {
    search(query) {
      this.results = [];
      if (query.length < 3) {
        return;
      }
      this.results = this.filterData(query);
    },
    filterData(text) {
      let results = [];
      text = text.replace(/[*+?^${}()|[\]\\]/g, '');
      if (text === '') {
        return [];
      }
      this.layers.forEach(sLayer => {
        GV.app.map.eachLayer(layer => {
          if (layer.name === sLayer) {
            if (layer instanceof L.LayerGroup) {
              layer.eachLayer(m => {
                let loc = m.getLatLng();
                loc.layer = m;
                if (m.feature) {
                  const key = m.feature.properties[this.propertyName];
                  if (new RegExp(text, 'i').test(key)) {
                    const addLabel = this.additionalLabel
                      ? m.feature.properties[this.additionalLabel]
                      : null;
                    const label = this.additionalLabel ? `${key} (${addLabel})` : key;
                    results.push({
                      label: label,
                      value: label,
                      location: loc,
                    });
                  }
                }
              });
            }
          }
        });
      });
      return results;
    },
    onChange(value) {
      let marker = this.results.find(item => item.value === value);
      if (marker) {
        marker.type = 'circle';
        marker.zoomLevel = 16;
        this.marker = GV.app.map.addMarker(marker);
      } else {
        if (this.marker) {
          GV.app.map.removeLayer(this.marker);
        }
      }
    },
  },
};
</script>

<style>
.gv-search {
  height: 32px;
  width: 250px;
  z-index: 800;
  margin-top: 5px;
  display: inline-block;
}
.el-select {
  width: 250px;
}
</style>
