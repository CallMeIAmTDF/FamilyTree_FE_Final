<template>
    <div>
      <h4>Information of {{ data.name }}</h4>
      <b-card class="d-flex">
        <div class="d-flex justify-content-center">
          <b-img
            width="200px"
            :src="
              data.imageSrc
                ? data.imageSrc
                : 'https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png'
            "
            :alt="data.name"
          ></b-img>
        </div>
        <div class="container">
          <b-card-title> Họ và tên: {{ data.name }}</b-card-title>
          <h5>Giới tính: {{ getGender(data.selectedSex) }}</h5>
          <h6>Tình trạng: {{ getStatus(data.selectedStatus) }}</h6>
          <hr />
          <b-card-text v-if="data.birthday !== ''"
            >Ngày sinh: {{ data.birthday }}</b-card-text
          >
          <b-card-text v-if="data.birthplace !== ''"
            >Nơi sinh: {{ data.birthplace }}</b-card-text
          >
          <b-card-text v-if="data.deathday !== ''"
            >Ngày mất: {{ data.deathday }}</b-card-text
          >
          <b-card-text v-if="data.deathplace !== ''"
            >Nơi chôn cất: {{ data.deathplace }}</b-card-text
          >
        </div>
        <div class="d-flex justify-content-end">
          <b-button
            type="button"
            class="mr-3"
            variant="secondary"
            @click="goBack"
          >
            Quay lại
          </b-button>
          <b-button type="submit" variant="success">Thêm thành viên</b-button>
        </div>
      </b-card>
    </div>
  </template>
   <script>
  export default {
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
      show: Boolean,
    },
     methods: {
      goBack() {
        this.$emit('goBack') // Gửi sự kiện 'goBack' tới component cha
      },
       getGender(value) {
        return value === 1 ? 'Nam' : 'Nữ'
      },
       getStatus(value) {
        return value === 1 ? 'Còn Sống' : 'Từ trần'
      },
    },
  }
  </script>
   <style></style>
 
   