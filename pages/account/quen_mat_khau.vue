<template>
    <div>
      <reset-password-form />
    </div>
   </template>
   
   
   <script>
   import resetPasswordForm from '../../components/form_user/resetPasswordForm.vue'
   export default {
    components: { resetPasswordForm },

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
      window.location.href="/account/quen_mat_khau"
    }
  },
   }
   </script>
   
   
   <style></style>