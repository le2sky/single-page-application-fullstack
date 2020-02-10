<template>
  <v-container grid-list-md text-xs-center>
    <!-- paallax 이거 패딩 줄여야함 : src/views/Home.vue 참고 -->
    <v-parallax
      class="mb-1"
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">사용자관리 API</h1>
          <h4 class="subheading font-weight-thin">사용자를 마음껏 추가,수정,삭제 해보세요!</h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-layout row wrap>
      <!-- test text-fileds -->
      <!--
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
      </v-flex> -->
      <v-flex xs12 sm6 md4 lg3 xl2  v-for= 'user in users' :key="user._id">
        <!-- event가 발생할때마다 페이지를 렌더링하니깐 이건 mounted 됐을떄 초기값으로 설정해야겠다.-->
        <v-card
          class="mx-auto"
          :color= "ranColor()" 
          dark
          max-width="400"
        >
          <v-card-title>
               <v-list-item-avatar color="white">
                <v-img
                  class="elevation-6"
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Black&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>
            <span class="title font-weight-light">{{user.name}}</span>
          </v-card-title>

          <v-list-item class="grow">
            <v-col>
              <v-row>
                <v-icon
                >
                remove
                </v-icon>
              </v-row>
              <v-row>
                  <v-list-item-content>
                    <v-list-item-title
                    >age : {{user.age}}</v-list-item-title>
                  </v-list-item-content>
              </v-row>
              <v-row>
                  <v-list-item-content>
                    <v-list-item-title>cmt : test용 user입니다.</v-list-item-title>
                  </v-list-item-content>
              </v-row>
            </v-col>
            </v-list-item>
          <v-card-actions
          >
            <v-col
              align="center"
            >
              <v-btn small class="mx-1" color="grey darken-1" @click="putDialog(user._id)">수정</v-btn>
              <v-btn small class="mx-1" color="grey darken-1" @click="delDia(user._id)">삭제</v-btn>
              <!-- <v-btn text color="error" @click="delUser(user._id)">삭제</v-btn> -->
            </v-col>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-btn
        absolute
        dark
        bottom
        fab
        right
        color="blue"
        @click="mdUp"
      >
        <v-icon>add</v-icon>
      </v-btn>
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
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
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
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="postUser">Save</v-btn>
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
import axios from 'axios'
export default {
  data () {
    return {
      users: [],
      getMd: '',
      postMd: '',
      putMd: '',
      delMd: '',
      dialog: false,
      userAges: [],
      userAge: 0,
      userName: '',
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
    this.getUsers()
    console.log(this.$apiRootPath)
  },
  methods: {
    // restAPi test
    // getReq () {
    //   axios.get('http://localhost:3000/api/user/', {
    //     desc: 'get test'
    //   }).then((res) => {
    //     this.getMd = JSON.stringify(res.data)
    //   }).catch((error) => {
    //     console.error(error.message)
    //   })
    // },
    // postReq () {
    //   axios.post('http://localhost:3000/api/user/', {
    //     name: 'parksky',
    //     age: 42
    //   }).then((res) => {
    //     this.postMd = JSON.stringify(res.data)
    //   }).catch((error) => {
    //     console.error(error.message)
    //   })
    // },
    // putReq () {
    //   axios.put('http://localhost:3000/api/user/', {
    //   }).then((res) => {
    //     this.putMd = JSON.stringify(res.data)
    //   }).catch((error) => {
    //     console.error(error.message)
    //   })
    // },
    // delReq () {
    //   axios.delete('http://localhost:3000/api/user/', {
    //   }).then((res) => {
    //     this.delMd = JSON.stringify(res.data)
    //   }).catch((error) => {
    //     console.error(error.message)
    //   })
    // },
    mdUp () {
      this.dialog = true
      this.userAge = ''
      this.userName = ''
    },
    postUser () {
      this.dialog = false
      // console.log(this.userName, this.userAge0)
      this.pop(this.userName)
      axios.post(`${this.$apiRootPath}user/`, {
        name: this.userName,
        age: this.userAge
      }).then((r) => {
        this.pop(`${this.userName} 사용자가 등록되었습니다.`)
        this.getUsers()
      }).catch((e) => {
        // console.error(e.message)
        this.pop(e.message)
      })
    },
    getUsers () {
      axios.get(`${this.$apiRootPath}user/`).then((r) => {
        this.users = r.data.users
      }).catch((e) => {
        this.pop('user를 불러오는데 실패하였습니다.')
      })
    },
    putDialog (id) {
      this.putId = id
      this.modifyDialog = true
      this.userAge = ''
      this.userName = ''
    },
    putUser () {
      axios.put(`${this.$apiRootPath}user/${this.putId}`, {
        name: this.userName, age: this.userAge
      }).then((r) => {
        this.pop('사용자 수정 완료')
        this.getUsers()
        this.modifyDialog = false
      }).catch((e) => {
        this.pop(e.message)
      })
    },
    delDia (id) {
      this.delDialog = true
      this.delId = id
    },
    delUser () {
      // console.log(id)
      axios.delete(`${this.$apiRootPath}user/${this.delId}`).then((r) => {
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
    },
    ranColor () {
      const ran = Math.floor(Math.random() * 9 + 1)
      console.log(ran)
      if (ran === 1) {
        return `red accent-1`
      } else if (ran === 2) {
        return 'pink accent-1'
      } else if (ran === 3) {
        return 'purple lighten-1'
      } else if (ran === 4) {
        return 'deep-purple lighten-1'
      } else if (ran === 5) {
        return 'blue lighten-1'
      } else if (ran === 6) {
        return 'cyan lighten-1'
      } else if (ran === 7) {
        return 'green lighten-1'
      } else if (ran === 8) {
        return 'lime lighten-1'
      } else if (ran === 9) {
        return 'blue-grey darken-2'
      } else {
        return 'grey lighten-1'
      }
    }
  }
}

</script>
