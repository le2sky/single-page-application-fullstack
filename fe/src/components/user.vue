<template>
  <v-card>
    <v-card-title primary-title>
      <h4 class="headline mb-0">{{user.id}}</h4>
    </v-card-title>
     <v-card-text primary-title>
      <div>
        <div>이름: {{user.name}}</div>
        <div>권한: {{user.lv}}</div>
        <div>나이: {{user.age}}</div>
        <div>로그인 횟수: {{user.inCnt}}</div>
        <div>계정 아이디: {{user.id}}</div>
        <div>salt(_id): {{user._id}}</div>
      </div>
    </v-card-text>
    <v-card-action>
      <v-btn text color="red" @click="parent">temp</v-btn>
    </v-card-action>
  </v-card>
</template>

<script>
export default {
  props: [ 'user' ],
  methods: {
    parent () {
      this.$emit('sbOpen', '자식에 의해 실행됨')
    }
  }
}
</script>
