<template>
	<view class="myView">
		<view class="bgRed"></view>
		<view class="container">
			<view class="userBox">
				<view class="userInfoBox flex align-center">
					<view class="headerBox"><image class="header" src="" mode="aspectFill"></image></view>
					<view class="nameBox flex flex-direction">
						<view class="name">用户名</view>
						<view class="id">ID 1*****</view>
					</view>
				</view>
				<view @click="navigate('/pages/my/business/business')" class="storeLogin">
					<text class="cuIcon cuIcon-people"></text>
					商家登录>
				</view>
				<view class="numBox flex">
					<view class="item flex align-center">
						<image src="/static/ic-ccdd-my.png" mode="widthFix"></image>
						<text>收藏的店</text>
						<text class="num">99</text>
					</view>
					<view class="item flex align-center">
						<image src="/static/ic-yhq-my.png" mode="widthFix"></image>
						<text>优惠卷</text>
						<text class="num">99</text>
					</view>
				</view>
				<view class="vipAd">
					<image src="/static/vipad.png" mode="widthFix"></image>
					<view class="flex btnBox">
						<text class="dot">体验</text>
						<text class="txt">全店铺会员价 + 专享优惠券</text>
						<button class="btn cu-btn">升级</button>
					</view>
				</view>
			</view>
			<view class="menuBox flex flex-wrap">
				<view @click="navigate(item.path, index)" v-for="(item, index) in menuList" :key="index" class="item flex flex-direction justify-center align-center">
					<image :src="item.icon" mode="aspectFill"></image>
					<view>{{ item.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			menuList: [
				{ icon: '/static/ic-lszd-my.png', path: '', name: '历史账单' },
				{ icon: '/static/ic-ccdd-my.png', path: '', name: '收藏的店' },
				{ icon: '/static/ic-yhq-my.png', path: '', name: '优惠卷' },
				{ icon: '/static/ic-sjrz-my.png', path: '/pages/my/addStore', name: '商家入驻' },
				{ icon: '/static/ic-lxwm-my.png', path: '', name: '联系我们' }
			]
		};
	},
	onLoad() {},
	methods: {
		navigate(url, idx) {
			if (idx && idx === 3) {
				this.checkLogin().then(resolve => {
					this.showLoading();
					this.request({
						url: '/shopApply/postStatus',
						data: {
							user_mark_id: this.getUserId()
						},
						method: 'POST',
						success: res => {
							uni.hideLoading();
							console.log('校验权限,判断跳转', res);
							if (res.data && Number(res.data.status) === 1) {
								uni.navigateTo({
									url: '/pages/my/business/business'
								});
							} else if (res.data) {
								uni.navigateTo({
									url
								});
							} else {
								this.showToast('网络繁忙');
							}
						}
					});
				});
			} else {
				uni.navigateTo({
					url
				});
			}
		}
	}
};
</script>

<style lang="less">
.myView {
	.bgRed {
		background: linear-gradient(135deg, rgba(255, 39, 45, 1) 0%, rgba(235, 11, 11, 1) 100%);
		height: 196rpx;
	}
	.container {
		padding: 0 30rpx;
		margin-top: -140rpx;
		.userBox {
			width: 100%;
			background: #fff;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
			border-radius: 10rpx;
			position: relative;
			padding: 0 30rpx;
			.userInfoBox {
				padding: 46rpx 30rpx 0 30rpx;
				.headerBox {
					.header {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						margin-right: 30rpx;
						background-color: #b7b7b7;
					}
				}
				.nameBox {
					.name {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						line-height: 45rpx;
						color: rgba(0, 0, 0, 1);
						opacity: 1;
					}
					.id {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 40rpx;
						color: rgba(0, 0, 0, 0.54);
						margin-top: 10rpx;
					}
				}
			}
			.storeLogin {
				position: absolute;
				right: 0;
				top: 36rpx;
				font-size: 24rpx;
				color: #fff;
				line-height: 48rpx;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
				opacity: 1;
				border-top-left-radius: 19px;
				border-bottom-left-radius: 19px;
				background-color: #ff6667;
				padding: 0 40rpx 0 30rpx;
				.cuIcon {
					margin-right: 14rpx;
				}
			}
			.numBox {
				padding: 48rpx 0;
				.item {
					padding: 0 70rpx 0 70rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 33rpx;
					color: rgba(0, 0, 0, 0.54);
					&:first-child {
						border-right: 1px solid #707070;
						padding-left: 30rpx;
					}
					&:last-child {
						padding-right: 30rpx;
					}
					& > image {
						width: 25rpx;
						height: 25rpx;
						margin-right: 25rpx;
					}
					.num {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba(0, 0, 0, 0.87);
						margin-left: 32rpx;
					}
				}
			}
			.vipAd {
				overflow: hidden;
				height: 120rpx;
				position: relative;
				& > image {
					position: absolute;
					left: 0;
					top: 0;
				}
				.btnBox {
					position: relative;
					z-index: 2;
					font-size: 28rpx;
					font-family: FZLanTingHeiPro_GB18030;
					font-weight: 200;
					color: rgba(255, 255, 255, 0.54);
					margin-top: 58rpx;
					.dot {
						display: inline-block;
						padding-right: 24rpx;
						position: relative;
						margin-left: 30rpx;
						&::before {
							content: '';
							width: 8rpx;
							height: 8rpx;
							background: rgba(255, 255, 255, 0.54);
							position: absolute;
							border-radius: 50%;
							top: 40%;
							right: 8rpx;
						}
					}
					.txt {
						font-size: 28rpx;
						font-family: FZLanTingHeiPro_GB18030;
						font-weight: 500;
						color: rgba(255, 255, 255, 0.87);
					}
					.btn {
						background: transparent;
						width: 120rpx;
						height: 44rpx;
						line-height: 44rpx;
						border-radius: 22rpx;
						color: rgba(255, 255, 255, 0.54);
						border: 1rpx solid rgba(255, 255, 255, 0.3);
						margin-left: 20rpx;
						margin-top: -12rpx;
					}
				}
			}
		}
		.menuBox {
			border-radius: 10rpx;
			background-color: #fff;
			margin-top: 16rpx;
			.item {
				width: 25%;
				height: 172rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 40rpx;
				color: rgba(0, 0, 0, 0.54);
				text-align: center;
				& > image {
					width: 44rpx;
					height: 44rpx;
					margin-bottom: 16rpx;
				}
			}
		}
	}
}
</style>
