import Vue from 'vue';

let tools = [];

tools.push({
  name: 'gv-geocoder',
});
import Geocoder from './components/Geocoder.vue';
Vue.component('gv-geocoder', Geocoder);

tools.push({
  name: 'gv-search',
});
import Search from './components/Search.vue';
Vue.component('gv-search', Search);

tools.push({
  name: 'gv-scalebar',
});
import Scalebar from './components/Scalebar.vue';
Vue.component('gv-scalebar', Scalebar);

tools.push({
  name: 'gv-inner-html',
});
import InnerHtml from './components/InnerHtml.vue';
Vue.component('gv-inner-html', InnerHtml);

tools.push({
  name: 'gv-add-map-button',
});
import AddMap from './components/buttons/AddMap.vue';
Vue.component('gv-add-map-button', AddMap);

tools.push({
  name: 'gv-info-button',
});
import Info from './components/buttons/Info.vue';
Vue.component('gv-info-button', Info);

tools.push({
  name: 'gv-coordinate-button',
});
import Coordinate from './components/buttons/Coordinate.vue';
Vue.component('gv-coordinate-button', Coordinate);

tools.push({
  name: 'gv-measure-button',
});
import Measure from './components/buttons/Measure.vue';
Vue.component('gv-measure-button', Measure);

tools.push({
  name: 'gv-draw-button',
});
import Draw from './components/buttons/Draw.vue';
Vue.component('gv-draw-button', Draw);

tools.push({
  name: 'gv-download-totale-button',
});
import DownloadTotale from './components/buttons/DownloadTotale.vue';
Vue.component('gv-download-totale-button', DownloadTotale);

tools.push({
  name: 'gv-layer-search-button',
});
import LayerSearch from './components/buttons/LayerSearch.vue';
Vue.component('gv-layer-search-button', LayerSearch);

tools.push({
  name: 'gv-layer-search-topo-button',
});
import LayerSearchTopo from './components/buttons/LayerSearchTopo.vue';
Vue.component('gv-layer-search-topo-button', LayerSearchTopo);

tools.push({
  name: 'gv-map-selezione-fogli',
});
import SelezioneFogli from './components/SelezioneFogli.vue';
Vue.component('gv-map-selezione-fogli', SelezioneFogli);

tools.push({
  name: 'gv-print-button',
});
import Print from './components/buttons/Print.vue';
Vue.component('gv-print-button', Print);

tools.push({
  name: 'gv-back-button',
});
import Back from './components/buttons/Back.vue';
Vue.component('gv-back-button', Back);

// Bottone Switch3D
tools.push({ name: 'gv-switch3D-button' });
import Switch3D from './components/buttons/Switch3D.vue';
Vue.component('gv-switch3D-button', Switch3D);

// Bottone Help3D
tools.push({ name: 'gv-help3D-button' });
import Help3D from './components/buttons/Help3D.vue';
Vue.component('gv-help3D-button', Help3D);

// Bottone InsertPoint
tools.push({ name: 'gv-insert-point-button' });
import InsertPoint from './components/buttons/InsertPoint.vue';
Vue.component('gv-insert-point-button', InsertPoint);

// Bottone GeocoderBtn
tools.push({ name: 'gv-geocoder-btn-button' });
import GeocoderBtn from './components/buttons/GeocoderBtn.vue';
Vue.component('gv-geocoder-btn-button', GeocoderBtn);

// -------------------------------------------------------------------------------- //

export default tools;
