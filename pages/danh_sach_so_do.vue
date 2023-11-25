<template>
  <div>
    <h1 class="text-center p-3" style="font-weight: bold">
      Danh sách các sơ đồ
    </h1>
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mx-4">
        <div class="nav nav-pills">
          <a
            :class="{ active: activeTab === 'used' }"
            class="nav-item nav-link"
            style="cursor: pointer; font-weight: bold;"
            @click="activeTab = 'used'"
          >
            Sơ đồ sở hữu
          </a>
          <a
            :class="{ active: activeTab === 'joined' }"
            class="nav-item nav-link"
            style="cursor: pointer; font-weight: bold;"
            @click="activeTab = 'joined'"
          >
            Sơ đồ tham gia
          </a>
        </div>
        <button
          class="btn btn-success my-4"
          style="font-weight: bold;"
          @click="$bvModal.show('modalCreate')"
        >
          Thêm sơ đồ
        </button>
      </div>
      <div class="p-4" style="background-color: #ddd; border-radius: 16px">
        <slide-family-tree-used v-if="activeTab === 'used'" />
        <slide-family-tree-joined v-else-if="activeTab === 'joined'" />
      </div>
      <div class="p-4"></div>
    </div>
    <b-modal id="modalCreate" hide-footer title="Nhập tên sơ đồ">
      <b-form @submit.prevent="onSubmit">
        <b-form-group>
          <b-form-input v-model="form.nameTree" title="Nhập tên" required>
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Tạo sơ đồ</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import SlideFamilyTreeJoined from '~/components/slideFamilyTreeJoined.vue'
import SlideFamilyTreeUsed from '~/components/slideFamilyTreeUsed.vue'

export default {
  components: {
    SlideFamilyTreeUsed,
    SlideFamilyTreeJoined,
  },
  data() {
    return {
      activeTab: 'used', // Tab mặc định được chọn khi trang được tải
      form: {
        nameTree: '', // Biến để lưu trữ tên sơ đồ mới
      },
    }
  },

  methods: {
    async onSubmit() {
      try {
        await this.$axios.$post('http://localhost:8080/familyTree/create', {
          familyTreeId: null,
          userId: null,
          familyTreeName: this.form.nameTree,
        })
        this.$bvModal.hide('modalCreate')
        this.showSuccessToast('Tạo sơ đồ thành công!')
        // Reload lại trang sử dụng $router.go()
        this.$router.go() // Sẽ reload lại trang hiện tại
      } catch (error) {
        this.showErrorToast('Có lỗi xảy ra khi tạo sơ đồ!')
        // eslint-disable-next-line no-console
        console.error(error)
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
        title: 'Lỗi',
        variant: 'danger',
        autoHideDelay: 5000,
      })
    },
  },
}
</script>

<style scoped>
.nav-pills .nav-link.active {
  background-color: #007bff;
  color: white;
}
</style>
