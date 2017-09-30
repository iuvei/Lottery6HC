<template>
	<div id="app" class="lottery">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script> 

export default {
	name: 'app',
	components: {
		
	},
	methods: {
		// 登录判断
		login() {
			// 保存版本缓存
			var c = localStorage.getItem('CacheData');
            if(c === null || c === undefined) {
                c = {};
            }
			this.$store.state.CacheData = c;
			// 如果 localStorage 里面 UserName 不存在则打回 login 页面
			var f = process.env.API_ROOT === '/ajax.php' ? localStorage.getItem('UserName') : 'c001';
			var p = localStorage.getItem('UserPhoto')
			if(f !== null) {
				this.$store.state.userName = f;
				this.$store.state.userPhoto = p;
				return;
			};
			location.href = "/login";
		},
		// 禁止右键事件
		banRightClick() {
			document.oncontextmenu = function() {
				return false;
			}
		}
	},
	mounted() {
		this.login();
		this.banRightClick();
	}
}

</script>
<style lang="scss" scoped>

#app {
	height: 100%;
	background: #e6e6e6;
}
</style>


<style lang="scss">

.fade-enter-active,
.fade-leave-active {
	transition: all .5s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>