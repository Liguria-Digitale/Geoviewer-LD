<template>
  <div id="image-map"></div>
</template>

<script>
// import L from 'leaflet';
// import '../assets/css/leaflet-control-credits.css';
// import '../leaflet/leaflet-control-credits.js';

export default {
  name: 'image-viewer',
  props: ['imgUrl', 'logo', 'width', 'height'],
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  computed: {},
  methods: {
    init() {
      this.img = new Image();
      this.img.src = this.imgUrl;
      this.img.onload = () => {
        this.loadImage();
      };
    },
    loadImage() {
      const img = this.img;
      this.newHeight = this.height;
      // this.newHeight = this.width * (img.height / img.width);

      document
        .getElementById('image-map')
        .setAttribute('style', 'width:' + this.width + 'px; height:' + this.newHeight + 'px');

      var maxZoom =
        Math.ceil(
          Math.log(
            this.width / img.width > this.newHeight / img.height
              ? img.width / this.width
              : img.height / this.newHeight
          ) / Math.log(2)
        ) + 1;

      var map = L.map('image-map', {
        minZoom: 1,
        maxZoom: maxZoom,
        zoomSnap: 0.2,
        crs: L.CRS.Simple,
      });

      var bounds = new L.LatLngBounds(
        map.unproject([0, img.height], maxZoom),
        map.unproject([img.width, 0], maxZoom)
      );
      L.imageOverlay(img.src, bounds).addTo(map);
      map.setMaxBounds(bounds);
      map.fitBounds(bounds);

      // L.control.zoom().addTo(map);
      L.controlCredits({
        image: this.logo,
        position: 'bottomleft',
      }).addTo(map);
    },
  },
};
</script>

<style scoped>
#image-map {
  border: 1px solid #ccc;
  background-color: #ccc;
}
</style>
