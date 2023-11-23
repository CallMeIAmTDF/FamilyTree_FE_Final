<template>
  <div class="container">
    <woman-card-person />

    <br />

    <man-card-person />
  </div>
</template>

<script>
import ManCardPerson from '~/components/cardPerson/manCardPerson.vue'
import womanCardPerson from '~/components/cardPerson/womanCardPerson.vue'
export default {
  components: { womanCardPerson, ManCardPerson },
}
</script>

<style></style>
