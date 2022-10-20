<template>
  <div id="gv-help3D-panel" class="gv-help3D-panel">
    <gv-title :title="title" :divId="'gv-help3D-panel'"></gv-title>
    <div class="gv-help3D-body gv-inverted-color-scheme">
      <el-tabs v-model="activeTab" tabPosition="left">
        <el-tab-pane label="Mouse" name="mouse">
          <table>
            <tbody>
              <tr>
                <td>
                  <img
                    src="/geoservices/apps/viewer/static/img/cesium-help/MouseLeft.svg"
                    width="48"
                    height="48"
                  />
                </td>
                <td>
                  <div class="cesium-navigation-help">Pan</div>
                  <div class="cesium-navigation-help-details">
                    Premi il tasto sinistro e trascina
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src="/geoservices/apps/viewer/static/img/cesium-help/MouseRight.svg"
                    width="48"
                    height="48"
                  />
                </td>
                <td>
                  <div class="cesium-navigation-help">Zoom</div>
                  <div class="cesium-navigation-help-details">
                    Premi il tasto destro e trascina, oppure
                  </div>
                  <div class="cesium-navigation-help-details">Scorri la rotella</div>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src="/geoservices/apps/viewer/static/img/cesium-help/MouseMiddle.svg"
                    width="48"
                    height="48"
                  />
                </td>
                <td>
                  <div class="cesium-navigation-help">Tilt/Rotazione</div>
                  <div class="cesium-navigation-help-details">
                    Premi sulla rotella e trascina, oppure
                  </div>
                  <div class="cesium-navigation-help-details">
                    Premi il tasto "CTRL", premi il tasto sinistro del mouse e trascina
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <el-tab-pane label="Touch" name="touch">
          <table>
            <tbody>
              <tr>
                <td>
                  <img
                    src="https://sandcastle.cesium.com/CesiumUnminified/Widgets/Images/NavigationHelp/TouchDrag.svg"
                    width="70"
                    height="48"
                  />
                </td>
                <td>
                  <div class="cesium-navigation-help">Pan</div>
                  <div class="cesium-navigation-help-details">Trascina un solo dito</div>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src="https://sandcastle.cesium.com/CesiumUnminified/Widgets/Images/NavigationHelp/TouchZoom.svg"
                    width="70"
                    height="48"
                  />
                </td>
                <td>
                  <div class="cesium-navigation-help">Zoom</div>
                  <div class="cesium-navigation-help-details">Apri o chiudi due dita</div>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src="https://sandcastle.cesium.com/CesiumUnminified/Widgets/Images/NavigationHelp/TouchTilt.svg"
                    width="70"
                    height="48"
                  />
                </td>
                <td>
                  <div class="cesium-navigation-help">Tilt</div>
                  <div class="cesium-navigation-help-details">
                    Trascina due dita nella stessa direzione
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src="https://sandcastle.cesium.com/CesiumUnminified/Widgets/Images/NavigationHelp/TouchRotate.svg"
                    width="70"
                    height="48"
                  />
                </td>
                <td>
                  <div class="cesium-navigation-help">Rotazione</div>
                  <div class="cesium-navigation-help-details">
                    Trascina due dita in direzione opposta
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import isTouch from '../util/isTouch';

import Vue from 'vue';
import { Tabs, TabPane } from 'element-ui';
Vue.use(Tabs);
Vue.use(TabPane);

export default {
  name: 'gv-help3D-panel',
  data() {
    return {
      options: GV.config.getToolOptions('gv-help3D-button'),
      title: 'Help Navigazione 3D',
      activeTab: isTouch() ? 'touch' : 'mouse',
    };
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style>
.gv-help3D-panel {
  position: absolute;
  width: 440px;
  right: 0px;
  bottom: 0px;
  margin-right: 5px;
  margin-bottom: 5px;
  z-index: 800;
}

.gv-help3D-body {
  padding: 15px;
  height: 230px;
}

/* .gv-help3D-body div {
  font-size: 12px;
} */

.cesium-navigation-help {
  font-weight: 800;
  font-size: 16px;
}
.cesium-navigation-help-details {
  font-weight: 400;
  font-size: 14px;
}
</style>
