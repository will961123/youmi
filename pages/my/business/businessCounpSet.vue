<template>
	<view class="businessCounpSet">
		<view class="section bg-white">
			<view class="item">请选择类型：</view>
			<view class="imgItem flex align-center">
				<image @click="changeType(1)" class="radio" :src="counpInfo.coupon_type === 1 ? '/static/select.png' : '/static/noo.png'" mode="aspectFill"></image>
				<image class="tipImg" src="/static/yhq-wmk-bq.png" mode="widthFix"></image>
			</view>
			<view class="imgItem flex align-center">
				<image @click="changeType(2)" class="radio" :src="counpInfo.coupon_type === 2 ? '/static/select.png' : '/static/noo.png'" mode="aspectFill"></image>
				<image class="tipImg" src="/static/yhq-mj-bq.png" mode="widthFix"></image>
			</view>
		</view>

		<view class="section section2 bg-white">
			<view v-if="counpInfo.coupon_type === 1">
				<view class="item flex align-center">
					<text>满减条件:</text>
					<input v-model="counpInfo.over_money" type="number" placeholder="输入金额 (消费满XX元)" />
				</view>
				<view class="item flex align-center">
					<text>减扣金额:</text>
					<input v-model="counpInfo.discount_money" type="number" placeholder="减XX元" />
				</view>
				<view class="item flex align-center">
					<text>有效期至:</text>
					<picker class="ipt flex1" mode="date" :value="counpInfo.over_date" @change="bindDateChange">
						<view class="uni-input">{{ counpInfo.over_date }}</view>
					</picker>
					<view class="row cuIcon cuIcon-right"></view>
				</view>
			</view>
			<view v-if="counpInfo.coupon_type === 2">
				<view class="item flex align-center">
					<text>金额:</text>
					<input v-model="counpInfo.money" type="number" placeholder="减XX元" />
				</view>
				<view class="item flex align-center">
					<text>有效期至:</text>
					<picker class="ipt flex1" mode="date" :value="counpInfo.over_date" @change="bindDateChange">
						<view class="uni-input">{{ counpInfo.over_date || '请选择' }}</view>
					</picker>
					<view class="row cuIcon cuIcon-right"></view>
				</view>
			</view>
		</view>

		<button @click="saveCounp" class="btn cu-btn">确定添加</button>
	</view>
</template>

<script>
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			selectIdx: 1,
			counpInfo: {
				over_date: currentDate,
				over_money: '', // 满
				coupon_type: 1, // 1满减 2无门槛
				discount_money: '', // 减去
				money: '' // 无门槛
			}
		};
	},
	methods: {
		saveCounp() {
			if (this.counpInfo.coupon_type === 1) {
				if (!this.counpInfo.over_money) {
					this.showToast('请输入满减金额');
					return;
				}
				if (!this.counpInfo.discount_money) {
					this.showToast('请输入满减金额');
					return;
				}
			} else if (this.counpInfo.coupon_type === 2) {
				if (!this.counpInfo.money) {
					this.showToast('请输入优惠金额');
					return;
				}
			}
			if (!this.counpInfo.over_date) {
				this.showToast('请选择有效期');
				return;
			}
			let formData = this.counpInfo;
			formData.user_mark_id = this.getUserId();
			console.log(formData);
			this.checkLogin().then(resolve => {
				this.showLoading();
				this.request({
					url: '/coupon/postShopAdd',
					method: 'POST',
					data: formData,
					success: res => {
						uni.hideLoading();
						console.log('添加优惠卷', res);
						this.counpInfo.over_money = '';
						this.counpInfo.discount_money = '';
						this.counpInfo.over_money = '';
						if (res.data.status === 1) {
							uni.showModal({
								title: '添加优惠卷',
								content: '添加成功!',
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
								title: '添加优惠卷',
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
		changeType(type) {
			this.$set(this.counpInfo, 'coupon_type', Number(type));
		},
		bindDateChange(e) {
			this.$set(this.counpInfo, 'over_date', e.target.value);
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		}
	}
};
</script>

<style lang="less">
.businessCounpSet {
	.section {
		padding: 0 30rpx;
		.item {
			line-height: 96rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(0, 0, 0, 1);
		}
		.imgItem {
			padding-bottom: 30rpx;
			.radio {
				width: 30rpx;
				height: 30rpx;
				margin-right: 30rpx;
			}
			.tipImg {
				width: 100rpx;
			}
		}
	}
	.section2 {
		margin-top: 16rpx;
		.item {
			border-bottom: 1rpx solid rgba(112, 112, 112, 0.16);
			&:last-child {
				border: none;
			}
			& > text {
				width: 160rpx;
				margin-right: 24rpx;
			}
			& > input {
				flex: 1;
			}
			.row {
				color: rgba(0, 0, 0, 0.3);
			}
		}
	}
	.btn {
		width: 550rpx;
		line-height: 70rpx;
		background: rgba(235, 11, 11, 1);
		color: #fff;
		font-size: 28rpx;
		position: fixed;
		bottom: 90rpx;
		left: 50%;
		margin-left: -275rpx;
	}
}
</style>
