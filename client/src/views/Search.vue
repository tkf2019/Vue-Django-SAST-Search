<template>
  <div id="search-box">
    <router-link to="/home/search" class="navbar-brand">
      <img src="@/assets/images/1.png">
    </router-link>
    <router-view></router-view>
    <template v-if="searchLoading">
      <h3 class="loading">Loading...</h3>
    </template>
    <template v-else>
      <search-input></search-input>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import SearchInput from '@/components/SearchInput'

  export default {
    name: 'Search',
    components: {
      SearchInput
    },
    computed: mapState('search', [
      'searchLoading',
      'searchCompleted',
      'searchError'
    ])
  }
</script>

<style lang="scss">
  #search-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    img {
      width: 200px;
      height: 200px;
    }
  }
</style>