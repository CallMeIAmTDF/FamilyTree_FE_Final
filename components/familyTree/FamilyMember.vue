<template>
  <li v-if="member" class="item">
    <div
      class="group"
      :style="
        getGroupStyle(
          member.data.data?.id ? member.data.data.id : member.data.id
        )
      "
    >
      <div
        v-if="
          infoPersonFamily[
            member.data.data?.id ? member.data.data.id : member.data.id
          ].data.info.gender === 'Male'
        "
        class="d-flex"
      >
        <man-card-person
          v-b-toggle="
            'person-sidebar-' +
            infoPersonFamily[
              member.data.data?.id ? member.data.data.id : member.data.id
            ].data.id
          "
          class="person"
          :data-person-id="
            infoPersonFamily[
              member.data.data?.id ? member.data.data.id : member.data.id
            ].data.id
          "
          :data-spouseids-id="
            infoPersonFamily[
              member.data.data?.id ? member.data.data.id : member.data.id
            ].data.spouseIds
          "
          :person="
            infoPersonFamily[
              member.data.data?.id ? member.data.data.id : member.data.id
            ].data.info
          "
          :person-id="
            infoPersonFamily[
              member.data.data?.id ? member.data.data.id : member.data.id
            ].data.id
          "
        />
        <woman-card-person
          v-for="id in infoPersonFamily[
            member.data.data?.id ? member.data.data.id : member.data.id
          ].spousePersonIds"
          :key="infoPersonFamily[id].data.id"
          v-b-toggle="'person-sidebar-' + infoPersonFamily[id].data.id"
          class="person"
          :data-spouseids-id="
            infoPersonFamily[
              member.data.data?.id ? member.data.data.id : member.data.id
            ].data.spouseIds
          "
          :person-id="infoPersonFamily[id].data.id"
          :person="infoPersonFamily[id].data.info"
        />
      </div>

      <div
        v-if="
          infoPersonFamily[
            member.data.data?.id ? member.data.data.id : member.data.id
          ].data.info.gender === 'Female'
        "
        class="d-flex"
      >
        <man-card-person
          v-for="id in infoPersonFamily[
            member.data.data?.id ? member.data.data.id : member.data.id
          ].spousePersonIds"
          :key="infoPersonFamily[id].data.id"
          v-b-toggle="'person-sidebar-' + infoPersonFamily[id].data.id"
          class="person"
          :data-person-id="
            infoPersonFamily[
              member.data.data?.id ? member.data.data.id : member.data.id
            ].data.id
          "
          :data-spouseids-id="
            infoPersonFamily[
              member.data.data?.id ? member.data.data.id : member.data.id
            ].data.spouseIds
          "
          :person="infoPersonFamily[id].data.info"
          :person-id="infoPersonFamily[id].data.id"
        />
        <woman-card-person
          v-b-toggle="
            'person-sidebar-' +
            infoPersonFamily[
              member.data.data?.id ? member.data.data.id : member.data.id
            ].data.id
          "
          class="person"
          :data-spouseids-id="
            infoPersonFamily[
              member.data.data?.id ? member.data.data.id : member.data.id
            ].data.spouseIds
          "
          :person-id="
            infoPersonFamily[
              member.data.data?.id ? member.data.data.id : member.data.id
            ].data.id
          "
          :person="
            infoPersonFamily[
              member.data.data?.id ? member.data.data.id : member.data.id
            ].data.info
          "
        />
      </div>

      <b-sidebar
        :id="
          infoPersonFamily[
            member.data.data?.id ? member.data.data.id : member.data.id
          ].data.id
            ? 'person-sidebar-' +
              infoPersonFamily[
                member.data.data?.id ? member.data.data.id : member.data.id
              ].data.id
            : 'person-sidebar-' + infoPersonFamily[id].data.id
        "
        right
        shadow
      >
        <sidebar-person
          :personid="
            infoPersonFamily[
              member.data.data?.id ? member.data.data.id : member.data.id
            ].data.id
              ? infoPersonFamily[
                  member.data.data?.id ? member.data.data.id : member.data.id
                ].data.id
              : infoPersonFamily[id].data.id
          "
        />
      </b-sidebar>
    </div>

    <ul v-if="member.childrens && member.childrens.length">
      <family-member
        v-for="child in member.childrens"
        :key="child.data.data?.id ? child.data.data.id : child.data.id"
        :member="child"
        :info-person-family="infoPersonFamily"
      />
    </ul>
  </li>
</template>

<script>
import manCardPerson from '../cardPerson/manCardPerson.vue'
import WomanCardPerson from '../cardPerson/womanCardPerson.vue'
import SidebarPerson from '../sidebarPerson.vue'
export default {
  components: { manCardPerson, WomanCardPerson, SidebarPerson },
  props: {
    member: {
      type: Object,
      required: true,
    },
    infoPersonFamily: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    // eslint-disable-next-line no-console
    // console.log({member: this.member.data.data?.id ? this.member.data.data.id : this.member})
  },

  methods: {
    getGroupStyle(personId) {
      let style = ''
      const person = this.infoPersonFamily[personId]

      if (person.spousePersonIds.length > 0) {
        const px = 138 * person.spousePersonIds.length
        if (person.data.info.gender === 'Male') {
          style = `padding-left: ${px}px;`
        } else {
          style = `padding-right: ${px}px;`
        }
      }

      return style
    },
  },
}
</script>

<style scoped>
.tree ul {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 100px;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

.tree li {
  float: left;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 100px 5px 0 5px;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

/*We will use ::before and ::after to draw the connectors*/

.tree li::before,
.tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 2px solid black;
  width: 50%;
  height: 100px;
}

.tree li::after {
  right: auto;
  left: 50%;
  border-left: 2px solid black;
}

/*We need to remove left-right connectors from elements without 
any siblings*/
.tree li:only-child::after,
.tree li:only-child::before {
  display: none;
}

/*Remove space from the top of single children*/
.tree li:only-child {
  padding-top: 0;
}

/*Remove left connector from first child and 
right connector from last child*/
.tree li:first-child::before,
.tree li:last-child::after {
  border: 0 none;
}

/*Adding back the vertical connector to the last nodes*/
.tree li:last-child::before {
  border-right: 2px solid black;
  border-radius: 0 5px 0 0;
  -webkit-border-radius: 0 5px 0 0;
  -moz-border-radius: 0 5px 0 0;
}

.tree li:first-child::after {
  border-radius: 5px 0 0 0;
  -webkit-border-radius: 5px 0 0 0;
  -moz-border-radius: 5px 0 0 0;
}

/*Time to add downward connectors from parents*/
.tree ul ul::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 2px solid black;
  width: 0;
  height: 100px;
}
.item ~ .item {
  padding-left: 36px;
}

.group {
  display: inline-flex;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

.person {
  border-radius: 4px;

  font-size: 48px;
  font-weight: bold;
  text-align: center;
}

.person:hover {
  background-color: yellow !important;
}

.person ~ .person {
  margin-left: 4px;
}

.person.male {
  border: 2px solid blue;
  color: blue;
  background-color: #0000ff45;
}

.person.female {
  border: 2px solid red;
  color: red;
  background: #ff000036;
}
</style>
