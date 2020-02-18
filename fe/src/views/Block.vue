<template>
  <v-container>
    <v-alert type="error" :value="true">
      {{$route.params.msg}}
    </v-alert>
  </v-container>
</template>
