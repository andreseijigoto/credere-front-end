<template>
  <button class="button" :disabled="disabled" @click="click">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    disabled: Boolean,
  },
  methods: {
    click($evt) {
      $evt.preventDefault();
      $evt.stopImmediatePropagation();
      if (!$evt.target.disabled) {
        this.$emit('click', $evt);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
    @extend %base-transition;
    border: none;
    border-radius: .25rem;
    background-color: $button-background-color;
    color: $button-color;
    cursor: pointer;
    height: 2.5rem;
    width: 102px;
    border-bottom: 2px solid $button-border-hover-color;
    &[disabled] {
      background-color: #AAA !important;
      border-bottom-color: #999 !important;
      cursor: not-allowed !important;
    }
    &:hover {
        border-bottom-width: 4px !important;
    }
    &:active {
        border-bottom-width: 0px !important;
    }
    &.success {
        background-color: $button-success-background-color;
        border-bottom: 2px solid $button-success-border-hover-color;
    }
    &.small {
        font-size: .75rem;
        height: 1.5rem;
        width: 4rem;
    }
}
</style>
