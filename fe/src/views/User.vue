<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm3>
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-card-title>
            TEST : GET
          </v-card-title>

          <v-card-subtitle>
            description : get test
          </v-card-subtitle>

          <v-card-text>
            <v-textarea
              v-model='getMd'
            >

            </v-textarea>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="purple"
              text
              @click="getReq"
            >
              submit
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
      <v-flex xs12 sm3>
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-card-title>
            TEST : POST
          </v-card-title>

          <v-card-subtitle>
            description : post test
          </v-card-subtitle>

          <v-card-text>
            <v-textarea
              v-model='postMd'
            >

            </v-textarea>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="purple"
              text
              @click="postReq"
            >
              submit
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
      <v-flex xs12 sm3>
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-card-title>
            TEST : PUT
          </v-card-title>

          <v-card-subtitle>
            description : put test
          </v-card-subtitle>

          <v-card-text>
            <v-textarea
              v-model='putMd'
            >

            </v-textarea>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="purple"
              text
              @click="putReq"
            >
              submit
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
      <v-flex xs12 sm3>
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-card-title>
            TEST : DELETE
          </v-card-title>

          <v-card-subtitle>
            description : delete test
          </v-card-subtitle>

          <v-card-text>
            <v-textarea
              v-model='delMd'
            >

            </v-textarea>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="purple"
              text
              @click="delReq"
            >
              submit
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      users: [],
      getMd: '',
      postMd: '',
      putMd: '',
      delMd: ''
    }
  },
  mounted () {
  },
  methods: {
    getReq () {
      axios.get('http://localhost:3000/api/user/', {
        desc: 'get test'
      }).then((res) => {
        this.getMd = JSON.stringify(res.data)
      }).catch((error) => {
        console.error(error.message)
      })
    },
    postReq () {
      axios.post('http://localhost:3000/api/user/', {
        desc: 'post test'
      }).then((res) => {
        this.postMd = JSON.stringify(res.data)
      }).catch((error) => {
        console.error(error.message)
      })
    },
    putReq () {
      axios.put('http://localhost:3000/api/user/', {
        desc: 'put test'
      }).then((res) => {
        this.putMd = JSON.stringify(res.data)
      }).catch((error) => {
        console.error(error.message)
      })
    },
    delReq () {
      axios.delete('http://localhost:3000/api/user/', {
        desc: 'delete test'
      }).then((res) => {
        this.delMd = JSON.stringify(res.data)
      }).catch((error) => {
        console.error(error.message)
      })
    }
  }
}

</script>
