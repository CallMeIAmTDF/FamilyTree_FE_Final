<template>
  <div>
    <div
      v-for="notification in listNotifi"
      :key="notification.id"
      class="wrapper row"
    >
      <div
        class="avt col-md-4"
        style="display: flex; justify-content: center; align-items: center"
      ></div>
      <div class="content col-md-12">
        <h6 class="name">
          {{ JSON.parse(notification.content).message }}
        </h6>
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

  mounted() {
    this.getNotifications()
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
.wrapper {
  padding: 2px;
  border-radius: 8px;
  cursor: pointer;
}
.wrapper:hover {
  background: #ddd;
}
</style>
