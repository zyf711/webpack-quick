<template>
<div>
	<div class="abc">{{ $route.params.id }}</div>
	<i class="icon icon-c"></i>
</div>
</template>
<script>
	export default{
		mounted(){
			console.log(this.$route)
		}
	}
</script>
<style scoped>
	.abc{
		color:green;
		font-size: 24px;
	}
</style>