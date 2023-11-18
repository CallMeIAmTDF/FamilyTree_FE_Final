<template>
    <div>
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
          <div class="mb-4">
            <h1>{{ item.title }}</h1>
            <p>{{ item.description }}</p>
          </div>
        </b-carousel-slide>
      </b-carousel>
   
   
      <div class="container mt-4">
        <h2 class="text-center mb-3">
          Được phát triển từ 2003 bởi các chuyên gia
        </h2>
        <div class="row d-flex justify-content-around">
          <b-card
            v-for="(item, index) in cardItems"
            :key="index"
            :title="item.title"
            :img-src="item.imgSrc"
            img-alt="Card image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-5 col-md-4"
          >
            <b-card-text>{{ item.content }}</b-card-text>
            <b-button :href="item.link" variant="primary">
              <b-icon icon="facebook" class="mr-2" />Connect him
            </b-button>
          </b-card>
        </div>
      </div>
    </div>
   </template>
   
   
   <script>
   export default {
    layout: 'noAccountLayout',
    data() {
      return {
        slide: 0,
        sliding: null,
   
   
        carouselItems: [
          {
            imgSrc:
              'https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=61d67a46691b702cae02540e',
            title: 'Công nghệ bảo tồn giá trị truyền thống',
            description:
              'Family Connect ra đời với mong muốn áp dụng công nghệ hiện đại để bảo tồn một giá trị truyền thống quý báu của dân tộc và tạo ra lợi ích thật cho các dòng họ của người Việt.',
          },
          {
            imgSrc:
              'https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=61d6797a691b702cae0253e1',
            title: 'Family Connect - Gia Tộc Đoàn Viên',
            description:
              'Ứng dụng về dòng họ đầu tiên tại Việt Nam với sứ mệnh kết nối và bảo tồn văn hóa dòng họ truyền thống của người Việt.',
          },
          {
            imgSrc:
              'https://api.viettoc.vn/api/viettoc/v1/file/thumb?id=61d67a38691b702cae025407',
            title: 'Dòng họ bắt nguồn từ cây gia phả',
            description:
              'Family Connect lấy cây gia phả là nền tảng tạo ra kết nối giữa các thành viên trong dòng họ, từ đó giúp anh em, họ hàng duy trì các mối liên kết để chia sẻ và giúp đỡ lẫn nhau.',
          },
        ],
   
   
        cardItems: [
          {
            title: 'Đặng Xuân Thái',
            imgSrc: '/img/thai_logic.jpg',
            imgAlt: 'Thầy giáo Thái',
            content:
              "Some quick example content to build on the card title and make up the bulk of the card's content.",
            link: 'https://www.facebook.com/Hello.IAmTDF',
          },
          {
            title: 'Trần Phúc Tiến',
            imgSrc:
              '/img/tien_logic.jpg',
            imgAlt: 'PM Tiến',
            content:
              "Some quick example text to build on the card title and make up the bulk of the card's content.",
            link: 'https://www.facebook.com/tranphuctien2003',
          },
          {
            title: 'Nguyễn Tiến Dũng',
            imgSrc:
              '/img/dung_ba.jpg',
            imgAlt: 'BA Dũng',
            content:
              "Some quick example text to build on the card title and make up the bulk of the card's content.",
            link: 'https://www.facebook.com/TiennDunng',
          },
          {
            title: 'Hoàng Tuấn Anh',
            imgSrc:
              '/img/tuan_anh_be.jpg',
            imgAlt: 'BE Tuấn Anh',
            content:
              "Some quick example text to build on the card title and make up the bulk of the card's content.",
            link: 'https://www.facebook.com/tuananh.hoang2003',
          },
          {
            title: 'Nguyễn Thành Chung',
            imgSrc:
              '/img/chung_fe.jpg',
            imgAlt: 'FE Chung',
            content:
              "Some quick example text to build on the card title and make up the bulk of the card's content.",
            link: 'https://www.facebook.com/chungdeptraivl',
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