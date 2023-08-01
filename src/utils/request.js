import axios from "axios";
import { getToken } from "./auth";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

export let isRelogin = {show : false}

const service = axios.create({
    //axios请求URL的公共部分
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000
});

//请求拦截器
service.interceptors.request.use(config => {
    //是否需要设置Token
    const isToken = (config.headers || {}).isToken === false
    if(getToken() && !isToken){
        config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
},error => {
    console.log(error)
    Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use(res => {
    const code = res.data.code || 200
    
    if(code == 401){
        
    }else if(code == 200){
        return res.data
    }
    
})

export default service