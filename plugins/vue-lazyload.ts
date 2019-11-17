import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  // preLoad: 1.1,
  // attempt: 1,
  observer: true,
  // loading: require('@/static/noimage.svg'),

  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1,
  },
});