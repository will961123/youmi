<template>
	<view class="goodsView">
		<view @click="navigate('/pages/my/business/goods/goodsInfo')" class="topMenu">
			<text>+</text>
			上架商品
		</view>
		<view v-for="(item, index) in list" :key="index" class="item flex align-center">
			<image :src="item.picture" mode="aspectFill"></image>
			<view class="infoBox flex flex-direction justify-between">
				<view class="name textov1">{{ item.name }}</view>
				<view class="moneyBox">
					<text class="redMoney">
						<text>￥</text>
						{{ item.price }}
					</text>
				</view>
				<view class="tipBox textov1">{{ item.desc }}</view>
			</view>
			<view class="setBox flex">
				<view @click="gotoDetail(item.id)" class="set set1">修改</view>
				<view @click="del(item.id)" class="set set2">删除</view>
			</view>
		</view> 
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			aaa:''
		};
	},
	onShow() {
		this.getList();
	},
	onLoad(options) { 
		console.log(options,options.keyword)  
		
	},
	methods: {
		gotoDetail(goodsId) {
			uni.navigateTo({
				url: '/pages/my/business/goods/goodsInfo?goodsId=' + goodsId
			});
		},
		del(product_id) {
			this.checkLogin().then(resolve => {
				this.showLoading();
				this.request({
					url: '/shop/postShopProductDelete',
					method: 'POST',
					data: {
						product_id
						// user_mark_id:this.getUserId()
					},
					success: res => {
						uni.hideLoading();
						console.log('删除商品', res);
						if (res.data.status === 1) {
							this.showToast('删除成功');
							this.getList();
						} else {
							this.showToast(res.data.info);
						}
					}
				});
			});
		},
		getList() {
			this.checkLogin().then(resolve => {
				this.showLoading();
				this.request({
					url: '/shop/postShopProductList',
					method: 'POST',
					data: {
						user_mark_id: this.getUserId()
					},
					success: res => {
						uni.hideLoading();
						console.log('查询列表', res);
						if (res.data.status === 1 && res.data.list) {
							this.list = res.data.list.map(i => {
								i.picture = res.data.image_url + i.picture;
								return i;
							});
						} else {
							this.showToast(res.data.info);
							this.list = [];
						}
					}
				});
			});
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
.goodsView {
	background-color: #fff;
	.topMenu {
		height: 80rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 80rpx;
		color: rgba(0, 0, 0, 1);
		text-align: right;
		padding-right: 30rpx;
		border-bottom: 1rpx solid #f3f3f3;
		& > text {
			margin-right: 14rpx;
		}
	}
	.item {
		padding: 30rpx 44rpx 30rpx 76rpx;
		border-bottom: 1rpx solid #d4d4d4;
		&:last-child {
			border-bottom: none;
		}
		& > image {
			width: 140rpx;
			height: 140rpx;
			border-radius: 10rpx;
			background-color: #c7c7c7;
		}
		.infoBox {
			height: 140rpx;
			padding: 0 52rpx 0 30rpx;
			.name,
			.moneyBox,
			.tipBox {
				width: 266rpx;
			}
			.name {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 40rpx;
				color: rgba(0, 0, 0, 1);
				opacity: 1;
			}
			.moneyBox {
				.redMoney {
					font-size: 32rpx;
					font-family: DIN;
					font-weight: bold;
					line-height: 36rpx;
					color: rgba(255, 96, 96, 1);
					opacity: 1;
					& > text {
						font-size: 24rpx;
					}
				}
			}
			.tipBox {
				padding: 0 10rpx;
				background-color: #ff9b9b;
				font-size: 24rpx;
				color: #fff;
			}
		}
		.setBox {
			.set {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 40rpx;
				color: rgba(0, 0, 0, 0.54);
			}
			.set1 {
				padding-right: 14rpx;
				border-right: 1rpx solid #dedede;
			}
			.set2 {
				padding-left: 14rpx;
			}
		}
	}
}
</style>
