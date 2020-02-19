<template>
  <v-container grid-list-md text-xs-center pa-0>
    <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
        class="ma-2"
      >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="color[i]"
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">{{ slide }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
     <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12 xl6>
        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item
            color="purple lighten-2"
            fill-dot
            right
          >
            <v-card>
              <v-card-title class="purple lighten-2">
                <v-icon
                  dark
                  size="42"
                  class="mr-4"
                >
                  mdi-magnify
                </v-icon>
                <h2 class="display-1 white--text font-weight-light">Title 1</h2>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" md="10">
                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.
                  </v-col>
                  <v-col
                    class="hidden-sm-and-down text-right"
                    md="2"
                  >
                    <v-icon size="64">mdi-calendar-text</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item
            color="amber lighten-1"
            fill-dot
            left
            small
          >
            <v-card>
              <v-card-title class="amber lighten-1 justify-end">
                <h2 class="display-1 mr-4 white--text font-weight-light">Title 2</h2>
                <v-icon
                  dark
                  size="42"
                >mdi-home-outline</v-icon>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" md="8">
                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.
                  </v-col>
                  <v-col cols="12" md="4">
                    Lorem ipsum dolor sit amet, no nam oblique veritus.
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item
            color="cyan lighten-1"
            fill-dot
            right
          >
            <v-card>
              <v-card-title class="cyan lighten-1">
                <v-icon
                  class="mr-4"
                  dark
                  size="42"
                >
                  mdi-email-outline
                </v-icon>
                <h2 class="display-1 white--text font-weight-light">Title 3</h2>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col
                    v-for="n in 3"
                    :key="n"
                    cols="12"
                    md="4"
                  >
                    Lorem ipsum dolor sit amet, no nam oblique veritus no nam oblique.
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item
            color="red lighten-1"
            fill-dot
            left
            small
          >
            <v-card>
              <v-card-title class="red lighten-1 justify-end">
                <h2 class="display-1 mr-4 white--text font-weight-light">Title 4</h2>
                <v-icon
                  dark
                  size="42"
                >
                  mdi-account-multiple-outline
                </v-icon>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col class="hidden-sm-and-down" md="2">
                    <v-icon size="64">mdi-server-network</v-icon>
                  </v-col>
                  <v-col cols="12" md="10">
                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus.
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item
            color="green lighten-1"
            fill-dot
            right
          >
            <v-card>
              <v-card-title class="green lighten-1">
                <v-icon
                  class="mr-4"
                  dark
                  size="42"
                >
                  mdi-phone-in-talk
                </v-icon>
                <h2 class="display-1 white--text font-weight-light">Title 5</h2>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col>
                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl6>
        <v-card
          elevation="24"
          class="mx-auto"
        >
          <v-system-bar lights-out></v-system-bar>
          <v-carousel
            :continuous="false"
            :cycle="cycle"
            :show-arrows="false"
            hide-delimiter-background
            delimiter-icon="mdi-minus"
          >
            <v-carousel-item
              v-for="(slide, i) in slides"
              :key="i"
            >
              <v-sheet
                :color="colors[i]"
                height="100%"
                tile
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-3">{{ slide }}</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
          <v-list two-line>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>John Leider</v-list-item-title>
                <v-list-item-subtitle>Author</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-switch
                  v-model="cycle"
                  label="Cycle Slides"
                  inset
                ></v-switch>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
        <v-carousel :show-arrows="false" class="mt-5" height="600">
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data () {
    return {
      colors: [
        'green',
        'secondary',
        'yellow darken-4',
        'red lighten-2',
        'orange darken-1'
      ],
      color: [
        'blue lighten-1',
        'warning',
        'pink accent-2',
        'red lighten-1',
        'deep-purple accent-4'
      ],
      slides: [
        'Hello, World!',
        'Привет, мир!',
        '안녕, 세상아!',
        'こんにちは, 世界!',
        '你好, 世界!'
      ],
      cycle: false,
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
    }
  }
}

</script>
