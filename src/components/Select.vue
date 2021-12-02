<template>
  <Field>
    <label class="label" v-if="label" v-html="label"></label>
    <select class="select" v-model="model" @input="setValue($event)">
      <option></option>
      <template v-for="(option, idx) of items" :key="idx">
        <option :value="option.initials">
          {{ option.name }}
        </option>
      </template>
    </select>
  </Field>
</template>

<script>
import Field from '@/components/Field.vue';

export default {
  name: 'Select',
  components: { Field },
  props: {
    items: Array,
    label: String,
    name: String,
    value: String,
  },
  data() {
    return {
      model: this.value,
    };
  },
  methods: {
    setValue($evt) {
      $evt.preventDefault();
      $evt.stopImmediatePropagation();
      setTimeout(() => this.$emit('input', { name: this.name, value: this.model }));
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
  height: 2.5rem;
  padding: 0 .75rem;
}
</style>
