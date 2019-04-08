import {
  reqAddress,
  reqSwiperInf,
  reqShopList,
  reqUserInf,
  reqLoginout,
  reqShopInfo,
  reqShopEvaluate,
  reqSearchShop,
  updateUserInf
} from '../api'
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
  // 异步获取地址
  async getAddress({ commit, state }) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
    }
  },
  // 异步获取轮播图信息
  async getSwiperInf({ commit }) {
    const result = await reqSwiperInf()
    if (result.code === 0) {
      const swiperInf = result.data
      commit(RECEIVE_SWIPERINF, { swiperInf })
    }
  },
  // 异步获取商家信息
  async getShopList({ commit, state }) {
    const { latitude, longitude } = state
    const result = await reqShopList(latitude, longitude)
    if (result.code === 0) {
      const shopList = result.data
      commit(RECEIVE_SHOPLIST, { shopList })
    }
  },
  // 异步获取session中保存的userID以获取用户相关信息
  async getUserInf({ commit }) {
    const result = await reqUserInf()
    if (result.code === 0) {
      const userInf = result.data
      commit(SAVEUSERINF, { userInf })
    }
  },
  // 退出登入
  async reqLoginout({ commit }) {
    const result = await reqLoginout()
    if (result.code === 0) {
      const userInf = {}
      commit(SAVEUSERINF, { userInf })
    }
  },
  // 获取具体商家的信息
  async reqShopInf({ commit }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(REQSHOPINF, { info })
    }
  },
  // 获取用户对店铺的评价
  async reqShopEvaluation({commit}) {
    const result = await reqShopEvaluate()
    if(result.code ===0) {
      const evaluation = result.data
      commit(REQSHOPEVALUATE, {evaluation})
    }
  },
  // 搜索商家结果
  async reqShopResult({commit, state}, {keyword}) {
    let { latitude, longitude} = state
    let geohash = latitude + ',' + longitude
    const result = await reqSearchShop(geohash, keyword)
    if(result.code === 0){
      const data = result.data
      commit(REQSEARCHSHOP, {data})
    }
  },
  // 更新用户的信息
  async updateUserInf({commit}, {a, data}) {
    let result = await updateUserInf(a, data)
    if(result.code === 0) {
      const userInf = result.data
      commit(SAVEUSERINF, {userInf})
    }
  }
}