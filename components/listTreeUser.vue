<template>
  <div>
    <nav>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'admin' }"
            @click="activeTab = 'admin'"
            >DS Quản trị</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'pending' }"
            @click="activeTab = 'pending'"
            >DS Chờ Phê Duyệt</a
          >
        </li>
      </ul>
    </nav>

    <div class="wrapper">
      <div
        v-for="item in activeTab === 'admin'
          ? filteredAdminUsers
          : filteredPendingUsers"
        :key="item.id"
        class="person row d-flex align-items-center"
      >
        <div class="py-1 px-3 col-md-8">
          <h5 class="name">{{ item.name }}</h5>
          <span v-if="item.roleId === 3" style="color: #333">Chủ sơ đồ</span>
          <span v-else-if="item.roleId === 2" style="color: #333"
            >Quản trị viên</span
          >
          <span v-else style="color: #333">Người dùng</span> <br />
          <i class="age" style="color: #999">{{ item.email }}</i>
        </div>

        <div
          v-if="activeTab === 'admin' && canViewActions(item.roleId)"
          class="col-md-4 d-flex justify-content-end"
        >
          <b-dropdown variant="light" class="dropdown-right" dropright no-caret>
            <template #button-content>
              <svg
                data-v-41be6633=""
                viewBox="0 0 16 16"
                width="1em"
                height="1em"
                focusable="false"
                role="img"
                aria-label="three dots vertical"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi-three-dots-vertical mx-auto b-icon bi"
              >
                <g data-v-41be6633="">
                  <path
                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                  ></path>
                </g>
              </svg>
            </template>
            <b-dropdown-item
              v-for="action in ['upRole', 'downRole', 'kick']"
              :key="action"
              :value="action"
              @click="performAction(item.id, action)"
            >
              <!-- Hiển thị tên hành động tương ứng -->
              <div v-if="item.roleId === 1">
                <template v-if="action === 'upRole' && currentUserRoleId === 3">
                  Cấp quyền quản trị
                </template>
                <template v-else-if="action === 'kick'">
                  Xóa khỏi sơ đồ
                </template>
              </div>
              <div v-else>
                <template
                  v-if="action === 'downRole' && currentUserRoleId === 3"
                >
                  Xoá quyền quản trị sơ đồ
                </template>
                <template v-else-if="action === 'kick'">
                  Xóa khỏi sơ đồ
                </template>
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <div
          v-if="activeTab === 'pending' && currentUserRoleId !== 1"
          class="col-md-4"
        >
          <div class="d-flex justify-content-center align-items-center">
            <svg
              data-v-41be6633=""
              viewBox="0 0 16 16"
              width="1em"
              height="1em"
              focusable="false"
              role="img"
              aria-label="check circle fill"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi-check-circle-fill mx-auto b-icon bi text-success"
              @click="performAction(item.id, 'accept')"
            >
              <g data-v-41be6633="">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                ></path>
              </g>
            </svg>
            <svg
              data-v-41be6633=""
              viewBox="0 0 16 16"
              width="1em"
              height="1em"
              focusable="false"
              role="img"
              aria-label="x circle"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi-x-circle mx-auto b-icon bi text-danger"
              @click="performAction(item.id, 'kick')"
            >
              <g data-v-41be6633="">
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                ></path>
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      familyTreeId: null,
      activeTab: 'admin',
      currentUserRoleId: '', // Thay đổi giá trị này tùy thuộc vào vai trò của người dùng đang đăng nhập
    }
  },

  computed: {
    filteredAdminUsers() {
      return this.users.filter((user) => user.status === true)
    },
    filteredPendingUsers() {
      return this.users.filter((user) => user.status === false)
    },
  },

  created() {
    this.familyTreeId = this.$route.query.id
    this.fetchTreeUser()
  },

  methods: {
    async fetchTreeUser() {
      try {
        const response = await this.$axios.$get(
          `http://localhost:8080/familyTree/listUser?familyTreeId=${this.familyTreeId}`
        )

        // Lấy thông tin người dùng có name là "Tôi"
        const currentUser = response.data.find((user) => user.name === 'Tôi')

        // Kiểm tra và gán roleId vào currentUserRoleId
        if (currentUser && currentUser.roleId) {
          this.currentUserRoleId = currentUser.roleId
        }

        // Sắp xếp danh sách người dùng theo roleId từ cao đến thấp
        this.users = response.data.sort((a, b) => b.roleId - a.roleId)

        this.users = response.data
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching users:', error)
      }
    },

    async performAction(userId, action) {
      try {
        const response = await this.$axios.$post(
          `http://localhost:8080/familyTree/actionUser?familyTreeId=${this.familyTreeId}&userId=${userId}&action=${action}`
        )

        // Xử lý phản hồi từ API ở đây nếu cần thiết
        // Ví dụ: cập nhật lại danh sách người dùng sau khi thực hiện hành động
        if (response.status === 'OK') {
          this.fetchTreeUser()
          // Hoặc thực hiện các hành động khác tùy theo phản hồi từ API
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error performing action:', error)
      }
    },

    canViewActions(userRoleId) {
      // Kiểm tra xem người dùng có quyền xem các hành động không
      if (this.currentUserRoleId === 3 && userRoleId === 3) {
        return false // Role: 3 không thể xem hành động
      } else if (this.currentUserRoleId === 1 && userRoleId >= 2) {
        return false // Role: 1 không thể xem hành động của Role >= 2
      } else if (this.currentUserRoleId === 2 && userRoleId === 2) {
        return false // Role: 2 không thể xem hành động của Role 2
      } else if (this.currentUserRoleId === 1 && userRoleId === 1) {
        return false // Role: 1 không thể xem hành động của Role 1
      } else if (this.currentUserRoleId === 2 && userRoleId === 3) {
        return false // Role: 2 không thể xem hành động của Role: 3
      }
      return true // Các trường hợp còn lại đều có thể xem hành động
    },
  },
}
</script>

<style scoped>
.wrapper {
  margin-top: 4px;
  padding: 2px 10px;
  border-radius: 8px;
}

.person {
  background: #efefef;
  border-radius: 8px;
  margin-bottom: 8px;
}
.dropdown-right .dropdown-toggle::after {
  /* This CSS is for placing the dropdown to the right side of the icon */
  right: 0 !important;
  left: auto !important;
}

.nav-item {
  cursor: pointer;
}

.text-success {
  color: #28a745 !important; /* Màu xanh lá cây */
  cursor: pointer;
  scale: 1.4;
}

.text-success:hover {
  scale: 1.6;
  color: #175525;
}

.text-danger {
  color: #dc3545 !important; /* Màu đỏ */
  cursor: pointer;
  scale: 1.4;
}

.text-danger:hover {
  scale: 1.6;
  color: #871e29;
}
</style>
