<template>
  <v-container grid-list-md>
    <v-parallax
    class="mb-1"
    dark
    src="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1033&q=80"
    >
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center" cols="12">
        <h1 class="display-1 font-weight-thin mb-4">사이트관리 API</h1>
        <h4 class="subheading font-weight-thin">API를 사용하여 사이트를 편하게 관리해보세요!</h4>
      </v-col>
    </v-row>
    </v-parallax>

    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="site in sites" :key="site._id">
        <v-alert
          :value="!sites.length"
          type="warning"
        >
          데이터가 없습니다
        </v-alert>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{site.title}}</h3>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-title primary-title>
            <div>
              <div>copyright: {{site.copyright}}</div>
              <div>darkmode: {{site.dark}}</div>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn text dark color="orange" @click="putDialog(site)">수정</v-btn>
            <v-btn text dark color="error" @click="delPage(site._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">사이트 수정</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="사이트 이름"
                  hint="이름"
                  persistent-hint
                  required
                  v-model="siteTitle"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="사이트 copyright"
                  hint="footer contents"
                  persistent-hint
                  required
                  v-model="siteCopyright"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-switch
                  label="다크 모드"
                  v-model="siteDark"
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="blue darken-1" flat @click="putPage">수정</v-btn>
          <v-btn text color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
    >
      {{ sbMsg }}
      <v-btn
        color="pink"
        flat
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
      sites: [],
      siteTitle: '',
      siteCopyright: '',
      siteDark: false,
      dialog: false,
      snackbar: false,
      sbMsg: '',
      putId: ''
    }
  },
  mounted () {
    this.getSites()
  },
  methods: {
    getSites () {
      this.$axios.get('/manage/site/')
        .then((r) => {
          this.sites = r.data.sites
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    putDialog (site) {
      this.putId = site._id
      this.dialog = true
      this.siteTitle = site.title
      this.siteCopyright = site.copyright
      this.siteDark = site.dark
    },
    putPage () {
      this.dialog = false
      this.$axios.put(`${this.$apiRootPath}manage/site/${this.putId}`, {
        title: this.siteTitle, copyright: this.siteCopyright, dark: this.siteDark
      })
        .then((r) => {
          this.pop('사이트 수정 완료')
          this.getSites()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    delPage (id) {
      this.$axios.delete(`${this.$apiRootPath}manage/site/${id}`)
        .then((r) => {
          this.pop('사이트 삭제 완료')
          this.getSites()
        })
        .catch((e) => {
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
