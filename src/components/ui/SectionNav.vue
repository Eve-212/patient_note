<template>
  <nav class="section-nav" v-scroll-watch>
    <ul class="list-group">
      <li 
        v-for="(item, key) in schema.properties.content.properties"
        :key="key"
        class="list-group-item">
         <a v-scroll-to href="#" :scroll="`#${anchorIdFormat(item)}`">{{ item.title }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import Proto from '@/components/mixins/Proto.js'

export default {
  name: 'SectionNav',
  mixins: [Proto],
  data() {
    return {}
  }
}
</script>

<style scoped>
ul {
  margin-top: 20px;
}
li {
  border: none;
  padding: 0.125rem 1.5rem;
  list-style-type: none;
}
li a {
  color: #99979c;
}
.section-nav {
  position: fixed;
  right: 0;
  height: 80vh;
  border-left: 1px solid #eee;
  overflow-y: scroll;
}
.customActive {
  color: #1b77ce;
  border-left: 1px solid #1b77ce;
  padding-left: 5px;
  transition: all 0.1s;
}

.customActive a {
  color: #1b77ce;
  font-weight: bold;
}
</style>