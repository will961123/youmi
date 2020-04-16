<template>
	<view class="counpon ">
		<view class="titbox bg-white flex  text-center">
			<view @click="chageTit(1)" class="flex1 flex flex-direction justify-center align-center" :class="titType === 1 ? 'item select' : 'item'">
				可使用
				<text></text>
			</view>
			<view @click="chageTit(2)" class="flex1 flex flex-direction justify-center align-center" :class="titType === 2 ? 'item select' : 'item'">
				已过期
				<text></text>
			</view>
		</view>
		<view class="addCounp bg-white flex justify-end align-center">
			<view class="cuIcon cuIcon-add"></view>
			<text @click="navigate('/pages/my/business/businessCounpSet')">添加优惠卷</text>
		</view>
		<view class="counponListBox " style="padding-top: 20px;">
			<will-nodata v-if="counponList[titType - 1].length === 0" style="padding-top: 30px;"></will-nodata>
			<view
				v-for="(item, index) in counponList[titType - 1]"
				:key="index"
				class="item  pulse flex align-center"
				:class="titType === 1 ? (item.type === 1 ? 'itemRed' : 'itemYellow') : item.type === 1 ? 'itemGrey' : 'itemGrey2'"
			>
				<view class="content flex  align-center">
					<view class="price flex  align-center">
						<text>￥</text>
						<text v-if="item.coupon_type === 1" class="num">{{ item.discount_money }}</text>
						<text v-if="item.coupon_type === 2" class="num">{{ item.money }}</text>
					</view>
					<view class="right flex align-center justify-start">
						<view >
							<view v-if="item.coupon_type === 1" class="name textov1">满{{ item.over_money }}减{{ item.discount_money }}</view>
							<view v-if="item.coupon_type === 2" class="name textov1">无门槛</view>
							<view class="data textov1">{{ item.over_date.split(' ')[0] }}到期</view>
						</view>
						<button class="btn cu-btn" @click="del(item.id)">删除</button>
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
			selectIndex: -1,
			titType: 1,
			counponList: [[], []]
		};
	},
	onLoad(options) {
		
	},
	onShow() {
		this.getList();
	},
	methods: {
		del(id) {
			this.checkLogin().then(resolve => {
				this.request({
					url: '/coupon/postShopDelete',
					method:"POST",
					data: {
						coupon_id: id
					},
					success: res => {
						console.log('删除结果', res);
						if(res.data.status === 1){
							uni.showModal({
								title:'删除优惠卷',
								content:'删除成功!',
								showCancel:false,
								success:res=>{
									if(res.confirm){
										this.counponList.splice(this.titType - 1, 1, []);
										this.getList();
									}
								}
							})
						}else{
							uni.showModal({
								title:'删除优惠卷',
								content:res.data.info,
								showCancel:false,
								success:res=>{
									if(res.confirm){
										this.counponList.splice(this.titType - 1, 1, []);
										this.getList();
									}
								}
							})
						}

					}
				});
			});
		},
		navigate(url) {
			uni.navigateTo({
				url
			});
		},
		chageTit(type) {
			if (Number(type) === this.titType) {
				return;
			}
			this.titType = Number(type);
			this.counponList.splice(this.titType - 1, 1, []);
			this.getList();
		},
		getList() {
			this.checkLogin().then(
				reslove => {
					this.showLoading();
					this.request({
						url: '/coupon/postShopList',
						method: 'POST',
						data: {
							coupon_type: this.titType,
							user_mark_id: this.getUserId()
						},
						success: res => {
							uni.hideLoading();
							console.log('优惠卷列表', res);
							if (res.data.status === 1) {
								this.counponList.splice(this.titType - 1, 1, res.data.list);
								console.log(this.counponList);
							} else {
								this.counponList.splice(this.titType - 1, 1, []);
							}
						}
					});
				},
				err => {
					console.log('走进了而然');
				}
			);
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f3f3f3;
}
.counpon {
	min-height: 100vh;
	.titbox {
		padding: 0 60rpx;
		font-size: 30rpx;
		color: #000000;
		border-bottom: 1rpx solid #f3f3f3;
		height: 40px;
		line-height: 38px;
		.item {
			text {
				display: block;
			}
			&.select {
				color: #eb0b0b;
				text {
					width: 76rpx;
					border-bottom: 4rpx solid #eb0b0b;
				}
			}
		}
	}
	.addCounp {
		color: #eb0b0b;
		height: 80rpx;
		padding-right: 30rpx;
		& > view {
			background-color: #eb0b0b;
			width: 30rpx;
			height: 30rpx;
			line-height: 30rpx;
			color: #fff;
			font-weight: 700;
			margin-right: 10rpx;
		}
	}
	.counponListBox {
		padding: 0 30rpx;
		.item {
			height: 70px;
			padding: 4px 0rpx;
			box-sizing: content-box;
			border-color: transparent;
			margin-bottom: 8px;
			&.itemRed {
				background-color: #ff6f72;
			}
			&.itemYellow {
				background-color: #ff963b;
			}
			&.itemGrey {
				background-color: #9b9b9b;
			}
			&.itemGrey2 {
				background-color: #bcbcbc;
			}
			.radioBox {
				width: 44rpx;
				height: 44rpx;
				background: #fff;
				border-radius: 50%;
				margin-left: 30rpx;
				& > image {
					width: 100%;
					height: 100%;
				}
			}
			.content {
				// width: 100%;
				width: calc(100% - 60rpx);
				// flex: 1;
				height: 100%;
				color: rgba(255, 255, 255, 0.7);
				padding: 0 34rpx;
				.price {
					// line-height: 50px;
					padding-right: 80rpx;
					border-right: 2px dashed rgba(255, 255, 255, 0.7);
					& > text {
						color: rgba(255, 255, 255, 0.7);
						font-size: 50rpx;
					}
					.num {
						font-size: 60rpx;
						color: #fff;
						font-weight: 700;
						display: inline-block;
						// height: 50px;
						width: 90rpx;
					}
				}
				.right {
					flex: 1;
					margin-left: 40rpx;
					.name {
						font-size: 32rpx;
						color: #fff;
						margin-bottom: 5px;
						width: 200rpx; 
						margin-right: 10rpx;
					}
					.data {
						font-size: 20rpx;
					}
					.btn {
						width: 140rpx;
						height: 50rpx;
						border-radius: 25rpx;
						// background:rgba(255,255,255,0);
						background-color: transparent;
						box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
						opacity: 1;
						font-size: 28rpx;
						color: #fff;
						border: 1rpx solid #fff;
					}
				}
			}
			&.pulse {
				position: relative;
				overflow: hidden;
				&::before,
				&::after {
					position: absolute;
					transform: translateX(-50%);
					content: '';
					display: block;
					width: 14px;
					height: 14px;
					border-radius: 50%;
					background: #f3f3f3;
					box-shadow: -40px 0 0 #f3f3f3, -20px 0 0 #f3f3f3, 0 0 0 #f3f3f3, 20px 0 0 #f3f3f3, 40px 0 0 #f3f3f3;
					border: 1rpx solid #f3f3f3;
					box-sizing: content-box;
				}
				&::before {
					right: -7px;
					top: 50%;
					transform: rotate(90deg) translateX(-50%);
				}

				&::after {
					left: -7px;
					top: 50%;
					transform: rotate(90deg) translateX(-50%);
				}
			}
		}
	}
}
</style>
