import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'  // 直接post请求后台取不到参数,()

// 发起请求时,会执行该方法
axios.interceptors.request.use(config => {
    //你可以在这里开始加载动画,  查询token  等等之类
    Vue.prototype.$showLoading()
    return config
}, err => {
    return Promise.reject(err)
})

//接收到后台的数据时执行的方法
axios.interceptors.response.use(response => response, err => Promise.reject(err.response))


//检查状态码 status
function checkStatus(res) {
    if (res.status === 200 || res.status === 304) { //当状态正常是返回原样的数据
        return res
    }
    return {  // 状态不正常时可以返回自己自定义的一些格式或者状态什么的
        data: {
            code: 0,
            msg: res.statusText,
            data: res.statusText,
        }
    }
}

//检查后台的code 值
function checkCode(res) {
    Vue.prototype.$hideLoading()
    if (res.data.code === 0) {  //code值错误时
        alert('出错了')
    }
    return res
}


export default {
    get(url, params) {  //返回封装后的 get 方法
        if (!url) return
        return axios({
            method: 'get',
            url,
            params,
            timeout: 10000
        }).then(checkStatus).then(checkCode)
    },
    post(url, data) { //返回封装后的 post 方法
        if (!url) return
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 10000
        }).then(checkStatus).then(checkCode)
    }
}
