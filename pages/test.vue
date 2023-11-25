<template>
  <div class="container">
    <woman-card-person v-b-toggle.sidebar-right />

    <br />

    <man-card-person />

    <b-sidebar id="sidebar-right" right shadow>
      <sidebar-person :person="createdPersonData" />
    </b-sidebar>
  </div>
</template>

<script>
import ManCardPerson from '~/components/cardPerson/manCardPerson.vue'
import womanCardPerson from '~/components/cardPerson/womanCardPerson.vue'
export default {
  components: { womanCardPerson, ManCardPerson },

  data() {
    return {
      createdPersonData: {
        personId: 43,
        personName: 'bố test2',
        personGender: false,
        personDob: '1966-03-12T00:00:00.000+00:00',
        personJob: 'bác sĩ',
        personReligion: "Phật",
        personEthnic: "kinh",
        personDod: '2023-04-23T00:00:00.000+00:00',
        personAddress: "Hà nội",
        parentsId: null,
        familyTreeId: 10,
        personStatus: true,
        personRank: 2,
        personDescription: "uoadhcạcnálcnạcôi dníahcíuahcoa",
        personStory: null,
        fatherId: null,
        motherId: null,
        siblingNum: 1.0,
        personImage: null,
        groupChildId: 43,
      },
    }
  },
}
</script>

<style></style>
