import {
  RECEIVE_ADDRESS,
  RECEIVE_SWIPERINF,
  RECEIVE_SHOPLIST,
  SAVEUSERINF,
  REQSHOPINF,
  REQSHOPEVALUATE,
  REQSEARCHSHOP
} from './mutation.types.js'

export default {
  [RECEIVE_ADDRESS](state, { address }) {
    state.address = address
  },
  [RECEIVE_SWIPERINF](state, { swiperInf }) {
    state.swiperInf = swiperInf
  },
  [RECEIVE_SHOPLIST](state, { shopList }) {
    state.shopList = shopList
  },
  [SAVEUSERINF](state, { userInf }) {
    state.userInf = userInf
  },
  [REQSHOPINF](state, { info }) {
    state.shopInfo = info
  },
  [REQSHOPEVALUATE](state, { evaluation}) {
    state.shopEvaluation = evaluation
  },
  [REQSEARCHSHOP](state, { data }) {
    state.reqResult = data
  }
}