<template>
  <transition name="modal">
    <div class="modal" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <div class="modal-close">
            <slot name="close">
              <div @click="$emit('close')">&times;</div>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {}
</script>

<style lang="scss">
.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  &-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  &-container {
    width: 400px;
    margin: 0 auto;
    padding: 15px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    position: relative;
    border-radius: 5px;
  }
  &-close {
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
    line-height: 22px;
    border-radius: 50%;
    text-align: center;
    background: #fff;
    border: 1px solid lighten(#aaacac, 15%);
    color: #aaacac;
  }
  &-body {
    margin: 20px 0;
  }
}
/* auto-applied to elements with transition="modal" by Vue.js. */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>