<template>
  <div class="pagination mb-5">
    <b-form-select
      v-model="selected"
      :options="pageList"
      class=""
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
      @change="setPerPage"
    ></b-form-select>
    
    <div class="pagination-control">
      <b-button @click="prevPage" size="lg" :disabled="currentPage == 2" variant="outline-primary" squared>
        <i class="fa fa-chevron-left"></i>
      </b-button>

      <b-button-group class="lg">
        <b-button variant="outline-primary" size="lg" squared @click="setPage(p+1)" v-for="(p, index) in ShowPaginationNumbers(pageCount)" :key="index"
        :class="{ 'active': currentPage == p+1 }">

          {{p+1}}

        </b-button>
      </b-button-group>

      <b-button @click="nextPage" size="lg" :disabled="currentPage >= pageCount -1" variant="outline-primary" squared>
        <i class="fa fa-chevron-right"></i>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      pageList: [10, 25, 50, 100],
      selected: parseInt(localStorage.getItem('per_page')) || 0,
      currentPage: parseInt(localStorage.getItem('current_page')) || 0
    }
  },
  computed:{
    ifRequest () {
      return this.$store.getters.ifRequest
    },
    pageCount(){
      const l = this.$store.state.total_count,
        s = this.selected;

      return Math.ceil(l/s);
    }
  },
  methods:{
    newRequest(){
      this.$store.dispatch('getDB', this.$store.state.search)
    },
    toggleCurrentPage(page){
      this.$store.dispatch('toggleCurrentPage', page)
    },
    setPerPage(){
      this.$store.dispatch('togglePerPage', this.selected)
      this.newRequest()
    },
    setPage(numberPage) {
      this.currentPage = numberPage
      this.toggleCurrentPage(this.currentPage)
      this.newRequest()
    },
    nextPage(){
      this.currentPage++
      this.toggleCurrentPage(this.currentPage)
      this.newRequest()
    },
    prevPage(){
      this.currentPage--
      this.toggleCurrentPage(this.currentPage)
      this.newRequest()
    },
    ShowPaginationNumbers(pageNumbers) {
      let paginationNumbers = []
      if (pageNumbers) {
        let showMax = 3, endPage, startPage

        if (pageNumbers <= showMax) {
          startPage = 1;
          endPage = pageNumbers.length
        } else {
          startPage = this.currentPage - 2<0?0:(this.currentPage - 2)
          if (startPage != pageNumbers.length && startPage != pageNumbers.length) {
            endPage = this.currentPage + showMax - 1
          }
          else {
            endPage = pageNumbers.length;
          }
        }
        for (let i = startPage; i <= endPage-2; i++)
          paginationNumbers.push(i)
        
        return paginationNumbers 
      }
    }
  }
}
</script>
<style scoped>
  .pagination {
    display: flex;
    padding-left: 0;
    list-style: none;
    justify-content: space-between;
    align-content: center;
    width: 60%;
  }
  ul{
    padding: 4px 4px;
    border: 1px solid black;
  }
  li{
    list-style-type:none;
    padding:4px 4px;
  }
  li:hover{
    background-color:#eee;
  }

  button:hover{
    cursor:pointer;
  }
  button:hover:disabled{
    cursor:not-allowed;
  }
</style>