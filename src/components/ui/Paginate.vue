<template>
  <ul class="paginate">
    <li 
      class="prev" 
      v-bind:class="{'disabled': (currPage === 1)}" 
      @click.prevent="setPage(currPage-1)" @><a href="#">Prev</a>
    </li>
    <li 
      v-for="n in totalPage" 
      v-bind:class="{'active': (currPage === (n))}" 
      @click.prevent="setPage(n)"><a href="#">{{n}}</a>
    </li>
    <li 
      class="next" 
      v-bind:class="{'disabled': (currPage === totalPage)}" 
      @click.prevent="setPage(currPage+1)"><a href="#">Next</a>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      countOfPage: 5,
      currPage: 1,
      totalPage: 15
    }
  },
  methods: {
    setPage: function(idx) {
      if (idx <= 0 || idx > this.totalPage) {
        return
      }
      this.currPage = idx
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/sass/main.scss';
</style>