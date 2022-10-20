<template>
  <div id="gv-measure-panel" class="gv-measure-panel">
    <gv-title :title="title" :divId="'gv-measure-panel'" :noClose="true"></gv-title>
    <div class="gv-measure-panel-body gv-inverted-color-scheme">
      <el-button
        id="gv-measure-point"
        title="Misure Puntuali (Coordinate)"
        @click="measure('Point')"
        class="gv-color-scheme fg-measure"
        size="mini"
      />
      <el-button
        id="gv-measure-line"
        title="Misure Lineari"
        @click="measure('LineString')"
        class="gv-color-scheme fg-measure-line"
        size="mini"
      />
      <el-button
        id="gv-measure-area"
        title="Misure Areali"
        @click="measure('Polygon')"
        class="gv-color-scheme fg-measure-area"
        size="mini"
      />
      <!-- <el-button
        id="gv-measure-clear"
        title="Pulisci"
        @click="clear"
        class="el-button--default el-button--mini el-button gv-color-scheme el-icon-delete"
        size="mini"
      /> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import { Button } from 'element-ui';
Vue.use(Button);

export default {
  name: 'gv-measure-panel',
  data() {
    const options = GV.config.getToolOptions('gv-measure-button');

    return {
      options: options,
      title: options.title || 'Misurazioni',
      pointClass: 'el-button--default el-button--mini el-button gv-color-scheme fg-measure',
      lineClass: 'el-button--default el-button--mini el-button gv-color-scheme fg-measure-line',
      areaClass: 'el-button--default el-button--mini el-button gv-color-scheme fg-measure-area',
      layer: null,
      type: null,
      sketch: null,
      helpTooltipElement: null,
      helpTooltip: null,
      measureTooltipElement: null,
      measureTooltip: null,
      continuePolygonMsg: 'Click per continuare il disegno del poligono',
      continueLineMsg: 'Click per continuare il disegno della linea',
      measureTooltip: null,
      draw: null,
      style: new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    };
  },
  methods: {
    pointerMoveHandler(evt) {
      if (evt.dragging) {
        return;
      }
      let helpMsg = 'Click per disegnare';
      if (this.sketch) {
        const geom = this.sketch.getGeometry();
        if (geom instanceof ol.geom.Polygon) {
          helpMsg = this.continuePolygonMsg;
        } else if (geom instanceof ol.geom.LineString) {
          helpMsg = this.continueLineMsg;
        }
      }
      this.helpTooltipElement.innerHTML = helpMsg;
      this.helpTooltip.setPosition(evt.coordinate);
      this.helpTooltipElement.classList.remove('hidden');
    },
    addInteraction(type) {
      this.draw = new ol.interaction.Draw({
        source: this.layer.getSource(),
        type: type,
        style: this.style,
      });
      GV.app.map.addInteraction(this.draw);

      this.createMeasureTooltip();
      this.createHelpTooltip();

      let listener;
      this.draw.on('drawstart', evt => {
        this.sketch = evt.feature;
        let tooltipCoord = evt.coordinate;
        listener = this.sketch.getGeometry().on('change', evt => {
          const geom = evt.target;
          let output;
          if (geom instanceof ol.geom.Polygon) {
            output = this.formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof ol.geom.LineString) {
            output = this.formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          this.measureTooltipElement.innerHTML = output;
          this.measureTooltip.setPosition(tooltipCoord);
        });
      });

      this.draw.on('drawend', evt => {
        const geom = this.sketch.getGeometry();
        if (geom instanceof ol.geom.Point) {
          this.printPointToolTip(geom.getCoordinates(), listener);
        } else {
          this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
          this.measureTooltip.setOffset([0, -7]);
          this.sketch = null;
          // unset tooltip so that a new one can be created
          this.measureTooltipElement = null;
          this.createMeasureTooltip();
          ol.Observable.unByKey(listener);
        }
      });
    },
    printPointToolTip(coords, listener) {
      this.measureTooltipElement.innerHTML = 'Trasformazione coordinate.<br>Attendere...';
      this.measureTooltip.setPosition(coords);
      fetch(
        `/geoservices/REST/coordinate/measure/${coords.join(',')}`
      )
        .then(response => response.json())
        .then(data => {
          const wgs84 = data.points['4326'];
          const gb = data.points['3003'];
          const etrf89 = data.points['25832'];
          const elevation = data.elevation;
          const html = `
              <table width="90%">
              <tr><td>WGS84</td><td>${wgs84}</td></tr>
              <tr><td>GAUSS-BOAGA</td> <td>${gb}</td></tr>
              <tr><td>ETRS89/UTM32N</td> <td>${etrf89}</td></tr> 
              <tr><td>QUOTA (s.l.m.)</td> <td>${elevation}</td>
              </tr></table>          
          `;
          // <tr><td>QUOTA</td> <td>44</td>
          this.measureTooltipElement.innerHTML = html;
          this.measureTooltip.setPosition(coords);
          this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
          this.measureTooltip.setOffset([0, -12]);
          this.sketch = null;
          this.measureTooltipElement = null;
          this.createMeasureTooltip();
          ol.Observable.unByKey(listener);
        });
    },
    createMeasureTooltip() {
      if (this.measureTooltipElement) {
        this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
      }
      this.measureTooltipElement = document.createElement('div');
      this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
      this.measureTooltip = new ol.Overlay({
        element: this.measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false,
      });
      GV.app.map.addOverlay(this.measureTooltip);
    },
    createHelpTooltip() {
      if (this.helpTooltipElement) {
        this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
      }
      this.helpTooltipElement = document.createElement('div');
      this.helpTooltipElement.className = 'ol-tooltip hidden';
      this.helpTooltip = new ol.Overlay({
        element: this.helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left',
      });
      GV.app.map.addOverlay(this.helpTooltip);
    },
    formatLength(line) {
      const length = ol.sphere.getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
      } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';
      }
      return output;
    },
    formatArea(polygon) {
      const area = ol.sphere.getArea(polygon);
      let output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
      } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
      }
      return output;
    },
    measure(type) {
      this.type = type;
      this.setButtonClass(null);
      this.setButtonClass(type);

      this.layer.getSource().clear(true);
      GV.app.map.getOverlays().clear();

      GV.app.map.on('pointermove', this.pointerMoveHandler);
      if (this.draw) GV.app.map.removeInteraction(this.draw);
      this.addInteraction(type);
    },
    setButtonClass(type) {
      document.getElementById('gv-measure-point').className = this.pointClass;
      document.getElementById('gv-measure-line').className = this.lineClass;
      document.getElementById('gv-measure-area').className = this.areaClass;
      switch (type) {
        case 'Point':
          document.getElementById('gv-measure-point').className =
            this.pointClass + ' gv-button-selected';
          break;
        case 'LineString':
          document.getElementById('gv-measure-line').className =
            this.lineClass + ' gv-button-selected';
          break;
        case 'Polygon':
          document.getElementById('gv-measure-area').className =
            this.areaClass + ' gv-button-selected';
          break;
      }
    },
    clear() {
      this.layer.getSource().clear(true);
      GV.app.map.getOverlays().clear();
      GV.app.map.removeInteraction(this.draw);
      this.setButtonClass(null);
    },
  },
  mounted: function() {
    GV.eventBus.$on('gv-control-measure-activate', ev => {
    });
    GV.eventBus.$on('gv-control-measure-deactivate', ev => {
      this.clear();
    });
    this.layer = new ol.layer.Vector({
      source: new ol.source.Vector(),
      style: this.style,
      zIndex: 800,
    });
    GV.app.map.addLayer(this.layer);
  },
};
</script>

<style>
.gv-measure-panel {
  position: absolute;
  width: 150px;
  left: 0px;
  top: 0px;
  margin-left: 10px;
  margin-top: 50px;
  z-index: 800;
}

.gv-measure-panel-body {
  position: absolute;
  padding: 10px;
  overflow-y: auto;
  width: 130px;
  height: 25px;
}

.ol-tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
  font-size: 12px;
}
.ol-tooltip-measure {
  opacity: 1;
  font-weight: bold;
}
.ol-tooltip-static {
  background-color: #ffcc33;
  color: black;
  border: 1px solid white;
}
.ol-tooltip-measure:before,
.ol-tooltip-static:before {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: '';
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}
.ol-tooltip-static:before {
  border-top-color: #ffcc33;
}
</style>
