<template>
  <div>
    <header style="position: relative; top: 0; left: 0">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">Family Connect</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Nav trang chủ -->
          <b-navbar-nav v-if="showHeader">
            <b-nav-item href="/" active>Trang chủ</b-nav-item>
            <b-nav-item href="/danh_sach_so_do" active>Danh sách phả đồ</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- Jointrang sơ đồ -->
            <b-button v-if="joinTree && actionJoin !== 1" class="mr-3" pill variant="light" style="border: none"
              :disabled="actionJoin === 0" @click="requestJoin">
              <strong v-if="actionJoin === -1">Tham gia</strong>
              <strong v-else-if="actionJoin === 0">Đã yêu cầu</strong>
            </b-button>

            <!-- Search của trang sơ đồ -->
            <b-button v-if="showSearch" v-b-modal.search-info class="mr-3" pill variant="outline-light"
              style="border: none">
              <strong>Tìm kiếm</strong>
            </b-button>

            <!-- lịch sử -->
            <b-button v-if="showSearch && actionJoin === 1" class="mr-3" pill variant="outline-light"
              style="border: none">
              <a class="ls" :href="'/lich_su_chinh_sua?treeId=' + treeId" style="">
                <strong>Lịch sử</strong>
              </a>
            </b-button>

            <!-- Chia sẻ sơ đồ trang sơ đồ -->
            <b-button v-if="showSearch && actionJoin === 1" v-b-modal.share-box pill variant="outline-info" class="mr-3"
              style="border: none; color: #fff">
              <strong>Chia sẻ</strong>
            </b-button>

            <!-- Danh sách ngươi dùng -->
            <b-button v-if="showSearch" v-b-modal.control-user pill variant="outline-primary"
              style="border: none; color: #fff">
              <strong>QL người dùng</strong>
            </b-button>

            <!-- Đăng nhập đăng kí của trang account -->
            <router-link v-if="showSignIn" to="/account/dang_nhap" class="btn btn-primary">Đăng nhập</router-link>
            <router-link v-if="showRegister" to="/account/dang_ki" class="btn btn-primary">Đăng kí</router-link>

            <!-- Thông báo trên các trang đã đăng nhập -->
            <b-dropdown v-if="showNotifi" right no-caret class="btn mx-4" style="padding: 0 !important; border: none">
              <template #button-content>
                <bell-header />
              </template>

              <notification-card class="px-4" style="max-width: 360px; min-width: 360px" />
            </b-dropdown>

            <!-- Đăng xuất -->
            <b-nav-item-dropdown v-if="showHeader" right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <strong>{{ userInfo.fullName }}</strong>
              </template>
              <b-dropdown-item @click="signOut">Đăng xuất</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <b-modal id="search-info" centered hide-footer size="lg" title="Tìm kiếm người thân">
        <search-person />
      </b-modal>
      <b-modal id="share-box" hide-footer title="Chia sẻ thông tin">
        <share-box />
      </b-modal>
      <b-modal id="control-user" hide-footer title="Quản lý thông tin người dùng">
        <list-tree-user />
      </b-modal>
    </header>
  </div>
</template>

<script>
import ListTreeUser from './listTreeUser.vue'
import BellHeader from './notificationBell/bellHeader.vue'
import NotificationCard from './notificationBell/notificationCard.vue'
import searchPerson from './searchPerson.vue'
import ShareBox from './shareBox.vue'
export default {
  components: {
    searchPerson,
    BellHeader,
    NotificationCard,
    ShareBox,
    ListTreeUser,
  },

  data() {
    return {
      userInfo: {
        fullName: '',
      },

      actionJoin: 0,

      treeId: '',
    }
  },

  computed: {
    showHeader() {
      // Điều kiện để hiển thị headerLayout
      return !(
        this.$route.path === '/account/dang_nhap' ||
        this.$route.path === '/account/dang_ki' ||
        this.$route.path === '/account/xac_nhan_otp' ||
        this.$route.path === '/account/quen_mat_khau' ||
        this.$route.path === '/trang_chao_mung'
      )
    },

    showSignIn() {
      // Điều kiện để hiển thị button đăng nhập
      return (
        this.$route.path === '/account/dang_ki' ||
        this.$route.path === '/trang_chao_mung'
      )
    },

    showRegister() {
      // Điều kiện để hiển thị button đăng nhập
      return this.$route.path === '/account/dang_nhap'
    },

    showSearch() {
      // Điều kiện để hiển thị button Search
      return this.$route.path === '/so_do_cay'
    },

    joinTree() {
      return this.$route.path === '/so_do_cay'
    },

    showNotifi() {
      // Điều kiện để hiển thị thông báo
      return !(
        this.$route.path === '/account/dang_nhap' ||
        this.$route.path === '/account/dang_ki' ||
        this.$route.path === '/account/quen_mat_khau' ||
        this.$route.path === '/account/xac_nhan_otp' ||
        this.$route.path === '/trang_chao_mung'
      )
    },
  },

  created() {
    this.treeId = this.$route.query.id
  },

  mounted() {
    if (localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    }
    this.getJoinTree()
  },

  methods: {
    signOut() {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        // Nếu tồn tại access token, thực hiện đăng xuất với access token đó
        this.signOutWithToken(accessToken)
      } else {
        // Nếu không tồn tại access token, xử lý đăng xuất thông thường
        this.$router.push('/account/dang_nhap') // Chuyển hướng về trang đăng nhập
      }
    },

    async signOutWithToken(token) {
      try {
        // Gửi yêu cầu GET đến API để thực hiện sign out và truyền accessToken vào
        await this.$axios.$get('http://localhost:8080/sign-out', {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi access token trong header Authorization
          },
        })

        // Xóa thông tin người dùng đã lưu trong localStorage hoặc Vuex (nếu cần)
        localStorage.removeItem('userInfo')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('centerId')
        localStorage.removeItem('side')

        // Chuyển hướng người dùng về trang đăng nhập hoặc trang chủ (tuỳ vào luồng của bạn)
        this.$router.push('/trang_chao_mung') // Điều hướng về trang đăng nhập

        // eslint-disable-next-line no-console
        console.log('Đã đăng xuất thành công!')
      } catch (error) {
        if (error.response && error.response.status === 500) {
          // Nếu lỗi trả về là Unauthorized (401), có thể là access token hết hạn
          // Tiến hành gửi refreshToken để lấy lại access token mới
          try {
            const response = await this.$axios.$get(
              'http://localhost:8080/verifyRefreshToken',
              {
                refreshToken: localStorage.getItem('refreshToken'),
              }
            )

            // Lưu trữ access token mới vào localStorage
            localStorage.setItem('accessToken', response.accessToken)

            // Thực hiện đăng xuất lại sử dụng access token mới
            this.signOutWithToken(response.accessToken)
          } catch (refreshError) {
            // Xử lý lỗi khi lấy lại access token mới
            // eslint-disable-next-line no-console
            console.error('Lỗi khi lấy lại access token mới:', refreshError)
          }
        } else {
          // Xử lý lỗi nếu không phải là lỗi hết hạn access token
          // eslint-disable-next-line no-console
          console.error('Lỗi khi đăng xuất:', error)
        }
      }
    },

    async getJoinTree() {
      let join = ''

      // eslint-disable-next-line no-console
      console.log('path: ', window.location.pathname)

      if (window.location.pathname === '/so_do_cay') {
        if (
          this.$route.query.id !== null &&
          this.$route.query.id !== undefined
        ) {
          join = await this.$axios.get(
            'http://localhost:8080/checkStatusUser?fid=' + this.$route.query.id
          )
        }

        if (
          this.$route.query.code !== null &&
          this.$route.query.code !== undefined
        ) {
          join = await this.$axios.get(
            'http://localhost:8080/getFamilyIdByCode?code=' +
            this.$route.query.code
          )
        }
        // eslint-disable-next-line no-console
        console.log('join: ', join)

        this.actionJoin = join.data.UserStatus ? join.data.UserStatus : 0
      }
    },

    async requestJoin() {
      const action = await this.$axios.post(
        'http://localhost:8080/linkSharing?code=' + this.$route.query.code
      )

      window.location.reload()
      // eslint-disable-next-line no-console
      console.log('action: ', action)
    },
  },
}
</script>

<style scoped>
.ls {
  text-decoration: none;
  color: #fff;
}

.ls:hover {
  color: #000;
}
</style>
