<template>
  <q-page padding>
    <!-- content -->
    <h3>{{$store.getters.flavor.title}}</h3>
    <q-markdown :src="$store.getters.flavor.text"></q-markdown>

  </q-page>
</template>

<script>
import Vue from 'vue'
import Plugin from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'
Vue.use(Plugin)
export default {
  data () {
    return {
      article: {
        title: 'hello title',
        text: '# h1 Heading 8-) '
      }
    }
  }
  // name: 'PageName',
}
</script>
