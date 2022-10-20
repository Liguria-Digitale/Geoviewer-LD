<template>
  <div>
    <div>
      <div class="gv-html-panel-body">
        <iframe
          id="iframe"
          :src="src"
          :srcdoc="html"
          :height="height"
          :width="width"
          style="border: none;"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'gv-iframe-panel',
  props: ['html', 'src', 'width', 'height'],
};
</script>

<style>
.gv-html-panel-body iframe {
  max-height: 620px;
}
</style>
