<template>
  <div id="gv-insert-point-panel" class="gv-insert-point-panel">
    <gv-title title="Localizza Punto" :divId="'gv-insert-point-panel'"></gv-title>
    <div class="gv-insert-point-body gv-inverted-color-scheme">
      <el-form :model="form" ref="form">
         <el-form-item>
          <el-select id="gv-insert-point-crs" v-model="sistemaCoordinate" size="mini">
            <el-option
              v-for="item in sistemiCoordinate"
              :key="item.epsg_code"
              :value="item.epsg_code"
              :label="item.proj_descr"
            ></el-option>
          </el-select>
          </el-form-item>
         <el-form-item>
          <el-input
            id="gv-insert-point-x"
            style="width: 200px;"
            size="mini"
            placeholder="Coordinata X"
            type="number"
            v-model="x"
          ></el-input>
         </el-form-item>
         <el-form-item>
          <el-input
            id="gv-insert-point-x"
            style="width: 200px;"
            size="mini"
            placeholder="Coordinata Y"
            type="number"
            v-model="y"
          ></el-input>
         </el-form-item>          
         <el-form-item>
          <el-button
            id="gv-insert-point-submit"
            type="primary"
            size="mini"
            @click="submit"
            >Localizza</el-button
          >
         </el-form-item>      
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import { Input } from "element-ui";
Vue.use(Input);

export default {
  name: "gv-insert-point-panel",
  data() {
    return {
      sistemiCoordinate: [
        {
          epsg_code: '4258',
          proj_descr: 'WGS84 - Coordinate Geografiche',
        },
        {
          epsg_code: '3003',
          proj_descr: 'ROMA40 - Gauss-Boaga - Fuso Ovest',
        },
        {
          epsg_code: '25832',
          proj_descr: 'ETRF89 - Proiezione UTM - Fuso 32',
        },
      ],
      sistemaCoordinate: '4258',
      x: null,
      y: null,
      // x: 1541032,
      // y: 4898378,
      // x: 8.8,
      // y: 44.47,
    };
  },
  computed: {},
  methods: {
    submit() {
      const marker = {
        label: `${this.x},${this.y}`,
        value: 'id',
        location: [this.y, this.x],
        epsg: this.sistemaCoordinate,
        zoomLevel: 16,
      }
      GV.app.map.addMarker(marker)    
    }    
  }, 
  mounted() {}
};
</script>

<style>
.gv-insert-point-panel {
  position: absolute;
  width: 260px;
  left: 0px;
  top: 0px;
  margin-left: 10px;
  margin-top: 50px;
  z-index: 800;
}

@media only screen and (max-width: 420px) {
  .gv-insert-point-panel {
    margin-left: 0px;
    margin-top: 28px;
  }
}
.gv-insert-point-body {
  padding: 5px;
  width: 250px;
  height: 170px;
}
</style>

