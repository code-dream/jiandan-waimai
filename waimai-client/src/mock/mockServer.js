/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'

// 返回goods的接口
Mock.mock('/foods', {code: 0, data: data.foods})
// 返回ratings的接口
Mock.mock('/evaluate', {code: 0, data: data.evaluate})
// 返回info的接口
Mock.mock('/info', {code: 0, data: data.info})

// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可
