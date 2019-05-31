import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import axios from 'axios'
import { Modal } from 'antd'

var request = axios.create({
  baseURL: '/api'
})
// 添加请求拦截器
request.interceptors.request.use( (config) => {
  // 在发送请求之前做些什么
  //设计请求头
  let token = JSON.parse(localStorage.getItem("token"))
  config.headers['authorization'] = token
  NProgress.start();
  NProgress.inc(0.2)
  NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
  
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器

request.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  NProgress.done()
  return response.data
}, function (error) {
  // 错误处理
  if (error.response) {
    // 状态码
    switch (error.response.status) {
      case 402:
        Modal.error({
          title: '请求错误'+error.response.status,
          content:'参数不足,请重新请求'
        })
        NProgress.done()
        return new Promise(() => {})
      case 404:
        NProgress.done()
        Modal.error({
          title: '接口不存在'+error.response.status,
          content:'您请求的接口不存在'
        })
        return new Promise(() => {})
      case 500:
        NProgress.done()
        break;
      default: new Promise(() => {})
    }
  }
})

const get = (url, data) => request.get(url,data)
const post = (url, data) => request.post(url, data)
const put = (url, data) => request.put(url,data)
const del = (url,data) =>  request.delete(url,data)

export {
  get,
  post,
  put,
  del
}
