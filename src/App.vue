<template>
	<div id="app">
		<!-- 头部预留 -->
		<div class="header">头部</div>
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
		<!-- 底部预留 -->
		<div class="footer">底部</div>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {

	}
}

</script>
<style lang="scss" scoped>
#app {
	height: 100%;
	background: #e6e6e6;
}

.header {
	height: 40px;
	line-height: 40px;
	margin-bottom: 15px;
	text-align: center;
}

.footer {
	width: 100%;
	overflow: hidden;
	background: #fff;
	box-sizing: border-box;
	margin-top: 10px;
	height: 260px;
	text-align: center;
}
</style>


<style lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: all .3s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>