<template>
  <div class="section-nav">
    <ul class="list-group">
      <li 
        v-for="(title, key) in schema.properties.content.properties"
        :key="key"
        class="list-group-item">
        <a href="#" v-scroll-to="`#${anchorIdFormat(title.title)}`">{{ title.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import Proto from './input_components/Proto';
export default {
  name: 'SectionNav',
  mixins: [Proto],
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
    }
  },
}
</script>

<style scoped>
ul {
  margin-top: 20px;
}
li {
  border: none;
  padding: .125rem 1.5rem;
}
li a {
  color: #99979c;
}
.section-nav {
  position: fixed;
  right: 0;
  border-left: 1px solid #eee;
  overflow:scroll;
}
</style>