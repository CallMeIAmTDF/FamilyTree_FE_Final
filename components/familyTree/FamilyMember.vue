<template>
  <li v-if="member" class="item">
    <group-tree
      :info-person-family="infoPersonFamily"
      :person-id="member.data.data?.id ? member.data.data.id : member.data.id"
      :action-join="actionJoin"
      :first-id="firstId"
    />
    <ul v-if="member.childrens && member.childrens.length">
        <family-member
          v-for="child in member.childrens"
          :key="child.data.data?.id ? child.data.data.id : child.data.id"
          :member="child"
          :info-person-family="infoPersonFamily"
          :action-join="actionJoin"
          :first-id="firstId"
        />
    </ul>
  </li>
</template>
<script>
import groupTree from './groupTree.vue'
export default {
  components: { groupTree },
  props: {
    member: {
      type: Object,
      required: true,
    },

    infoPersonFamily: {
      type: Object,
      required: true,
    },

    actionJoin: {
      type: Number,
      required: true,
    },

    firstId: {
      type: Number,
      default: 0
    }
},
mounted() {
    // eslint-disable-next-line no-console
    // console.log({member: this.member.data.data?.id ? this.member.data.data.id : this.member})
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
</style>