<template>
  <div
    class="container height-100 d-flex justify-content-center align-items-center"
  >
    <div class="position-relative">
      <b-card
        class=""
        header="Đăng nhập thông tin của bạn"
        style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; width: 500px"
      >
        <b-form
          class="b-form"
          enctype="multipart/form-data"
          @submit.prevent="onSubmit"
          @reset="onReset"
        >
          <div class="row">
            <div class="col-md-12">
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
                  >Mật khẩu
                  <span style="color: red; margin-left: 2px">*</span>
                </label>
                <b-form-input
                  v-model="form.password"
                  :type="passwordFieldType"
                  placeholder="Nhập mật khẩu..."
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
            <b-button type="submit" variant="primary" :disabled="!validForm"
              >Đăng nhập</b-button
            >
          </div>

          <!-- Quay về trang đăng nhập -->
          <div
            class="d-flex justify-content-end mt-3"
            style="flex-direction: column"
          >
            <span
              style="
                display: flex;
                justify-content: flex-end;
                margin-bottom: 8px;
              "
              >Quên mật khẩu!
              <a href="/account/quen_mat_khau" style="color: red">
                Tại đây</a
              ></span
            >
            <span style="display: flex; justify-content: flex-end"
              >Nếu bạn chưa có tài khoản, hãy đăng kí tại đây
              <a href="/account/dang_ki"> Đăng kí</a></span
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

    async onSubmit() {
      try {
        const response = await this.$axios.$post(
          `http://localhost:8080/sign-in`,
          {
            email: this.form.email,
            password: this.form.password,
          }
        )

        // eslint-disable-next-line no-console
        console.log({ response })

        if (response.data && response.status === 'OK') {
          localStorage.setItem(
            'userInfo',
            JSON.stringify(response.data.userInfo)
          )
          localStorage.setItem('accessToken', response.data.tokens.accessToken)
          localStorage.setItem(
            'refreshToken',
            response.data.tokens.refreshToken
          )

          // Chuyển hướng hoặc thực hiện hành động khác sau khi đăng nhập thành công
          this.$router.push('/')
          // eslint-disable-next-line no-console
          console.log('Đăng nhập thành công!')

          // Hiển thị toast thông báo đăng nhập thành công trong 5 giây
          this.$bvToast.toast('Đăng nhập thành công!', {
            title: 'Thành công',
            variant: 'success',
            autoHideDelay: 5000, // Hiển thị trong 5 giây
          })
        } else {
          // Xử lý khi đăng nhập không thành công
          // eslint-disable-next-line no-console
          console.error('Đăng nhập thất bại!')

          this.$bvToast.toast(response.message, {
            title: 'Đã xảy ra lỗi',
            variant: 'danger',
            autoHideDelay: 5000, // Hiển thị trong 5 giây
          })
        }
      } catch (error) {
        // Xử lý lỗi nếu có
        // eslint-disable-next-line no-console
        console.error('Đã xảy ra lỗi khi đăng nhập:', error)

        // Hiển thị toast thông báo đăng nhập thất bại trong 5 giây
        this.$bvToast.toast('Đăng nhập thất bại!', {
          title: 'error.response.message',
          variant: 'danger',
          autoHideDelay: 5000, // Hiển thị trong 5 giây
        })
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
