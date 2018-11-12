import Vue from 'vue'; 
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';
import moduleA from './moduleA' //vuex中modules分割出的模块
import VueBus from './vue-bus' //使用插件代替vuex解决通讯

import './style.less';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueBus);

const Routers = [
		//resolve在请求页面时，才去加载这个页面的js。异步实现懒加载。 使用了异步路由后，编译出的每个页面的js都叫chunk(块).如要一次性加载，可以：
		//import index from "./views/index.vue";
		// component:index
		//其他两个路由模仿上边的写法
	{
		path:'/index',
		meta:{
			title:'首页'
		},
		component:(resolve) => require(['./views/index.vue'],resolve)
	},
	{
		path:'/about',
		meta:{
			title:'关于'
		},
		component:(resolve) => require(['./views/about.vue'],resolve)
	},
	{
		path:'/user/:id',
		meta:{
			title:'个人主页'
		},
		component:(resolve) => require(['./views/user.vue'],resolve)
	},
	{
		path:'/Counter',
		meta:{
			title:'vue-bus插件'
		},
		component:(resolve) => require(['./views/Counter.vue'],resolve)
	},
	{
		path:'*',
		redirect:'/index'
	}
];

const router = new VueRouter({
	//使用html的History路由模式
	mode:'history',
	routes: Routers
});


router.beforeEach((to,from,next)=>{
	//参数：即将要进入的目标的路由对象，当前导航即将要离开的路由对象，调用该方法后才能进入下一个钩子。
	window.document.title = to.meta.title;
	//调用该方法才能进入下一个钩子
	next();
})

const store = new Vuex.Store({
	modules:{ moduleA:moduleA }, // 项目足够大，store内容过多时，modules把store里内容写到不同文件中
	state:{ //数据保存在state字段内
		count:0, //任何组件通过this.$store.state.count读取
		list:[1,5,8,10,30,50]
	},
	mutations:{ //mutations改变state字段数据唯一途径
		increment(state){
			state.count ++ ; //任何组件通过this.$store.commit('increment')提交事件名
		},
		decrease(state,n=10){// mutations可以接受第二个参数，数字，字符串或对象等类型
			state.count -= n;
		},
		custom(state,params){
			state.count += params.count;
		}
	},
	actions:{ //actions提交的是mutations
		//涉及改变数据的就用mutations，存在业务逻辑的就用actions,actions可以异步操作业务逻辑。
		asyncIncrement(context){  //任何组件this.$store.dispatch('asyncIncrement')触发
			return new Promise((resolve,reject) => { //Promise在2秒后提交mutations
				setTimeout(()=>{
					const random = Math.random();
					if( random >.5 ){
						context.commit('increment');
						console.log(random)
						resolve();
					}else{
						reject(random)
					}
				},2000)
			});
		}
	},
	getters:{
		filteredList:state => {
			return state.list.filter(item => item < 10); //任何组件通过this.$store.getters.filteredList提交事件名
		},
		listCount:(state,getters) => {
			return getters.filteredList.length;
		}
	}
})

new Vue({
    el: '#app',
    router:router,
    store:store,
    render: h => {
        return h(App);
    }
});