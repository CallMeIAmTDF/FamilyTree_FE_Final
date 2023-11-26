export default function ({ $axios, redirect, route }) {
  // Intercept request trước khi gửi
  $axios.onRequest((config) => {
    const accessToken = localStorage.getItem('accessToken')

    // Kiểm tra xem nếu đường dẫn là trang đăng nhập, quên mật khẩu hoặc xác nhận OTP
    if (
      route.path === '/account/dang_nhap' ||
      route.path === '/account/quen_mat_khau' ||
      route.path === '/account/xac_nhan_otp'
    ) {
      // Không yêu cầu accessToken cho các trang đăng nhập, quên mật khẩu hoặc xác nhận OTP
      return config
    }

    if (accessToken) {
      // Thêm Authorization header vào request
      config.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
      // Nếu không có accessToken, chuyển hướng đến trang đăng nhập
      redirect('/account/dang_nhap')
    }

    return config
  })

  // Intercept response sau khi nhận được
  $axios.onError(async (error) => {
    const originalRequest = error.config

    // Nếu response trả về mã lỗi 401 (Unauthorized) tức là accessToken hết hạn
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // Kiểm tra xem nếu đường dẫn là trang đăng nhập, quên mật khẩu hoặc xác nhận OTP
      if (
        route.path === '/account/dang_nhap' ||
        route.path === '/account/quen_mat_khau' ||
        route.path === '/account/xac_nhan_otp'
      ) {
        return Promise.reject(error)
      }

      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')

      // Gửi yêu cầu để khôi phục accessToken dựa vào refreshToken
      const refreshResponse = await $axios.get('/verifyRefreshToken', {
        refreshToken,
      })

      if (refreshResponse.data.success) {
        // Nếu refreshToken hợp lệ và khôi phục accessToken thành công, thực hiện lại yêu cầu gốc
        localStorage.setItem('accessToken', refreshResponse.data.accessToken)
        return $axios(originalRequest)
      } else {
        // Nếu refreshToken không hợp lệ, chuyển hướng đến trang đăng nhập
        redirect('/account/dang_nhap')
      }
    }

    return Promise.reject(error)
  })
}
