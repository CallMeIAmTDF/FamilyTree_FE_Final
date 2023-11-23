<template>
  <div class="px-3 py-2">
    <b-img
      :src="
        person.personImage
          ? person.personImage
          : 'http://www.clipartbest.com/cliparts/aTq/zRq/aTqzRqXTM.png'
      "
      style="margin: auto; width: 200px; height: 200px"
      fluid
      thumbnail
    ></b-img>

    <br />

    <div
      class=""
      style="
        display: flex;
        justify-content: space-around;
        flex-direction: column;
      "
    >
      <div class="mt-4">
        <h6 style="font-weight: bold">Họ và tên: {{ person.personName }}</h6>
        <h6>Giới tính: {{ person.personGender }}</h6>
        <h6>Sinh nhật: {{ person.personDob }}</h6>
        <hr />
        <p>Nghề nghiệp: {{ person.personJob }}</p>
        <p>Địa chỉ: {{ person.personAddress }}</p>
      </div>

      <div>
        <b-button class="btn btn-warning" @click="editPerson"
          >Sửa thông tin</b-button
        >
        <b-button class="btn btn-danger" @click="confirmDelete">Xóa thành viên</b-button>
      </div>
      <b-modal
        id="modalEditPerson"
        centered
        hide-footer
        :title="'Sửa thông tin của ' + person.personName"
      >
        <b-form
          v-if="show"
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
                  <b-form-radio value="true">Nam</b-form-radio>
                  <b-form-radio value="false">Nữ</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>

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
                <b-form-radio value="true" @change="deleteValueDeath"
                  >Còn sống</b-form-radio
                >
                <b-form-radio value="false">Từ trần</b-form-radio>
              </b-form-radio-group>
            </b-form-group>

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
            <b-form-group label="Nơi sống:" class="col-md-6">
              <b-form-input
                v-model="form.address"
                type="text"
                placeholder="Nhập nơi sinh..."
              ></b-form-input>
            </b-form-group>
          </div>

          <!-- Sử lý các sự kiện -->
          <div class="d-flex justify-content-end">
            <b-button type="reset" class="mr-3" variant="danger"
              >Reset</b-button
            >
            <b-button type="submit" variant="primary" :disabled="!validForm"
              >Sửa thông tin</b-button
            >
          </div>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      selectedGender: '',
      createdPersonData: {},

      form: {
        name: '',
        img: null,
        imageSrc: null,
        selectedSex: '',
        selectedStatus: '',
        birthday: '',
        address: '',
      },
      show: true,
      familyTreeId: null,
      validForm: false,
      isNameValid: false,
      nameErrorMessage: '',
      isBirthdayValid: true,
      isDeathdayValid: true,
      birthdayErrorMessage: '',
      deathdayErrorMessage: '',
    }
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
      this.form.birthday = ''
      this.form.address = ''
      this.nameErrorMessage = ''
      this.birthdayErrorMessage = ''
      this.deathdayErrorMessage = ''
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

    editPerson() {
      this.form.name = this.person.personName
      this.form.imageSrc = this.person.personImage
      this.form.selectedSex = this.person.personGender
      this.form.selectedStatus = this.person.personStatus
      this.form.address = this.person.personAddress
      this.form.birthday = this.person.personDob

      // Hiển thị modal sửa thông tin
      this.$bvModal.show('modalEditPerson')
    },

    async onSubmit() {
      try {
        const response = await this.$axios.$put(
          `http://localhost:8080/person/update`,
          {
            personId: this.person.personId,
            personName: this.form.name,
            personDob: this.form.birthday,
            personJob: null,
            personReligion: null,
            personEthnic: null,
            personDod: null,
            personAddress: this.form.address,
            personStatus: this.form.selectedStatus,
            personDescription: null,
            personStory: null,
            fatherId: null,
            motherId: null,
            personImage: this.form.imageSrc,
            siblingNum: 0,
            siblingId: null,
          }
        )
        // eslint-disable-next-line no-console
        console.log('success')

        // eslint-disable-next-line no-console
        console.log(response)

        this.showSuccessToast('Sửa người thành công')

        // Đóng modal sau khi người đầu tiên được tạo thành công
        this.$bvModal.hide('modalEditPerson')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)

        this.showErrorToast('Có lỗi xảy ra khi tạo sửa thông tin!')
      }
    },

    confirmDelete() {
      // Hiển thị hộp thoại xác nhận khi người dùng nhấn nút "Xóa"
      if (confirm("Bạn có chắc muốn xóa thành viên này không?")) {
        // Nếu người dùng xác nhận xóa, thực hiện xóa thành viên ở đây
        this.deletePerson();
      }
    },

    async deletePerson() {
      try {
       await this.$axios.$delete(`http://localhost:8080/person/delete?personId=${this.person.personId}`)

        this.showSuccessToast('Xóa thành viên thành công');
      } catch (error) {

        // eslint-disable-next-line no-console
        console.log(error);
        this.showErrorToast('Có lỗi xảy ra khi xóa thành viên!');
      }
    },
  },
}
</script>

<style></style>
