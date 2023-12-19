<template>
  <div class="">
    <div class="box male">
      <div class="person" @click="openModalInfoPerson">
        <div class="avatar">
          <div v-if="person.personImage != null" class="imgSrc">
            <img :src="person.personImage" alt="" />
          </div>
          <svg
            v-else
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
              {{ person.name }}
            </h6>
          </div>
          <div class="identify">
            <span style="color: #000; font-size: 14px">
              <button>{{ infoPersonFamily[personId].data.vocative }}</button>
            </span>
          </div>
        </div>
      </div>

      <div v-if="actionJoin === 1" class="add btn">
        <b-dropdown
          dropright
          class="add-icon icon-plus"
          no-caret
          variant="#202121"
        >
          <div
            v-if="
              person.parentsId === null ||
              person.fatherId === null ||
              person.motherId === null
            "
          >
            <b-dropdown-item
              v-if="person.parentsId === null"
              @click="openModalParent"
              >Thêm bố/mẹ</b-dropdown-item
            >

            <!-- Nếu có fatherId hoặc motherId thì hiển thị drop-item Thêm bố hoặc Thêm mẹ -->
            <div v-if="person.fatherId || person.motherId">
              <b-dropdown-item v-if="person.fatherId" @click="openModalMother">
                Thêm mẹ
              </b-dropdown-item>
              <b-dropdown-item v-if="person.motherId" @click="openModalFather">
                Thêm bố
              </b-dropdown-item>
            </div>
          </div>

          <b-dropdown-item @click="openModalWife">Thêm vợ</b-dropdown-item>

          <!-- Hiển thị drop-item Thêm anh/chị/em nếu parentId là null -->
          <b-dropdown-item
            id="item-sibling"
            :disabled="isParentIdNull"
            @click="openModalSibling"
          >
            Thêm anh/chị/em
          </b-dropdown-item>

          <b-dropdown-item @click="openModalChild"
            >Thêm con cái</b-dropdown-item
          >
        </b-dropdown>
      </div>

      <div
        v-if="
          (infoPersonFamily[personId].fatherId ||
            infoPersonFamily[personId].motherId) &&
          infoPersonFamily[personId].data.side != ''
        "
        class="extra-tree"
        @click="sendSideToLocal(infoPersonFamily[personId].data.side)"
      >
        <svg
          viewBox="0 0 16 16"
          width="24px"
          height="24px"
          focusable="false"
          role="img"
          aria-label="chevron up"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="bi-chevron-up mx-auto b-icon bi"
          data-v-41be6633=""
        >
          <g data-v-41be6633="">
            <path
              fill-rule="evenodd"
              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
            ></path>
          </g>
        </svg>
      </div>
    </div>
    <b-modal
      v-model="modalVisibleParent"
      :title="'Thêm bố hoặc mẹ của ' + person.name"
      hide-footer
      class="modal_add"
      size="lg"
      centered
    >
      <form-infor-parent
        :id="personId"
        :item="person"
        @personCreated="hideModal"
      />
    </b-modal>
    <b-modal
      v-model="modalVisibleFather"
      :title="'Thêm bố của ' + person.name"
      hide-footer
      class="modal_add"
      size="lg"
      centered
    >
      <form-infor-father
        :id="personId"
        :item="person"
        @personCreated="hideModal"
      />
    </b-modal>
    <b-modal
      v-model="modalVisibleMother"
      :title="'Thêm mẹ của ' + person.name"
      hide-footer
      class="modal_add"
      size="lg"
      centered
    >
      <form-infor-mother
        :id="personId"
        :item="person"
        @personCreated="hideModal"
      />
    </b-modal>
    <b-modal
      v-model="modalVisibleWife"
      :title="'Thêm vợ của ' + person.name"
      hide-footer
      class="modal_add"
      size="lg"
      centered
    >
      <form-infor-wife
        :id="personId"
        :item="person"
        @personCreated="hideModal"
      />
    </b-modal>
    <b-modal
      v-model="modalVisibleSibling"
      :title="'Thêm anh/chị/em của ' + person.name"
      hide-footer
      class="modal_add"
      size="lg"
      centered
    >
      <form-infor-sibling
        :id="personId"
        :item="person"
        @personCreated="hideModal"
      />
    </b-modal>
    <b-modal
      v-model="modalVisibleChild"
      :title="'Thêm con cái của ' + person.name"
      hide-footer
      class="modal_add"
      size="lg"
      centered
    >
      <form-infor-child
        :id="personId"
        :item="person"
        @personCreated="hideModal"
      />
    </b-modal>
    <b-modal v-model="modalVisibleInfoPerson" hide-footer>
      <sidebar-person :personid="personId" :action-join="actionJoin"/>
    </b-modal>
  </div>
</template>

<script>
import formInforParent from '../form_add/form_add_parent/formInfor.vue'
import formInforFather from '../form_add/form_add_parent/formInforFather.vue'
import formInforMother from '../form_add/form_add_parent/formInforMother.vue'
import formInforSibling from '../form_add/form_add_sibling/formInfor.vue'
import formInforChild from '../form_add/form_add_child/formInfor.vue'
import FormInforWife from '../form_add/form_add_spouse/formInforWife.vue'
import SidebarPerson from '../sidebarPerson.vue'
export default {
  components: {
    formInforParent,
    formInforFather,
    formInforMother,
    formInforSibling,
    formInforChild,
    FormInforWife,
    SidebarPerson,
  },

  props: {
    personId: {
      type: Number,
      default: null,
    },

    person: {
      type: Object,
      default: () => ({}),
    },

    infoPersonFamily: {
      type: Object,
      required: true,
    },

    actionJoin: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      modalVisibleParent: false,
      modalVisibleFather: false,
      modalVisibleMother: false,
      modalVisibleWife: false,
      modalVisibleSibling: false,
      modalVisibleChild: false,
      modalVisibleInfoPerson: false,
    }
  },

  computed: {
    isParentIdNull() {
      // Kiểm tra nếu parentId là null thì trả về true, ngược lại trả về false
      return this.person.parentsId === null
    },
  },

  methods: {
    openModalParent() {
      this.modalVisibleParent = true
    },
    openModalFather() {
      this.modalVisibleFather = true
    },
    openModalMother() {
      this.modalVisibleMother = true
    },
    openModalWife() {
      this.modalVisibleWife = true
    },
    openModalSibling() {
      this.modalVisibleSibling = true
    },
    openModalChild() {
      this.modalVisibleChild = true
    },
    openModalInfoPerson() {
      this.modalVisibleInfoPerson = true
    },

    hideModal() {
      // Sử dụng $refs để truy cập modal và ẩn nó đi
      this.modalVisibleParent = false
      this.modalVisibleFather = false
      this.modalVisibleMother = false
      this.modalVisibleWife = false
      this.modalVisibleSibling = false
      this.modalVisibleChild = false
    },

    sendSideToLocal(side) {
      localStorage.setItem('side', side)
      window.location.reload()
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

.avatar > .imgSrc {
  height: 70px;
  width: 70px;
  margin-bottom: 8px;
}

.avatar > .imgSrc > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar > svg {
  height: 70px;
  width: 70px;
  border-radius: 50%;
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

.extra-tree {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #ccc;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  cursor: pointer;
}

.extra-tree:hover {
  background: #e9f1f7;
}
</style>
