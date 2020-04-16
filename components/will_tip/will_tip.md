## 引入组件
```
import willTip from '@/components/will_tip/will_tip.vue';
```
## 注册组件 
```
components: {
	willTip
},
```
## showTip 组件是否显示
```
data() {
	return {
		showTip: true
	};
},
```
## 使用
```
<willTip v-if="showTip" @close="showTip=false"></willTip>
```


|属性名		|类型		|默认值		|说明	|
|--				|--			|--				|--		|
|@close		|function		|无		|必填 用于关闭弹窗			|
|tittle		|String			|无		|标题|
|mode			|Number			|1		|内容区的类型1文本 2富文本|
|content	|String			|无		|内容|
|closeName	|String		|关闭	|关闭按钮的名字|
|color		|String			|rgb(51, 153, 255)	|关闭按钮的背景颜色|