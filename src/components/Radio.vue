<template>
  <Field class="label-inline">
    <input type="radio" @click="setValue($event)" :checked="checked" />
    <label class="label" v-if="label" v-html="label"></label>
  </Field>
  {{ value }}
</template>

<script>
import Field from '@/components/Field.vue';

export default {
  name: 'Radio',
  components: { Field },
  props: {
    id: Number,
    idx: Number,
    label: String,
    checked: Boolean,
  },
  methods: {
    setValue($evt) {
      $evt.preventDefault();
      $evt.stopImmediatePropagation();
      this.$emit('input', { idx: this.idx, id: this.id });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
