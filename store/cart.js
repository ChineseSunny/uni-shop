export default {

	namespaced: true,

	state: () => ({

		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
	}),

	mutations: {
		addToCart(state, goods) {

			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			console.log(findResult);

			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}

			this.commit('m_cart/saveToStorage')
			// console.log(state.cart);
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		updateGoodsCount(state, goods) {

			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

			if (findResult) {
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		}
	},

	getters: {
		total(state) {
			// let c = 0
			// state.cart.forEach(x => c += x.goods_count)
			// return c
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		checkedCount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		checkedGoodsAmount: function checkedGoodsAmount(state) {
			return state.cart.filter(function(x) {
				return x.goods_state;
			}).reduce(function(total, item) {
				return total += item.goods_count * item.goods_price;
			}, 0).toFixed(2);
		}
	}

}