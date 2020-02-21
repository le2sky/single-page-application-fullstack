<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn color ="primary" text @click="pop('click test')">test btn</v-btn>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 xl2 v-for="user in users" :key="user._id">
        <user :user="user" @sbOpen="pop"></user>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="sb.act"
    >
      {{ sb.msg }}
    </v-snackbar>
  </v-container>
</template>

<script>
import user from '@/components/user'

export default {
  components: { user },
  data () {
    return {
      users: [],
      sb: {
        act: false,
        msg: 'temp'
      }
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    pop (m) {
      this.sb.act = true
      this.sb.msg = m
    },
    getUsers () {
      this.$axios.get(`${this.$apiRootPath}manage/user/`).then((r) => {
        this.users = r.data.users
      }).catch((e) => {
        console.error(e.message)
      })
    }
  }
}

</script>
