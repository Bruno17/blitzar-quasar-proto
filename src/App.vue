<template>
  <router-view />
</template>
<script>
/* eslint-disable */
import { defineComponent } from 'vue'
import { BlitzForm, BlitzListForm, BlitzTable } from 'blitzar'

export default defineComponent({
  name: 'App',
  components: { BlitzForm, BlitzListForm, BlitzTable }
})
</script>
