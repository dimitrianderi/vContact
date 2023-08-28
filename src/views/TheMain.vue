<template>
  <the-controls></the-controls>
  <the-table></the-table>
</template>

<script lang="ts">
import TheControls from '../components/TheControls.vue'
import TheTable from '../components/TheTable.vue'
import AppLoader from '../layouts/AppLoader.vue'

export default {
  components: { TheControls, TheTable },
  name: 'Main',
}
</script>

<style></style>
