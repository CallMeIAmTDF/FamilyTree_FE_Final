<template>
  <div class="list">
    <div
      v-for="notification in listNotifi"
      :key="notification.id"
      class="wrapper row"
    >
      <div class="content col-md-12">
        <h6 class="name">
          {{ JSON.parse(notification.content).message }}
        </h6>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listNotifi: [],
    }
  },

  async mounted() {
    await this.getNotifications()

    // Sử dụng setInterval để gọi lại hàm mỗi 20 giây
    this.notificationInterval = setInterval(() => {
      this.getNotifications()
    }, 20000) // 20 giây là 20000 miligiây
  },

  created() {},

  beforeDestroy() {
    // Xóa interval khi component bị hủy
    clearInterval(this.notificationInterval)
  },

  methods: {
    async getNotifications() {
      const notifi = await this.$axios.get(
        'http://localhost:8080/notification/list'
      )

      this.listNotifi = notifi.data.data
      // eslint-disable-next-line no-console
      console.log('notidicatión: ', notifi)
    },
  },
}
</script>

<style scoped>
.list {
  max-height: 450px;
  overflow: auto;
  scroll-behavior: smooth;
}

.wrapper {
  padding: 2px;
  border-radius: 8px;
  cursor: pointer;
}
.wrapper:hover {
  background: #ddd;
}
</style>
