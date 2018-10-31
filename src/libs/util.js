import axios from 'axios';
// 基本配置
const Util = {
	imgPath:'http://127.0.0.1:8011/img/',
	apiPath:'http://127.0.0.1:8010/'
}

// ajax通用配置
Util.ajax = axios.create({ //自定义配置新建一个 axios 实例
	baseURL:Util.apiPath
})

// 添加响应拦截器 在响应被 then 或 catch 处理前拦截它们。
Util.ajax.interceptors.response.use(res=>{
	return res.data;
});

export default Util;