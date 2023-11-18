<template>
    <div>
      <div class="box male">
        <div class="person">
          <div class="avatar">
            <svg
              class="iconCss_i1b8s8h6"
              role="img"
              viewBox="0 0 24 24"
              width="88"
              height="88"
              fill="currentColor"
            >
              <path
                class="avatarBgCss_a1kg80op"
                fill="#a6eefa"
                d="M0 0h24v24H0z"
              ></path>
              <path
                class="avatarHairCss_a1p46hu9"
                d="M7.73 11.07S7.11 9.44 7 9.18 7.07 8 7 7.85s-.2-2.85.73-3.7a6.48 6.48 0 011.49-1s0-.34.9-.34.12-.55 1.53-.33a16.13 16.13 0 001.68.23h.31s1.13.44 1.06.92 1.13 0 1.13 0v.27s1 0 1 2.59-.19 3.33-.47 3.47a2.23 2.23 0 00-.59.67s-2.77 1.94-8.04.44z"
                fill="#003057"
              ></path>
              <path
                class="avatarFaceCss_a13ovmoh"
                d="M15.56 17.59c-.35-.26-.38-2.91-.38-2.91a1.38 1.38 0 00.34-.72 2.34 2.34 0 01.36-1.26.57.57 0 00.39-.18c.15-.19.19-1.37.31-1.71s.19-.89-.2-.85-.58.67-.58.67a5.12 5.12 0 00-.16-1.7c-.23-.67.2-2.15-.74-2.71A3.55 3.55 0 0012.19 6a5.05 5.05 0 01-2.53-.19c-.75-.26-1.37 1-1.49 1.52a25.44 25.44 0 00-.47 3.25V11s-.27-1.19-.51-1.26-.66-.07-.58.81.17.2.51 1.86c.18 1 .53.22.53.22a4.33 4.33 0 001 2.54v1.38a1.8 1.8 0 01-1.3 1.78c4.33 4.62 9.91.15 9.91.15s-1.49-.74-1.7-.89z"
                fill="#0181a1"
              ></path>
              <path
                class="avatarShadowCss_a47si0s"
                d="M15.18 14.68a11.17 11.17 0 01-1.85 1.72 3.4 3.4 0 01-3.64-.22 4.31 4.31 0 01-1.06-.94V16c2.12 2.91 5.4 1.63 7 1.6-.43-.27-.45-2.92-.45-2.92z"
                fill="#007694"
              ></path>
              <path
                class="avatarShirtCss_a17p2za8"
                d="M21.34 24a5.73 5.73 0 00.66-2.75c0-2.13-6.07-3.5-6.07-3.5l-.14.23s-.71 1.57-4 1.57a4.56 4.56 0 01-3.57-1.73C7.44 18 2 19 2 21.27A5.89 5.89 0 002.64 24z"
                fill="#01496e"
              ></path>
            </svg>
          </div>
          <div class="infor">
            <div class="person-name mt-2">
              <h6 style="font-size: 12px; color: #202121; margin-bottom: 0">
                {{ item.name }}
              </h6>
            </div>
            <div class="status mt-3">
              <span style="color: #999; font-size: 10px">Còn sống</span>
            </div>
            <div class="identify mt-3">
              <span style="color: #000; font-size: 10px">
                <button>ABC-yeuem</button>
              </span>
            </div>
          </div>
        </div>
        <div class="add btn">
          <b-dropdown
            dropright
            class="add-icon icon-plus"
            no-caret
            variant="#202121"
          >
            <b-dropdown-item  @click="openModalParent">{{
              getParentDropdownItemTitle()
            }}</b-dropdown-item>
            <b-dropdown-item @click="openModalSpouse">Thêm vợ</b-dropdown-item>
            <b-dropdown-item :disabled="isHasParent" @click="openModalSibling"
              >Thêm anh/chị/em</b-dropdown-item
            >
            <b-dropdown-item @click="openModalChild"
              >Thêm con cái</b-dropdown-item
            >
          </b-dropdown>
        </div>
      </div>
      <b-modal
        v-model="modalVisibleParent"
        :title="getParentModalTitle()"
        :person="item"
        hide-footer
        class="modal_add"
        size="lg"
        centered
      >
        <form-infor-parent :item="item" />
      </b-modal>
      <b-modal
        v-model="modalVisibleSpouse"
        :title="
          item.genre === 'male'
            ? 'Thêm vợ của ' + item.name
            : 'Thêm chồng của' + item.name
        "
        hide-footer
        class="modal_add"
        size="lg"
        centered
      >
        <form-infor-spouse :item="item" />
      </b-modal>
      <b-modal
        v-model="modalVisibleSibling"
        :title="'Thêm anh/chị/em của ' + item.name"
        hide-footer
        class="modal_add"
        size="lg"
        centered
      >
        <form-infor-sibling :item="item" />
      </b-modal>
      <b-modal
        v-model="modalVisibleChild"
        :title="'Thêm con cái của ' + item.name"
        hide-footer
        class="modal_add"
        size="lg"
        centered
      >
        <form-infor-child :item="item" />
      </b-modal>
    </div>
   </template>
   
   
   <script>
   import formInforParent from '../form_add/form_add_parent/formInfor.vue'
   import formInforSpouse from '../form_add/form_add_spouse/formInfor.vue'
   import formInforSibling from '../form_add/form_add_sibling/formInfor.vue'
   import formInforChild from '../form_add/form_add_child/formInfor.vue'
   export default {
    components: {
      formInforParent,
      formInforSpouse,
      formInforSibling,
      formInforChild,
    },
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
      data: {
        type: Array,
        default: () => [],
      },
    },
   
   
    data() {
      return {
        modalVisibleParent: false,
        modalVisibleSpouse: false,
        modalVisibleSibling: false,
        modalVisibleChild: false,
      }
    },
    computed: {
      isHasParent() {
        return !this.data.some((person) => person.spouseId === this.item.parentId)
      },
    },
    methods: {
      openModalParent() {
        // eslint-disable-next-line no-console
        console.log('Item from prop:', this.item)
        this.modalVisibleParent = true
      },
      openModalSpouse() {
        // eslint-disable-next-line no-console
        console.log('Item from prop:', this.item)
        this.modalVisibleSpouse = true
      },
      openModalSibling() {
        // eslint-disable-next-line no-console
        console.log('Item from prop:', this.item)
        this.modalVisibleSibling = true
      },
      openModalChild() {
        // eslint-disable-next-line no-console
        console.log('Item from prop:', this.item)
        this.modalVisibleChild = true
      },
   
   
      // hiển thị thêm bố hoặc mẹ hoạc thêm bố mẹ
      getParentModalTitle() {
        const matchingSpouses = this.data.filter(
          (person) => person.spouseId === this.item.parentId
        )
   
   
        if (matchingSpouses.length === 1) {
          const matchingSpouse = matchingSpouses[0]
          if (matchingSpouse.genre === 'male') {
            return 'Thêm mẹ của ' + this.item.name
          } else if (matchingSpouse.genre === 'female') {
            return 'Thêm bố của ' + this.item.name
          }
        }
   
   
        return 'Thêm bố/mẹ của ' + this.item.name
      },
   
   
      getParentDropdownItemTitle() {
        const matchingSpouses = this.data.filter(
          (person) => person.spouseId === this.item.parentId
        )
   
   
        if (matchingSpouses.length === 1) {
          const matchingSpouse = matchingSpouses[0]
          if (matchingSpouse.genre === 'male') {
            return 'Thêm mẹ'
          } else if (matchingSpouse.genre === 'female') {
            return 'Thêm bố'
          }
        }
   
   
        return 'Thêm bố/mẹ'
      },
    },
   }
   </script>
   
   
   <style scoped>
   .box {
    position: relative;
    padding: 20px 10px;
    height: 220px;
    width: 130px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
   }
   .male {
    border-top: 4px solid #1898b8;
   }
   .female {
    border-top: 4px solid #d7406d;
   }
   
   
   .person {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
   }
   
   
   .avatar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
   }
   
   
   .avatar > svg {
    height: 70px;
    width: 70px;
    border-radius: 500px;
   }
   
   
   .infor {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
   }
   
   
   .infor > .identify {
    padding: 2px;
    width: 100%;
    text-align: center;
   }
   
   
   .infor > .identify > span > button {
    border: none;
    padding: 2px 4px;
    border-radius: 8px;
    background-color: #fff;
   }
   
   
   .infor > .identify > span > button:hover {
    background-color: #e1dcdc;
   }
   
   
   /* .box > .add {
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
   } */
   
   
   .male > .add > .add-icon {
    position: absolute;
    top: 0;
    right: 0;
    color: #1898b8;
    border-radius: 100%;
    padding: 8px 4px;
   }
   .female > .add > .add-icon {
    color: #d7406d;
    border-radius: 100%;
    padding: 8px 4px;
   }
   
   
   .male > .add > .add-icon:hover {
    background-color: rgba(0, 177, 218, 0.294);
   }
   .female > .add > .add-icon:hover {
    background-color: #eac5d0;
   }
   
   
   .icon-plus::before {
    content: '+';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 4px;
    font-size: 30px;
   }
   
   
   .male:hover {
    background: #e9f1f7;
   }
   </style>