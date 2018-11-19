<template>
  <ul class="paginate">
    <li 
      class="prev" 
      v-bind:class="{'disabled': (currPage === 1)}" 
      @click.prevent="$emit('currPage', currPage-1), setPage(currPage-1)"><a href="#">Prev</a>
    </li>
    <li 
      v-for="n in totalPage" 
      v-bind:class="{'active': (currPage === (n))}" 
      @click.prevent="$emit('currPage', n), setPage(n)"><a href="#">{{n}}</a>
    </li>
    <li 
      class="next" 
      v-bind:class="{'disabled': (currPage === totalPage)}"
      @click.prevent="$emit('currPage', currPage+1), setPage(currPage+1)" 
      ><a href="#">Next</a>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['totalPage'],
  data() {
    return {
      currPage: 1
    }
  },
  created() {
    this.$emit('currPage', this.currPage)
  },
  methods: {
    setPage(idx) {
      if (idx <= 0 || idx > this.totalPage) {
        return
      }
      this.currPage = idx
    }
  }
}
</script>