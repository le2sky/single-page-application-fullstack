<template>
  <v-container grid-list-md text-xs-center>
    <v-parallax
      class="mb-1"
      dark
      src="https://images.unsplash.com/photo-1502318217862-aa4e294ba657?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">사용자관리 API</h1>
          <h4 class="subheading font-weight-thin">API를 사용하여 사용자를 편하게 관리해보세요!</h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 xl2  v-for= 'user in users' :key="user._id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h4 class="headline mb-0">{{user.id}}</h4>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-text>
            <div>
              <div>이름: {{user.name}}</div>
              <div>권한: {{user.lv}}</div>
              <div>나이: {{user.age}}</div>
              <div>로그인 횟수: {{user.inCnt}}</div>
              <div>계정 아이디: {{user.id}}</div>
              <div>salt(_id): {{user._id}}</div>
            </div>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn text  dark color="orange" @click="putDialog(user)">수정</v-btn>
            <v-btn text dark color="error" @click="delDia(user._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="modifyDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">[Modify]User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Input user name*"
                  required
                  v-model="userName"
                  >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items= 'userAges'
                  label="Age*"
                  required
                  v-model="userAge"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :items= 'userLvs'
                  label="Permission*"
                  require
                  v-model='userLv'
                >
                </v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="modifyDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="putUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="delDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
        <v-icon
        color="error"
        >warning</v-icon>
        warning
        <v-icon
        color="error"
        >warning</v-icon>
        </v-card-title>

        <v-card-text>
          정말로 삭제하시겠습니까?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            text
            @click="delUser"
          >
            YES
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="delDialog = false"
          >
            NO
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ sbMsg }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      users: [],
      userAges: [],
      userAge: 0,
      userName: '',
      userLvs: [],
      userLv: 0,
      snackbar: false,
      sbMsg: '',
      x: '',
      y: '',
      color: '',
      mode: '',
      timeout: 6000,
      modifyDialog: false,
      putId: '',
      delDialog: false,
      delId: ''
    }
  },
  mounted () {
    for (let i = 10; i < 40; i++) this.userAges.push(i)
    for (let i = 0; i < 4; i++) this.userLvs.push(i)
    this.getUsers()
  },
  methods: {
    getUsers () {
      const token = localStorage.getItem('token')
      this.$axios.get(`${this.$apiRootPath}manage/user/`, { headers: { Authorization: token } }).then((r) => {
        this.users = r.data.users
      }).catch((e) => {
        this.pop('user를 불러오는데 실패하였습니다.')
      })
    },
    putDialog (user) {
      this.putId = user._id
      this.modifyDialog = true
      this.userAge = user.age
      this.userName = user.name
      this.userLv = user.lv
    },
    putUser () {
      this.modifyDialog = false
      this.$axios.put(`${this.$apiRootPath}manage/user/${this.putId}`, {
        name: this.userName, age: this.userAge, lv: this.userLv
      }).then((r) => {
        this.pop('사용자 수정 완료')
        this.getUsers()
      }).catch((e) => {
        this.pop(e.message)
      })
    },
    delDia (id) {
      this.delDialog = true
      this.delId = id
    },
    delUser () {
      this.$axios.delete(`${this.$apiRootPath}manage/user/${this.delId}`).then((r) => {
        this.pop('사용자 삭제 완료')
        this.getUsers()
        this.delDialog = false
      }).catch((e) => {
        this.pop(e.message)
      })
    },
    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    }
  }
}

</script>
