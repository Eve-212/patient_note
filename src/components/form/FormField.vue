<template>
  <div>
    <component 
      v-for="(field, key) in schema.properties" 
      :key="key" 
      :is="getComponentName(field)" 
      :schema="field"
      v-bind="field.attrs" 
      :path="path.concat(key)" 
      :currentKey="key" 
      v-model="value[currentFieldName]">
      <template slot="subTitle" slot-scope="{ description }">
        <small 
          v-if="description" 
          :id="helpText(field)" 
          class="form-text text-muted reminder">
          {{ description }}
        </small>
      </template>
    </component>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>