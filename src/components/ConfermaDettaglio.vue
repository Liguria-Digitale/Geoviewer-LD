<template>
  <el-dialog width="50%" title="Conferma" :visible.sync="dialogVisible">
    <span>
      Prima di proseguire è necessario visualizzare il dettaglio delle condizioni di utilizzo.
      <br />Cliccando su
      <span style="color:#00377c;">
        <b>"Accetto"</b>
      </span> l’utente dichiara di aver preso visione dell’avviso.
    </span>
    <br />
    <br />
    <span>
      <a :href="link" target="_blank">{{label}}</a>
    </span>
    <span slot="footer">
      <el-button @click="cancel">
        <span style="color:#00377c;font-weight: bold;">Annulla</span>
      </el-button>
      <el-button type="primary" @click="submit">
        <span style="color:#ffffff;font-weight: bold;">Accetto</span>
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import Vue from "vue";
import { Dialog } from "element-ui";
Vue.use(Dialog);

export default {
  name: "gv-conferma-dettaglio",
  props: ["link", "label", "idMap"],
  data() {
    return {
      dialogVisible: true
    };
  },
  methods: {
    cancel() {
      this.dialogVisible = false;
    },
    submit() {
      GV.config.addCatMap(this.idMap, false, true);
      this.dialogVisible = false;
    }
  }
};
</script>

<style>
.el-dialog__body {
  color: #000000 !important;
}
.el-dialog__footer {
  background-color: #e7e7e7;
}
.el-dialog__header {
  background-color: #e7e7e7;
}
.el-dialog__body {
  background-color: #e7e7e7;
}
</style>