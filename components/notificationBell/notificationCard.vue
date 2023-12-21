<template>
  <div class="list">
    <div v-for="notification in listNotifi" :key="notification.id" class="wrapper row">
      <div class="content col-md-12">
        <b class="name">
          {{ JSON.parse(notification.content).userName }}
        </b>
        <span>{{
          JSON.parse(notification.content).message.replace(
            JSON.parse(notification.content).userName,
            ''
          )
        }}</span>
        <br />
        <p>Thời gian: {{ formatDate(notification.createdAt) }}</p>
      </div>
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

  beforeDestroy() {
    // Xóa interval khi component bị hủy
    clearInterval(this.notificationInterval)
  },

  methods: {
    async getNotifications() {
      if (localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== undefined && localStorage.getItem('accessToken') !== '') {
        const notifi = await this.$axios.get(
          'http://localhost:8080/notification/list'
        )

        if (notifi.data.data) {
          this.listNotifi = notifi.data.data.reverse()
        }
        // eslint-disable-next-line no-console
        console.log('notidicatión: ', notifi)
      }
    },

    formatDate(dateString) {
      if (!dateString) return '' // Kiểm tra xem chuỗi ngày tháng có tồn tại không

      const date = new Date(dateString)
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }
      return date.toLocaleDateString('en-US', options)
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

.content {
  padding: 8px;
  border-bottom: 1px #ccc solid;
}
</style>
