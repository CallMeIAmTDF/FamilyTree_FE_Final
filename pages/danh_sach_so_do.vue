<template>
  <div>
    <h2 class="text-center">Danh sách các sơ đồ</h2>
    <div class="container">
      <button class="btn btn-success" @click="$bvModal.show('modalCreate')">
        Thêm sơ đồ
      </button>
    </div>
    <b-modal id="modalCreate" hide-footer title="Nhập tên sơ đồ">
      <b-form @submit.prevent="onSubmit">
        <b-form-group>
          <b-form-input v-model="form.nameTree" title="Nhập tên" required>
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Tạo sơ dồ</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nameTree: '',
      },
    }
  },

  mounted() {
    // Kiểm tra nếu có accessToken trong localStorage
    if (localStorage.getItem('accessToken')) {
      // Ngược lại, giữ nguyên trang
    } else {
      // Chuyển hướng về trang /account/dang_nhap nếu không có accessToken
      this.$router.push('/account/dang_nhap')
    }
  },

  methods: {
    async onSubmit() {
      try {
        const newTree = await this.$axios.$post(
          `http://localhost:8080/familyTree/create`,
          {
            familyTreeId: null,
            userId: null,
            familyTreeName: this.form.nameTree,
          }
        )

        // Thực hiện thành công: ẩn modal và hiển thị toast thông báo
        this.$bvModal.hide('modalCreate')
        this.showSuccessToast('Tạo sơ thành công!')

        // eslint-disable-next-line no-console
        console.log('success')

        const newTreeId = newTree.data.familyTreeId

        this.$router.push({
          path: '/so_do_cay',
          query: { id: newTreeId },
        })

        // eslint-disable-next-line no-console
        console.log(newTreeId)
        // eslint-disable-next-line no-console
        console.log(newTree)
      } catch (error) {
        // Xử lý khi có lỗi: hiển thị thông báo lỗi
        this.showErrorToast('Có lỗi xảy ra khi tạo sơ!')
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

<style></style>
