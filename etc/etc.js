import Vue from 'vue' 

// Vue.prototype.imgUrl = 'imgUrl'

// #ifdef H5
Vue.prototype.apiUrl = '/h5api'
Vue.prototype.uploadUrl = '/h5upload'
// #endif
// #ifndef H5
Vue.prototype.apiUrl = 'http://youmi.1688qds.com/wap'
Vue.prototype.uploadUrl = 'http://youmi.1688qds.com'
// #endif


// #ifdef MP-WEIXIN
Vue.prototype.appId = 'wx51fed674e0817015'
Vue.prototype.appScret = '6c6099dde5485fbc3b173d288a350325'
// #endif
