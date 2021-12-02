<template>
  <div class="field">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Field',
};
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 1rem;
  &.label-inline {
    display: flex;
    align-items: center;
    white-space: nowrap;
    :deep(.label) {
      margin: .125rem 0 0 .25rem;
    }
  }
}
</style>
