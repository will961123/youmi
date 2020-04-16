<template>
	<view class="tc_mc" catchtouchmove="false" @click.self="close_child">
		<view class="tc_mine">
			<view class="tc_tittle">{{ tittle }}</view>
			<scroll-view class="tc_content" scroll-y="true">
				<view v-if="mode === 1">{{ content }}</view>
				<view v-else><rich-text :nodes="content"></rich-text></view>
			</scroll-view>
			<view class="tc_btn" :style="{ background: color }" @click="close_child">{{ closeName }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		tittle: {
			type: String
		},
		// 1普通文本 2富文本
		mode:{
			type:Number,
			default:1
		},
		content: {
			type: String
		},
		closeName:{
			type: String,
			default: '关闭'
		},
		color: {
			type: String,
			default: 'rgb(51, 153, 255)'
		}
	},
	data() {
		return {};
	},
	methods: {
		close_child() {
			this.$emit('close');
		}
	}
};
</script>

<style lang="less">
.tc_mc {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 40upx;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	font-size: 30upx;
	text-align: center;
	background: rgba(0, 0, 0, 0.5);
	.tc_mine {
		background: #fff;
		width: 100%;
		height: 60%;
		// height: 100%;
		padding: 30upx 40upx;
		// padding-top: 30upx;
		box-sizing: border-box;
		border-radius: 16upx; 
		position: relative;
		top: 50%;
		transform: translate(0,-50%);
		.tc_tittle {
			font-weight: 700;
			font-size: 34upx;
		}
		.tc_content {
			box-sizing: border-box;
			padding: 0 20upx;
			margin-top: 40upx;
			height: 70%;
		}
		.tc_btn {
			width: calc(100% - 60rpx);
			line-height: 80upx;
			border-radius: 40upx;
			color: #fff;
			// margin-top: 40upx;
			position: absolute;
			bottom: 30rpx;
		}
	}
}
</style>
