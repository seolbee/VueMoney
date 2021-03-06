import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        user:null,
        banks:[
            {
                code:'002',
                name:'KDB산업은행',
                src:'kdb.png'
            },
            {
                code:'003',
                name:'IBK기업은행',
                src:'ibk.png'
            },
            {
                code:'004',
                name:'KB국민은행',
                src:'kb.png'
            },
            {
                code:'007',
                name:'수협은행',
                src:'suheub.png'
            },
            {
                code:'011',
                name:'NH농협은행',
                src:'nh.png'
            },
            {
                code:'020',
                name:'우리은행',
                src:'woolee.png'
            },
            {
                code:'023',
                name:'SC제일은행',
                src:'sc.png'
            },
            {
                code:'027',
                name:'한국씨티은행',
                src:'city.png'
            },
            {
                code:'031',
                name:'대구은행',
                src:'dg.png'
            },
            {
                code:'032',
                name:'부산은행',
                src:'bnk.png'
            },
            {
                code:'034',
                name:'광주은행',
                src:'GJ.png'
            },
            {
                code:'035',
                name:'제주은행',
                src:'shinhan.png'
            },
            {
                code:'037',
                name:'전북은행',
                src:'GJ.png'
            },
            {
                code:'039',
                name:'경남은행',
                src:'bnk.png'
            },
            {
                code:'081',
                name:'하나은행',
                src:'hana.png'
            },
            {
                code:'088',
                name:'신한은행',
                src:'shinhan.png'
            },
            {
                code:'089',
                name:'케이뱅크',
                src:'kbank.png'
            },
            {
                code:'090',
                name:'카카오뱅크',
                src:'kakao.png'
            }
        ]
    },
    getters : {
        getUser : (state) => {return state.user;},
        getBanks : (state) => {return state.banks;}
    },
    mutations:{
        setUser(state, user) {state.user=user;}
    },
    plugins : [
        createPersistedState()      
    ]
})