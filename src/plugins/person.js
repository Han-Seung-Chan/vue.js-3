export default {
  install(app) {
    const person = {
      name: '한찬',
      say() {
        alert(this.name);
      },
    };
    app.config.globalProperties.$person = person;
    app.provide('person', person);
  },
};
