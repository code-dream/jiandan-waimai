import axios from 'axios'
export default function ajax (url, data={}, type='GET') {
 return new Promise(function(resolve, reject) {
    let p
    if (type === 'GET') {
      // 拼接get请求的路径的地址
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 如果是get请求的话，发送请求并将axios返回的promise对象保存在promiseObj中
      p = axios.get(url)
    }
    else {
      // 如果是post请求的话，发送请求并将axios返回的promise对象保存在promiseObj中
      p = axios.post(url, data)
    }
    // 成功/失败后回调函数
    p.then(responseText => {
      resolve(responseText.data)
    }).catch(erro => {
      reject(erro)
    }) 
  })
}