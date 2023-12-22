<template>
  <div class="container">
    <nav>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'shareLink' }" @click="activeTab = 'shareLink'">Chia sẻ</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'copy' }" @click="activeTab = 'copy'">Sao chép</a>
        </li>
      </ul>
    </nav>
    <div class="wrapper mt-3">
      <div v-if="activeTab === 'shareLink'">
        <h5 style="font-weight: bold">Chia sẻ phả đồ</h5>
        <div class="container">
          <b-input-group class="mb-3">
            <b-form-input ref="copyInput" v-model="inputValue" class="copyLink" style="color: #0b57d0"
              readonly></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-primary" @click="copyText">Sao chép link</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
      <div v-else-if="activeTab === 'copy'">
        <b-form-group class="col-md-12">
          <b-form-input v-model="nameTree" placeholder="Tên phả đồ" class="mb-3"></b-form-input>
          <b-form-select v-model="selectPerson">
            <b-form-select-option value="null" disabled>Chọn người trung tâm</b-form-select-option>
            <b-form-select-option v-for="per in person" :key="per.data.id" :value="per.data.id">
              {{ per.data.info.name }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <div class="container">
          <b-form-select v-model="selectedSide" class="mb-3">
            <b-form-select-option value="null" disabled>Chọn hướng phả đồ</b-form-select-option>
            <b-form-select-option value="2">
              Xem phả đồ họ nội
            </b-form-select-option>
            <b-form-select-option value="1">
              Xem phả đồ họ ngoại
            </b-form-select-option>
            <b-form-select-option value="3">
              Xem phả đồ cả hai họ
            </b-form-select-option>
          </b-form-select>

          <b-input-group class="mb-3">
            <b-button variant="primary" style="width: 100%" @click="getCopyTree">Copy phả đồ</b-button>
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
      familyTreeId: null,
      selectPerson: '',
      selectedSide: '',
      nameTree: '',
      person: {},
    }
  },

  created() {
    this.getlinkShare()

    this.familyTreeId = this.$route.query.id

    // eslint-disable-next-line no-console
    console.log(this.familyTreeId)
  },

  async mounted() {
    await this.getPerson()
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

    async getPerson() {
      try {
        const res = await this.$axios.get(
          'http://localhost:8080/familyTree/getDataV2?fid=' +
          this.$route.query.id
        )

        // eslint-disable-next-line no-console
        console.log('respónive:', res)

        this.person = res.data.data
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },

    async getlinkShare() {
      try {
        const personId = localStorage.getItem('centerId')

        const res = await this.$axios.$post(
          'http://localhost:8080/linkSharing/create?familyTreeId=' +
          this.$route.query.id +
          '&personId=' +
          personId
        )

        const link = res.data

        const link2 = link.split('linkSharing?code=')[1]

        this.inputValue = window.location.host + '/so_do_cay?code=' + link2

        // eslint-disable-next-line no-console
        console.log(this.inputValue)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },

    async getCopyTree() {
      try {
        const response = await this.$axios.$post(
          `http://localhost:8080/familyTree/copy?newName=${this.nameTree}&personId=${this.selectPerson}&side=${this.selectedSide}`
        )

        if (response.message === 'Sao chép thành công!') {
          const idtree = response.data.familyTreeId

          // eslint-disable-next-line no-console
          console.log('idtree: ' + idtree)

          localStorage.setItem('centerId', 'undefined')
          localStorage.setItem('side', 'undefined')

          window.location.href = '/so_do_cay?id=' + idtree
        }

        // eslint-disable-next-line no-console
        console.log(response)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.nav-item {
  cursor: pointer;
}
</style>
