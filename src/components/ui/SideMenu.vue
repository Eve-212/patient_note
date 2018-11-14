<template>
  <div class="side-menu" :class="{expanded: $store.state.MainPushed}">
    <ul>
      <li>
        <router-link :to="{ name: 'dashBoard' }">
          <i class="fa fa-book-open fa-2x"></i>
          <span class="nav-text">Dashboard</span>
        </router-link>
      </li>
     <li>
        <router-link :to="{ name: 'edit' }">
          <i class="fa fa-pen fa-2x"></i>
          <span class="nav-text">Edit</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import '@/assets/sass/main.scss';

.side-menu {
  background: $color-grey-light;
  position: fixed;
  top: 5rem;
  width: 5.5rem;
  height: 100%;
  overflow: hidden;
  transition: width 0.1s linear;
  z-index: 100;
  &:hover,
  &.expanded {
    width: 20rem;
    overflow: visible;
    box-shadow: 3px 3px 10px -2px rgba(20%, 20%, 40%, 0.5);
    @media screen and (max-width: $break-small) {
      width: 17rem;
    }
  }
  @media screen and (max-width: $break-small) {
    top: 4.5rem;
    width: 5rem;
  }
  li {
    display: block;
    margin: 2rem 0;
    &:hover a {
      background-color: $color-white;
    }
    a {
      display: table;
      color: lighten($color: $color-black, $amount: 10%);
      text-decoration: none;
      font-size: $default-font-size;
      i {
        font-size: $default-font-size;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6.5rem;
        height: 3rem;
        @media screen and (max-width: $break-small) {
          width: 6rem;
        }
      }
      span {
        display: table-cell;
        width: 100%;
      }
    }
  }
}
</style>
