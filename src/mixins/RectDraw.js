import notification from '../util/notification';

export default {
  data() {
    return {
      drawnRectangle: null,
      dragBoxInteraction: null,
    };
  },
  methods: {
    rectAddLayer() {
      if (GV.app.map.type === 'openlayers') {
        this.rectAddLayerOL();
      } else {
        this.drawnRectangle = new L.FeatureGroup();
        GV.app.map.addLayer(this.drawnRectangle);
      }
    },
    rectAddLayerOL() {
      GV.app.map.loadLayers([
        {
          name: 'DrawnRectangle',
          type: 'JSON',
          visible: true,
          zIndex: 100,
        },
      ]);
      this.drawnRectangle = GV.app.map.getLayerByName('DrawnRectangle');
    },
    rectEnable() {
      notification('Disegna un rettangolo sulla mappa');
      if (GV.app.map.type === 'openlayers') {
        this.dragBoxInteraction = new ol.interaction.DragBox({});
        GV.app.map.addInteraction(this.dragBoxInteraction);
        this.dragBoxInteraction.on('boxend', this.rectOnDraw);
      } else {
        if (!GV.app.map.map.drawRectangle) {
          GV.app.map.addHandler('drawRectangle', L.Draw.Rectangle);
        }
        GV.app.map.map.drawRectangle.enable();
        GV.app.map.on('draw:created', this.rectOnDraw);
      }
    },
    rectReset() {
      if (GV.app.map.type === 'openlayers') {
        if (this.drawnRectangle) {
          this.drawnRectangle.getSource().clear();
        }
      } else {
        if (this.drawnRectangle) {
          this.drawnRectangle.clearLayers();
        }
        if (GV.app.map.map.drawRectangle) {
          GV.config.activeControl.deactivate();
          GV.app.map.map.drawRectangle.disable();
          GV.app.map.map.drawRectangle.enable();
        }
      }
    },
    rectDisable() {
      if (GV.app.map.type === 'openlayers') {
        GV.app.map.removeInteraction(this.dragBoxInteraction);
        if (this.drawnRectangle) {
          this.drawnRectangle.getSource().clear();
        }
      } else {
        if (GV.app.map.map.drawRectangle) {
          GV.app.map.map.drawRectangle.disable();
        }
        if (this.drawnRectangle) {
          this.drawnRectangle.clearLayers();
        }
      }
    },
  },
  mounted: function() {
    this.rectAddLayer();
  },
};
