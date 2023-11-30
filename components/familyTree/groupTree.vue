<template>
  <div class="group">
    <div
      class="person male"
      :data-person-id="infoPersonFamily[personId].data.id"
      :data-spouseids-id="infoPersonFamily[personId].data.spouseIds"
    >
      {{ infoPersonFamily[personId].data.info.name }}
    </div>
    <div
      v-for="id in infoPersonFamily[personId].spousePersonIds"
      :key="infoPersonFamily[id].data.id"
      class="person female"
      :data-spouseids-id="infoPersonFamily[personId].data.spouseIds"
    >
      {{ infoPersonFamily[id].data.info.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infoPersonFamily: {
        type: Object,
        default: () => ({}),
    },
    personId: {
      type: Number,
      default: null,
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log({personId: this.personId, person: this.infoPersonFamily[this.personId]})
  }
}
</script>
<style scoped>
.group {
  display: inline-flex;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

.person {
  width: 200px;
  height: 350px;
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
