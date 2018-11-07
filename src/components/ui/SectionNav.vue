<template>
  <div class="section-nav">
    <ul v-scroll-spy-active="{ class: 'customActive'}" v-scroll-spy-link class="list-group">
      <li 
        v-for="(item, key) in schema.properties.content.properties"
        :key="key"
        class="list-group-item">
        <a href="#" v-scroll-to="`#${anchorIdFormat(item)}`">{{ item.title }}</a>
      </li>
    </ul>
  </div>
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
  color: #17a2b8;
  border-left: 1px solid #17a2b8;
  padding-left: 5px;
  transition: all 0.1s;
}
</style>