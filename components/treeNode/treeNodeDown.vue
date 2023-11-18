<template>
    <div class="tree">
      <ul>
        <li
          v-for="item in filteredData(null)"
          :key="item.id"
          :data-id="item.id"
          class="mb-5"
        >
          <div class="mx-4 tag">
            <div
              v-if="areSpouses(item.spouseId)"
              class="d-flex justify-content-around person_box"
            >
              <div
                v-for="spouse in filteredSpouses(item.spouseId)"
                :key="spouse.id"
                :data-id="spouse.id"
                class="person_tag"
              >
                <man-card-person
                  v-if="spouse.genre === 'male'"
                  :item="spouse"
                  :data="data"
                  class="maleCard btn"
                  @click="openSidebar(spouse.id)"
                />
   
   
                <woman-card-person
                  v-if="spouse.genre === 'female'"
                  class="womanCard btn"
                  :item="spouse"
                  :data="data"
                  @click="openSidebar(spouse.id)"
                />
              </div>
            </div>
          </div>
          <ul v-if="itemHasChildren(item.spouseId)">
            <li
              v-for="child in filteredData(item.spouseId)"
              :key="child.id"
              :data-id="child.id"
            >
              <div class="mx-4 tag">
                <div
                  v-if="areSpouses(child.spouseId)"
                  class="d-flex justify-content-around"
                >
                  <div
                    v-for="spouse in filteredSpouses(child.spouseId)"
                    :key="spouse.id"
                    :data-id="spouse.id"
                  >
                    <man-card-person
                      v-if="spouse.genre === 'male'"
                      :item="spouse"
                      :data="data"
                      class="maleCard btn"
                    />
                    <woman-card-person
                      v-if="spouse.genre === 'female'"
                      class="womanCard btn"
                      :item="spouse"
                      :data="data"
                    />
                  </div>
                </div>
              </div>
              <ul v-if="itemHasChildren(child.spouseId)">
                <li
                  v-for="grandchild in filteredData(child.spouseId)"
                  :key="grandchild.id"
                  :data-id="grandchild.id"
                >
                  <div class="mx-4 tag">
                    <div
                      v-if="areSpouses(grandchild.spouseId)"
                      class="d-flex justify-content-around"
                    >
                      <div
                        v-for="spouse in filteredSpouses(grandchild.spouseId)"
                        :key="spouse.id"
                        :data-id="spouse.id"
                      >
                        <man-card-person
                          v-if="spouse.genre === 'male'"
                          :item="spouse"
                          :data="data"
                          class="maleCard btn"
                        />
                        <woman-card-person
                          v-if="spouse.genre === 'female'"
                          class="womanCard btn"
                          :item="spouse"
                          :data="data"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- Lặp lại quá trình cho các cấp con khác -->
                  <ul v-if="itemHasChildren(grandchild.spouseId)">
                    <li
                      v-for="greatGrandchild in filteredData(grandchild.spouseId)"
                      :key="greatGrandchild.id"
                      :data-id="greatGrandchild.id"
                    >
                      <div class="mx-4 tag">
                        <div
                          v-if="areSpouses(greatGrandchild.spouseId)"
                          class="d-flex justify-content-around"
                        >
                          <div
                            v-for="spouse in filteredSpouses(
                              greatGrandchild.spouseId
                            )"
                            :key="spouse.id"
                            :data-id="spouse.id"
                          >
                            <man-card-person
                              v-if="spouse.genre === 'male'"
                              :item="spouse"
                              :data="data"
                              class="maleCard btn"
                            />
                            <woman-card-person
                              v-if="spouse.genre === 'female'"
                              class="womanCard btn"
                              :item="spouse"
                              :data="data"
                            />
                          </div>
                        </div>
                      </div>
                      <!-- Lặp lại quá trình cho các cấp con khác -->
                      <ul v-if="itemHasChildren(greatGrandchild.spouseId)">
                        <li
                          v-for="greatGreatGrandChild in filteredData(
                            greatGrandchild.spouseId
                          )"
                          :key="greatGreatGrandChild.id"
                          :data-id="greatGreatGrandChild"
                        >
                          <div class="mx-4 tag">
                            <div
                              v-if="areSpouses(greatGreatGrandChild.spouseId)"
                              class="d-flex justify-content-around"
                            >
                              <div
                                v-for="spouse in filteredSpouses(
                                  greatGreatGrandChild.spouseId
                                )"
                                :key="spouse.id"
                                :data-id="spouse.id"
                              >
                                <man-card-person
                                  v-if="spouse.genre === 'male'"
                                  :item="spouse"
                                  :data="data"
                                  class="maleCard btn"
                                />
                                <woman-card-person
                                  v-if="spouse.genre === 'female'"
                                  class="womanCard btn"
                                  :item="spouse"
                                  :data="data"
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
   </template>
   
   
   <script>
   import manCardPerson from '../cardPerson/manCardPerson.vue'
   import womanCardPerson from '../cardPerson/womanCardPerson.vue'
   export default {
    components: { manCardPerson, womanCardPerson },
    data() {
      return {
        data: [
          { id: 1, parentId: 101, spouseId: 100, name: 'A', genre: 'male' },
          { id: 2, parentId: 109, spouseId: 101, name: 'Bố A', genre: 'male' },
          {
            id: 3,
            parentId: null,
            spouseId: 101,
            name: 'Mẹ A',
            genre: 'female',
          },
          {
            id: 4,
            parentId: null,
            spouseId: 100,
            name: 'Vợ A',
            genre: 'female',
          },
          { id: 5, parentId: 101, spouseId: 104, name: 'Anh A', genre: 'male' },
          {
            id: 11,
            parentId: null,
            spouseId: 105,
            name: 'Chồng chị A',
            genre: 'male',
          },
          {
            id: 6,
            parentId: 101,
            spouseId: 105,
            name: 'Chị A',
            genre: 'female',
          },
   
   
          { id: 7, parentId: 101, spouseId: 106, name: 'Em A', genre: 'male' },
          { id: 8, parentId: 100, spouseId: 107, name: 'Con A', genre: 'male' },
          // { id: 12, parentId: 1, spouseId: 107, name: 'Vo Con A', genre: 'female' },
          {
            id: 9,
            parentId: 107,
            spouseId: 108,
            name: 'Cháu A',
            genre: 'female',
          },
          {
            id: 10,
            parentId: null,
            spouseId: 109,
            name: 'Ông nội A',
            genre: 'male',
          },
        ],
        randomNullParentId: null,
      }
    },
    computed: {
      filteredData() {
        return (parentId) => {
          return this.data.filter((item) => item.parentId === parentId)
        }
      },
      filteredSpouses() {
        return (spouseId) => {
          return this.data.filter((item) => item.spouseId === spouseId)
        }
      },
    },
    methods: {
      itemHasChildren(itemId) {
        return this.data.some((item) => item.parentId === itemId)
      },
      areSpouses(spouseId) {
        return this.data.some((item) => item.spouseId === spouseId)
      },
   
   
      openSidebar(personId) {
        // Kích hoạt sự kiện mở sidebar với id của người
        this.$bvModal.show('personInfo')
   
   
        // Truyền thông tin người vào sidebar thông qua EventBus hoặc prop tùy thuộc vào cách bạn tổ chức dự án
        // this.$root.$emit('openSidebar', personId);
        // hoặc
        // this.$store.commit('setSelectedPerson', personId);
      },
    },
   }
   </script>
   
   
   <style scoped>
   .tree {
    font-family: Arial, sans-serif;
   }
   
   
   .tree ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    padding-top: 20px;
    position: relative;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
   }
   
   
   .tree li {
    float: left;
    text-align: center;
    list-style-type: none;
    position: relative;
    padding: 20px 5px 0 5px;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
   }
   
   
   .tree li::before,
   .tree li::after {
    content: '';
    position: absolute;
    top: 0;
    right: 50%;
    border-top: 2px solid #999;
    width: 50%;
    height: 20px;
   }
   .tree li::after {
    right: auto;
    left: 50%;
    border-left: 2px solid #999;
   }
   
   
   .tree li:only-child::after,
   .tree li:only-child::before {
    display: none;
   }
   
   
   .tree li:only-child {
    padding-top: 0;
   }
   
   
   .tree li:first-child::before,
   .tree li:last-child::after {
    border: 0 none;
   }
   .tree li:last-child::before {
    border-right: 2px solid #999;
    border-radius: 0 5px 0 0;
    -webkit-border-radius: 0 5px 0 0;
    -moz-border-radius: 0 5px 0 0;
   }
   .tree li:first-child::after {
    border-radius: 5px 0 0 0;
    -webkit-border-radius: 5px 0 0 0;
    -moz-border-radius: 5px 0 0 0;
   }
   
   
   .tree ul ul::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    border-left: 2px solid #999;
    width: 0;
    height: 20px;
   }
   
   
   .tree li .tag {
    text-decoration: none;
    color: #666;
    font-family: Arial, Verdana, Tahoma;
    font-size: 11px;
    display: inline-block;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
   }
   
   
   .tree li .tag:hover,
   .tree li .tag:hover + ul li a {
    background: #e9f1f7;
    color: #000;
   }
   
   
   .tree li .tag:hover + ul li::after,
   .tree li .tag:hover + ul li::before,
   .tree li .tag:hover + ul::before,
   .tree li .tag:hover + ul ul::before {
    border-color: #121418;
   }
   
   
   .group-spouse {
    margin-left: 130px;
   }
   
   
   .maleCard,
   .womanCard {
    padding: 0 !important;
   }
   
   
   
   
   /*
   .no-spouse {
    margin-left: 0;
   } */
   </style>