<template>
    <div>
      <b-form
        v-if="show"
        class="b-form"
        enctype="multipart/form-data"
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
              v-model="form.name"
              type="text"
              placeholder="Nhập tên..."
              required
              @blur="validateName"
            ></b-form-input>
          </b-form-group>
           <!-- Trường chọn hình ảnh từ file -->
          <b-form-group label="Chọn ảnh đại diện:" class="col-md-6">
            <b-form-file
              v-model="form.img"
              placeholder="Chọn ảnh..."
              accept="image/*"
              @change="onFileChosen"
            ></b-form-file>
          </b-form-group>
        </div>
         <div class="row">
          <div class="col-md-6">
            <!-- Trường giới tính -->
            <b-form-group
              label="Giới tính: "
              class="mt-3"
              :state="form.selectedSex !== ''"
            >
              <b-form-radio-group
                v-model="form.selectedSex"
                name="radio-sex"
                required
              >
                <b-form-radio value="0">Nam</b-form-radio>
                <b-form-radio value="1">Nữ</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
             <!-- Trường tình trạng -->
            <b-form-group
              label="Tình trạng: "
              class="mt-2"
              :state="form.selectedStatus !== ''"
            >
              <b-form-radio-group
                v-model="form.selectedStatus"
                name="radio-status"
                required
              >
                <b-form-radio value="0" @change="deleteValueDeath"
                  >Còn sống</b-form-radio
                >
                <b-form-radio value="1">Từ trần</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
             <!-- Trường chọn bố hoặc mẹ -->
            <div class="mb-3">
              <label for="" class="form-label">Chọn bố hoặc mẹ:</label> <br />
              <b-form-select
                v-model="form.selectedParent"
                class="form-select form-select-lg"
                name=""
              >
                <option>Select one</option>
                <option value="father">Bố</option>
                <option value="mother">Mẹ</option>
              </b-form-select>
            </div>
             <!-- Trường chọn mẹ hoặc bố -->
            <div class="mb-3">
              <label for="" class="form-label">Chọn mẹ hoặc bố:</label> <br />
              <b-form-select
                class="form-select form-select-lg"
                name=""
                :disabled="form.selectedParent === ''"
              >
                <option selected>Select one</option>
                <option value="">New Delhi</option>
                <option value="">Istanbul</option>
                <option value="">Jakarta</option>
              </b-form-select>
            </div>
          </div>
           <!-- Hiển thị hình ảnh -->
          <div class="col-md-6 d-flex justify-content-center">
            <img
              class="mt-2"
              width="200px"
              height="100%"
              :src="
                form.imageSrc
                  ? form.imageSrc
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
            class="col-md-6"
            :state="isBirthdayValid"
            :invalid-feedback="birthdayErrorMessage"
          >
            <b-form-datepicker
              v-model="form.birthday"
              class="mb-2"
              @input="validateDateOfBirth"
            ></b-form-datepicker>
          </b-form-group>
           <!-- Trường chọn nơi sinh -->
          <b-form-group label="Nơi sinh:" class="col-md-6">
            <b-form-input
              v-model="form.birthplace"
              type="text"
              placeholder="Nhập nơi sinh..."
            ></b-form-input>
          </b-form-group>
        </div>
         <div class="row">
          <!-- Trường chọn ngày mất -->
          <b-form-group
            v-if="form.selectedStatus === '1'"
            label="Ngày mất:"
            class="col-md-6"
            :state="isDeathdayValid"
            :invalid-feedback="deathdayErrorMessage"
          >
            <b-form-datepicker
              v-model="form.deathday"
              class="mb-2"
              @input="validateDateOfDeath"
            ></b-form-datepicker>
          </b-form-group>
           <!-- Trường chọn nơi mất -->
          <b-form-group
            v-if="form.selectedStatus === '1'"
            label="Nơi chôn cất:"
            class="col-md-6"
          >
            <b-form-input
              v-model="form.deathplace"
              type="text"
              placeholder="Nhập nơi chôn cất..."
            ></b-form-input>
          </b-form-group>
        </div>
         <!-- Sử lý các sự kiện -->
        <div class="d-flex justify-content-end">
          <b-button type="reset" class="mr-3" variant="danger">Reset</b-button>
          <b-button
            type="button"
            variant="primary"
            :disabled="!validForm"
            @click="nextStep"
            >Tiếp theo</b-button
          >
        </div>
      </b-form>
      <form-confirm v-else :show="show" :data="form" @goBack="goBack" />
    </div>
  </template>
   <script>
  import formConfirm from './formConfirm.vue'
  export default {
    components: { formConfirm },
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        form: {
          name: '',
          img: null,
          imageSrc: null,
          selectedSex: '',
          selectedStatus: '',
          selectedParent: '',
          birthday: '',
          birthplace: '',
          deathday: '',
          deathplace: '',
        },
        show: true,
        validForm: false,
        isNameValid: false,
        nameErrorMessage: '',
        isBirthdayValid: true,
        isDeathdayValid: true,
        birthdayErrorMessage: '',
        deathdayErrorMessage: '',
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
        this.form.name = ''
        this.form.img = ''
        this.form.imageSrc = ''
        this.form.selectedSex = ''
        this.form.selectedStatus = ''
        this.form.selectedParent= ''
        this.form.birthday = ''
        this.form.birthplace = ''
        this.form.deathday = ''
        this.form.deathplace = ''
        this.nameErrorMessage = ''
        this.birthdayErrorMessage = ''
        this.deathdayErrorMessage = ''
         this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
       deleteValueDeath() {
        this.form.deathday = ''
        this.form.deathplace = ''
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
            this.form.imageSrc = data.data.link // Lưu đường dẫn hình ảnh vào biến imageSrc
            // eslint-disable-next-line no-console
            console.log(this.form.imageSrc)
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
          this.isDeathdayValid &&
          this.form.name.length > 0 &&
          this.form.name.length <= 50 &&
          this.form.selectedSex !== '' &&
          this.form.selectedStatus !== ''
        ) {
          this.validForm = true
        } else {
          this.validForm = false
        }
      },
       // Validate tên
      validateName() {
        if (this.form.name.length === 0) {
          this.isNameValid = false
          this.nameErrorMessage = 'Vui lòng nhập họ và tên.'
        } else if (this.form.name.length > 50) {
          this.isNameValid = false
          this.nameErrorMessage = 'Tên không được vượt quá 50 ký tự.'
        } else {
          this.isNameValid = true
          this.nameErrorMessage = ''
        }
        this.validateForm()
      },
       // Validate ngày sinh phải trước ngày hiện tại
      validateDateOfBirth() {
        const currentDate = new Date()
        const dateOfBirth = new Date(this.form.birthday)
        if (dateOfBirth > currentDate) {
          this.isBirthdayValid = false
          this.birthdayErrorMessage =
            'Ngày sinh không được vượt quá ngày hiện tại.'
        } else {
          this.isBirthdayValid = true
        }
        this.validateForm()
      },
       // Validate ngày mất phải trước ngày hiện tại và sau ngày sinh
      validateDateOfDeath() {
        const currentDate = new Date()
        const dateOfDeath = new Date(this.form.deathday)
        if (dateOfDeath > currentDate) {
          this.isDeathdayValid = false
          this.deathdayErrorMessage = 'Ngày mất không hợp lệ.'
        } else if (dateOfDeath < new Date(this.form.birthday)) {
          this.isDeathdayValid = false
          this.deathdayErrorMessage = 'Ngày mất phải sau ngày sinh.'
        } else {
          this.isDeathdayValid = true
        }
        this.validateForm()
      },
       nextStep() {
        if (this.validForm) {
          this.show = false
        }
      },
       goBack() {
        this.show = true
      },
    },
  }
  </script>