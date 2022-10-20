<template>
  <div class='gv-carousel' >
        <!-- :height="height"  -->
      <el-carousel 
        type="card" 
        :interval="interval" 
        :autoplay="autoplay"
      >
        <el-carousel-item v-for="item in gallery" :key="item.id">
          <a v-if="openImgLink" :href="item.imgUrl" target="_Blank">
            <div class="item">
              <div :title="item.text" class="item__content">
                  {{item.text}}
              </div>
              <img :style="imgStyle" :src="item.imgUrl" :title="item.text" />
            </div>
          </a>
          <div v-else>
            <div class="item">
              <div :title="item.text" class="item__content">
                  {{item.text}}
              </div>
              <!-- <img :style="imgStyle" :src="item.imgUrl" :title="item.text" /> -->
              <img :src="item.imgUrl" :title="item.text" />
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>        
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

import { Carousel, CarouselItem } from 'element-ui';
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);

import lang from 'element-ui/lib/locale/lang/it';
import locale from 'element-ui/lib/locale';
locale.use(lang);

export default {
  name: 'gv-carousel',
  props: {
    url: String,
    height: {
      type: String,
      default: "200px"
    },
    interval: {
      type: Number,
      default: 4000
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    imgWidth: {
      type: String,
      default: "300px"
    },
    openImgLink: {
      type: Boolean,
      default: false
    },
  },
  data() {
    const imgStyle = `width: ${this.imgWidth};`  
    return {
      gallery: null,
      imgStyle: imgStyle,
    };
  },
  async mounted() {
    const result = await axios.get(this.url);
    if (result.data.gallery) {
      this.gallery = result.data.gallery
    }
  },
  methods: {
  },
};
</script>

<style>
  .item__content {
    position: absolute;
    bottom: 0;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 3px;
  }

  .item__image {
    width: 300px;
    object-fit: cover;
  }

  .el-carousel__item {
    height: auto !important;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
