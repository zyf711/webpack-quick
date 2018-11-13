<!-- 可以用jade写 <template lang="jade"></template> -->
<template>
	<div>
		<v-title title="Vue组件化"></v-title>
		<v-button @click="handleClick">点击按钮axios加载代理部分内容到alert</v-button>
		<router-view></router-view>
		<p>
			<img src="./images/image.png" style="width:200px;" alt="">
			<img src="./images/123.jpg" style="width:200px;" alt="">
			<img src="./images/456.jpg" style="width:200px;" alt="">
			<img src="./images/111.jpg" >
			<img src="http://127.0.0.1:8011/img/https://pic2.zhimg.com/v2-98c8a1595cbbd32ac5cc00770018c9f1.jpg" alt="">
		</p>
	</div>
</template>
<script>
	// 导入组件
	import vTitle from './components/title.vue';
	import vButton from './components/button.vue';
	import $ from './libs/util';

	export default{
		components:{
			vTitle,
			vButton
		},
		methods:{
			handleClick(e){
				console.log(e);
				$.ajax.get('news/3892357').then(res=>{
					var title = res.title;
					alert(title)
				})
			}
		}
	}
</script>
<!-- scoped表示当前css只在这个组件里有效 在chrome调试工具会看到元素上有一窜串内容，就是因为有scoped-->
<style scoped lang="less">
	div{
		color:red;
		font-size: 24px;
	}
	p{
		background: #333;
		img{
			height: 200px;
		}
	}
</style>