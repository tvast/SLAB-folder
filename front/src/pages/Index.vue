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
            v-model="article.content"
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
        content: '# h1 Heading 8-) '
      }
    }
  },
  methods: {

    async postData (inputData) {
      const response = await fetch('http://localhost:2800/addArticle', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(inputData) // body data type must match "Content-Type" header
      })
      return await response.json() // parses JSON response into native JavaScript objects
    },
    postarticle () {
      var f = this.article
      // this.$store.commit('change', f)
      this.postData(f)
      this.$router.push({ path: '/list' })
      // console.log(f)
    }
  }
}
</script>
