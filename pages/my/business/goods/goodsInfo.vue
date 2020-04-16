<template>
	<view class="goodsInfo">
		<view class="container">
			<view class="item flex align-center">
				<text class="name">商品名称:</text>
				<input v-model="goodsInfo.name" type="text" placeholder="请输入商品名" />
			</view>
			<view class="item">
				<text class="name">商品封面:</text>
				<text class="tip">(最多上传1张)</text>
				<view class="cu-form-group" style="margin-top: 30rpx;padding: 0;">
					<view class="grid col-4 grid-square flex-sub">
						<view class="solids" @tap="ChooseImage(1)" v-if="goodsInfo.picture.length < 1"><text class="cuIcon-cameraadd"></text></view>
						<view class="bg-img" v-for="(item, index) in goodsInfo.picture" :key="index" @tap="ViewImage(1)" :data-url="goodsInfo.picture[index]">
							<image :src="imgurl + goodsInfo.picture[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @click.stop="DelImg" :data-type="1" :data-index="index"><text class="cuIcon-close"></text></view>
						</view>
					</view>
				</view>
			</view>
			<view class="item">
				<text class="name">普通价格:</text>
				<input v-model="goodsInfo.price" type="digit" placeholder="请输入价格" />
			</view>
			<view class="item">
				<text class="name">Vip价格:</text>
				<input v-model="goodsInfo.vip_price" type="digit" placeholder="请输入价格" />
			</view>
			<view class="item">
				<text class="name">标签/说明:</text>
				<input v-model="goodsInfo.desc" type="text" placeholder="请输入标签/说明" />
			</view>

			<button @click="saveGoods" class="btn cu-btn">{{ type === 1 ? '确定上架' : '确定修改' }}</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			goodsId: '',
			type: 1, // 1上架 2修改
			imgurl: '',
			goodsInfo: {
				name: '',
				price: '',
				vip_price: '',
				picture: [], // 封面
				images: '', // 轮播 弃用
				desc: ''
			},
			imgList: [],
			banner: []
		};
	},
	onLoad(options) {
		if (options.goodsId && options.goodsId !== 'undefied') {
			this.goodsId = options.goodsId;
			this.type = 2;
		}
		this.goodsId && this.getGOodsInfo();
	},
	methods: {
		getGOodsInfo() {
			this.checkLogin().then(resolve => {
				this.showLoading();
				this.request({
					url: '/shop/getProductOne/' + this.goodsId,
					data: {},
					success: res => {
						uni.hideLoading();
						console.log('商品信息', res);
						if (res.data.status === 1) {
							this.imgurl = res.data.image_url;
							this.goodsInfo = res.data.product_info;
							this.$set(this.goodsInfo, 'picture', [res.data.product_info.picture]);
						} else {
							uni.showModal({
								title: '商品信息',
								content: res.data.info,
								showCancel: false,
								success: res => {
									if (res.confirm) {
										uni.navigateBack({
											delta: 1
										});
									}
								}
							});
						}
					}
				});
			});
		},
		saveGoods() {
			if (!this.goodsInfo.name) {
				this.showToast('请输入商品名称');
				return;
			}
			if (this.goodsInfo.picture.length === 0) {
				this.showToast('请上传商品封面');
				return;
			}
			if (!this.goodsInfo.price) {
				this.showToast('请输入商品价格');
				return;
			}
			if (!this.goodsInfo.vip_price) {
				this.showToast('请输入Vip价格');
				return;
			}
			if (!this.goodsInfo.desc) {
				this.showToast('请输入标签/说明');
				return;
			}
			let formData = {
				name: this.goodsInfo.name,
				price: this.goodsInfo.price,
				vip_price: this.goodsInfo.vip_price,
				picture: this.goodsInfo.picture[0],
				desc: this.goodsInfo.desc,
				user_mark_id: this.getUserId()
			};
			let url = '/shop/postShopAddProduct';
			if (this.type === 2) {
				url = '/shop/postShopEditProduct';
				formData.id = this.goodsId;
			}
			this.checkLogin().then(resolve => {
				this.showLoading();
				this.request({
					url,
					data: formData,
					method: 'POST',
					success: res => {
						uni.hideLoading();
						console.log(this.type === 1 ? '上传商品' : '修改商品', res);
						if (res.data.status === 1) {
							uni.showModal({
								title: this.type === 1 ? '上传商品' : '修改商品',
								content: this.type === 1 ? '上传商品成功' : '修改商品成功',
								showCancel: false,
								success: res => {
									if (res.confirm) {
										uni.navigateBack({
											delta: 1
										});
									}
								}
							});
						} else {
							uni.showModal({
								title: this.type === 1 ? '上传商品' : '修改商品',
								content: res.data.info,
								showCancel: false,
								success: res => {
									if (res.confirm) {
										// uni.navigateBack({
										// 	delta:1
										// })
									}
								}
							});
						}
					}
				});
			});
		},
		ChooseImage(type) {
			console.log(type);
			if (type === 1 && this.goodsInfo.picture.length >= 1) {
				return;
			}
			if (type === 2 && this.goodsInfo.banner.length >= 5) {
				return;
			}
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					this.showLoading();
					uni.uploadFile({
						url: this.uploadUrl + '/admin/upload', //仅为示例，非真实的接口地址
						filePath: res.tempFilePaths[0],
						name: 'file',
						formData: {},
						success: resoultRes => {
							uni.hideLoading();
							let resoult = JSON.parse(resoultRes.data);
							console.log('上传图片', resoult);
							if (resoult.status === 1) {
								if (type === 1) {
									this.goodsInfo.picture.push(resoult.url);
									this.imgurl = resoult.image_url;
									if (this.imgList.length != 0) {
										this.imgList = this.imgList.concat(res.tempFilePaths);
									} else {
										this.imgList = res.tempFilePaths;
									}
								} else {
									this.goodsInfo.banner.push(resoult.url);
									this.imgurl = resoult.image_url;
									if (this.banner.length != 0) {
										this.banner = this.banner.concat(res.tempFilePaths);
									} else {
										this.banner = res.tempFilePaths;
									}
								}
							} else {
								this.showToast(resoult.info);
							}
						},
						fail: err => {
							console.log(err);
						}
					});
				}
			});
		},
		ViewImage(e) {
			let type = Number(e.currentTarget.dataset.type);
			return;
			uni.previewImage({
				urls: this.goodsInfo.pic,
				// urls: this.imgList,
				current: e.currentTarget.dataset.url
			});
		},
		DelImg(e) {
			let type = Number(e.currentTarget.dataset.type);
			if (type === 1) {
				this.imgList.splice(e.currentTarget.dataset.index, 1);
				this.goodsInfo.picture.splice(e.currentTarget.dataset.index, 1);
			} else {
				this.banner.splice(e.currentTarget.dataset.index, 1);
				this.storeInfo.banner.splice(e.currentTarget.dataset.index, 1);
			}
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #fff;
}
.goodsInfo {
	.container {
		padding: 0 30rpx;
		.item {
			border-bottom: 1rpx solid #eeeeee;
			padding: 26rpx 0;
			.name {
				display: inline-block;
				width: 176rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 45rpx;
				color: rgba(0, 0, 0, 1);
			}
			.tip {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 33rpx;
				color: rgba(0, 0, 0, 0.54);
			}
			& > input {
				flex: 1;
			}
		}
		.btn {
			width: 550rpx;
			height: 70rpx;
			line-height: 70rpx;
			background: rgba(235, 11, 11, 1);
			color: #fff;
			text-align: center;
			position: fixed;
			left: 50%;
			margin-left: -275rpx;
			bottom: 74rpx;
		}
	}
}
</style>
