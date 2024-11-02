<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchBoxHandler">
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
			<icon type="search" size="17"></icon>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bgcolor: {
				type: String,
				default: '#777'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		name: "my-search",
		data() {
			return {

			};
		},
		methods:{
			searchBoxHandler(){
				console.log('~~~~')
				 this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		background-color: #888;
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.my-search-box {
		height: 36px;
		background-color: #ffffff;
		border-radius: 18px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.placeholder {
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>