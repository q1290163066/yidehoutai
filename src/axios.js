import axios from 'axios'

const http=axios.create({
    baseURL:'/sys',
    transformResponse(data){
        // console.log(data)
        if(typeof data === 'string') {
            try {
            let d = data;
            let array = d.match(/:\d{14}\d*/g);
            if(array === null){
                data = JSON.parse(data);
                return data
            }
            // 遍历所有查找14位以上的数字，将其number拼装为string
            for (var i = 0; i < array.length; i++) {
                let str = array[i];
                let number = str.replace(":", "");
                d = d.replace(str, ':"' + number + '"')
            }
            data = JSON.parse(d);
            } catch(e){
        
            }
        }
        // console.log('返回数据：',data)
        return data;
    }
})
// 请求拦截
http.interceptors.request.use(config=>{
    if(localStorage.elementToken){
        config.headers.Authorization=localStorage.elementToken
    }
    return config
})
// 响应拦截
http.interceptors.response.use(res=>{
    return res
})
export default http