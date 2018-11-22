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

<style lang="scss" scoped>
@import '@/assets/sass/main.scss';

ul {
  margin-top: 20px;
}
li {
  border: none;
  padding: 0.125rem 1.5rem;
  list-style-type: none;
  background-color: #f4f6f7; 
}
li a {
  color: #99979c;
}
.section-nav {
  position: fixed;
  right: 0;
  height: 80vh;
  border-left: 1px solid #ced4da;
  overflow-y: scroll;
  @media screen and (min-width: $break-large + 1) {
    max-width: 15%;
  }
}
.customActive {
  color: #17a2b8;
  border-left: 1px solid #17a2b8;
  padding-left: 5px;
  transition: all 0.1s;
}

.customActive a {
  color: #17a2b8;
  font-weight: bold;
}
</style>