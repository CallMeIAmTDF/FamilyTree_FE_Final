<template>
  <div
    class="container height-100 d-flex justify-content-center align-items-center"
  >
    <div class="position-relative"></div>
    <b-card
      class=""
      header="Form đăng kí thông tin"
      style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px"
    >
      <b-form
        class="b-form"
        enctype="multipart/form-data"
        @submit.prevent="onSubmit"
        @reset="onReset"
      >
        <div class="row">
          <!-- Trường họ và tên -->
          <b-form-group
            label="Họ và tên:"
            class="col-md-6"
            :state="isNameValid"
            :invalid-feedback="nameErrorMessage"
          >
            <b-form-input
              v-model="form.user_fullname"
              type="text"
              placeholder="Nhập tên..."
              required
              @blur="validateName"
            ></b-form-input>
          </b-form-group>

          <!-- Trường chọn hình ảnh từ file -->
          <b-form-group label="Chọn ảnh đại diện:" class="col-md-6">
            <b-form-file
              placeholder="Chọn ảnh..."
              accept="image/*"
              @change="onFileChosen"
            ></b-form-file>
          </b-form-group>
        </div>

        <div class="row">
          <div class="col-md-6">
            <!-- Trường email -->
            <b-form-group
              label="Email:"
              :state="isEmailValid"
              :invalid-feedback="emailErrorMessage"
            >
              <b-form-input
                v-model="form.user_email"
                type="email"
                placeholder="Nhập email..."
                required
                @blur="validateEmail"
              ></b-form-input>
            </b-form-group>

            <!-- Trường password -->
            <b-form-group
              label="Password:"
              :state="isPasswordlValid"
              :invalid-feedback="passwordErrorMessage"
            >
              <b-form-input
                v-model="form.user_password"
                type="password"
                placeholder="Nhập password..."
                required
                @blur="validatePassword"
              ></b-form-input>
            </b-form-group>

            <!-- Trường giới tính -->
            <b-form-group
              label="Giới tính: "
              class="mt-3"
              :state="form.user_gender !== ''"
            >
              <b-form-radio-group
                v-model="form.user_gender"
                name="radio-sex"
                required
              >
                <b-form-radio value="true">Nam</b-form-radio>
                <b-form-radio value="false">Nữ</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </div>

          <!-- Hiển thị hình ảnh -->
          <div class="col-md-6 d-flex justify-content-center">
            <img
              class="mt-2"
              width="200px"
              height="100%"
              :src="
                form.user_image
                  ? form.user_image
                  : 'https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png'
              "
              alt="person_image"
              style="object-fit: cover"
            />
          </div>
        </div>

        <div class="row">
          <!-- Trường chọn ngày sinh -->
          <b-form-group
            label="Ngày sinh:"
            class="col-md-4"
            :state="isBirthdayValid"
            :invalid-feedback="birthdayErrorMessage"
          >
            <b-form-datepicker
              v-model="form.user_dob"
              class="mb-2"
              @input="validateDateOfBirth"
            ></b-form-datepicker>
          </b-form-group>

          <!-- Trường chọn địa chỉ -->
          <b-form-group label="Địa chỉ:" class="col-md-4">
            <b-form-input
              v-model="form.user_address"
              type="text"
              placeholder="Nhập địa chỉ ..."
            ></b-form-input>
          </b-form-group>

          <!-- Trường chọn địa chỉ -->
          <b-form-group label="Số điện thoại:" class="col-md-4">
            <b-form-input
              v-model="form.user_phone"
              type="text"
              placeholder="Nhập số điện thoại ..."
            ></b-form-input>
          </b-form-group>
        </div>

        <!-- Sử lý các sự kiện -->
        <div class="d-flex justify-content-end">
          <b-button type="reset" class="mr-3" variant="danger">Reset</b-button>
          <b-button type="submit" variant="primary" :disabled="!validForm"
            >Đăng kí</b-button
          >
        </div>

        <!-- Quay về trang đăng nhập -->
        <div class="d-flex justify-content-end mt-3">
          <span
            >Nếu bạn đã có tài khoản, hãy đăng nhập tại đây
            <a href="/account/dang_nhap">Đăng nhập</a></span
          >
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user_fullname: '',
        user_email: '',
        user_password: '',
        user_image: null,
        user_gender: '',
        user_dob: '',
        user_address: '',
        user_phone: '',
      },
      validForm: false,
      isNameValid: false,
      isEmailValid: false,
      isPasswordlValid: false,
      nameErrorMessage: '',
      emailErrorMessage: '',
      passwordErrorMessage: '',
      isBirthdayValid: true,
      birthdayErrorMessage: '',
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
      this.form.user_fullname = ''
      this.form.user_email = ''
      this.form.user_password = ''
      this.form.user_image = ''
      this.form.user_gender = ''
      this.form.user_dob = ''
      this.form.user_address = ''
      this.form.user_phone = ''
      this.nameErrorMessage = ''
      this.emailErrorMessage = ''
      this.passwordErrorMessage = ''
      this.birthdayErrorMessage = ''
    },

    async onFileChosen(event) {
      const file = event.target.files[0]
      if (file) {
        const formData = new FormData()
        formData.append('image', file)

        try {
          const response = await fetch('https://api.imgur.com/3/image/', {
            method: 'POST',
            headers: {
              Authorization: 'Client-ID 59ab98495609928',
            },
            body: formData,
          })

          const data = await response.json()
          this.form.user_image = data.data.link // Lưu đường dẫn hình ảnh vào biến imageSrc
          // eslint-disable-next-line no-console
          console.log(this.form.user_image)
          // eslint-disable-next-line no-console
          console.log(data.data.link)
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      }
    },

    validateForm() {
      // Kiểm tra các trường khác
      if (
        this.isBirthdayValid &&
        this.form.user_fullname.length > 0 &&
        this.form.user_fullname.length <= 50 &&
        this.form.user_email.length > 0 &&
        this.form.user_email.length <= 50 &&
        this.form.user_password.length > 0 &&
        this.form.user_password.length <= 50 &&
        this.form.user_gender !== ''
      ) {
        this.validForm = true
      } else {
        this.validForm = false
      }
    },

    // Validate tên
    validateName() {
      if (this.form.user_fullname.length === 0) {
        this.isNameValid = false
        this.nameErrorMessage = 'Vui lòng nhập họ và tên.'
      } else if (this.form.user_fullname.length > 50) {
        this.isNameValid = false
        this.nameErrorMessage = 'Tên không được vượt quá 50 ký tự.'
      } else {
        this.isNameValid = true
        this.nameErrorMessage = ''
      }
      this.validateForm()
    },

    validateEmail() {
      if (this.form.user_email.length === 0) {
        this.isEmailValid = false
        this.emailErrorMessage = 'Vui lòng nhập email.'
      } else if (this.form.user_email.length > 50) {
        this.isEmailValid = false
        this.emailErrorMessage = 'Email không được vượt quá 50 ký tự.'
      } else {
        this.isEmailValid = true
        this.emailErrorMessage = ''
      }
      this.validateForm()
    },

    validatePassword() {
      if (this.form.user_password.length === 0) {
        this.isPasswordValid = false
        this.passwordErrorMessage = 'Vui lòng nhập password.'
      } else if (this.form.user_password.length > 50) {
        this.isPasswordValid = false
        this.passwordErrorMessage = 'Password không được vượt quá 50 ký tự.'
      } else {
        this.ispasswordValid = true
        this.passwordErrorMessage = ''
      }
      this.validateForm()
    },

    // Validate ngày sinh phải trước ngày hiện tại
    validateDateOfBirth() {
      const currentDate = new Date()
      const dateOfBirth = new Date(this.form.user_dob)
      if (dateOfBirth > currentDate) {
        this.isBirthdayValid = false
        this.birthdayErrorMessage =
          'Ngày sinh không được vượt quá ngày hiện tại.'
      } else {
        this.isBirthdayValid = true
      }
      this.validateForm()
    },

    async onSubmit() {
      try {
        await this.$axios.$post(`http://localhost:8080/users/register`, {
          userFullName: this.form.user_fullname,
          userEmail: this.form.user_email,
          userPassword: this.form.user_password, 
          userImage: this.form.user_image,
          userGender: this.form.user_gender,
          userDob: this.form.user_dob,
          userAddress: this.form.user_address,
          userPhoneNum: this.form.user_phone,
        })

        // eslint-disable-next-line no-console
        console.log('success')

        this.$router.push('/account/dang_nhap')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
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
