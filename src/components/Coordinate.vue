<template>
  <div id="gv-coordinate-panel" class="gv-coordinate-panel">
    <gv-title title="Coordinate" :divId="'gv-coordinate-panel'" :noClose="true"></gv-title>
    <div class="gv-coodinate-panel-body gv-inverted-color-scheme">
      <p>
        X:
        <span id="gv-coordinate-panel-x">{{ x }}</span>
      </p>
      <p>
        Y:
        <span id="gv-coordinate-panel-y">{{ y }}</span>
      </p>
      <p>
        Z:
        <span id="gv-coordinate-panel-y">{{ z }}</span>
      </p>
      <br />
      <el-button
        id="gv-coordinate-panel-submit"
        ref="button"
        type="primary"
        @click="submit()"
        size="mini"
        :disabled="buttonDisabled"
      >
        <span>Conferma</span>
      </el-button>
      <el-button
        id="gv-coordinate-panel-cancel"
        ref="button"
        type="primary"
        @click="cancel()"
        size="mini"
      >
        <span>Annulla</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import getCoordTransform from '../services/getCoordTransform';
import getElevation from '../services/getElevation';

import { Button } from 'element-ui';
Vue.use(Button);

// const quota = GV.config.getToolOptions('gv-coordinate-button').quota;

export default {
  name: 'gv-coordinate-panel',
  data() {
    return {
      x: null,
      y: null,
      z: null,
      // quota: true,
      options: GV.config.getToolOptions('gv-coordinate-button'),
      buttonDisabled: true,
    };
  },
  methods: {
    submit() {
      if (this.options.submit) {
        this.options.submit(this.x, this.y, this.z);
      }
    },
    cancel() {
      if (this.options.cancel) {
        this.options.cancel();
      }
    },
    handleClickEvent(event) {
      if (GV.app.map.type === 'openlayers') {
        const coord = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        getElevation('4326', coord[0], coord[1]).then(response => {
          if (response.data.status === 'OK' && response.data.elevation) {
            this.z = response.data.elevation[0];
          } else {
            this.z = null;
          }
          this.buttonDisabled = false;
        });
        if (this.options.projection && this.options.projection !== 'EPSG:3857') {
          const srsIn = '3857';
          const srsOut = this.options.projection.replace('EPSG:', '');
          getCoordTransform(srsIn, srsOut, event.coordinate[0], event.coordinate[1]).then(
            response => {
              if (response.data.points) {
                const coords = response.data.points[0].split(',');
                this.x = parseInt(coords[0]);
                this.y = parseInt(coords[1]);
              }
              this.buttonDisabled = false;
            }
          );
        } else {
          this.x = event.coordinate[0];
          this.y = event.coordinate[1];
          this.buttonDisabled = false;
        }
      } else {
        getElevation('4326', event.latlng.lng, event.latlng.lat).then(response => {
          if (response.data.status === 'OK' && response.data.elevation) {
            this.z = response.data.elevation[0];
          } else {
            this.z = null;
          }
          this.buttonDisabled = false;
        });
        if (this.options.projection && this.options.projection !== 'EPSG:4326') {
          const srsIn = '4326';
          const srsOut = this.options.projection.replace('EPSG:', '');
          getCoordTransform(srsIn, srsOut, event.latlng.lng, event.latlng.lat).then(response => {
            if (response.data.points) {
              const coords = response.data.points[0].split(',');
              this.x = parseInt(coords[0]);
              this.y = parseInt(coords[1]);
            }
            this.buttonDisabled = false;
          });
        } else {
          this.x = event.latlng.lng;
          this.y = event.latlng.lat;
          this.buttonDisabled = false;
        }
      }
    },
  },
  mounted: function() {
    GV.eventBus.$on('gv-control-coordinate-activate', ev => {
      GV.app.map.on('click', event => {
        this.handleClickEvent(event);
      });
    });
    GV.eventBus.$on('gv-control-genio-seleziona-particelle-deactivate', ev => {
      GV.app.map.off('click');
    });
    GV.app.map.on('click', event => {
      this.handleClickEvent(event);
    });
  },
};
</script>

<style>
.gv-coordinate-panel {
  position: absolute;
  width: 210px;
  left: 0px;
  top: 0px;
  margin-left: 10px;
  margin-top: 50px;
  z-index: 800;
}

.gv-coodinate-panel-body {
  position: absolute;
  padding: 5px;
  overflow-y: auto;
  width: 200px;
  height: 120px;
}

.gv-coodinate-panel-body p {
  background-color: #fff;
  padding-left: 15px;
  padding-top: 5px;
  margin: 0px;
}
</style>
