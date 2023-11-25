<template>
  <div class="app">
    <main class="main">
      <!-- Nội dung của trang sẽ được hiển thị ở đây -->
      <div class="zoom_outer">
        <div id="zoom">
          <div class="tree">
            <div
              class="btn"
              style="
                width: 250px;
                height: 100px;
                font-size: 35px;
                font-weight: bold;
                transform: translate(100%, 0);
              "
              @click="$bvModal.show('modalCreatePerson')"
            >
              <div>
                <first-card-person v-if="showAddFirstPerson" />
              </div>
            </div>
            <b-modal
              v-if="firstPersonCreated"
              id="modalCreatePerson"
              centered
              hide-footer
              title="Thêm người đầu tiên"
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
                  <!-- trường nghề nghiệp -->
                  <b-form-group label="Nghề nghiệp:" class="col-md-6">
                    <b-form-input
                      v-model="form.job"
                      type="text"
                      placeholder="Nhập nghề nghiệp..."
                    ></b-form-input>
                  </b-form-group>

                  <!-- Trường chọn địa chỉ -->
                  <b-form-group label="Địa chỉ:" class="col-md-6">
                    <b-form-input
                      v-model="form.address"
                      type="text"
                      placeholder="Nhập địa chỉ..."
                    ></b-form-input>
                  </b-form-group>
                </div>

                <div class="row">
                  <!-- Trường chọn ngày sinh -->
                  <b-form-group
                    label="Ngày sinh:"
                    class="col-md-6"
                    :state="isBirthdayValid"
                    :invalid-feedback="birthdayErrorMessage"
                  >
                    <b-form-input
                      v-model="form.birthday"
                      type="date"
                      class="mb-2"
                      @input="validateDateOfBirth"
                    ></b-form-input>
                  </b-form-group>

                  <!-- Trường chọn ngày mất -->
                  <b-form-group
                    v-if="form.selectedStatus === 'false'"
                    label="Ngày mất:"
                    class="col-md-6"
                    :state="isDeathdayValid"
                    :invalid-feedback="deathdayErrorMessage"
                  >
                    <b-form-input
                      v-model="form.deathday"
                      type="date"
                      class="mb-2"
                      @input="validateDateOfDeath"
                    ></b-form-input>
                  </b-form-group>
                </div>

                <!-- Sử lý các sự kiện -->
                <div class="d-flex justify-content-end">
                  <b-button type="reset" class="mr-3" variant="danger"
                    >Reset</b-button
                  >
                  <b-button
                    type="submit"
                    variant="primary"
                    :disabled="!validForm"
                    >Thêm người</b-button
                  >
                </div>
              </b-form>
            </b-modal>
            <!-- Thẻ hiển thị người nam -->
            <man-card-person
              v-if="selectedGender === 'true' && !showAddFirstPerson"
              v-b-toggle.sidebar-right
              :person="createdPersonData"
            />

            <!-- Thẻ hiển thị người nữ -->
            <woman-card-person
              v-if="selectedGender === 'false' && !showAddFirstPerson"
              v-b-toggle.sidebar-right
              :person="createdPersonData"
            />
          </div>
        </div>
      </div>
    </main>

    <b-sidebar id="sidebar-right" right shadow>
      <sidebar-person :person="createdPersonData" />
    </b-sidebar>
  </div>
</template>

<script>
// import treeNodeDown from '../components/treeNode/treeNodeDown.vue'
import firstCardPerson from '~/components/cardPerson/firstCardPerson.vue'
import manCardPerson from '~/components/cardPerson/manCardPerson.vue'
import womanCardPerson from '~/components/cardPerson/womanCardPerson.vue'
import SidebarPerson from '~/components/sidebarPerson.vue'
export default {
  // components: { treeNodeDown },
  components: {
    firstCardPerson,
    manCardPerson,
    womanCardPerson,
    SidebarPerson,
  },

  data() {
    return {
      firstPersonCreated: true,
      showAddFirstPerson: true,
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
  computed: {},

  watch: {
    form: {
      deep: true,
      handler() {
        this.validateForm()
      },
    },
  },
  // layout: 'treeLayout',
  mounted() {
    // Kiểm tra nếu có accessToken trong localStorage
    if (localStorage.getItem('accessToken')) {
      // Kiểm tra nếu đường dẫn hiện tại là "/account/dang_nhap" hoặc "/account/dang_ki"
      const currentPath = this.$route.path

      // eslint-disable-next-line no-console
      console.log(currentPath)

      // eslint-disable-next-line no-console
      console.log(this.$route.query.id)
      if (
        currentPath === '/account/dang_nhap' ||
        currentPath === '/account/dang_ki' ||
        currentPath === '/account/quen_mat_khau' ||
        currentPath === '/account/xac_nhan_otp' ||
        currentPath === '/account/trang_chao_mung'
      ) {
        this.$router.push('/so_do_cay')
      }
      // Ngược lại, giữ nguyên trang
    } else {
      // Chuyển hướng về trang /account/dang_nhap nếu không có accessToken
      this.$router.push('/account/dang_nhap')
    }

    let scale = 0.833334
    let panning = false
    let pointX = -41046.9
    let pointY = -41408.2
    let start = { x: 0, y: 0 }

    const zoom = document.getElementById('zoom')

    function setTransform() {
      zoom.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`
    }

    zoom.onmousedown = function (e) {
      e.preventDefault()
      start = { x: e.clientX - pointX, y: e.clientY - pointY }
      panning = true
    }

    zoom.onmouseup = function (e) {
      panning = false
    }

    zoom.onmousemove = function (e) {
      e.preventDefault()
      if (!panning) {
        return
      }
      pointX = e.clientX - start.x
      pointY = e.clientY - start.y
      setTransform()
    }

    zoom.onwheel = function (e) {
      e.preventDefault()
      const xs = (e.clientX - pointX) / scale
      const ys = (e.clientY - pointY) / scale
      const delta = e.wheelDelta ? e.wheelDelta : -e.deltaY
      if (delta < 0 && scale <= 0.0778866) {
        return
      }
      if (delta > 0 && scale >= 1) {
        return
      }
      if (delta > 0) {
        scale *= 1.2
      } else {
        scale /= 1.2
      }
      pointX = e.clientX - xs * scale
      pointY = e.clientY - ys * scale
      setTransform()
    }

    window.addEventListener('load', () => {
      pointX += 1
      setTransform()
    })
  },

  created() {
    // Lấy ID sản phẩm từ query parameter khi trang được tạo
    this.familyTreeId = this.$route.query.id
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

    async onSubmit() {
      try {
        const response = await this.$axios.$post(
          `http://localhost:8080/person/createFirst`,
          {
            familyTreeId: this.familyTreeId,
            personName: this.form.name,
            personGender: this.form.selectedSex,
            personDob: this.form.birthday,
            personJob: null,
            personReligion: null,
            personEthnic: null,
            personDod: null,
            personAddress: this.form.address,
            parentsId: null,
            personId: null,
            personStatus: this.form.selectedStatus,
            personRank: null,
            personDescription: null,
            personStory: null,
            fatherId: null,
            motherId: null,
            personImage: this.form.imageSrc,
            siblingNum: null,
            groupChildId: null,
          }
        )

        // Gán toàn bộ dữ liệu từ response vào biến createdPersonData của component cha
        this.createdPersonData = response.data

        // eslint-disable-next-line no-console
        console.log('success')

        // eslint-disable-next-line no-console
        console.log(response)

        this.showSuccessToast('Thêm người đầu tiên vào sơ đồ thành công')

        // Sau khi thêm người đầu tiên thành công, ẩn thẻ firstPersonCard
        this.showAddFirstPerson = false

        // Xác định giới tính được chọn để hiển thị thẻ tương ứng
        this.selectedGender = this.form.selectedSex

        // Sau khi thêm người đầu tiên thành công, đặt firstPersonCreated thành true
        this.firstPersonCreated = false

        // Đóng modal sau khi người đầu tiên được tạo thành công
        this.$bvModal.hide('modalCreatePerson')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)

        this.showErrorToast('Có lỗi xảy ra khi tạo người đầu tiên!')
      }
    },
  },
}
</script>

<style scoped>
.main {
  padding: 0;
  margin: 0;
  outline: 0;
  overflow: hidden;
}

#zoom {
  margin: auto;
  transform: translateY(-50%);
  transform-origin: 0px 0px;
  cursor: grab;
  background: #fff1dc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  width: 100000px;
  height: 100000px;
}

.zoom_outer {
  flex: 1 1 auto;
  background: #000;
}
</style>
