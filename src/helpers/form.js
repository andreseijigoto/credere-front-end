export default {
  methods: {
    checkDate(date) {
      const data = date.split('/');
      const date2 = new Date(data[1], data[0], data[2]);
      return date2.toString() === 'Invalid Date';
    },
  },
};
