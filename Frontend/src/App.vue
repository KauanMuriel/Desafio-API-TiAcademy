<script setup>

</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

<template>
  <the-nav></the-nav>
  <main>
    <router-view></router-view>
  </main>
  <the-footer></the-footer>
</template>

<script>
import TheNavBar from './components/layout/TheNavBar.vue';
import TheFooter from './components/layout/TheFooter.vue';

export default {
  components: {
    "the-nav": TheNavBar,
    'the-footer': TheFooter,
},
  data() {
    return {

    };
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
}

.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar {
  height: 7vh;
}

main {
  height: 86vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>