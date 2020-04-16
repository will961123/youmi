<template>
	<view class="storeList">
		<view class="topBox bg-white">
			<view class="searchBox flex align-center">
				<text class="cuIcon cuIcon-search"></text>
				<input type="text" placeholder="输入你要找的商品/商铺名称" />
			</view>
			<view class="categoryOne ">
				<view @click="changeCategory(1, index)" :key="index" v-for="(item, index) in 7" :class="index === categoryOneIdx ? 'select' : ''" class="item">
					一级分类
					<text></text>
				</view>
			</view>
		</view>
		<view class="categoryTwo">
			<view @click="changeCategory(2, index)" :key="index" v-for="(item, index) in 7" :class="index === categoryTwoIdx ? 'select' : ''" class="item">
				<image src="" mode="aspectFill"></image>
				<view>全部</view>
			</view>
		</view>
		<view class="storeBoxView bg-white">
			<view class="topType flex justify-end align-center">
				<view>综合排序</view>
				<text class="cuIcon cuIcon-searchlist"></text>
			</view>
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
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			categoryOneIdx: 0,
			categoryTwoIdx: 2
		};
	},
	methods: {
		changeCategory(type, idx) {
			if (type === 1) {
				this.categoryOneIdx = idx;
				this.categoryTwoIdx = 0;
			} else {
				this.categoryTwoIdx = idx;
			}
		}
	}
};
</script>

<style lang="less">
.storeList {
	.topBox {
		padding: 0 30rpx;
		padding-top: 30rpx;
		.searchBox {
			width: 550rpx;
			background-color: #f4f1f4;
			height: 60rpx;
			padding: 0 16rpx;
			margin: 0 auto;
			margin-bottom: 30rpx;
			border-radius: 30rpx;
			& > text {
				margin-right: 18rpx;
				font-size: 34rpx;
			}
			& > input {
				flex: 1;
				font-size: 28rpx;
			}
		}
		.categoryOne {
			width: 100%;
			overflow-x: auto;
			white-space: nowrap;
			.item {
				display: inline-block;
				margin-right: 30rpx;
				font-weight: 600;
				& > text {
					display: block;
					width: 80rpx;
					border-bottom: 4rpx solid transparent;
					margin: 0 auto;
					margin-top: 8rpx;
				}
				&.select {
					color: #eb0b0b;
					font-size: 32rpx;
					& > text {
						border-bottom: 4rpx solid #eb0b0b;
					}
				}
			}
		}
	}
	.categoryTwo {
		width: 100%;
		overflow-x: auto;
		white-space: nowrap;
		.item {
			display: inline-block;
			margin: 30rpx 30rpx 0 30rpx;
			text-align: center;
			& > image {
				width: 90rpx;
				height: 90rpx;
				background-color: #dddddd;
				border-radius: 50%;
			}
			& > view {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 600;
				line-height: 40rpx;
				color: rgba(0, 0, 0, 0.54);
				margin-top: 12rpx;
			}
			&.select {
				& > image {
					background-color: #ffa3a3;
				}
				& > view {
					color: #000;
				}
			}
		}
	}
	.storeBoxView {
		padding: 38rpx 30rpx 50rpx 0rpx;
		border-radius:40rpx 40rpx 0px 0px;
		margin-top: 40rpx;
		.topType {
			color: #000;
			font-weight: 600;
			font-size: 28rpx;
			margin-bottom: 30rpx;
			& > text {
				margin-left: 18rpx;
				font-size: 34rpx;
			}
		}
		.counpItem {
			border-radius: 20rpx;
			margin-bottom: 16rpx;
			.storeBox {
				background: #fff;
				padding: 0rpx 30rpx;
				margin-bottom: 30rpx;
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
		}
	}
}
</style>
