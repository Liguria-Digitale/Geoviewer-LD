<template>
  <div
    class="info-generico"
    id="gv-info-generico"
    :width="width"
    :max-width="width"
    :max-height="height"
  >
    <gv-title v-draggable title="Risultato Info" :divId="'gv-info-generico'"></gv-title>
    <div class="info-generico-body">
      <table border="0" cellpadding="2" width="90%">
        <tbody>
          <tr>
            <td class="sfondoBianco">
              <center>
                <table width="92%">
                  <tbody>
                    <tr>
                  <td width="10%" class="fogliaBT2">
                    <!-- CELLA PER LOGO -->
                    <img
                      border="0"
                      vspace="15"
                      src=""
                    />
                      </td>
                      <td id="Titolo" class="fogliaBT2">
                        <span>{{ title }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table width="92%" id="tableData">
                  <tbody>
                    <tr>
                      <th colspan="2" class="fogliaT">
                        <font color="#FFFFFF" size="-1">Risultato della Selezione</font>
                      </th>
                    </tr>
                    <tr v-for="item in items" :key="item.key">
                      <td class="fogliaL">
                        {{ item.key }}
                      </td>
                      <td class="foglia">{{ item.value }}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <table border="0" cellpadding="0" width="92%" cellspacing="0">
                  <tbody>
                    <tr>
                      <td colspan="2" id="linkGestionale"></td>
                    </tr>
                    <tr>
                      <td align="left">
                        <!-- CELLA PER LOGO FOOTER -->
                        <img
                          border="0"
                          vspace="15"
                          src=""
                          align="absmiddle"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
              </center>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'gv-info-generico',
  props: ['title', 'properties', 'width', 'height'],
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    Object.keys(this.properties).forEach(key => {
      const value = this.properties[key];
      if (typeof value === 'string' || value instanceof String || typeof value === 'number') {
        this.items.push({ key: key, value: value });
      }
    });
  },
};
</script>

<style scoped>
.info-generico {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 10px;
  margin-top: 80px;
  background-color: #fff;
  z-index: 800;

  font-size: 11px;
  font-family: verdana, arial, helvetica, sans-serif;
  color: #31708f;
}

.info-generico-body {
  padding: 10px;
}

table {
  width: 100%;
}
td {
  font-size: 10px;
  margin-right: 20px;
  font-family: Verdana, arial, helvetica;
  text-align: justify;
}
td.centro {
  font-size: 12px;
  margin-right: 20px;
  font-family: Verdana, arial, helvetica;
  background-color: #dddddd;
  text-align: center;
}

.fogliaT {
  padding-right: 4px;
  padding-left: 4px;
  font-size: 14px;
  padding-bottom: 4px;
  margin: 0px;
  padding-top: 4px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  color: #ccc !IMPORTANT;
  background-color: #31708f;
  text-align: justify;
  vertical-align: top;
  font-weight: bold;
}

.fogliaBT {
  padding-right: 4px;
  padding-left: 4px;
  font-size: 16px;
  padding-bottom: 4px;
  margin: 0px;
  padding-top: 4px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  background-color: #ffffff;
  text-align: justify;
  vertical-align: top;
  font-weight: bold;
}

.fogliaBT1 {
  padding-right: 4px;
  padding-left: 4px;
  font-size: 12px;
  padding-bottom: 4px;
  margin: 0px;
  padding-top: 4px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  background-color: #ffffff;
  text-align: center;
  vertical-align: top;
  font-weight: normal;
}

.fogliaBT1A {
  padding-right: 4px;
  padding-left: 4px;
  font-size: 14px;
  padding-bottom: 4px;
  margin: 0px;
  padding-top: 4px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  background-color: #ffffff;
  text-align: center;
  vertical-align: center;
  font-weight: bold;
}
.fogliaBT2 {
  padding-right: 4px;
  padding-left: 4px;
  font-size: 14px;
  margin: 0px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  background-color: #ffffff;
  text-align: left;
  vertical-align: middle;
  font-weight: bold;
}

td img {
  margin: 10px 2px 2px;
}

.fogliaBT2 img {
  margin: 2px 2px 10px;
}

.fogliaBT2C {
  padding-right: 4px;
  padding-left: 4px;
  font-size: 14px;
  padding-bottom: 4px;
  margin: 0px;
  padding-top: 4px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  background-color: #ffffff;
  text-align: left;
  vertical-align: center;
  font-weight: bold;
}

.fogliaL {
  padding-right: 4px;
  padding-left: 4px;
  font-size: 12px;
  padding-bottom: 4px;
  margin: 0px;
  padding-top: 4px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  background-color: #99cccc;
  text-align: left;
  vertical-align: top;
  font-weight: bold;
}

.foglia {
  padding-right: 4px;
  padding-left: 4px;
  font-size: 12px;
  padding-bottom: 4px;
  margin: 0px;
  padding-top: 4px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  background-color: #99cccc;
  text-align: left;
  vertical-align: top;
}

.fogliaLCar {
  padding-right: 4px;
  padding-left: 4px;
  font-size: 10px;
  padding-bottom: 4px;
  margin: 0px;
  padding-top: 4px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  background-color: #99cccc;
  text-align: left;
  vertical-align: top;
  font-weight: bold;
}
</style>
