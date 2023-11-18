<template>
    <div class="container row">
      <b-form class="col-md-8">
        <b-form-group id="searchName" label="Họ và tên" label-for="name">
          <b-form-input
            id="name"
            v-model="searchName"
            placeholder="Nhập tên"
          ></b-form-input>
        </b-form-group>
   
   
        <b-form-group id="searchAge" label="Khoảng tuổi" label-for="age">
          <b-input-group>
            <b-form-input
              id="age"
              v-model="searchMinAge"
              type="number"
              placeholder="Từ"
            ></b-form-input>
   
   
            <b-form-input
              id="age"
              v-model="searchMaxAge"
              type="number"
              placeholder="Đến"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
   
   
        <b-form-group
          id="searchOccupation"
          label="Nghề nghiệp"
          label-for="occupation"
        >
          <b-form-input
            id="occupation"
            v-model="searchOccupation"
            placeholder="Nhập nghề nghiệp"
          ></b-form-input>
        </b-form-group>
   
   
        <b-form-group id="searchAddress" label="Địa chỉ" label-for="address">
          <b-form-input
            id="address"
            v-model="searchAddress"
            placeholder="Nhập địa chỉ"
          ></b-form-input>
        </b-form-group>
   
   
        <b-form-group id="searchStatus" label="Tình trạng: ">
          <b-form-select
            id="status"
            v-model="searchStatus"
            placeholder="Chọn trạng thái"
          >
            <option value="0">Còn sống</option>
            <option value="1">Từ trần</option>
          </b-form-select>
        </b-form-group>
      </b-form>
   
   
      <div class="list-person col-md-4">
        <ul>
          <li v-for="person in filteredData" :key="person.id" style="list-style: none;">
            <div class="wrapper row" style="margin-bottom: 8px; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; border-radius: 8px; cursor: pointer;">
              <div class="avt col-md-4" style="display: flex; justify-content: center; align-items: center">
                <img
                style="width: 100%; border-radius: 8px"
                  src="https://i.pinimg.com/236x/15/b6/b2/15b6b22786f9361e777fc31ccb011518.jpg"
                  alt=""
                />
              </div>
              <div class="content col-md-8">
                <h5 class="name">{{person.name}}</h5>
                <h6 class="age">Tuổi: {{person.age}}</h6>
                <h6 class="job">Nghề nghiệp: {{person.job}}</h6>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
   </template>
   
   
   <script>
   export default {
    data() {
      return {
        searchName: '',
        searchMinAge: null,
        searchMaxAge: null,
        searchOccupation: '',
        searchAddress: '',
        searchStatus: '',
   
   
        data: [
          {
            id: 1,
            name: 'Chung',
            genre: 'male',
            job: 'Sinh viên',
            age: '20',
            address: 'Hải Dương',
            status: 0,
          },
          {
            id: 2,
            name: 'Linh Thuỳ',
            genre: 'female',
            job: 'Sinh viên',
            age: '20',
            address: 'Hải Dương',
            status: 0,
          },
          {
            id: 3,
            name: 'Thuỳ Linh',
            genre: 'female',
            job: 'Học sinh',
            age: '12',
            address: 'Hải Phòng',
            status: 0,
          },
          {
            id: 4,
            name: 'Minh Bách',
            genre: 'male',
            job: 'Sinh viên',
            age: '30',
            address: 'Hải Dương',
            status: 0,
          },
          {
            id: 5,
            name: 'Minh Anh',
            genre: 'female',
            job: 'Giáo Viên',
            age: '40',
            address: 'Thanh Hoá',
            status: 0,
          },
          {
            id: 6,
            name: 'Ngọc Anh',
            genre: 'female',
            job: 'Kĩ sư',
            age: '35',
            address: 'Hà Nội',
            status: 1,
          },
          {
            id: 7,
            name: 'Văn',
            genre: 'male',
            job: 'Nhạc sĩ',
            age: '50',
            address: 'Hà Tĩnh',
            status: 1,
          },
          {
            id: 8,
            name: 'Lam Sơn',
            genre: 'male',
            job: 'Điệp viên',
            age: '24',
            address: 'Sơn La',
            status: 0,
          },
          {
            id: 9,
            name: 'Chiến',
            genre: 'male',
            job: 'Ca sĩ',
            age: '68',
            address: 'Lào Cai',
            status: 1,
          },
          {
            id: 10,
            name: 'ChuBin',
            genre: 'male',
            job: 'Nghệ sĩ',
            age: '90',
            address: 'Quảng Ninh',
            status: 1,
          },
        ],
      }
    },
   
   
    computed: {
      filteredData() {
        // Lọc dữ liệu dựa trên các yêu cầu tìm kiếm
        return this.data.filter((person) => {
          let match = true
   
   
          // Lọc theo tên
          if (
            this.searchName &&
            !person.name.toLowerCase().includes(this.searchName.toLowerCase())
          ) {
            // eslint-disable-next-line no-console
            console.log(person.name)
            match = false
          }
   
   
          // Lọc theo khoảng tuổi
          if (this.searchMinAge && person.age < this.searchMinAge) {
            match = false
          }
   
   
          if (this.searchMaxAge && person.age > this.searchMaxAge) {
            match = false
          }
   
   
          // Lọc theo nghề nghiệp
          if (
            this.searchOccupation &&
            !person.job
              .toLowerCase()
              .includes(this.searchOccupation.toLowerCase())
          ) {
            match = false
          }
   
   
          // Lọc theo địa chỉ
          if (
            this.searchAddress &&
            !person.address
              .toLowerCase()
              .includes(this.searchAddress.toLowerCase())
          ) {
            match = false
          }
   
   
          // Lọc theo trạng thái
          if (
            this.searchStatus &&
            person.status.toString() !== this.searchStatus
          ) {
            // eslint-disable-next-line no-console
            console.log('Trạng thái:', person.status, this.searchStatus)
            match = false
          }
   
   
          return match
        })
      },
    },
   }
   </script>
   
   
   <style scoped>
   
   
   .list-person {
    height: 430px;
    overflow: auto;
    scroll-behavior: smooth;
   }
   
   
   .wrapper:hover {
    background: #f1f1f1;
   }
   </style>