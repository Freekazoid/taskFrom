<template>
  <div class="search">
    <b-input-group class="mt-2 mb-3 p-4">
      <template #append>
        <b-button type="submit" class="serch-button" variant="primary" squared @click="search"><i class="fa-solid fa-magnifying-glass"></i></b-button>
      </template>
      <b-form-input v-model="searchItem" placeholder="Начните вводить текст для поиска (не меньше трех символов)"></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
export default {
  data(){
    return {
      searchItem: ''
    }
  },
  methods:{
    search(e){
      this.$store.dispatch('getDB', this.searchItem)
      .then(() => ( this.resources = this.$store.state.DB ))
      .catch(err => console.log(err))
    }
  },
  created(){
    this.searchItem = localStorage.getItem('search') !== null?localStorage.getItem('search'):''
  }
}
</script>

<style scoped>
 
</style>