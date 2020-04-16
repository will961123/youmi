<template>
	<view class="addStore">
		<view class="statusBox text-center flex justify-center flex-direction" v-if="userStatus === 1">
			<image src="/static/storeStatus3.png" mode="widthFix"></image>
			<view class="storeStatus">审核成功</view>
			<button @click="gotoBusiness" class="btn cu-btn">去我的店铺</button>
		</view>
		<view class="statusBox text-center flex justify-center flex-direction" v-if="userStatus === -1 && !resetStore">
			<image src="/static/storeStatus2.png" mode="widthFix"></image>
			<view class="storeStatus">审核未通过:{{ errInfo.info }}</view>
			<button @click="reSetStore" class="btn cu-btn">重新审核</button>
		</view>
		<view class="statusBox text-center flex justify-center flex-direction" v-if="userStatus === -2">
			<image src="/static/storeStatus1.png" mode="widthFix"></image>
			<view class="storeStatus">审核中请等待...</view>
		</view>
		<!-- <view v-if="true"> -->
		<view v-if="userStatus === -3 || resetStore">
			<view class="section">
				<view class="item flex align-center">
					<text class="tipName">商家名称:</text>
					<input type="text" v-model="storeInfo.name" placeholder="请输入商铺名" placeholder-style="color:rgba(0,0,0,0.16)" />
				</view>
				<view class="item category flex align-center">
					<text class="tipName">行业分类:</text>
					<input
						@click="showCategoryModel"
						type="text"
						:value="storeInfo.catrgory.name"
						:disabled="true"
						placeholder="请选择分类"
						placeholder-style="color:rgba(0,0,0,0.16)"
					/>
					<text class="cuIcon cuIcon-right"></text>
				</view>
				<view class="item flex align-center">
					<text class="tipName">店铺地址:</text>
					<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
						<view class="picker">
							{{ multiIdArray[0].length > 0 ? multiIdArray[0][multiIndex[0]].name : '加载中' }}，{{
								multiIdArray[1].length > 0 ? multiIdArray[1][multiIndex[1]].name : '加载中'
							}}，{{ multiIdArray[2].length > 0 ? multiIdArray[2][multiIndex[2]].name : '加载中' }}
						</view>
					</picker>
				</view>
				<view class="item flex align-center">
					<text class="tipName">详细地址:</text>
					<view @click="showLoaction" class="flex1 textov1 ">{{ storeInfo.address.name || '请选择地址' }}</view>
				</view>
				<view class="item flex align-center">
					<text class="tipName">联系电话:</text>
					<input type="number" v-model="storeInfo.phone" placeholder="请输入商铺联系电话" placeholder-style="color:rgba(0,0,0,0.16)" />
				</view>
			</view>

			<view class="section">
				<view class="item flex align-center"><text class="tipName">营业资质</text></view>
				<view class="tip">请拍照上传营业执照</view>
				<view class="cu-form-group" style="padding: 0;">
					<view class="grid col-4 grid-square flex-sub">
						<view class="solids" @tap="ChooseImage" v-if="storeInfo.pic.length < 1"><text class="cuIcon-cameraadd"></text></view>
						<view class="bg-img" v-for="(item, index) in storeInfo.pic" :key="index" @tap="ViewImage" :data-url="storeInfo.pic[index]">
							<image :src="imgurl + storeInfo.pic[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @click.stop="DelImg" :data-index="index"><text class="cuIcon-close"></text></view>
						</view>
					</view>
				</view>
			</view>

			<view class="section">
				<view class="item flex align-center">
					<checkbox-group class="small" @change="CheckboxChange" style="margin-right: 32rpx;">
						<label>
							<checkbox :class="checkAgreement ? 'checked red ' : ''" :checked="checkAgreement" />
							<text></text>
						</label>
					</checkbox-group>
					<text style="font-size: 28rpx;color: #000;">我已阅读</text>
					<text @click="showAgreement = true" class="showAgreement">《优觅商家入驻协议》</text>
				</view>
			</view>

			<will-tip v-if="showAgreement" @close="showAgreement = false" color=" rgba(235, 11, 11, 1)" tittle="优觅商家入驻协议" content="内容"></will-tip>

			<view @click="saveStore" class="btn cu-btn">提交申请</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			storeInfo: {
				name: '',
				catrgory: {
					id: '',
					name: ''
				},
				address: {},
				phone: '',
				pic: []
			},
			imgList: [],
			checkAgreement: true,
			showAgreement: false,
			userStatus: -2,
			multiArray: [[], [], []],
			multiIdArray: [[], [], []],
			multiIndex: [0, 0, 0],
			storeCategoryList: [],
			storeCategoryNameList: [],
			storeCategoryIndex: -1,
			locationOnLoad: {},
			errInfo: { info: '', id: '', status: '' },
			resetStore: false,

			imgurl: ''
		};
	},
	onLoad() {
		this.checkStatus();
		this.getAddress(0, 0);
		this.getCategory();
		this.getLocationOnLoad();
	},
	methods: {
		gotoBusiness(){
			uni.navigateTo({
				url:'/pages/my/business/business'
			});
		},
		reSetStore() {
			if (!this.errInfo.id) {
				this.showToast('网络繁忙');
				return;
			}
			this.showLoading();
			this.request({
				url: '/shopApply/getEdit/' + this.errInfo.id,
				data: {},
				success: res => {
					console.log('重新获取入驻信息', res);
					uni.hideLoading();
					if (res.data.status === 1) {
						this.resetStore = true;
						let newOBJ = {
							name: res.data.apply_info.shop_name,
							catrgory: {
								id: res.data.apply_info.shop_type_id,
								name: res.data.apply_info.shop_type_name
							},
							address: {
								address: '',
								errMsg: '',
								latitude: res.data.apply_info.latitude,
								longitude: res.data.apply_info.longitude,
								name: res.data.apply_info.shop_address
							},
							phone: res.data.apply_info.link_tel,
							pic: [res.data.apply_info.shop_picture]
						};
						this.imgurl = res.data.image_url;
						this.storeInfo = newOBJ;
					}
				}
			});
		},
		showCategoryModel() {
			if (this.storeCategoryNameList.length === 0) {
				this.showToast('暂无分类');
				return;
			}
			uni.showActionSheet({
				itemList: this.storeCategoryNameList,
				success: res => {
					console.log('选中分类', res);
					this.$set(this.storeInfo, 'catrgory', this.storeCategoryList[res.tapIndex]);
				}
			});
		},
		getLocationOnLoad() {
			// #ifdef MP-WEIXIN
			// return new Promise((resolve, reject) => {
			uni.getSetting({
				success: setting => {
					console.log('setting', setting);
					if (setting.authSetting['scope.userLocation']) {
						uni.getLocation({
							type: 'gcj02',
							success: res => {
								console.log('经纬度', res);
								// resolve(res);
								this.locationOnLoad = res;
							},
							fail: err => {
								console.log('经纬度失败', err);
								// reject(err);
							}
						});
					} else {
						if (setting.authSetting['scope.userLocation'] == false) {
							uni.showModal({
								title: '授权定位信息',
								content: '请允许授权信息!',
								success: res => {
									if (res.confirm) {
										uni.openSetting({
											success: res => {
												console.log('openSetting', res);
												// reject('打开授权设置页面');
											},
											fail: err => {
												console.log('openSetting', err);
												// reject('打开授权设置页面');
											}
										});
									}
								}
							});
						} else {
							uni.getLocation({
								type: 'gcj02',
								success: res => {
									console.log('经纬度', res);
									// resolve(res);
									this.locationOnLoad = res;
								},
								fail: err => {
									console.log('经纬度失败', err);
									// reject(err);
								}
							});
						}
					}
				}
				// });
			});
			// #endif
			// #ifndef MP-WEIXIN
			uni.getLocation({
				type: 'gcj02',
				success: res => {
					console.log('经纬度', res);
				},
				fail: err => {
					console.log('经纬度失败', err);
				}
			});
			// #endif
		},
		showLoaction() {
			// this.getLocation().then(
			// 	success => {

			if (this.locationOnLoad.latitude) {
				console.log('经纬度成功准备打开地图', this.locationOnLoad);
				uni.chooseLocation({
					latitude: this.locationOnLoad.latitude,
					longitude: this.locationOnLoad.longitude,
					success: res => {
						console.log('打开地图成功,用户选中的经纬度', res);
						this.storeInfo.address = res;
					},
					fail: err => {
						console.log('打开地图失败', err);
					}
				});
			} else {
				this.getLocationOnLoad();
			}

			// 	},
			// 	error => {
			// 		console.log('授权经纬度');
			// 	}
			// );
		},
		MultiChange(e) {
			if (this.multiArray[0].length === 0 || this.multiArray[0].length === 1 || this.multiArray[2].length === 0) {
				this.showToast('网络繁忙');
				return;
			}
			console.log('省市区结果', e);
			this.multiIndex = e.detail.value;
		},
		MultiColumnChange(e) {
			if (this.multiArray[0].length === 0 || this.multiArray[0].length === 1 || this.multiArray[0].length === 2) {
				this.showToast('网络繁忙');
				return;
			}
			this.multiIndex[e.detail.column] = e.detail.value;
			switch (e.detail.column) {
				case 0:
					var id = this.multiIdArray[0][this.multiIndex[0]].id;
					console.log('省动', id);
					this.getAddress(id, 1);
					break;
				case 1:
					var id = this.multiIdArray[1][this.multiIndex[1]].id;
					console.log('市动', id);
					this.getAddress(id, 2);
					break;
			}
		},
		getCategory() {
			this.request({
				url: '/shopApply/getShopType',
				data: {},
				success: res => {
					console.log('分类', res);
					this.storeCategoryList = res.data;
					this.storeCategoryNameList = res.data.map(i => {
						return i.name;
					});
				}
			});
		},
		getAddress(id, type) {
			this.showLoading();
			this.request({
				url: '/china/postCityArea',
				data: {
					id: id
				},
				success: res => {
					uni.hideLoading();
					switch (type) {
						case 0:
							var newArr = res.data.map(i => {
								return i.name;
							});
							this.$set(this.multiArray, 0, newArr);
							this.$set(this.multiIdArray, 0, res.data);
							this.$set(this.multiArray, 1, []);
							this.$set(this.multiIdArray, 1, []);
							this.$set(this.multiArray, 2, []);
							this.$set(this.multiIdArray, 2, []);
							console.log('查询省', res);
							break;
						case 1:
							var newArr = res.data.map(i => {
								return i.name;
							});
							this.$set(this.multiArray, 1, newArr);
							this.$set(this.multiIdArray, 1, res.data);
							this.$set(this.multiArray, 2, []);
							this.$set(this.multiIdArray, 2, []);
							console.log('查询市', res);
							break;
						case 2:
							var newArr = res.data.map(i => {
								return i.name;
							});
							this.$set(this.multiArray, 2, newArr);
							this.$set(this.multiIdArray, 2, res.data);
							console.log('查询区', res);
							break;
					}
					if (this.multiIdArray[1].length === 0 && this.multiIdArray[0].length > 0) {
						this.getAddress(this.multiIdArray[0][0].id, 1);
					} else if (this.multiIdArray[2].length === 0 && this.multiIdArray[1].length > 0) {
						this.getAddress(this.multiIdArray[1][0].id, 2);
					}
				}
			});
		},
		checkStatus() {
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
						console.log('校验权限', res);
						if (res.data) {
							this.userStatus = Number(res.data.status) || -2;
							Object.assign(this.errInfo, res.data);
							this.$set(this.errInfo, 'info', res.data.info);
							console.log(this.errInfo);
						}
					}
				});
			});
		},
		saveStore() {
			if (!this.storeInfo.name) {
				this.showToast('请输入商铺名');
				return;
			}
			if (!this.storeInfo.catrgory.id) {
				this.showToast('请选择分类');
				return;
			}
			if (!this.storeInfo.address.name) {
				this.showToast('请选择商铺具体位置');
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
			if (!this.checkAgreement) {
				this.showToast('请勾选协议');
				return;
			}
			if (this.storeInfo.pic.length == 0) {
				this.showToast('请上传执照');
				return;
			}
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
		CheckboxChange(e) {
			this.checkAgreement = !this.checkAgreement;
		},
		ChooseImage() {
			if (this.storeInfo.pic.length >= 1) {
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
								this.storeInfo.pic.push(resoult.url);
								this.imgurl = resoult.image_url;
								if (this.imgList.length != 0) {
									this.imgList = this.imgList.concat(res.tempFilePaths);
								} else {
									this.imgList = res.tempFilePaths;
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
			return;
			uni.previewImage({
				urls: this.storeInfo.pic,
				// urls: this.imgList,
				current: e.currentTarget.dataset.url
			});
		},
		DelImg(e) {
			this.imgList.splice(e.currentTarget.dataset.index, 1);
			this.storeInfo.pic.splice(e.currentTarget.dataset.index, 1);
			console.log(this.storeInfo.pic);
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f5f3f3;
}
.addStore {
	padding-bottom: 74rpx;
	.statusBox {
		& > image {
			width: 125rpx;
			margin: 0 auto;
			margin-top: 80rpx;
			margin-bottom: 38rpx;
		}
		.storeStatus {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 45rpx;
			color: rgba(195, 195, 195, 1);
		}
	}
	.section {
		margin-top: 17rpx;
		background-color: #fff;
		padding-left: 30rpx;
		.item {
			border-bottom: 1rpx solid #f5f3f3;
			padding: 25rpx 0;
			.tipName {
				color: #000;
				font-weight: 700;
				margin-right: 24rpx;
				width: 160rpx;
				display: inline-block;
				font-size: 32rpx;
			}
			& > input {
				flex: 1;
				font-size: 32rpx;
			}
			&:last-child {
				border: none;
			}
			.small {
				zoom: 0.7;
			}
			.showAgreement {
				margin-left: 32rpx;
				color: #ff6666;
				font-size: 28rpx;
			}
		}
		.category {
			.cuIcon {
				margin-right: 30rpx;
				font-size: 34rpx;
				color: rgba(0, 0, 0, 0.3);
			}
		}
		.tip {
			height: 33rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 33rpx;
			color: rgba(0, 0, 0, 1);
			opacity: 0.54;
			margin: 9rpx 0 30rpx 0;
		}
	}
	.btn {
		width: 550rpx;
		height: 70rpx;
		line-height: 70rpx;
		background: rgba(235, 11, 11, 1);
		color: #fff;
		font-size: 28rpx;
		text-align: center;
		margin: 0 auto;
		border: none;
		margin-top: 217rpx;
		display: block;
	}
}
</style>
