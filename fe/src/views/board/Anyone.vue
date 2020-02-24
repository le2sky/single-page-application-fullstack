<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-img
            class="white--text"
            height="70px"
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs6 align-end flexbox>
                  <span class="headline">{{board.name}}</span>
                </v-flex>
                <v-flex xs6 align-end flexbox>
                  <span>{{board.rmk}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
      <!-- temp
      <v-flex xs12 sm6 md4 v-for="article in articles" :key="article._id">
          {{article}}
      </v-flex>
      -->
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="articles"
          class="elevation-1"
          @click:row="read"
        >
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-btn
      color="pink"
      dark
      small
      absolute
      bottom
      right
      fab
      @click="addDialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">글 작성</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="제목"
                  persistent-hint
                  required
                  v-model="form.title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  label="내용"
                  persistent-hint
                  required
                  v-model="form.content"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="add()">확인</v-btn>
          <v-btn color="red darken-1" text @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="sb.act"
    >
      {{ sb.msg }}
      <v-btn
        :color="sb.color"
        text
        @click="sb.act = false"
      >
        닫기
      </v-btn>
    </v-snackbar>
     <v-dialog v-model="dlRead" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{rd.title}}</span>
        </v-card-title>
        <v-card-text>
          {{rd.content}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" text @click.native="dlRead = false, dlMod = true">수정</v-btn>
          <v-btn color="white" text @click.native="delC = true">삭제</v-btn>
          <v-btn color="white" text @click.native="dlRead = false, delC=false">닫기</v-btn>
        </v-card-actions>
        <v-card-text>
          <v-alert color="grey" v-model="delC">
            <h4>정말 진행 하시겠습니까?</h4>
            <v-btn text class="mr-2" color="warning" @click="del()">확인</v-btn>
            <v-btn text color="primary" @click="delC=false">취소</v-btn>
          </v-alert>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dlMod" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">글 수정</span>
        </v-card-title>
         <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="제목"
                  persistent-hint
                  required
                  v-model="form.title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  label="내용"
                  persistent-hint
                  required
                  v-model="form.content"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" text @click.native="mod(), delC=false">수정</v-btn>
          <v-btn color="white" text @click.native="dlMod = false, delC=false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>

export default {
  data () {
    return {
      board: {
        name: '로딩중...',
        rmk: '무엇?'
      },
      articles: [],
      dialog: false,
      lvs: [0, 1, 2, 3],
      form: {
        title: '',
        content: ''
      },
      sb: {
        act: false,
        msg: '',
        color: 'error'
      },
      loading: false,
      headers: [
        { text: '날짜', value: 'writeTime', sortable: true },
        { text: '제목', value: 'title', sortable: true },
        { text: '글쓴이', value: 'writeUser', sortable: false },
        { text: '조회수', value: 'cnt.view', sortable: true },
        { text: '추천', value: 'cnt.like', sortable: true }
      ],
      dlRead: false,
      dlMod: false,
      delC: false,
      rd: {
        _id: '',
        title: '',
        content: ''
      },
      bindTempforAtc: ''
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    addDialog () {
      this.dialog = true
      this.form = {
        title: '',
        content: ''
      }
    },
    get () {
      this.$axios.get('board/아무나')
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.board = data.d
          this.list()
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    },
    add () {
      if (!this.form.title) return this.pop('제목을 작성해주세요.', 'warning')
      if (!this.form.content) return this.pop('내용을 작성해주세요.', 'warning')
      this.$axios.post(`article/${this.board._id}`, this.form).then((r) => {
        this.dialog = false
        this.list()
      }).catch((e) => {
        this.pop(e.message, 'error')
      })
    },
    list () {
      if (this.loading) return
      this.loading = true
      this.$axios.get(`article/list/${this.board._id}`).then(({ data }) => {
        data.ds.forEach((r) => {
          // 우선 모델링 새로하기 귀찮아서 이렇게 했는데 이거 되게 비효율적이야
          r.writeTime = this.id2date(r._id)
          if (!r._user) {
            r.writeUser = '손님'
          } else {
            r.writeUser = r._user.id
          }
        })
        this.articles = data.ds
        this.loading = false
      }).catch((e) => {
        this.pop(e.message, 'error')
        this.loading = false
      })
    },
    read (atc) {
      this.bindTempforAtc = atc
      this.rd.title = atc.title
      this.rd._id = atc._id
      this.loading = true
      this.$axios.get(`article/read/${atc._id}`).then((r) => {
        this.dlRead = true
        this.rd.content = r.data.d.content
        this.form.title = this.rd.title
        this.form.content = this.rd.content
        this.loading = false
      }).catch((e) => {
        this.pop(e.message, 'error')
        this.loading = false
      })
    },
    mod () {
      if (!this.form.title) return this.pop('제목을 작성해주세요', 'warning')
      if (!this.form.content) return this.pop('내용을 작성해주세요', 'warning')
      if (this.rd.title === this.form.title && this.rd.content === this.form.content) {
        return this.pop('변경된 내용이 없습니다.', 'warning')
      }
      this.$axios.put(`article/${this.rd._id}`, this.form).then((r) => {
        this.dlMod = false
        if (!r.data.success) throw Error(r.data.msg)
        this.bindTempforAtc.title = r.data.d.title
      }).catch((e) => {
        this.pop(e.message, 'error')
      })
    },
    del () {
      this.$axios.delete(`article/${this.rd._id}`)
        .then((r) => {
          this.dlRead = false
          if (!r.data.success) throw new Error(r.data.msg)
          this.list()
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    },
    pop (m, c) {
      this.sb.act = true
      this.sb.msg = m
      this.sb.color = c
    },
    id2date (val) {
      if (!val) return '잘못된 시간 정보'
      return new Date(parseInt(val.substring(0, 8), 16) * 1000).toLocaleString()
    }
  }
}
</script>
