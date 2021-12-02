/* eslint no-underscore-dangle: 0 */
import { createStore } from 'vuex';

export default createStore({
  state: {
    customer: {
      name: null,
      birthday: null,
      state: null,
      city: null,
      phones: [],
      emails: [],
      driverLicence: {},
      parent: {},
    },
    phoneId: 0,
    emailId: 0,
  },
  getters: {
    name: (state) => state.customer.name,
    birthday: (state) => state.customer.birthday,
    state: (state) => state.customer.state,
    city: (state) => state.customer.city,
    phones: (state) => state.customer.phones,
    emails: (state) => state.customer.emails,
    driverLicence: (state) => state.customer.driverLicence,
    parent: (state) => state.customer.parent,
    phoneId: (state) => state.phoneId,
    emailId: (state) => state.emailId,
  },
  mutations: {
    name: (ctx, payloading) => {
      ctx.customer.name = payloading;
    },
    birthday: (ctx, payloading) => {
      ctx.customer.birthday = payloading;
    },
    state: (ctx, payloading) => {
      ctx.customer.state = payloading;
    },
    city: (ctx, payloading) => {
      ctx.customer.city = payloading;
    },
    phones: (ctx, payloading) => {
      ctx.customer.phones = payloading;
    },
    emails: (ctx, payloading) => {
      ctx.customer.emails = payloading;
    },
    driverLicence: (ctx, payloading) => {
      ctx.customer.driverLicence = payloading;
    },
    parent: (ctx, payloading) => {
      ctx.customer.parent = payloading;
    },
    phoneId: (ctx, payloading) => {
      ctx.phoneId = payloading;
    },
    emailId: (ctx, payloading) => {
      ctx.emailId = payloading;
    },
  },
  actions: {
    newCustomer(ctx) {
      ctx.dispatch('newParent');
      ctx.dispatch('newDriverLicence');
      if (ctx.getters.phones.length < 1) {
        ctx.dispatch('newPhone');
      }
      if (ctx.getters.emails.length < 1) {
        ctx.dispatch('newEmail');
      }
    },
    newPhone(ctx) {
      const phoneId = ctx.state.phoneId + 1;
      const newPhone = {
        __id: phoneId,
        __destroy: null,
        code: null,
        number: null,
        main: null,
      };
      const { phones } = ctx.getters;
      phones.push(newPhone);
      ctx.commit('phones', phones);
      ctx.commit('phoneId', phoneId);
    },
    newEmail(ctx) {
      const emailId = ctx.state.emailId + 1;
      const newPhone = {
        __id: emailId,
        __destroy: null,
        email: null,
        main: null,
      };
      const { emails } = ctx.getters;
      emails.push(newPhone);
      ctx.commit('emails', emails);
      ctx.commit('emailId', emailId);
    },
    newDriverLicence(ctx) {
      const driverLicence = {
        __destroy: null,
        issued_at: null,
        number: null,
      };
      ctx.commit('driverLicence', driverLicence);
    },
    newParent(ctx) {
      const driverLicence = {
        __destroy: null,
        name: null,
        phone: {
          code: null,
          number: null,
        },
      };
      ctx.commit('driverLicence', driverLicence);
    },
    setMain(ctx, data) {
      const grp = ctx.getters[data.type];
      ctx.commit(data.type, grp.map((obj, idx) => {
        obj.main = (data.id && data.id === obj.__id);
        if (!obj.main) obj.main = (data.idx !== undefined && data.idx === idx);
        return obj;
      }));
    },
    removeItem(ctx, data) {
      const grp = ctx.getters[data.type];
      const idx = grp.findIndex((x) => x.__id === data.id);
      grp[idx].__destroy = true;
      ctx.commit(data.type, grp);
    },
    updateData(ctx, data) {
      const grp = ctx.getters[data.type];
      if (data.index !== undefined) {
        grp[data.index][data.name] = data.value;
      }
      if (data.index === undefined) {
        grp[data.name] = data.value;
      }
      ctx.commit(data.type, grp);
    },
  },
});
