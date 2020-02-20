<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>회원가입</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <ValidationObserver ref="observer" v-slot="{ validate, reset }">
                  <form>
                    <ValidationProvider v-slot="{ errors }" name="아이디" rules="required|min:4|max:20">
                      <v-text-field
                        v-model="form.id"
                        :counter="20"
                        :error-messages="errors"
                        label="*아이디"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="비밀번호" rules="required|min:6|max:40">
                      <v-text-field
                        :counter="40"
                        v-model="form.pwd"
                        :error-messages="errors"
                        label="*비밀번호"
                        required
                        type="password"
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="이름" rules="required|min:1|max:40">
                      <v-text-field
                        v-model="form.name"
                        :error-messages="errors"
                        label="*이름"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" rules="required" name="약관동의">
                      <v-checkbox
                        v-model="form.agree"
                        :error-messages="errors"
                        value="1"
                        label="약관동의"
                        type="checkbox"
                        required
                      ></v-checkbox>
                    </ValidationProvider>

                    <v-btn color="primary" class="mr-4" @click="submit">가입하기</v-btn>
                    <v-btn color="warning" @click="clear">초기화</v-btn>
                  </form>
                </ValidationObserver>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { required, email, max, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode, localize } from 'vee-validate'
import ko from 'vee-validate/dist/locale/ko.json'
setInteractionMode('eager')

localize('ko', ko) // 일단 지역화 보류

extend('required', {
  ...required,
  message: '{_field_}는 필수요소입니다.'
})

extend('max', {
  ...max,
  message: '{_field_}는 {length}자 이하로 만들어 주세요.'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

extend('min', {
  ...min,
  message: '{_field_}는 최소 {length}자 이상으로 만들어 주세요. '
})
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    form: {
      id: '',
      name: '',
      pwd: '',
      agree: false
    },
    sb: {
      act: false,
      msg: '',
      color: 'warning'
    }
  }),

  methods: {
    submit () {
      this.$refs.observer.validate().then((r) => {
        console.log(this.form)
        if (!r) throw new Error('모두 기입해주세요')
        return this.$axios.post('register', this.form)
      }).then((r) => {
        if (!r.data.success) throw new Error('서버가 거부했습니다')
        this.pop('가입 완료 되었습니다.', 'success')
        this.$router.push('/sign')
      }).catch((e) => {
        this.pop(e.message, 'warning')
      })
    },
    clear () {
      this.form.id = ''
      this.email = ''
      this.select = null
      this.checkbox = null
      this.$refs.observer.reset()
    },
    pop (m, cl) {
      this.sb.act = true
      this.sb.msg = m
      this.sb.color = cl
    }
  }
}
</script>
