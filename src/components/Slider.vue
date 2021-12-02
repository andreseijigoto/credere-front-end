<template>
  <div class="slider">
    <template v-for="slide in items" :key="slide.id">
      <div class="slider-item"
        :class="{ active: slide.id === active, [slide.layout]: slide.layout }">
        <div class="slider-bg" :style="`background-image: url(${slide.image })`">
        </div>
        <div class="slider-content"
          :class="`${slide.text_position || ''} ${slide.text_align || ''}`">
          <div class="slider-title" v-if="slide.text_title" v-html="slide.text_title">
          </div>
          <div class="slider-subtitle" v-if="slide.text_subtitle" v-html="slide.text_subtitle">
          </div>
          <div class="slider-description" v-if="slide.description" v-html="slide.description">
          </div>
        </div>
        <Button @click="nextSlide()">próximo</Button>
      </div>
    </template>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'Slider',
  components: { Button },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.active = this.items.length
      ? this.items[0].id
      : null;
  },
  data() {
    return {
      active: null,
    };
  },
  methods: {
    nextSlide() {
      if (this.items.find((x) => x.id === (this.active + 1))) {
        this.active += 1;
      } else {
        this.active = 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  border-radius: 5px;
  box-shadow: 0 0 5px 2.5px rgba(0, 0, 0, .25);
  height: 380px;
  overflow: hidden;
  position: relative;
  width: 780px;
  .slider-item {
    display: none;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    .slider-bg {
      background-position: center;
      background-size: cover;
      position: absolute;
      &:after {
        background: rgba(0, 0, 0, .5);
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        width: 100%;
      }
    }
    .slider-content {
      display: flex;
      flex-direction: column;
      padding: 2rem;
      position: relative;
      z-index: 1;
      &.text-bottom {
        justify-content: flex-end;
        height: 100%;
        width: calc(100% - 7rem);
      }
      &.text-center {
        justify-content: center;
        height: 100%;
        width: 100%;
      }
    }
    .slider-title {
      font-size: 2rem;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: bolder;
      line-height: 3rem;
      text-transform: uppercase;
    }
    .slider-subtitle {
      font-size: 1.5rem;
      line-height: 1.75rem;
    }
    .slider-description {
      font-size: 1.05rem;
      line-height: 1.5rem;
      &:deep(p:not(:first-child)){
        margin-top: 1rem;
      }
    }
    .button {
      z-index: 1;
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
    &.active {
      display: flex;
    }
    &.bg-full {
      .slider-bg {
        height: 100%;
        width: 100%;
      }
      .slider-content {
        color: white;
      }
    }
    &.bg-one-third {
      .slider-bg {
        height: 100%;
        width: 248px;
      }
      .slider-content {
        width: calc(100% - 248px);
      }
      .slider-title {
        margin-bottom: .5rem;
      }
      .slider-subtitle {
        font-weight: lighter;
        margin-bottom: 1.25rem;
        color: #999;
      }
    }
    &.bg-left {
      .slider-bg {
        left: 0;
      }
      .slider-content {
        margin-left: 248px;
      }
    }
    &.bg-half-top {
      .slider-bg {
        height: 50%;
        width: 100%;
      }
      .slider-content {
        padding: 0 2.5rem;
        justify-content: flex-end;
        .slider-title {
          color: white;
        }
        .slider-subtitle {
          color: white;
          padding: .5rem 0 1.5rem;
        }
        .slider-description {
          height: 50%;
          padding-top: 2rem;
          width: calc(100% - 7rem);
          &:deep(p:not(:first-child)){
            margin-top: 1rem;
          }
        }
      }
    }
  }
}
</style>
