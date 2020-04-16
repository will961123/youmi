<template>
	<view class="business">
		<view class="bgRed"></view>
		<view class="container">
			<view class="userBox">
				<view class="userInfoBox flex align-center">
					<view class="headerBox"><image class="header" src="" mode="aspectFill"></image></view>
					<view class="nameBox flex flex-direction"><view class="name">用户名</view></view>
				</view>
				<view class="numBox flex align-end">
					<view class="item">
						<view class="name">今日收款</view>
						<view class="moneyBox text-black">
							￥
							<text>{{ showMoney ? 1000.0 : '******' }}</text>
						</view>
					</view>
					<view class="item">
						<view class="name">
							<image @click="showMoney = !showMoney" :src="showMoney ? '/static/eye1.png' : '/static/eye2.png'" mode="aspectFill"></image>
							钱包余额
						</view>
						<view class="moneyBox">
							￥
							<text>{{ showMoney ? 1000.0 : '******' }}</text>
						</view>
					</view>
					<view class="item"><button class="btn cu-btn">提现</button></view>
				</view>
			</view>

			<view class="menuBox flex flex-wrap">
				<view @click="navigate(item.path)" v-for="(item, index) in menuList" :key="index" class="item flex flex-direction justify-center text-center">
					<view class="imgBox flex align-center"><image :src="item.icon" mode="widthFix"></image></view>

					<text>{{ item.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showMoney: true,
			menuList: [
				{ icon: '/static/ic-spgl-sj.png', path: '/pages/my/business/goods/goods', name: '商品管理' },
				{ icon: '/static/ic-yhqgl.png', path: '/pages/my/business/businessCounp', name: '优惠卷管理' },
				{ icon: '/static/ic-txjl.png', path: '', name: '提现管理' },
				{ icon: '/static/ic-skjl.png', path: '', name: '收款记录' },
				{ icon: '/static/ic-dpxx.png', path: '/pages/my/business/businessInfo', name: '店铺信息' }
			]
		};
	},
	methods: {
		navigate(url) {
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #fff;
}
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
		padding-bottom: 27rpx;
		.userInfoBox {
			padding: 46rpx 30rpx 30rpx 30rpx;
			border-bottom: 1rpx solid #707070;
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
	}

	.numBox {
		margin-top: 10rpx;
		.item {
			flex: 1;
			text-align: center;
			.name {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 28rpx;
				color: rgba(0, 0, 0, 0.54);
				& > image {
					width: 25rpx;
					height: 18rpx;
					margin-right: 12rpx;
				}
			}
			.moneyBox {
				font-size: 20rpx;
				color: rgba(0, 0, 0, 0.54);
				margin-top: 20rpx;
				& > text {
					font-size: 36rpx;
				}
			}
			.text-black {
				color: #000;
			}
			.btn {
				width: 120rpx;
				height: 44rpx;
				border: 1rpx solid rgba(255, 102, 102, 1);
				opacity: 1;
				border-radius: 4rpx;
				font-size: 20rpx;
				font-family: PingFang SC;
				line-height: 44rpx;
				color: rgba(255, 102, 102, 1);
				background-color: transparent;
			}
		}
	}

	.menuBox {
		margin-top: 30rpx;
		.item {
			width: 33.3%;
			height: 230rpx;
			border-bottom: 1rpx solid rgba(112,112,112,0.16);
			border-right: 1rpx solid rgba(112,112,112,0.16);
			&:nth-child(4) {
				border-bottom: none;
			}
			&:nth-child(5) {
				border-bottom: none;
			}
			.imgBox {
				width: 65rpx;
				height: 65rpx;
				margin: 0 auto;
				& > image {
					max-width: 65rpx;
				}
			}
			& > text {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 600;
				line-height: 42rpx;
				color: rgba(0, 0, 0, 0.87);
				margin-top: 20rpx;
			}
		}
	}
}
</style>
