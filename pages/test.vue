<template>
  <div class="container">
    <br />

    <man-card-person :namehihi="createdPersonData.personName" />
  </div>
</template>

<script>
import ManCardPerson from '~/components/cardPerson/manCardPerson.vue'
export default {
  components: { ManCardPerson },

  data() {
    return {
      createdPersonData: {
        personId: 43,
        personName: 'Nguyễn Tiến Dũng',
        personGender: true,
        personDob: '1966-03-12T00:00:00.000+00:00',
        personJob: 'bác sĩ',
        groupChildId: 43,
      },
    }
  },
}
</script>

<style></style>
