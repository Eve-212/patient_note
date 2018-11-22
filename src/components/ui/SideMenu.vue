<template>
  <div class="side-menu" :class="{expanded: $store.state.sideExpanded}">
    <ul>
      <li :class="{currentPage : $route.name == 'dashBoard'}">
        <router-link :to="{ name: 'dashBoard' }">
          <i class="fa fa-book-open fa-2x"></i>
          <span class="nav-text">Dashboard</span>
        </router-link>
      </li>
      <li :class="{currentPage : $route.name == 'edit'}">
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
  background: $color-white;
  position: fixed;
  top: 3.5rem;
  width: 3.5rem;
  height: 100%;
  overflow: hidden;
  transition: width 0.1s linear;
  z-index: 100;
  border-right: 1px solid #e0e0e0;
  &:hover,
  &.expanded {
    width: 13rem;
    overflow: visible;
    box-shadow: 1px 1px 10px -3px rgba(20%, 20%, 40%, 0.5);
    @media screen and (max-width: $break-large) {
      display: block;
      width: 30%;
    }
    @media screen and (max-width: $break-medium) {
      width: 50%;
    }
    @media screen and (max-width: $break-small) {
      top: 3rem;
      width: 100%;
    }
  }
  @media screen and (max-width: $break-large) {
    display: none;
  }
  ul {
    padding-left: 0;
    li {
      display: block;
      margin: 1rem 0 0.5rem 0;
      &.currentPage {
        i {
          background: $color-primary;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          margin: 0 12px;
          color: $color-white;
        }
      }
      &:hover a {
        background-color: $color-grey-light;
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
          width: 3.5rem;
          height: 2.5rem;
        }
        span {
          display: table-cell;
          width: 100%;
        }
      }
    }
  }
}
</style>
