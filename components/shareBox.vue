<template>
  <div class="container">
    <nav>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'shareLink' }"
            @click="activeTab = 'shareLink'"
            >Chia sẻ</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'copy' }"
            @click="activeTab = 'copy'"
            >Sao chép</a
          >
        </li>
      </ul>
    </nav>
    <div class="wrapper mt-3">
      <div v-if="activeTab === 'shareLink'">
        <h5 style="font-weight: bold">Chia sẻ sơ đồ</h5>
        <div class="container">
          <b-input-group class="mb-3">
            <b-form-input
              ref="copyInput"
              v-model="inputValue"
              class="copyLink"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-secondary" @click="copyText"
                >Sao chép</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
      <div v-else-if="activeTab === 'copy'">
        <b-form-group class="col-md-12">
          <b-form-input
            style="border: 2px solid #0b57d0"
            placeholder="Chọn người trung tâm trong phả đồ"
          ></b-form-input>
        </b-form-group>
        <h5 style="font-weight: bold">Xem phả đồ</h5>
        <div class="container">
          <b-dropdown
            split
            split-variant="outline-secondary"
            variant="secondary"
            text="Chọn hướng phả đồ mà bạn muốn xem"
            class="mb-3"
            style="width: 100%"
          >
            <b-dropdown-item>Xem phả đồ họ nội</b-dropdown-item>
            <b-dropdown-item>Xem phả đồ họ ngoại</b-dropdown-item>
            <b-dropdown-item>Xem phả đồ của cả hai họ</b-dropdown-item>
          </b-dropdown>

          <b-input-group class="mb-3">
            <b-form-input
              ref="copyInput"
              v-model="inputValue"
              class="copyLink"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-secondary" @click="copyText"
                >Sao chép</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'shareLink',
      inputValue: '', // Giá trị của input
    }
  },
  methods: {
    copyText() {
      // Lấy tham chiếu tới phần tử input
      const inputElement = this.$refs.copyInput.$el
      inputElement.select()

      try {
        // Sao chép nội dung vào clipboard
        document.execCommand('copy')
        this.showSuccessToast('Đã sao chép vào Clipboard')
      } catch (err) {
        this.showErrorToast('Không thể sao chép vào Clipboard')
      }
    },
    showSuccessToast(message) {
      this.$bvToast.toast(message, {
        title: 'Thành công',
        variant: 'success',
        autoHideDelay: 5000,
      })
    },
    showErrorToast(message) {
      this.$bvToast.toast(message, {
        title: 'Lỗi!!!',
        variant: 'danger',
        autoHideDelay: 5000,
      })
    },

    async getlinkShare() {
      
    }
  },
}
</script>

<style scoped>
.nav-item {
  cursor: pointer;
}
</style>
