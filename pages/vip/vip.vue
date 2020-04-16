<template>
	<view class="vipView">
		<view class="bgRed"></view>
		<view class="container">
			<view class="userBox bg-white">
				<image src="/static/hy-hyk.png" mode="widthFix"></image>
				<view style="position: relative;z-index: 2;">
					<view class="flex justify-between">
						<view class="userInfo flex align-center">
							<image src="" mode="aspectFill"></image>
							<view class="nameBox">
								<view class="name">用户名</view>
								<view class="idBox">ID 133***333</view>
							</view>
						</view>
						<view class="vipBox ">
							<view class="vipName flex  justify-end align-center">
								<image src="/static/ic-hy.png" mode="aspectFill"></image>
								VIP 会员
							</view>
							<view class="dateBox">
								到期时间
								<text>2020.02.02</text>
							</view>
						</view>
					</view>
					<view class="btn cu-btn">续费</view>
				</view>
			</view>
			<view class="numBox bg-white">
				<view class="topTip">
					<image src="/static/ic_ymhy1.png" mode="aspectFill"></image>
					优觅VIP已为您节省
				</view>
				<view class="numBox flex">
					<view class="item flex1 flex justify-around align-center">
						<text>合计</text>
						<view>
							<text class="rmb">￥</text>
							<text class="num">20.00</text>
						</view>
					</view>
					<view class="item flex1 flex justify-around align-center">
						<text>优惠次数</text>
						<text class="num">20</text>
						<text class="zd">账单></text>
					</view>
				</view>
			</view>
			<view class="vipAdImgBox"><image src="/static/hy-bq.png" mode="widthFix"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less">
page {
	background-color: #fff;
}
.vipView {
	.bgRed {
		background: linear-gradient(135deg, rgba(255, 39, 45, 1) 0%, rgba(235, 11, 11, 1) 100%);
		height: 196rpx;
	}
	.container {
		padding: 0 30rpx;
		margin-top: -160rpx;
		.userBox {
			width: 100%;
			height: 240rpx;
			position: relative;
			border-radius: 20rpx 20rpx 0 0;
			padding: 32rpx 30rpx 0 30rpx;
			& > image {
				width: 100%;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 1;
			}
			.userInfo {
				& > image {
					width: 80rpx;
					height: 80rpx;
					background-color: #fff;
					border-radius: 50%;
					margin-right: 18rpx;
				}
				.nameBox {
					color: #fff;
					font-size: 24rpx;
					.name {
						font-size: 32rpx;
						margin-bottom: 8rpx;
					}
				}
			}
			.vipBox {
				.vipName {
					font-size: 26rpx;
					font-family: FZLanTingHeiPro_GB18030;
					font-weight: 400;
					line-height: 52rpx;
					color: rgba(255, 255, 255, 1);
					opacity: 1;
					& > image {
						width: 38rpx;
						height: 32rpx;
						margin-right: 10rpx;
					}
				}
				.dateBox {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 33rpx;
					color: rgba(255, 255, 255, 0.5);
					& > text {
						font-size: 28rpx;
						margin-left: 16rpx;
					}
				}
			}
			.btn {
				width: 140rpx;
				height: 52rpx;
				border: 2rpx solid rgba(220, 132, 81, 1);
				border-radius: 26rpx;
				text-align: center;
				font-size: 24rpx;
				font-family: FZLanTingHeiPro_GB18030;
				font-weight: 600;
				line-height: 52rpx;
				color: rgba(220, 132, 81, 1);
				float: right;
				background-color: transparent;
				margin-top: 30rpx;
			}
		}
		.numBox {
			box-shadow: 3px 6px 2px rgba(0, 0, 0, 0.16);
			// box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
			border-radius: 20rpx;
			position: relative;
			overflow: hidden;
			margin-top: 24rpx;
			padding-bottom: 10rpx;
			padding-top: 18rpx;
			.topTip {
				display: inline-block;
				padding: 6rpx 16rpx;
				background-color: #ff6664;
				font-size: 20rpx;
				color: #fff;
				position: absolute;
				left: 0;
				top: 0;
				border-bottom-right-radius: 30rpx;

				& > image {
					width: 22rpx;
					height: 20rpx;
					margin-right: 6rpx;
				}
			}
			.numBox {
				margin-top: 28rpx;
				.item {
					// padding: 0 30rpx;
					padding-top: 6rpx;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 28rpx;
					&:first-child {
						border-right: 1rpx solid rgba(112, 112, 112, 0.16);
					}
					.rmb {
						font-size: 30rpx;
						font-family: DIN;
						font-weight: 400;
						line-height: 37rpx;
						color: rgba(0, 0, 0, 0.54);
					}
					.num {
						font-size: 60rpx;
						font-family: DIN;
						font-weight: bold;
						line-height: 73rpx;
						color: rgba(0, 0, 0, 0.87);
					}
					.zd {
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 28rpx;
						color: rgba(255, 102, 102, 1);
					}
				}
			}
		}
		.vipAdImgBox{
			margin-top: 18rpx;
			&>image{
				width: 100%;
			}
		}
	}
}
</style>
