<template>
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-8">
            <h6>Mô tả</h6>
            <p class="text-justify">
              Trang web cho phép người dùng tạo gia phả cho gia đình mình bằng
              cách nhập thông tin các thành viên. Các thông tin cơ bản cần nhập
              bao gồm: họ tên, ngày sinh, giới tính, nghề nghiệp. Người dùng có
              thể thêm ảnh đại diện cho từng thành viên nếu có. Hệ thống sẽ tự
              động tạo một gia phả dưới dạng cây gia
            </p>
   
   
            <p class="text-justify">
              Trang web mang tính bảo mật, chỉ cho phép người dùng xem, chỉnh sửa
              gia phả của gia đình mình. Giao diện trực quan, thân thiện giúp
              người dùng dễ sử dụng.
            </p>
          </div>
   
   
          <div class="col-xs-4 col-md-4">
            <h6>Xưng hô</h6>
            <ul class="footer-links">
              <li>Ông-bà</li>
              <li>Bố-mẹ</li>
              <li>Anh-chị-em</li>
              <li>Con cái</li>
              <li>Cháu-chắt</li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">
              Thành lập từ &copy; 2003 Toàn quyền quản lý bởi
              <a href="#">Family Connect</a>.
            </p>
          </div>
   
   
          <!-- <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li>
                <a href="hhtps://facebook.com/chungdeptraivl" class="facebook">
                  <b-icon icon="facebook"></b-icon>
                </a>
              </li>
              <li>
                <a class="twitter" href="#">
                  <b-icon icon="twitter"></b-icon>
                </a>
              </li>
              <li>
                <a class="github" href="#">
                  <b-icon icon="github"></b-icon>
                </a>
              </li>
              <li>
                <a class="linkedin" href="#">
                  <b-icon icon="linkedin"></b-icon>
                </a>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
    </footer>
   </template>
   
   
   <script>
   export default {}
   </script>
   
   
   <style scoped>
   .site-footer {
    background-color: #26272b;
    padding: 45px 0 20px;
    font-size: 15px;
    line-height: 24px;
    color: #737373;
   }
   .site-footer hr {
    border-top-color: #bbb;
    opacity: 0.5;
   }
   .site-footer hr.small {
    margin: 20px 0;
   }
   .site-footer h6 {
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    margin-top: 5px;
    letter-spacing: 2px;
   }
   .site-footer a {
    color: #737373;
   }
   .site-footer a:hover {
    color: #3366cc;
    text-decoration: none;
   }
   .footer-links {
    padding-left: 0;
    list-style: none;
   }
   .footer-links li {
    display: block;
   }
   .footer-links a {
    color: #737373;
   }
   .footer-links a:active,
   .footer-links a:focus,
   .footer-links a:hover {
    color: #3366cc;
    text-decoration: none;
   }
   .footer-links.inline li {
    display: inline-block;
   }
   .site-footer .social-icons {
    text-align: right;
   }
   .site-footer .social-icons a {
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin-left: 6px;
    margin-right: 0;
    border-radius: 100%;
    background-color: #33353d;
   }
   .copyright-text {
    margin: 0;
   }
   @media (max-width: 991px) {
    .site-footer [class^='col-'] {
      margin-bottom: 30px;
    }
   }
   @media (max-width: 767px) {
    .site-footer {
      padding-bottom: 0;
    }
    .site-footer .copyright-text,
    .site-footer .social-icons {
      text-align: center;
    }
   }
   .social-icons {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
   }
   .social-icons li {
    display: inline-block;
    margin-bottom: 4px;
   }
   .social-icons li.title {
    margin-right: 15px;
    text-transform: uppercase;
    color: #96a2b2;
    font-weight: 700;
    font-size: 13px;
   }
   .social-icons a {
    background-color: #eceeef;
    color: #818a91;
    font-size: 16px;
    display: inline-block;
    line-height: 44px;
    width: 44px;
    height: 44px;
    text-align: center;
    margin-right: 8px;
    border-radius: 100%;
    -webkit-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
   }
   .social-icons a:active,
   .social-icons a:focus,
   .social-icons a:hover {
    color: #fff;
    background-color: #29aafe;
   }
   .social-icons.size-sm a {
    line-height: 34px;
    height: 34px;
    width: 34px;
    font-size: 14px;
   }
   .social-icons a.facebook:hover {
    background-color: #3b5998;
   }
   .social-icons a.twitter:hover {
    background-color: #00aced;
   }
   .social-icons a.linkedin:hover {
    background-color: #007bb6;
   }
   .social-icons a.github:hover {
    background-color: #6d6a6b;
   }
   @media (max-width: 767px) {
    .social-icons li.title {
      display: block;
      margin-right: 0;
      font-weight: 600;
    }
   }
   </style>