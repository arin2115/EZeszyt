<template>
<div>
    <v-app-bar
      color="blue"
      dark
      absolute
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>E-Zeszyt</v-toolbar-title>
    </v-app-bar>
<v-navigation-drawer v-model="drawer" temporary absolute>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            E-Zeszyt
          </v-list-item-title>
          <v-list-item-subtitle>
            Twój wirtualny zeszyt
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
</v-navigation-drawer>
</div>
</template>


<script>
export default {
  name: 'Menu',
  data: () => ({
        drawer: null,
        items: [
          { title: 'Strona główna', icon: 'mdi-view-dashboard' },
          { title: 'Zeszyty', icon: 'mdi-notebook' },
          { title: 'Podręczniki', icon: 'mdi-book' },
          { title: 'Czat', icon: 'mdi-forum' },
          { title: 'Ustawienia', icon: 'mdi-cog' },
          { title: 'Co to jest?', icon: 'mdi-help-box' },
        ],
        right: null,
  }),
};
</script>
