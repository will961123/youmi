<template>
	<view @click.self="mcClick" class="tc_mc" :catchtouchmove="false"><slot ></slot></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		mcClick(){
			this.$emit('mcClick')
		}
	}
};
</script>

<style lang="less">
.tc_mc {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 40rpx;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	font-size: 30rpx;
	text-align: center;
	background: rgba(0, 0, 0, 0.5); 
}
</style>
