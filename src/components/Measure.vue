<template> 
    <div id="gv-measure-panel" class="gv-measure-panel">
        <gv-title title="Misurazioni" :divId="'gv-measure-panel'" :noClose="true"></gv-title>
        <div class="gv-measure-panel-body gv-inverted-color-scheme">
          <el-button id="gv-measure-point" title="Misure Puntuali (Coordinate)" @click="measurePoint" class="gv-color-scheme fg-measure" size="mini" />
          <el-button id="gv-measure-line" title="Misure Lineari" @click="measureLine" class="gv-color-scheme fg-measure-line" size="mini" />
          <el-button id="gv-measure-area" title="Misure Areali" @click="measureArea" class="gv-color-scheme fg-measure-area" size="mini" />
          <div v-show="showInfo" id="gv-measure-panel-info" class="gv-measure-panel-result gv-inverted-color-scheme">
              <p>Seleziona il bottone relativo<br></p>
              <table width="90%">
                <tr>
                  <td>
                    <el-button id="gv-measure-point" title="Misure Puntuali (Coordinate)" @click="measurePoint" class="gv-color-scheme fg-measure" size="mini" /> Misure Puntuali (Coordinate)
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-button id="gv-measure-line" title="Misure Lineari" @click="measureLine" class="gv-color-scheme fg-measure-line" size="mini" /> Misure Lineari (Lunghezza)
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-button id="gv-measure-area" title="Misure Areali" @click="measureArea" class="gv-color-scheme fg-measure-area" size="mini" /> Misure Poligonali (Aree)
                  </td>
                </tr>
              </table> 
              <br>
          </div>
          <div v-show="showInfoPoint" id="gv-measure-panel-info" class="gv-measure-panel-result gv-inverted-color-scheme">
              <p>Disegna il punto sulla mappa<br></p>
              <br>
          </div>
          <div v-show="showInfoLine" id="gv-measure-panel-info" class="gv-measure-panel-result gv-inverted-color-scheme">
              <p>Disegna la linea sulla mappa<br></p>
              <br>
          </div>
          <div v-show="showInfoArea" id="gv-measure-panel-info" class="gv-measure-panel-result gv-inverted-color-scheme">
              <p>Disegna il poligono sulla mappa<br></p>
              <br>
          </div>
          <div v-show="showResultPoint" id="gv-measure-panel-result-point" class="gv-measure-panel-result gv-inverted-color-scheme">
            <p>Coordinate:</p>
            <p>
              <table width="90%">
                <tr>
                  <td>
                    WGS84
                  </td>
                  <td>
                    {{resultPointWGS84}}
                  </td>
                </tr>
                <tr>
                  <td>
                    GAUSS-BOAGA
                  </td>
                  <td>
                    {{resultPointGB}}
                  </td>
                </tr>
                <tr>
                  <td>
                    ETRS89/UTM32N
                  </td>
                  <td>
                    {{resultPointETRF89}}
                  </td>
                </tr>
                <tr>
                  <td>
                    QUOTA
                  </td>
                  <td>
                    {{resultPointHeight}}
                  </td>
                </tr>
              </table>
            </p>
          </div>
          <div v-show="showResultLine" id="gv-measure-panel-result-line" class="gv-measure-panel-result gv-inverted-color-scheme">
              <p>Lunghezza:<br></p>
              <table width="90%">
                <tr>
                  <td>
                    {{resultLine}} 
                  </td>
                </tr>
              </table>              
              <br>
          </div>
          <div v-show="showResultArea" id="gv-measure-panel-result-area" class="gv-measure-panel-result gv-inverted-color-scheme">
              <p><span>Area:</span></p>
              <p>
              <table width="90%">
                <tr>
                  <td>
                    {{resultArea/10000}} ha
                  </td>
                </tr>
                <tr>
                  <td>
                    {{resultArea}} m<SUP>2</SUP>
                  </td>
                </tr>
                <tr>
                  <td>
                    {{resultArea/1000000}} km<SUP>2</SUP>
                  </td>
                </tr>
              </table>   
              </p>         
          </div>
        </div>
    </div>
</template>

<script>
// require('../leaflet/leaflet.draw-src.js')
// require("../leaflet/leaflet.drawlocal.js");

import Vue from 'vue'
import getCoordTransform from '../services/getCoordTransform'
import getElevation from '../services/getElevation'

import { Button } from 'element-ui'
Vue.use(Button)

export default {
  name: 'gv-measure-panel',
  data() {
    const options = GV.config.getToolOptions("gv-measure-button");

    return {
      options: options,
      title: options.title || "Misurazioni",
      buttonDisabled: true,
      pointClass: 'el-button--default el-button--mini el-button gv-color-scheme fg-measure',
      lineClass: 'el-button--default el-button--mini el-button gv-color-scheme fg-measure-line',
      areaClass: 'el-button--default el-button--mini el-button gv-color-scheme fg-measure-area',
      activeHandler: null,
      layer: null,
      type: null,
      resultPointWGS84: null,
      resultPointGB: null,
      resultPointHeight: null,
      resultPointETRF89: null,
      resultLine: null,
      resultArea: 0,
      showInfo: true,
      showInfoPoint: false,
      showInfoLine: false,
      showInfoArea: false,
      showResultPoint: false,
      showResultLine: false,
      showResultArea: false,
      pointHandler: new L.Draw.Marker(GV.app.map.map, {
        icon: L.icon({
          iconUrl: '/geoservices/apps/viewer/dist/static/img/marker-icon.png',
          iconSize: [12, 20],
          iconAnchor: [6, 20],
        }),
      }),
      lineHandler: new L.Draw.Polyline(GV.app.map.map, {
        shapeOptions: {
          color: '#FF9900',
        },
      }),
      areaHandler: new L.Draw.Polygon(GV.app.map.map, {
        allowIntersection: false,
        showArea: true,
        metric: true,
        shapeOptions: {
          color: '#FF9900',
        },
      }),
    }
  },
  methods: {
    measurePoint() {
      this.clear()
      this.setClass('point')
      this.pointHandler.enable()
    },
    measureLine() {
      this.clear()
      this.setClass('line')
      this.lineHandler.enable()
    },
    measureArea() {
      this.clear()
      this.setClass('area')
      this.areaHandler.enable()
    },
    setClass(type) {
      document.getElementById('gv-measure-point').className = this.pointClass
      document.getElementById('gv-measure-line').className = this.lineClass
      document.getElementById('gv-measure-area').className = this.areaClass
      this.showInfo=(type)? false : true
      switch (type) {
        case 'point':
          document.getElementById('gv-measure-point').className = this.pointClass + ' gv-button-selected'
          this.showInfoPoint=true
          break
        case 'line':
          document.getElementById('gv-measure-line').className = this.lineClass + ' gv-button-selected'
          this.showInfoLine=true
          break
        case 'area':
          document.getElementById('gv-measure-area').className = this.areaClass + ' gv-button-selected'
          this.showInfoArea=true
          break
      }
    },
    clear() {
      this.pointHandler.disable()
      this.lineHandler.disable()
      this.areaHandler.disable()

      this.showInfoPoint=false
      this.showInfoLine=false
      this.showInfoArea=false

      this.showResultPoint = false
      this.showResultLine = false
      this.showResultArea = false

      this.resultPointWGS84 = null
      this.resultPointGB = null
      this.resultPointETRF89 = null
      this.resultLine = null
      this.resultArea = null

      this.setClass(null)
      if (this.layer) {
        GV.app.map.removeLayer(this.layer)
      }
    },
    handleMarker(latlng) {
      this.resultPointHeight = null
      this.resultPointWGS84 = latlng.lng.toFixed(6) + ',' + latlng.lat.toFixed(6)
      getCoordTransform('4326', '3003', latlng.lng, latlng.lat).then(response => { 
        if (response.data.points) {
          const coords = response.data.points[0].split(',')
          this.resultPointGB = parseInt(coords[0]) + ',' + parseInt(coords[1])
        }
      })
      getCoordTransform('4326', '25832', latlng.lng, latlng.lat).then(response => {
        if (response.data.points) {
          const coords = response.data.points[0].split(',')
          this.resultPointETRF89 = parseInt(coords[0]) + ',' + parseInt(coords[1])
        }
      })
      getElevation('4326', latlng.lng, latlng.lat).then(response => {
        if (response.data.status === "OK" && response.data.elevation) { 
          this.resultPointHeight = response.data.elevation[0]
        } else {
          this.resultPointHeight = null
        }
      })
      this.showResultPoint = true
    },
    handleLine(data) {
      const length = parseInt(this.lineHandler._measurementRunningTotal) //in metri
      if (length < 1000) {
        this.resultLine = length + ' m'
      } else {
        this.resultLine = length / 1000 + ' km' 
      }
      this.showResultLine = true
    },
    handleArea(data) {

      this.resultArea = parseInt(this.areaHandler._area)
      this.showResultArea = true
    },
    drawCreated(e) {
      this.type = e.layerType
      this.layer = e.layer
      this.layer.addTo(GV.app.map)
      switch (this.type) {
        case 'marker':
          this.handleMarker(this.layer.editing._marker._latlng)
          break
        case 'polyline':
          this.handleLine(this.layer.editing)
          break
        case 'polygon':
          this.handleArea(this.layer.editing)
          break
      }
    }    
  },
  mounted: function() {
    GV.eventBus.$on("gv-control-measure-activate", ev => {
      GV.app.map.on("draw:created", e => {
        this.drawCreated(e);
      });
    });
    GV.eventBus.$on('gv-control-measure-deactivate', ev => {
      this.clear()
      GV.app.map.off('draw:created')
    })
    GV.app.map.on('draw:created', e => {
      this.drawCreated(e);
    })
  },
}
</script>

<style>
.gv-measure-panel {
  position: absolute;
  width: 350px;
  left: 0px;
  top: 0px;
  margin-left: 10px;
  margin-top: 50px;
  z-index: 800;
}

@media only screen and (max-width: 420px) {
  .gv-measure-panel {
    margin-left: 0px;
    margin-top: 28px;
  }
}

.gv-measure-panel-body {
  position: absolute;
  padding: 10px;
  overflow-y: auto;
  width: 330px;
  height: 200px;
}

.gv-measure-panel-result {
  position: absolute;
  background-color: #fff;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 0px;
  margin-top: 10px;
  width: 310px;
}

/* .gv-measure-panel-body span {
  background-color: #fff;
  padding-left: 15px;
  padding-top: 5px;
  margin: 0px;
} */
</style>
