<template>
  <Field>
    <label class="label" v-if="label" v-html="label"></label>
    <input :type="type" class="input" :[v-mask]="mask" v-model="model"
      @input="setValue($event)" />
  </Field>
</template>

<script>
import Field from '@/components/Field.vue';

export default {
  name: 'Input',
  components: { Field },
  props: {
    label: String,
    mask: String,
    name: String,
    type: String,
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
      this.$emit('input', { name: this.name, value: this.model });
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
    width: 100%;
    height: 2.5rem;
    padding: 0 .75rem;
    &::-webkit-input-placeholder {
        color: #CCC;
    }
    &:-ms-input-placeholder {
        color: #CCC;
    }
    &::placeholder {
        color: #CCC;
    }
}
</style>
