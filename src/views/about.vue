<template>
	<div>
	<div class="abc">介绍页</div>
	<button @click="handleRouter">跳转到user123456</button>
	<i class="icon icon-b"></i>
	</div>
</template>
<script>
	import $ from '../libs/util';
	export default{
		methods:{
			handleRouter:function(){
				this.$router.push('/user/123456')
			}
		}
	}
</script>
<style scoped>
	.abc{
		color:yellow;
		font-size: 24px;
	}
</style>