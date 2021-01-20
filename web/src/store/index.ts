import Common from '@/store/modules/common'
import Application from '@/store/modules/application'
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		Common,
		Application
	}
})

export default store