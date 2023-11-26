<template>
  <div
    class="container height-100 d-flex justify-content-center align-items-center"
  >
    <div class="position-relative">
      <b-card
        class=""
        header="Nhập email của bạn để đổi mật khẩu"
        style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; width: 500px"
      >
        <b-form
          class="b-form"
          enctype="multipart/form-data"
          @submit.prevent="onSubmit"
          @reset.prevent="onReset"
        >
          <div class="row">
            <div class="col-md">
              <!-- Trường email -->
              <b-form-group
                label="Email:"
                :state="isEmailValid"
                :invalid-feedback="emailErrorMessage"
              >
                <b-form-input
                  v-model="form.email"
                  type="email"
                  placeholder="Nhập email..."
                  required
                  @blur="validateEmail"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>

          <!-- Sử lý các sự kiện -->
          <div class="d-flex justify-content-end">
            <b-button type="reset" class="mr-3" variant="danger"
              >Reset</b-button
            >
            <b-button type="submit" variant="primary" :disabled="!validForm"
              >Xác nhận</b-button
            >
          </div>

          <!-- Quay về trang đăng nhập -->
          <div class="d-flex justify-content-end mt-3">
            <span
              >Quay về trang <a href="/account/dang_nhap">Đăng nhập</a></span
            >
          </div>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
      },

      validForm: false,
      isEmailValid: false,
      emailErrorMessage: '',
    }
  },

  watch: {
    form: {
      deep: true,
      handler() {
        this.validateForm()
      },
    },
  },

  methods: {
    onReset() {
      // Reset our form values
      this.form.email = ''
      this.emailErrorMessage = ''
    },

    validateForm() {
      // Kiểm tra các trường khác
      if (this.form.email.length > 0 && this.form.email.length <= 50) {
        this.validForm = true
      } else {
        this.validForm = false
      }
    },

    validateEmail() {
      if (this.form.email.length === 0) {
        this.isEmailValid = false
        this.emailErrorMessage = 'Vui lòng nhập email.'
      } else if (this.form.email.length > 50) {
        this.isEmailValid = false
        this.emailErrorMessage = 'Email không được vượt quá 50 ký tự.'
      } else {
        this.isEmailValid = true
        this.emailErrorMessage = ''
      }
      this.validateForm()
    },

    async onSubmit(event) {
      event.preventDefault()

      try {
        // Gọi API để đặt lại mật khẩu
        const response = await this.$axios.$post(
          `http://localhost:8080/users/forgetPassword?email=${this.form.email}`
        )

        // Xử lý kết quả từ API (nếu cần)
        // eslint-disable-next-line no-console
        console.log(response.data) // In thông tin từ API response nếu muốn

        this.$router.push('/account/xac_nhan_otp')
      } catch (error) {
        // Xử lý lỗi nếu gọi API không thành công
        // eslint-disable-next-line no-console
        console.error(error)

        // Xóa thông tin trên form khi gặp lỗi
        this.onReset()
      }
    },
  },
}
</script>

<style scoped>
.height-100 {
  height: 100vh;
}
</style>
