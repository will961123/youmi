<template>
	<view class="businessInfo">
		<view class="container bg-white">
			<view class="item">
				<view class="title flex">
					<view class="iconBox"><image src="/static/addresss.png" mode="widthFix"></image></view>
					店铺名称
				</view>
				<input v-model="storeInfo.name" type="text" placeholder="请输入店铺名称" />
			</view>
			<view class="item">
				<view class="title flex">
					<view class="iconBox"><image src="/static/phone.png" mode="widthFix"></image></view>
					联系电话
				</view>
				<input v-model="storeInfo.phone" type="number" placeholder="请输入联系电话" />
			</view>
			<view class="item">
				<view class="title flex align-center">
					店铺封面
					<text class="tip">(最多上传1张)</text>
				</view>
				<view class="cu-form-group" style="margin-top: 30rpx;padding: 0;">
					<view class="grid col-4 grid-square flex-sub">
						<view class="solids" @tap="ChooseImage(1)" v-if="storeInfo.header.length < 1"><text class="cuIcon-cameraadd"></text></view>
						<view class="bg-img" v-for="(item, index) in storeInfo.header" :key="index" @tap="ViewImage(1)" :data-url="storeInfo.header[index]">
							<image :src="imgurl + storeInfo.header[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @click.stop="DelImg" :data-type="1" :data-index="index"><text class="cuIcon-close"></text></view>
						</view>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="title flex align-center">
					店铺图片
					<text class="tip">(最多上传5张)</text>
				</view>
				<view class="cu-form-group" style="margin-top: 30rpx;padding: 0;">
					<view class="grid col-4 grid-square flex-sub">
						<view class="solids" @tap="ChooseImage(2)" v-if="storeInfo.banner.length < 5"><text class="cuIcon-cameraadd"></text></view>
						<view class="bg-img" v-for="(item, index) in storeInfo.banner" :key="index" @tap="ViewImage(2)" :data-url="storeInfo.banner[index]">
							<image :src="imgurl + storeInfo.banner[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @click.stop="DelImg" :data-type="2" :data-index="index"><text class="cuIcon-close"></text></view>
						</view>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="title flex align-center">
					<view class="iconBox"><image src="/static/audio.png" mode="widthFix"></image></view>
					店铺简介
					<!-- <text class="tip">(最多24字)</text> -->
				</view>
				<textarea v-model="storeInfo.tip" placeholder="请输入店铺简介" />
			</view>

			<button @click="saveSet" class="btn cu-btn">确定修改</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			storeInfo: {
				name: '测试店铺1',
				catrgory: {
					id: '',
					name: ''
				},
				address: {},
				phone: '15936666666',
				pic: [],
				header:[],
				banner: [],
				tip: '店铺简介'
			},
			imgList: [],
			banner: []
		};
	},
	methods: {
		saveSet() {
			if (!this.storeInfo.name) {
				this.showToast('请输入商铺名');
				return;
			}  
			if (!this.storeInfo.phone) {
				this.showToast('请输入商铺联系电话');
				return;
			}
			if (!this.checkPhone(this.storeInfo.phone)) {
				this.showToast('请输入正确的电话');
				return;
			} 
			if (this.storeInfo.header.length == 0) {
				this.showToast('请上传店铺封面');
				return;
			}
			if (this.storeInfo.banner.length == 0) {
				this.showToast('请上传店铺图片');
				return;
			}
			if (!this.storeInfo.tip) {
				this.showToast('请输入商铺简介');
				return;
			}
			return
			let formData = {
				shop_name: this.storeInfo.name,
				link_tel: this.storeInfo.phone,
				shop_type_id: this.storeInfo.catrgory.id,
				shop_type_name: this.storeInfo.catrgory.name,
				shop_picture: this.storeInfo.pic.join(','),
				longitude: this.storeInfo.address.longitude,
				latitude: this.storeInfo.address.latitude,
				shop_address: this.storeInfo.address.name,
				province_id: this.multiIdArray[0][this.multiIndex[0]].id,
				city_id: this.multiIdArray[1][this.multiIndex[1]].id,
				area_id: this.multiIdArray[2][this.multiIndex[2]].id,
				province_name: this.multiIdArray[0][this.multiIndex[0]].name,
				city_name: this.multiIdArray[1][this.multiIndex[1]].name,
				area_name: this.multiIdArray[2][this.multiIndex[2]].name,
				user_mark_id: this.getUserId()
			};
			let url = '/shopApply/postAdd';
			if (this.resetStore) {
				formData.id = this.errInfo.id;
				url = '/shopApply/postEdit';
			}
			console.log(formData);
			this.checkLogin().then(resolve => {
				this.showLoading();
				this.request({
					url,
					data: formData,
					method: 'POST',
					success: res => {
						uni.hideLoading();
						console.log('入驻', res);
						if (res.data.status === 1) {
							this.userStatus =  -2 
							this.resetStore = false
							// uni.navigateBack({
							// 	delta: 1
							// });
						} else {
							this.showToast(res.data.info);
						}
					}
				});
			});
		},
		ChooseImage(type) {
			console.log(type)
			if (type === 1 && this.storeInfo.header.length >= 1) {
				return;
			}
			if (type === 2 && this.storeInfo.banner.length >= 5) {
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
									this.storeInfo.header.push(resoult.url);
									this.imgurl = resoult.image_url;
									if (this.imgList.length != 0) {
										this.imgList = this.imgList.concat(res.tempFilePaths);
									} else {
										this.imgList = res.tempFilePaths;
									}
								} else {
									this.storeInfo.banner.push(resoult.url);
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
				urls: this.storeInfo.pic,
				// urls: this.imgList,
				current: e.currentTarget.dataset.url
			});
		},
		DelImg(e) {
			let type = Number(e.currentTarget.dataset.type);
			if (type === 1) {
				this.imgList.splice(e.currentTarget.dataset.index, 1);
				this.storeInfo.header.splice(e.currentTarget.dataset.index, 1);
			} else {
				this.banner.splice(e.currentTarget.dataset.index, 1);
				this.storeInfo.banner.splice(e.currentTarget.dataset.index, 1);
			} 

		}
	}
};
</script>

<style lang="less">
.businessInfo {
	.container {
		padding: 0 30rpx;
		padding-bottom: 60rpx;
		.item {
			padding: 30rpx 0;
			border-bottom: 1rpx solid #707070;
			&:last-child {
				border-bottom: none;
			}
			.title {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 45rpx;
				color: rgba(0, 0, 0, 1);
				.iconBox {
					width: 48rpx;
					& > image {
						max-width: 38rpx;
					}
				}
				.tip {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 33rpx;
					color: rgba(0, 0, 0, 0.38);
					margin-left: 12px;
				}
			}
			& > input,
			& > textarea {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 45rpx;
				color: rgba(0, 0, 0, 0.54);
				margin-top: 20rpx;
			}
			& > textarea {
				height: 130rpx;
				width: 100%;
			}
		}
		.btn {
			width: 550rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			background-color: #eb0b0b;
			color: #fff;
			margin: 0 auto;
			margin-top: 100rpx;
			display: block;
		}
	}
}
</style>
