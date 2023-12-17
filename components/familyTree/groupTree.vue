<template>
  <div class="group" :style="getGroupStyle(personId)">
    <div
      v-if="infoPersonFamily[personId].data.info.gender === 'Male'"
      class="d-flex"
    >
      <man-card-person
        class="person"
        :data-person-id="infoPersonFamily[personId].data.id"
        :data-spouseids-id="infoPersonFamily[personId].data.spouseIds"
        :person="infoPersonFamily[personId].data.info"
        :person-id="infoPersonFamily[personId].data.id"
        :info-person-family="infoPersonFamily"
      />
      <woman-card-person
        v-for="id in infoPersonFamily[personId].spousePersonIds"
        :key="infoPersonFamily[id].data.id"
        class="person"
        :data-spouseids-id="infoPersonFamily[personId].data.spouseIds"
        :person-id="infoPersonFamily[id].data.id"
        :person="infoPersonFamily[id].data.info"
        :info-person-family="infoPersonFamily"
      />
    </div>

    <div
      v-if="infoPersonFamily[personId].data.info.gender === 'Female'"
      class="d-flex"
    >
      <man-card-person
        v-for="id in infoPersonFamily[personId].spousePersonIds"
        :key="infoPersonFamily[id].data.id"
        class="person"
        :data-person-id="infoPersonFamily[personId].data.id"
        :data-spouseids-id="infoPersonFamily[personId].data.spouseIds"
        :person="infoPersonFamily[id].data.info"
        :person-id="infoPersonFamily[id].data.id"
        :info-person-family="infoPersonFamily"
      />
      <woman-card-person
        class="person"
        :data-spouseids-id="infoPersonFamily[personId].data.spouseIds"
        :person-id="infoPersonFamily[personId].data.id"
        :person="infoPersonFamily[personId].data.info"
        :info-person-family="infoPersonFamily"
      />
    </div>
  </div>
</template>

<script>
import manCardPerson from '../cardPerson/manCardPerson.vue'
import WomanCardPerson from '../cardPerson/womanCardPerson.vue'

export default {
  components: { manCardPerson, WomanCardPerson },
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
    // console.log({
    //   personId: this.personId,
    //   person: this.infoPersonFamily[this.personId],
    // })
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
