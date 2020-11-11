import Vue from 'vue';
import vuetify from '../../util/vuetify';
import App from './ToasterConfig.vue';

new Vue({ // eslint-disable-line no-new
  vuetify,
  el: '#app',
  render: (h) => h(App),
});
