<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">leesky</v-list-item-title>
            <v-list-item-subtitle>hee1149kr@naver.com</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
            :to="home.to"
          >
            <v-list-item-icon><v-icon v-text="home.action"></v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="home.group_title"></v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-for="item in items"
          :key="item.group_title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.group_title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :to="subItem.to"
          >
            <v-list-item-icon><v-icon v-text="subItem.icon"></v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      color="primary"
      dense
      dark
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>

      <v-toolbar-title v-text="siteTitle"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <template v-if="!$store.state.token">
          <v-list-item @click="$router.push('/register')">
            <v-list-item-action>
              <v-icon>face</v-icon>
            </v-list-item-action>
            <v-list-item-title>회원가입</v-list-item-title>
          </v-list-item>
            <v-list-item @click="$router.push('/sign')">
            <v-list-item-action>
              <v-icon>vpn_key</v-icon>
            </v-list-item-action>
            <v-list-item-title>LOGIN</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item v-else @click="signOut">
          <v-list-item-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-action>
          <v-list-item-title>LOGOUT</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app >
      <span>{{siteCopyright}}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  mounted () {
    this.getSite()
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      siteTitle: 'temp',
      siteCopyright: '2020 leesky copyright ',
      home: {
        action: 'house',
        group_title: 'HOME',
        to: {
          path: '/'
        }
      },
      items: [
        {
          action: 'bubble_chart',
          group_title: '권한 테스트',
          active: true,
          subItems: [
            {
              icon: 'smartphone',
              title: 'Lv0 page',
              to: {
                path: '/lv0'
              }
            },
            {
              icon: 'laptop_mac',
              title: 'Lv1 page',
              to: {
                path: '/lv1'
              }
            },
            {
              icon: 'desktop_mac',
              title: 'Lv2 page',
              to: {
                path: '/lv2'
              }
            },
            {
              icon: 'tablet_mac',
              title: 'Lv3 page',
              to: {
                path: '/lv3'
              }
            }
          ]
        },
        {
          action: 'settings',
          group_title: '관리',
          subItems: [
            {
              icon: 'settings',
              title: '게시판관리',
              to: {
                path: '/boards'
              }
            },
            {
              icon: 'supervisor_account',
              title: '사용자관리',
              to: {
                path: '/user'
              }
            },
            {
              icon: 'domain',
              title: '페이지관리',
              to: {
                path: '/page'
              }
            },
            {
              icon: 'domain',
              title: '사이트관리',
              to: {
                path: '/site'
              }
            }
          ]
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  methods: {
    getSite () {
      this.$axios.get('/site').then((r) => {
        this.siteTitle = r.data.d.title
        this.siteCopyright = r.data.d.copyright
        this.$vuetify.theme.dark = r.data.d.dark
      })
    },
    signOut () {
      this.$store.commit('delToken')
      this.$router.push('/sign')
    }
  }
}
</script>
