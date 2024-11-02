<template>
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		</label>

		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">结算({{checkedCount}}</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				seconds: 3,
				// 定时器的id
				timer: null
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			...mapGetters('m_user', ['addstr']),
			...mapState('m_user', ['token']),
			...mapState('m_cart', ['cart']),
			isFullCheck() {
				return this.total === this.checkedCount
			},
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user', ['updateRedirectInfo']),
			changeAllState() {		

		this.updateAllGoodsState(!this.isFullCheck)
	},
	// 点击了结算按钮
	settlement() {

			if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')

			if (!this.addstr) return uni.$showMsg('请选择收货地址！')


			// if (!this.token) return uni.$showMsg('请先登录！')
			if (!this.token) return this.delayNavigate()

			//实现微信支付功能
			uni.$showMsg("支付成功")
		},
		// 延时导航到my页面
		delayNavigate() {
			this.seconds = 3
			this.showTips(this.seconds)

			this.timer = setInterval(() => {

				this.seconds--

				if (this.seconds <= 0) {
					clearInterval(this.timer)

					uni.switchTab({
						url: '/pages/my/my',
						success: () => {
							this.updateRedirectInfo({
								openType: 'switchTab',
								from: '/pages/cart/cart'
							})
						}
					})

					return
				}
				this.showTips(this.seconds)
			}, 1000)
		},
		showTips(n) {
			// 调用 uni.showToast() 方法，展示提示消息
			uni.showToast({
				// 不展示任何图标
				icon: 'none',
				// 提示的消息
				title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
				// 为页面添加透明遮罩，防止点击穿透
				mask: true,
				// 1.5 秒后自动消失
				duration: 1500
			})
		}
	}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>