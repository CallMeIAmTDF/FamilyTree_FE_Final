<template>
    <otp-form/>
   </template>
   
   
   <script>
   import otpForm from '../../components/form_user/otpForm.vue'
   export default {
    components: { otpForm },
   
    mounted() {
    // Kiểm tra nếu có accessToken trong localStorage
    if (localStorage.getItem('accessToken')) {
      // Kiểm tra nếu đường dẫn hiện tại là các trang đăng nhập, đăng ký, quên mật khẩu, xác nhận OTP, hoặc trang chào mừng
      const currentPath = this.$route.path

      if (
        currentPath.startsWith('/account/dang_nhap') ||
        currentPath.startsWith('/account/dang_ki') ||
        currentPath.startsWith('/account/quen_mat_khau') ||
        currentPath.startsWith('/account/xac_nhan_otp') ||
        currentPath.startsWith('/account/trang_chao_mung')
      ) {
        window.location.href="/"
      }
    } else {
      // Chuyển hướng về trang /account/dang_nhap nếu không có accessToken
      window.location.href="/account/xac_nhan_otp"
    }
  },
   
   }
   </script>
   
   
   <style>
   
   
   </style>