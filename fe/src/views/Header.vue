<template>
    <v-container>
        <v-btn class="mr-2 mt-2" color="primary" @click="headerSend">커스텀 헤더 전송</v-btn>
        <v-btn class="mr-2 mt-2" color="primary" @click="realHeaderSend">오쏘 헤더 전송</v-btn>
        <v-btn class="mr-2 mt-2" color="primary" @click="lsSet">로컬스토리지 저장</v-btn>
        <v-btn class="mr-2 mt-2" color="primary" @click="lsGet">로컬스토리지 출력</v-btn>
        <v-btn class="mr-2 mt-2" color="primary" @click="lsRemove">로컬스토리지 삭제</v-btn>
        <v-btn class="mr-2 mt-2" color="primary" @click="lsClear">로컬스토리지 전체삭제</v-btn>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    headerSend () {
      axios.get(`${this.$apiRootPath}test`, {
        headers: {
          xxx: 1234,
          yyy: 'str'
        }
      }).then((r) => {
        console.log(r)
      }).catch((e) => {
        console.log(e)
      })
    },
    realHeaderSend () {
      axios.get(`${this.$apiRootPath}test`, {
        headers: { Authorization: 'fake token!' }
      }).then((r) => {
        console.log(r)
      }).catch((e) => {
        console.log(e)
      })
    },
    lsSet () {
      localStorage.setItem('sample_token1', 'x21233s1eaedwq352effgfdddq')
      localStorage.setItem('sample_token2', 'x233d1eaedwq352effdsadsadgfddq')
      localStorage.setItem('sample_token3', 'x2dsa331eaedwq352effgfddq')
      localStorage.setItem('sample_token4', 'x233dsa1eaedwq35dsad2effgfddq')
    },
    lsGet () {
      console.log(localStorage.getItem('sample_token1'))
      console.log(localStorage.getItem('sample_token2'))
      console.log(localStorage.getItem('sample_token3'))
      console.log(localStorage.getItem('sample_token4'))
    },
    lsRemove () {
      localStorage.removeItem('sample_token4')
    },
    lsClear () {
      localStorage.clear()
    }
  }
}
</script>
