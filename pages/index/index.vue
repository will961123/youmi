<template>
	<view class="indexView">
		<view class="topBox ">
			<view class="searchBox flex align-center">
				<view class="addressBox flex align-center">
					<image class="address" src="/static/ic-dz.png" mode="aspectFill"></image>
					<text>郑州</text>
				</view>
				<view class="inputBox  flex align-center flex1">
					<text class="cuIcon cuIcon-search"></text>
					<input placeholder-style="color:#fff;font-size:14px" type="text" placeholder="输入你要找的商品/商铺名称" />
				</view>
			</view>
			<view class="swBox">
				<swiper @change="swiperChange" class="sw" :indicator-dots="false" :autoplay="true" :interval="1800" :duration="1000">
					<swiper-item v-for="(item, index) in banner" :key="index" class="item"><image :src="item.src" mode="widthFix"></image></swiper-item>
				</swiper>
				<view class="will-dots-box flex">
					<view v-for="(item, index) in banner" :key="index" :class="selectBanner === index ? 'will-dots will-dots-select' : 'will-dots'"></view>
				</view>
			</view>
		</view>

		<view class="px30">
			<view class="menuBox flex justify-around align-center">
				<view @click="navigate(item.path)" v-for="(item, index) in menuList" :key="index" class="item flex flex-direction justify-center align-center">
					<image :src="item.src" mode="aspectFill"></image>
					<text>{{ item.text }}</text>
				</view>
			</view>
			<view class="upVip"><image src="/static/banner_vipsj.png" mode="widthFix"></image></view>
			<view class="counpListVIew">
				<view class="titBox">精选优惠券</view>
				<view v-for="(item, index) in 4" :key="index" class="counpItem">
					<view class="storeBox flex align-center">
						<image src="" mode="aspectFill"></image>
						<view class="info flex flex-direction justify-around ">
							<text>店铺名称店铺名称店铺</text>
							<view class="startBox flex align-center">
								<view class="startList">
									<image
										:key="startIndex"
										v-for="(start, startIndex) in 5"
										:src="startIndex >= 3 ? '/static/ic_star2.png' : '/static/ic_star1.png'"
										mode="aspectFill"
									></image>
								</view>
								<text class="solidBox">
									月售
									<text class="num">1011</text>
								</text>
								<text class="num">1.1KM</text>
							</view>
							<view class="discount flex align-center justify-between">
								<image src="/static/ic_ymzx.png" mode="widthFix"></image>
								<text>专享</text>
								<text>8.5折</text>
							</view>
						</view>
					</view>
					<view class="counpBox flex align-center justify-between">
						<view class="flex align-center">
							<view class="counpList flex">
								<view class="moneyBox">
									<text>￥</text>
									<text class="big">5</text>
								</view>
								<view class="type">满减</view>
							</view>
							<view class="counpList flex">
								<view class="moneyBox">
									<text>￥</text>
									<text class="big">15</text>
								</view>
								<view class="type">无门槛</view>
							</view>
						</view>
						<view class="btn text-center">去领取 ></view>
					</view>
				</view>
			</view>

			<view class="storeList">
				<view class="titBox">口碑好店</view>
				<view class="flex  flex-wrap justify-between">
					<view v-for="(item, index) in 3" :key="index" class="item">
						<image src="" mode="aspectFill"></image>
						<view class="name textov1">店铺名称店铺名称店铺名称店铺名称</view>
						<view class="startBox flex align-center">
							<view class="startList" style="margin-right:0" >
								<image
									:key="startIndex"
									v-for="(start, startIndex) in 5"
									:src="startIndex >= 3 ? '/static/ic_star2.png' : '/static/ic_star1.png'"
									mode="aspectFill"
								></image>
							</view>
							<text class="solidBox" style="font-size: 18rpx;margin-right:0;margin: 0 8rpx;">
								月售
								<text class="num" style="font-size: 18rpx;">1011</text>
							</text>
							<text class="num" style="font-size: 18rpx;">1.1KM</text>
						</view>
						<view class="discount flex align-center justify-between">
							<image src="/static/ic_ymzx.png" mode="widthFix"></image>
							<text>专享</text>
							<text>8.5折</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			banner: [{ src: '/static/banner_home.png' }, { src: '/static/banner_home.png' }],
			selectBanner: 0,
			menuList: [
				{ src: '/static/ic-cz.png', text: '便民充值', path: '/path/vip/vip' },
				{ src: '/static/ic-xdty.png', text: '新店体验', path: '/path/vip/vip' },
				{ src: '/static/ic_yhxb.png', text: '优惠小报', path: '/path/vip/vip' },
				{ src: '/static/ic-cjzk.png', text: '超级折扣', path: '/path/vip/vip' }
			]
		};
	},
	onLoad() {},
	methods: {
		swiperChange(e) {
			this.selectBanner = Number(e.detail.current);
		},
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
	background: rgba(245, 245, 245, 1);
}
.indexView {
	// padding-bottom: 80px;
	.topBox {
		position: relative;
		.searchBox {
			position: absolute;
			left: 0;
			top: 15px;
			width: 100%;
			z-index: 99;
			padding: 0 30rpx;
			.addressBox {
				margin-right: 14rpx;
				color: #000;
				font-size: 16px;
				font-weight: 800;
				.address {
					margin-right: 15rpx;
					width: 48rpx;
					height: 48rpx;
					display: inline-block;
				}
			}
			.inputBox {
				background: rgba(0, 0, 0, 0.1);
				height: 30px;
				border-radius: 15px;
				color: #fff;
				padding: 0 16rpx;
				.cuIcon-search {
					font-size: 15px;
					margin-right: 12rpx;
				}
				& > input {
					flex: 1;
					color: #fff;
					font-size: 14px;
				}
			}
		}
		.swBox {
			width: 100%;
			height: 190px;
			position: relative;
			.sw {
				width: 100%;
				height: 100%;
				.item {
					width: 100%;
					height: 100%;
					& > image {
						width: 100%;
					}
				}
			}
			.will-dots-box {
				position: absolute;
				bottom: 40px;
				left: 50%;
				transform: translate(-50%);
				z-index: 100;

				.will-dots {
					width: 14rpx;
					height: 14rpx;
					border: 1rpx solid #707070;
					border-radius: 50%;
					margin-right: 10rpx;
					&:last-child {
						margin-right: 0;
					}
				}
				.will-dots-select {
					background-color: #000;
				}
			}
		}
	}

	.px30 {
		padding: 0 30rpx;
		padding-bottom: 30px;
		width: 100%;
		.menuBox {
			height: 196rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);
			border-radius: 20rpx;
			margin-top: -35px;
			position: relative;
			.item {
				& > image {
					width: 90rpx;
					height: 90rpx;
					margin-bottom: 14rpx;
					border-radius: 50%;
				}
				color: #000000;
				font-weight: 400;
				font-size: 24rpx;
			}
		}
		.upVip {
			width: 100%;
			margin-top: 7px;
			& > image {
				width: 100%;
			}
		}
		.titBox {
			position: relative;
			padding-left: 26rpx;
			font-size: 40rpx;
			font-family: FZLanTingHeiPro_GB18030;
			font-weight: 600;
			color: rgba(0, 0, 0, 1);
			opacity: 0.87;
			height: 40rpx;
			line-height: 40rpx;
			margin: 20px 0 15px 0;
			&::before {
				content: '';
				width: 10rpx;
				height: 40rpx;
				background: rgba(235, 11, 11, 1);
				opacity: 1;
				border-radius: 13rpx;
				position: absolute;
				left: 0;
				top: 0;
			}
		}
		.counpListVIew {
			.counpItem {
				border-radius: 20rpx;
				margin-bottom: 16rpx;
				.storeBox {
					background: #fff;
					padding: 24rpx 30rpx;
					& > image {
						width: 140rpx;
						height: 140rpx;
						border-radius: 10rpx;
						margin-right: 22rpx;
						background-color: #c7c7c7;
					}
					.info {
						& > text {
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: bold;
							line-height: 45rpx;
							color: rgba(0, 0, 0, 1);
						}
					}
				}
			}
		}
		.storeList {
			.item {
				width: 330rpx;
				background-color: #fff;
				padding: 16rpx;
				margin-bottom: 20rpx;
				& > image {
					width: 100%;
					height: 185rpx;
					background-color: #bfbfbf;
					border-radius: 8rpx;
				}
			}
		}

		.startBox {
			margin: 14rpx 0 20rpx 0;
			font-size: 22rpx;
			.startList {
				// width: 150rpx;
				margin-right: 20rpx;
				& > image {
					width: 22rpx;
					height: 22rpx;
					margin-right: 4rpx;
				}
			}
			.solidBox {
				margin-right: 20rpx;
				color: rgba(0, 0, 0, 0.54);
			}
			.num.num {
				color: #000;
				margin-left: 6rpx;
			}
		}
		.discount {
			background: rgba(255, 238, 221, 1);
			height: 28rpx;
			font-size: 20rpx;
			font-weight: bold;
			color: #000;
			width: 150rpx;
			padding: 0 14rpx 0 8rpx;
			border-radius: 4rpx;
			& > image {
				width: 18rpx;
				height: 15rpx;
			}
		}
		.counpBox {
			padding: 16rpx 30rpx 30rpx 30rpx;
			background: #ffeedd;
			.counpList {
				margin-right: 16rpx;
				background: #ff6666;
				padding: 0 16rpx 0 6rpx;
				height: 44rpx;
				line-height: 44rpx;
				color: #fff;
				font-size: 22rpx;
				overflow: hidden;
				.moneyBox {
					font-size: 20rpx;
					vertical-align: middle;
					padding-right: 14rpx;
					border-right: 2px dashed rgba(255, 255, 255, 0.3);
					// overflow-y: hidden;
					position: relative;
					&::after,
					&::before {
						width: 16rpx;
						height: 16rpx;
						background: #fff;
						position: absolute;
						right: -10rpx;
						content: '';
						border-radius: 50%;
					}
					&::after {
						top: -10rpx;
					}
					&::before {
						bottom: -10rpx;
					}
					.big {
						font-size: 28rpx;
						font-weight: 700;
					}
				}
				.type {
					margin-left: 10rpx;
				}
			}
			.btn {
				width: 140rpx;
				height: 44rpx;
				line-height: 44rpx;
				border: 1rpx solid rgba(255, 102, 102, 1);
				border-radius: 4rpx;
				color: #ff6666;
				font-size: 22rpx;
			}
		}
	}
}
</style>
