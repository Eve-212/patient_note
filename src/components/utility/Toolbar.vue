<template>
  <div v-if="show" class="btn-toolbar" role="toolbar" aria-label="Toolbar">
        
      <div class="mr-2">
        <div>
          File
        </div>
        <div class="btn-group" role="group" aria-label="First group">
          <button type="button" class="btn btn-secondary"><i class="far fa-save"></i></button>      
          <button type="button" class="btn btn-secondary"><i class="far fa-star"></i></button>
        </div>
      </div>    
      <div class="mr-2">
        <div>
          Note Types
        </div>
        <div class="btn-group" role="group" aria-label="Second group">
          <button type="button" class="btn btn-secondary">Admission</button>
          <button type="button" class="btn btn-secondary">Progress</button>
          <button type="button" class="btn btn-secondary">Discharge</button>
        </div>
      </div>
      
      <div class="mr-2">
        <div>
          Settings
        </div>
        <div class="btn-group" role="group" aria-label="Third group">
          <button type="button" class="btn btn-secondary"><i class="far fa-clone"></i></button>
          <button type="button" class="btn btn-secondary"><i class="far fa-clone"></i></button>
          <button type="button" class="btn btn-secondary"><i class="far fa-clone"></i></button>
         
        </div>
      </div> 

      <div class="mr-2">
        <div>
          Mode
        </div>
        <div class="btn-group" role="group" aria-label="Third group">
          <button type="button" class="btn btn-secondary"><i class="far fa-edit"></i></button>
          <button type="button" class="btn btn-secondary"><i class="far fa-eye"></i></button>
        </div>
      </div>

       <div>
        <div>
          Placeholder
        </div>
        <div class="btn-group" role="group" aria-label="Third group">
          <button type="button" class="btn btn-secondary"><i class="far fa-paper-plane"></i></button>
          <button type="button" class="btn btn-secondary"><i class="far fa-paper-plane"></i></button>
        </div>
      </div>                               
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {
      show: true
    }
  },
  methods: {
    toggleToolbar() {

    }
  }
}
</script>

<style>
.btn-toolbar {
  font-size: 0.8rem;
  
}

</style>
