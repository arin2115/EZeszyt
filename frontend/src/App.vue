<template>
  <v-app>
   <Menu></Menu>
   <router-view style="margin-top: 75px;"></router-view>
  </v-app>
</template>

<script>
import Menu from './components/Menu'

export default {
  name: 'App',

  components: {
    Menu
  },

  data: () => ({}),
};
</script>
