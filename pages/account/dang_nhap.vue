<template>
    <div>
      <sign-in-form/>
    </div>
   </template>


   <script>
   import signInForm from '../../components/form_user/signInForm.vue'
   export default {
    components: { signInForm },

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
    }
  },

   }
   </script>


   <style>


   </style>
