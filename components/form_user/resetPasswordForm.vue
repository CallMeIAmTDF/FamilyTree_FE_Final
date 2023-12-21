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
                :state="isEmailValid"
                :invalid-feedback="emailErrorMessage"
              >
                <label
                  >Email
                  <span style="color: red; margin-left: 2px">*</span>
                </label>
                <b-form-input
                  v-model="form.email"
                  type="email"
                  placeholder="Nhập email..."
                  required
                  @blur="validateEmail"
                ></b-form-input>
              </b-form-group>

              <!-- Trường password -->
              <b-form-group
                :state="isPasswordlValid"
                :invalid-feedback="passwordErrorMessage"
              >
                <label
                  >Mật khẩu mới
                  <span style="color: red; margin-left: 2px">*</span>
                </label>
                <b-form-input
                  v-model="form.password"
                  :type="passwordFieldType"
                  placeholder="Nhập mật khẩu mới..."
                  required
                  @blur="validatePassword"
                ></b-form-input>
                <b-input-group-append>
                  <b-form-checkbox
                    v-model="showPassword"
                    switch
                    @change="togglePasswordVisibility"
                  ></b-form-checkbox>
                  <label
                    class="password-toggle-label"
                    @click="togglePasswordVisibility"
                  >
                    Show Password
                  </label>
                </b-input-group-append>
              </b-form-group>
            </div>
          </div>

          <!-- Sử lý các sự kiện -->
          <div class="d-flex justify-content-end">
            <b-button type="reset" class="mr-3" variant="danger"
              >Reset</b-button
            >

            <b-overlay
              :show="busy"
              rounded
              opacity="0.6"
              spinner-small
              spinner-variant="primary"
              class="d-inline-block"
              @hidden="onHidden"
            >
              <b-button
                ref="button"
                type="submit"
                variant="primary"
                :disabled="!validForm"
              >
                Xác nhận
              </b-button>
            </b-overlay>
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
        password: '',
      },
      showPassword: false,
      validForm: false,
      isEmailValid: false,
      isPasswordlValid: false,
      emailErrorMessage: '',
      passwordErrorMessage: '',
      passwordFieldType: 'password',

      busy: false,
      timeout: null,
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

  beforeDestroy() {
    this.clearTimeout()
  },

  methods: {
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.showPassword = false
      this.form.email = ''
      this.form.password = ''
      this.emailErrorMessage = ''
      this.passwordErrorMessage = ''
    },

    validateForm() {
      // Kiểm tra các trường khác
      if (
        this.form.email.length > 0 &&
        this.form.email.length <= 50 &&
        this.form.password.length > 0 &&
        this.form.password.length <= 50 &&
        this.form.password.length >= 8
      ) {
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

    validatePassword() {
      if (this.form.password.length === 0) {
        this.isPasswordValid = false
        this.passwordErrorMessage = 'Vui lòng nhập password.'
      } else if (this.form.password.length > 50) {
        this.isPasswordValid = false
        this.passwordErrorMessage = 'Mật khẩu không được vượt quá 50 ký tự.'
      } else if (this.form.password.length < 8) {
        this.isPasswordValid = false
        this.passwordErrorMessage = 'Mật khẩu phải có ít nhất 8 kí tự.'
      } else {
        this.ispasswordValid = true
        this.passwordErrorMessage = ''
      }
      this.validateForm()
    },

    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === 'password' ? 'text' : 'password'
    },

    async onSubmit(event) {
      event.preventDefault()

      try {
        // Gọi API để đặt lại mật khẩu

        this.busy = true
        // Simulate an async request
        this.setTimeout(() => {
          this.busy = false
        })

        const response = await this.$axios.$post(
          `http://localhost:8080/users/forgetPassword?email=${this.form.email}`
        )

        // Xử lý kết quả từ API (nếu cần)
        // eslint-disable-next-line no-console
        console.log(response.data) // In thông tin từ API response nếu muốn

        if (response.status === 'OK') {
          this.$router.push({
            path: '/account/xac_nhan_otp',
            query: {
              email: this.form.email,
              password: this.form.password,
            },
          })
        } else {
          // Xử lý khi đăng nhập không thành công
          this.busy = false

          this.$bvToast.toast(response.message, {
            title: 'Đã xảy ra lỗi',
            variant: 'danger',
            autoHideDelay: 5000, // Hiển thị trong 5 giây
          })
        }
      } catch (error) {
        // Xử lý lỗi nếu gọi API không thành công
        // eslint-disable-next-line no-console
        console.error(error)

        this.$bvToast.toast(error.message, {
          title: 'Đã xảy ra lỗi',
          variant: 'danger',
          autoHideDelay: 5000,
        })
      }
    },

    clearTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
    },
    setTimeout(callback) {
      this.clearTimeout()
      this.timeout = setTimeout(() => {
        this.clearTimeout()
        callback()
      }, 5000)
    },
    onHidden() {
      // Return focus to the button once hidden
      this.$refs.button.focus()
    },
  },
}
</script>

<style scoped>
.height-100 {
  height: 100vh;
}
</style>
