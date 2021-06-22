import Vue from 'vue'
import App from './App.vue'

// google analytics
// https://medium.com/dailyjs/tips-tricks-for-vue-analytics-87a9d2838915

import VueAnalytics from 'vue-analytics';

Vue.use(VueAnalytics, {
  id: 'UA-318678-4',
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
