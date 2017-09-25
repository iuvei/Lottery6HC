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
		login(usr,psw) {
			this.$axios({
				method: 'GET',
				url: this.getApi('getLogin'),
				data: {
					Action: 'Login',
					UserName: usr,
					Password: psw,
					Type: 'Hash',
					SourceName: 'PC'
				}
			}).then(res => {
				if(res.data.Code === 1) {
					localStorage.setItem('UserName', usr);
					this.$store.state.UserName = usr;
					// 登录成功,请求用户信息
					this.getUserInfo();
				}else {
					alert('登录失败');
				}
			}).catch(err => {
				console.log(err);
			});
		},
		// 请求用户信息并保存
		getUserInfo() {
			this.$axios({
				method: 'GET',
				url: this.getApi('getUserInfo'),
				data: {
					Action: 'GetInitData',
					Requirement: ["UserUpGradeBonus","NoticeData","UserPhoto"],
					SourceName: 'PC'
				}
			}).then(res => {
				var BackData = res.data.BackData;
				var UserPhoto = BackData.UserPhoto;
				var UserUpGradeBonus = BackData.UserUpGradeBonus;
				var NoticeData = BackData.NoticeData;
				localStorage.setItem('UserPhoto', UserPhoto);
				localStorage.setItem('UserUpGradeBonus',JSON.stringify(UserUpGradeBonus));
				localStorage.setItem('NoticeData',JSON.stringify(NoticeData));
			}).catch(err => {
				console.log(err);
			});
		},
		// 禁止右键事件
		banRightClick() {
			document.oncontextmenu = function() {
				return false;
			}
		}
	},
	mounted() {
		this.login('web2017','');
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
	transition: all .3s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>