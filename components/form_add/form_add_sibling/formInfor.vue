<template>
  <div>
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
          class="col-md-6"
          :state="isNameValid"
          :invalid-feedback="nameErrorMessage"
        >
          <label
            >Họ và tên
            <span style="color: red; margin-left: 2px">*</span>
          </label>
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
            placeholder="Chọn ảnh..."
            accept="image/*"
            @change="onFileChosen"
          ></b-form-file>
        </b-form-group>
      </div>

      <div class="row">
        <div class="col-md-6">
          <!-- Trường giới tính -->
          <b-form-group class="mt-3" :state="form.selectedSex !== ''">
            <label
              >Giới tính
              <span style="color: red; margin-left: 2px">*</span>
            </label>
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
          <b-form-group class="mt-2" :state="form.selectedStatus !== ''">
            <label
              >Tình trạng
              <span style="color: red; margin-left: 2px">*</span>
            </label>
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
              form.img
                ? form.img
                : 'https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png'
            "
            alt="person_image"
            style="object-fit: cover"
          />
        </div>
      </div>

      <div class="row">
        <b-form-group label="Chọn bố/mẹ" class="col-md-6">
          <b-form-select
            id="parents"
            v-model="form.selectedParent"
            @change="onSelectedParentChange"
          >
            <b-form-select-option :value="''" disabled
              >Chọn</b-form-select-option
            >
            <b-form-select-option
              v-for="parent in parents"
              :key="parent?.personId"
              :value="parent?.personId"
            >
              {{ parent?.personName }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group
          label="Chọn bố/mẹ còn lại"
          class="col-md-6"
        >
          <b-form-select
            id="spouses"
            v-model="form.selectedSpouse"
            :disabled="form.selectedParent === null"
            @change="fetchChildren"
          >
            <b-form-select-option :value="''">Chọn</b-form-select-option>
            <b-form-select-option
              v-for="spouse in spouses"
              :key="spouse?.personId"
              :value="spouse?.personId"
            >
              {{ spouse.personName }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="d-flex align-items-baseline ">
            <div class=""><span>Người này có</span></div>
            <!-- Chọn chức vụ là anh chị em  -->
            <b-form-group class="col-md-8">
              <b-form-select v-model="form.selectedLevel">
                <b-form-select-option :value="''" disabled
                  >Chọn chức vụ</b-form-select-option
                >
                <b-form-select-option value="0.5">
                  anh hoặc chị gần nhất
                </b-form-select-option>
                <b-form-select-option value="-0.5">
                  em gần nhất
                </b-form-select-option>
              </b-form-select>
            </b-form-group>

            <div><span>là: </span></div>
          </div>
        </div>
        <!-- Chọn anh chị em gần nhất -->
        <b-form-group class="col-md-6">
          <b-form-select v-model="form.selectedChildren">
            <b-form-select-option value="null" disabled
              >Chọn người</b-form-select-option
            >
            <b-form-select-option
              v-for="child in children"
              :key="child.personId"
              :value="child.personId"
            >
              {{ child.personName }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
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
        <b-button type="reset" class="mr-3" variant="danger">Reset</b-button>
        <b-button type="submit" variant="primary" :disabled="!validForm"
          >Thêm người</b-button
        >
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: null,
    },

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
        selectedSex: '',
        selectedStatus: '',
        birthday: '',
        address: '',
        job: '',
        deathday: '',
        selectedChildren: null,
        selectedParent: null,
        selectedSpouse: null,
        selectedLevel: '',
      },
      children: [],
      parents: [],
      spouses: [],
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

  watch: {
    form: {
      deep: true,
      handler() {
        this.validateForm()
      },
    },
  },

  // created() {},

  created() {
    // Lấy ID sản phẩm từ query parameter khi trang được tạo
    this.familyTreeId = this.$route.query.id
    
    if (this.id) {
      this.fetchParent()
    }
    if (this.form.selectedParent) {
      this.fetchSpouse()
      this.fetchChildren()
    }
  },

  methods: {
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.img = null
      this.form.selectedSex = ''
      this.form.selectedStatus = ''
      this.form.selectedParent = null
      this.form.selectedChildren = null
      this.form.selectedLevel = ''
      this.form.selectedSpouse = null
      this.form.birthday = ''
      this.form.address = ''
      this.form.job = ''
      this.form.deathday = ''
      this.nameErrorMessage = ''
      this.birthdayErrorMessage = ''
      this.deathdayErrorMessage = ''
    },

    deleteValueDeath() {
      this.form.deathday = ''
      this.deathdayErrorMessage = ''
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
          this.form.img = data.data.link
          // eslint-disable-next-line no-console
          console.log(this.form.img)
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
        this.form.selectedStatus !== '' &&
        this.form.selectedParent !== null &&
        this.form.selectedChildren !== null &&
        this.form.selectedLevel !== null
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

    async fetchParent() {
      const response = await this.$axios.$get(
        `http://localhost:8080/person/getInfo?personId=${this.id}`
      )

      const fatherId = response.data.fatherId
      const motherId = response.data.motherId

      // Tạo mảng chứa hai giá trị fatherId và motherId
      const parentIds = [fatherId, motherId]
      if (fatherId) {
        this.form.selectedParent = fatherId;
      }
      else {
        this.form.selectedParent = motherId;
      }
      this.onSelectedParentChange();

      for (const parentId of parentIds) {
        if (parentId) {
          const parentInfo = await this.$axios.$get(
            `http://localhost:8080/person/getInfo?personId=${parentId}`
            )
            if (parentInfo.data) {
              this.parents.push(parentInfo.data)
            }
        }
      }
    },

    async fetchSpouse() {
      try {
        const res = await this.$axios.get(
          `http://localhost:8080/person/getInfo?personId=${this.form.selectedParent}`
        )
        const data = res.data.data

        if (!!data === false) {
          console.log("dong 478 - formInfo.vue - fetchSpouse(): khong lay duoc du lieu")
          return;
        }

        const spouseResponse = await Promise.all(
          data?.wife.concat(data.husband).map((spouseId) => {
            return this.$axios.get(
              `http://localhost:8080/person/getInfo?personId=${spouseId}`
            )
          })
        )

        this.spouses = spouseResponse.map((res) => res.data.data)
        if (this.spouses.length === 1) {
          this.form.selectedSpouse = this.spouses[0].personId;
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },

    async fetchChildren() {
      try {
        let childrenIdList = []
        if (!this.form.selectedSpouse) {
          const apiEndpoint1 = `http://localhost:8080/person/getChild?fatherId=${this.form.selectedParent}`
          const apiEndpoint2 = `http://localhost:8080/person/getChild?motherId=${this.form.selectedParent}`

          const [response1, response2] = await Promise.all([
            this.$axios.$get(apiEndpoint1),
            this.$axios.$get(apiEndpoint2),
          ])

          const children1 = response1.data || []
          const children2 = response2.data || []

          childrenIdList = [...children1, ...children2]

          this.children = childrenIdList
        } else {
          const apiEndpoint1 = `http://localhost:8080/person/getChild?fatherId=${this.form.selectedParent}&motherId=${this.form.selectedSpouse}`
          const apiEndpoint2 = `http://localhost:8080/person/getChild?fatherId=${this.form.selectedSpouse}&motherId=${this.form.selectedParent}`
          const [response1, response2] = await Promise.all([
            this.$axios.$get(apiEndpoint1),
            this.$axios.$get(apiEndpoint2),
          ])

          const children1 = response1.data || []
          const children2 = response2.data || []

          childrenIdList = [...children1, ...children2]

          this.children = childrenIdList
        }

        // this.children = childrenInfoList.filter((child) => child !== null)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching children:', error)
      }
    },

    onSelectedParentChange() {
      this.fetchSpouse()
      this.fetchChildren()
    },

    async onSubmit() {
      try {
        const childPersonId = this.form.selectedChildren // Lấy giá trị personId của selectedChildren
        const level = parseFloat(this.form.selectedLevel)

        // Tìm thông tin chi tiết của selectedChildren từ danh sách children
        const selectedChild = this.children.find(
          (child) => child.personId === childPersonId
        )

        if (selectedChild) {
          const siblingNumCurrent = selectedChild.siblingNum // Lấy giá trị siblingNum của selectedChildren
          const siblingNumNext = siblingNumCurrent + level

          // Xác định fatherId và motherId dựa trên lựa chọn của người dùng
          let fatherId = null
          let motherId = null

          // lọc giới tinh lấy ai đi của bố hoặc mẹ
          const selectedParent = this.parents.find(
            (parent) => parent.personId === this.form.selectedParent
          )

          if (selectedParent) {
            if (selectedParent.personGender === 'Nam') {
              fatherId = this.form.selectedParent
            } else if (selectedParent.personGender === 'Nữ') {
              motherId = this.form.selectedParent
            }
          }

          // lọc giới tính lấy ai đi của người còn lại
          if (this.form.selectedSpouse) {
            const selectedSpouse = this.spouses.find(
              (spouse) => spouse.personId === this.form.selectedSpouse
            )

            if (selectedSpouse) {
              if (selectedSpouse.personGender === 'Nam') {
                fatherId = this.form.selectedSpouse
              } else if (selectedSpouse.personGender === 'Nữ') {
                motherId = this.form.selectedSpouse
              }
            }
          }

          await this.$axios.$post(
            `http://localhost:8080/person/createChildren?siblingId=${childPersonId}`,
            {
              personName: this.form.name,
              personGender: this.form.selectedSex,
              personDob: this.form.birthday,
              personJob: this.form.job,
              personReligion: null,
              personEthnic: null,
              personDod: this.form.deathday,
              personAddress: this.form.address,
              parentsId: null,
              familyTreeId: this.item.familyTreeId,
              personStatus: this.form.selectedStatus,
              personRank: null,
              personDescription: null,
              personStory: null,
              fatherId,
              motherId,
              personImage: this.form.img,
              siblingNum: siblingNumNext,
              groupChildId: null,
            }
          )

          // eslint-disable-next-line no-console
          console.log('success')

          this.$emit('personCreated')

          window.location.reload()

          this.showSuccessToast('Thêm người vào phả đồ thành công')
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)

        this.showErrorToast('Có lỗi xảy ra khi thêm người vào phả đồ!')
      }
    },
  },
}
</script>