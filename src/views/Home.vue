<template>
  <div class="home">
    <header>
      <Search/>
    </header>
    <section>
      <Loader/>
      <Card v-for="cards in listData" :key="cards.id" :card-data="cards"/>
    </section>
    <footer>
      <Pagination/>
    </footer>
  </div>
</template>

<script>
import Loader from '@/components/loader.vue'
import Search from '@/components/search.vue'
import Card from '@/components/card.vue'
import Pagination from '@/components/pagination.vue';
export default {
  name: 'Home',
  components: {
    Loader, Search, Card, Pagination
  },
  data(){
    return{
      listData: []
    }
  },
  computed:{
    request(){
      return this.$store.getters.ifRequest
    },
    getDB(){
      return this.$store.state.DB
    }
  },
  watch:{
    getDB: {
      handler: function (val, oldVal) {
        this.listData = val
      },
      deep: true
    }
  },
  created(){
    let search = (localStorage.getItem('search') !== null? localStorage.getItem('search'):false),
      DBstor = JSON.parse(localStorage.getItem('DB')),
      totalCount = parseInt(localStorage.getItem('total_count')),
      page = parseInt(localStorage.getItem('current_page'))

// console.log(this.request);
    if(!this.request){
      this.$store.dispatch('getDB', search)
      console.log('req');
    }else {
      this.$store.dispatch('setDB', DBstor)
      this.$store.dispatch('toggleCountDB', totalCount)
      this.$store.dispatch('setTextSearch', search)
      this.$store.dispatch('toggleCurrentPage', page)
    }
  }
}
</script>
<style lang="scss">
  $fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
  @import "~@fortawesome/fontawesome-free/scss/fontawesome";
  @import "~@fortawesome/fontawesome-free/scss/solid"; // fas
  @import "~@fortawesome/fontawesome-free/scss/regular"; // far
  @import "~@fortawesome/fontawesome-free/scss/brands"; // fab

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .home{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
    width: 100vw;
    height: 100vh;
  }
  header{
    background: #ddd;
  }
  section{
    position: relative;
    width: 100%;
    height: 100%;
    padding: 50px 0 0 0;
    overflow-x: hidden;
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;
    justify-content: center;
  }
</style>