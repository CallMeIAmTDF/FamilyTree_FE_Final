<template>
  <div>
 
 
    <!-- slide -->
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 0px 0px 2px #000"
      fade
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        v-for="(item, index) in carouselItems"
        :key="index"
        :img-src="item.imgSrc"
      >
      </b-carousel-slide>
    </b-carousel>
 
 
    <!-- một vài hình ảnh -->
    <b-container
      fluid
      class="mt-5 p-5 bg-secondary d-flex justify-content-center"
    >
      <b-row>
        <b-col>
          <b-img
            thumbnail
            fluid
            src="/img/Ảnh màn hình 2023-11-12 lúc 20.19.33.png"
            alt="Image 1"
            style="
              width: 380px;
              height: 400px;
              object-fit: cover;
              margin-right: 20px;
            "
          ></b-img>
        </b-col>
        <b-col>
          <b-img
            thumbnail
            fluid
            src="https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=652532206448f729cad2c031"
            alt="Image 2"
            style="
              width: 380px;
              height: 400px;
              object-fit: cover;
              margin-right: 20px;
              margin-left: 20px;
            "
          ></b-img>
        </b-col>
        <b-col>
          <b-img
            thumbnail
            fluid
            src="https://viettoc.vn/dang-ky-background.png"
            alt="Image 3"
            style="
              width: 380px;
              height: 400px;
              object-fit: cover;
              margin-left: 20px;
            "
          ></b-img>
        </b-col>
      </b-row>
    </b-container>
 
 
    <!-- cái gfi đó chưa nghĩa ra -->
    <b-jumbotron bg-variant="secondary" class="mt-5">
      <template #header>FAMILY CONNECT</template>
 
 
      <template #lead>
        Family connect giúp kết nối thế hệ: Family connect là một cách hiệu quả
        để kết nối giữa các thế hệ trong một gia đình. Bằng cách ghi chép thông
        tin về ông bà, cha mẹ, anh chị em, con cháu, Family connect giúp hiểu rõ
        hơn về quan hệ gia đình và liên kết giữa các thành viên.
      </template>
 
 
      <hr class="my-4" />
 
 
      <p>
        Giúp tìm hiểu về nguồn gốc và dòng họ: Gia phả cung cấp thông tin về
        nguồn gốc và dòng họ của gia đình. Việc biết được về nơi xuất xứ, tên
        họ, và lịch sử phát triển của gia đình có thể mang lại sự tự hào và nhận
        thức về bản thân.
      </p>
 
 
      <b-button variant="primary" href="/so_do_cay">Xem sơ đồ</b-button>
    </b-jumbotron>
 
 
  </div>
 </template>
 
 
 <script>
 export default {
  data() {
    return {
      slide: 0,
      sliding: null,
 
 
      carouselItems: [
        {
          imgSrc:
            'https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=65011336d452a83b3b4ffe61',
        },
        {
          imgSrc:
            'https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=63c0c511b723d1f994e374c6',
        },
        {
          imgSrc:
            'https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=63c0c631b723d1f994e3753f',
        },
        {
          imgSrc:
            'https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=63c0baaeb723d1f994e3707f',
        },
      ],
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
  },
 }
 </script>
 
 
 <style scoped>
 * {
  color: #fff;
 }
 </style>