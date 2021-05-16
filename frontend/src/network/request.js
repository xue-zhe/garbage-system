import axios from 'axios'
//import qs from 'qs'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 50000,
    //修改
  })
  // 2.axios的拦截器
  // 2.1请求拦截的作用
  instance.interceptors.request.use(config => {
    //config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
}, err => {
  console.log(err);
})

 // 2.2.响应拦截
instance.interceptors.response.use(res => {
    return res
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}