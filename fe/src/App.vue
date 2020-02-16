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
     <v-img :aspect-ratio="16/9" src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60">
        <v-row align="end" class="lightbox white--text pa-2 fill-height">
          <v-col>
            <div class="subheading">temp님 반갑습니다!</div>
          </v-col>
        </v-row>
      </v-img>
      <v-list>
        <v-list-item
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          color=primary
        >
          <v-list-item-action>
          <v-icon v-html="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>web</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title"></v-toolbar-title>
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
        <v-list-item v-if="!$store.state.token" @click="$router.push('sign')">
          <v-list-item-action>
            <v-icon>vpn_key</v-icon>
          </v-list-item-action>
          <v-list-item-title>LOGIN</v-list-item-title>
        </v-list-item>
        <v-list-item v-else @click="signOut">
          <v-list-item-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-action>
          <v-list-item-title>LOGOUT</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app >
      <span>&copy; 2020@homeless-leesky {{$store.state.token}}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'smartphone',
          title: 'Lv0 page',
          to: {
            path: '/'
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
          icon: 'bubble_chart',
          title: '헤더 테스트',
          to: {
            path: '/header'
          }
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'homeless-leesy'
    }
  },
  methods: {
    signOut () {
      this.$store.commit('delToken')
      this.$router.push('/')
    }
  }
}
</script>
