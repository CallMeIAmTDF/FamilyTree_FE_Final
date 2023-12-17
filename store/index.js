export const state = () => ({
    side: '', // Giá trị side sẽ được lưu trữ trong Vuex
  })
  
  export const mutations = {
    setSide(state, side) {
      state.side = side
    },
  }