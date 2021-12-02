<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Formulário</h1>
      <form>
        <h2 class="subtitle">Cliente</h2>
        <div class="row wrap">
          <div class="col is-sm-12 is-8">
            <Input label="Nome" name="name" @input="input($event)"
              :value="$store.getters.name" />
          </div>
          <div class="col is-sm-12 is-4">
            <Input label="Data de nascimento" name="birthday" v-mask="'##/##/####'"
              @input="input($event);checkAge($event)" :value="$store.getters.birthday" />
          </div>
          <div class="col is-sm-12 is-6">
            <div class="row">
              <div class="col is-6">
                <Input label="Número CNH" name="number"
                  @input="input($event, {type: 'driverLicence', index: idx})"
                  v-mask="'########'" :value="$store.getters.driverLicence.number" />
              </div>
              <div class="col is-6">
                <Input label="Validade CNH" name="issued_at"
                  @input="input($event, {type: 'driverLicence', index: idx})"
                  v-mask="'##/##/####'" :value="$store.getters.driverLicence.issued_at" />
              </div>
            </div>
          </div>
          <div class="col is-sm-12 is-2">
            <Select label="Estado" name="state" @input="input($event)" :items="dataStates"
              :value="$store.getters.state" />
          </div>
          <div class="col is-sm-12 is-4">
            <Input label="Cidade" name="city" @input="input($event)" :value="$store.getters.city" />
          </div>
          <div class="col is-sm-12 is-6">
            <fieldset class="fieldset">
              <legend>Telefones:
                <Button class="button small success" @click="addItem($event, 'phones')"
                  :disabled="$store.getters.phones.filter((x) => !x.__destroy).length === phones">
                  adicionar
                </Button>
              </legend>
              <template  :key="`phone-${idx}`"
                v-for="(phone, idx) in $store.getters.phones.filter((x) => !x.__destroy)">
                <div class="field-group phone-group" v-if="!phone.__destroy">
                  <Input class="phone-code" name="code"
                    :value="phone.code"
                    @input="input($event, {type: 'phones', index: idx})"
                    v-mask="'##'" />
                  <Input class="phone-number" name="number"
                    :value="phone.number"
                    @input="input($event, {type: 'phones', index: idx})"
                    v-mask="'#####-####'" />
                  <Radio label="principal" :idx="idx" :id="phone.__id"
                    v-if="$store.getters.phones.filter((x) => !x.__destroy).length > 1"
                    :checked="phone.main"
                    @input="setMain($event, { type: 'phones' })" />
                  <Field>
                    <Button class="button small"
                      :disabled="$store.getters.phones.filter((x) => !x.__destroy).length < 2"
                      @click="removeItem($event, { type: 'phones', id: phone.__id})">
                      remover
                    </Button>
                  </Field>
                </div>
              </template>
            </fieldset>
          </div>
          <div class="col is-sm-12 is-6">
            <fieldset class="fieldset">
              <legend class="label">E-mails:
                <Button class="button small success" @click="addItem($event, 'emails')"
                  :disabled="$store.getters.emails.filter((x) => !x.__destroy).length === emails">
                  adicionar
                </Button>
              </legend>
              <template :key="`phone-${idx}`"
                v-for="(email, idx) in $store.getters.emails.filter((x) => !x.__destroy)">
                <div class="field-group email-group" v-if="!email.__destroy">
                  <Input class="phone-number" name="number"
                    :value="email.address"
                    @input="input($event, {type: 'emails', index: idx})" />
                  <Radio label="principal" :idx="idx" :id="email.__id"
                    v-if="$store.getters.emails.filter((x) => !x.__destroy).length > 1"
                    :checked="email.main"
                    @input="setMain($event, { type: 'emails' })" />
                  <Field>
                    <Button class="button small"
                      :disabled="$store.getters.emails.filter((x) => !x.__destroy).length < 2"
                      @click="removeItem($event, { type: 'emails', id: email.__id})">
                      remover
                    </Button>
                  </Field>
                </div>
              </template>
            </fieldset>
          </div>
        </div>
        <div v-if="customer.matureAge">
          <h2 class="subtitle">Responsável</h2>
          <div class="row wrap">
            <div class="col is-sm-12 is-8">
              <Input label="Nome" name="name" @input="input($event, { type: 'parent'})"
                :value="$store.getters.parent.name" />
            </div>
            <div class="col is-sm-12 is-4">
              <label class="label">Telefone</label>
              <div class="field-group phone-group">
                <Input class="phone-code" name="code"
                  :value="$store.getters.parent.code"
                  @input="input($event, {type: 'parent'})"
                  v-mask="'##'" />
                <Input class="phone-number" name="number"
                  :value="$store.getters.parent.number"
                  @input="input($event, {type: 'parent'})"
                  v-mask="'#####-####'" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <h2 class="title">sliders</h2>
      <Slider :items="dataSlider" />
    </div>
  </section>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import '@/assets/scss/style.scss';
import { mask } from 'vue-the-mask';
import dataStates from '@/data/states.json';
import dataSlider from '@/data/slider.json';
import helperForm from '@/helpers/form';

import Button from '@/components/Button.vue';
import Field from '@/components/Field.vue';
import Input from '@/components/Input.vue';
import Radio from '@/components/Radio.vue';
import Select from '@/components/Select.vue';
import Slider from '@/components/Slider.vue';

export default {
  name: 'App',
  components: {
    Button,
    Field,
    Input,
    Radio,
    Select,
    Slider,
  },
  directives: { mask },
  mixins: [helperForm],
  data() {
    return {
      dataStates,
      dataSlider,
      emails: 3,
      phones: 4,
      customer: {
        birthday: false,
        matureAge: false,
      },
    };
  },
  created() {
    this.$store.dispatch('newCustomer');
  },
  methods: {
    input(data, type = null) {
      if (!type) {
        this.$store.commit(data.name, data.value);
      } else {
        this.$store.dispatch('updateData', { ...data, ...type });
      }
      setTimeout(() => console.log(this.$store.getters));
    },
    setMain(data, type) {
      this.$store.dispatch('setMain', { ...data, ...type });
    },
    addItem($evt, type) {
      $evt.preventDefault();
      $evt.stopImmediatePropagation();
      if (type === 'phones' && this.$store.getters.phones.filter((x) => !x.__destroy).length < this.phones) {
        this.$store.dispatch('newPhone');
      }
      if (type === 'emails' && this.$store.getters.emails.filter((x) => !x.__destroy).length < this.emails) {
        this.$store.dispatch('newEmail');
      }
    },
    removeItem($evt, data) {
      $evt.preventDefault();
      $evt.stopImmediatePropagation();
      this.$store.dispatch('removeItem', data);
    },
    checkAge(data) {
      this.customer.birthday = false;
      if (data.value.length === 10) {
        this.customer.birthday = this.checkDate(data.value);
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
.fieldset {
  position: relative;
  legend {
    button {
      position: absolute;
      right: 1rem;
    }
  }
}
.field {
  &.phone-code {
    width: 50px;
  }
  &.phone-number {
    flex-grow: 1;
  }
  &.email {
    flex-grow: 1;
  }
}
</style>
