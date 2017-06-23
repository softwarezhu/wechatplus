import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)


const state = {
    wechatState: 'init',
    uuid: '',

    user: null,
    memberList: [],
    groupMemberList: [],
    sessionList: [],

    query: '',
    session: null
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})