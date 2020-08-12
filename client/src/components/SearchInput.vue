<template>
  <div id="search-input">
    <input placeholder="Enter Something ..." id="search-bar"
        v-model="keys" @keyup.enter="submitKeys">
  </div>
</template>

<script>

  export default {
    name: 'SearchInput',
    data() {
      return {
        keys: ''
      }
    },
    methods: {
      submitKeys() {
        this.$store.dispatch('search/getArticle', { 
          keys: this.keys,
          packSize: 10,
          packIndex: 1
        }).then(() => {
          this.$router.replace({
            path: '/home/article',
            name: 'Article',
            query: {
              keys: this.keys
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  #search-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    input {
      width: 80%;
      max-width: 500px;
      font-size: 25px;
      border-radius: 1em;
      border-width: 0;
      color: black;
      height: 2em;
      padding: 0 1em;
      outline: medium;
      padding-bottom: 0.1em;
      overflow: visible;
    }
  }
</style>