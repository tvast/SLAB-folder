<template>
  <q-page>
    <h3>Your first article</h3>

    <div class="q-pa-md">

      <div class="row">
        <div class="col">

          <q-input
            rounded
            outlined
            v-model="article.title"
            label="Rounded outlined"
          />
          <q-input
            outlined
            v-model="article.text"
            filled
            type="textarea"
          />
        </div>
        <div class="col">
          <q-markdown :src="article.text"></q-markdown>
        </div>
      </div>
      <q-btn
        class="text-dark "
        color="secondary"
        label="Secondary"
        clickable
        @click="postarticle"
      />
    </div>

  </q-page>
</template>

<script>
import Vue from 'vue'
import Plugin from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'
// import { store } from '../store/index.js'
// import routes from '../router/routes'
// import Router from '../router/index'

Vue.use(Plugin)
export default {
  data () {
    return {
      article: {
        title: 'hello title',
        text: '# h1 Heading 8-) '
      }
    }
  },
  methods: {
    postarticle () {
      var f = this.article
      this.$store.commit('change', f)
      this.$router.push({ path: '/result' })
      console.log(f)
    }
  }
}
</script>
