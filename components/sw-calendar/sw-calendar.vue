<template>
	<view class="sign-wrap">
		<view class="date-wrap">
			<view class="cur-date text-bold">{{ curDate }}</view>
			<view class="title-item-box item-box">
				<view class="item" v-for="(item, index) in ['日', '一', '二', '三', '四', '五', '六']" :key="index">{{ item }}</view>
			</view>
			<view class="date-item-box item-box">
				<!-- <view class="item date-item flex flex-direction align-center" :style="itemStyle" @tap="tapThis(item)" v-for="(item, index) in dateArray" :key="index"> -->
				<view class="item date-item flex flex-direction align-center"   @tap="tapThis(item)" v-for="(item, index) in dateArray" :key="index">
					<image style="width: 30px;height: 30px;" :src="item.disabled ? '/static/singin_yes.png' : '/static/singin_no.png'" mode=""></image>
					<text>{{ item.date }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			itemStyle: ''
		};
	},
	props: {
		dateArray: {
			type: Array
		},
		curDate: {
			type: String
		}
	},
	methods: {
		//点击日期
		tapThis(e) {
			if (!e.date) return;
			const data = {
				year: e.year,
				month: e.month,
				date: e.date,
				type: 'today' //默认点击今天
			};
			//点击今天之前
			e.disabled && !e.isToday && (data.type = 'pre');
			//点击今天之后
			!e.disabled && !e.isToday && (data.type = 'next');
			this.$emit('tapDate', data);
		}
	},
	mounted() {
		//设置天数高度
		let nodes = uni
			.createSelectorQuery()
			.in(this)
			.select('.item');
		nodes
			.fields(
				{
					size: true
				},
				data => {
					this.itemStyle = `height:auto;line-height: 1.5em;margin: 10upx calc((100% - ${data.width * 7}px) / 14);`;
				}
			)
			.exec();

		//设置日期
		// this.getCurDate();
	}
};
</script>

<style scoped lang="scss">
.date-wrap {
	// width: 96%;
	// margin-left: 2%;
	padding: 2% 2%;
	border-radius: 16upx;
	background: #fff;
	// box-sizing: border-box;
	text-align: center;
	.cur-date {
		font-family: PingFang-SC-Bold;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal; 
		color: #333333;
		margin-bottom: 6px;
	}
	.item-box {
		display: flex;
		color: #777;
		flex-wrap: wrap;
		font-size: 28upx;
		justify-content: flex-start;
		.item {
			width: calc(100% / 7);
			margin-top: 10upx ;
			margin-bottom: 10px ;
			// border-radius: 100upx;
		}
		.disabled {
			background: #efefef;
			color: #999;
		}
		.active {
			background: linear-gradient(90deg, #fff, red);
			color: #fff;
		}
	}
}
</style>
