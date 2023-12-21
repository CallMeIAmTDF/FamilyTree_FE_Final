<template>
  <!-- Phần giao diện -->
  <div>
    <div class="row d-flex align-items-center mb-3">
      <h2 class="col-md-4">Các phả đồ tham gia</h2>

      <b-form-input
        v-model="filter"
        class="col-md-4"
        type="search"
        placeholder="Tìm kiếm phả đồ"
      ></b-form-input>

      <!-- Phân trang -->
      <b-pagination
        v-model="currentPage"
        :total-rows="filteredTrees.length"
        :per-page="6"
        align="center"
        size="sm"
        class="mt-3 col-md-3"
        style="margin-left: 90px"
      ></b-pagination>
    </div>
    <b-row>
      <b-col
        v-for="tree in paginatedFilteredTrees"
        :key="tree.familyTreeId"
        md="4"
        sm="6"
        class="mb-4"
      >
        <!-- Hiển thị thông tin sơ đồ -->
        <b-card
          :title="'Phả đồ: ' + tree.familyTreeName"
          img-src="http://3.bp.blogspot.com/-kT-Behs3TDI/UOwj8ukeXSI/AAAAAAAAQ5M/qvTs9xXrHHg/s1600/Gia+Pha+Hoang+Chi+Toc.jpg"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2 p-2"
        >
          <a
            :href="`/so_do_cay?id=${tree.familyTreeId}`"
            class="btn btn-primary"
            >Xem phả đồ</a
          >
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      joinedTrees: [], // Dữ liệu sơ đồ sở hữu
      currentPage: 1, // Trang hiện tại
      perPage: 6, // Số lượng sơ đồ muốn hiển thị trên mỗi trang
      filter: '', // Từ khóa tìm kiếm
    }
  },
  computed: {
    // Tính toán danh sách sơ đồ cần hiển thị dựa trên trang hiện tại và số lượng sơ đồ muốn hiển thị
    paginatedFilteredTrees() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.filteredTrees.slice(start, end)
    },
    totalTrees() {
      return this.joinedTrees.length
    },
    // Tính toán danh sách sơ đồ đã lọc dựa trên từ khóa tìm kiếm
    filteredTrees() {
      // Đảo ngược mảng joinedTrees và sau đó áp dụng filter
      return this.joinedTrees
        .slice()
        .reverse()
        .filter((tree) =>
          tree.familyTreeName.toLowerCase().includes(this.filter.toLowerCase())
        )
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // Lưu ý: Cần cập nhật dữ liệu sơ đồ sở hữu từ API hoặc nguồn dữ liệu khác
    async fetchData() {
      try {
        const response = await this.$axios.$get(
          'http://localhost:8080/familyTree/list'
        )

        this.joinedTrees = response.data.joined.sort(
          (a, b) => b.familyTreeId - a.familyTreeId
        )
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
  },
}
</script>
