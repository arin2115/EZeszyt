<template>
<v-container>
  <h1>FAQ (Często Zadawane Pytania)</h1>
  <v-treeview :items="items"></v-treeview>
</v-container>
</template>

<script>
export default {
  name: 'FAQ',
  data: () => ({
      items: [
        {
          id: 1,
          name: 'Czym jest E-Zeszyt?',
          children: [
            { id: 2, name: 'E-Zeszyt to prosta aplikacja stworzona przez uczniów dla uczniów, m.in. aby ułatwić wymianę zadań które zostały zadane kiedy kogoś nie było w szkole.' },
          ],
        },
        {
          id: 3,
          name: 'Jak dołączyć do klasy?',
          children: [
            { id: 4, name: 'Żeby dołączyć do klasy, najpierw należy się zalogować, następnie pojawi się opcja dołączenia do klasy przy pierwszym zalogowaniu, lub później w ustawieniach' },
          ],
        },
      ],
    }),
}
</script>
