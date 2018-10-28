<template>
  <header>
    <div class="left">
      <div class="fa fa-bars hamburger" v-on:click="toggleExpand()"></div>
      <a href="#"><img class="logo-b" src="../assets/logo.png"></a>
    </div>
    <div class="center">
      <!--
      <input type="text" v-model="no" placeholder="Search">
      <button class="btn btn-block" v-on:click="load" type="button">Load</button>
      -->
      <div class="input-group search_box">
        <input type="text"  v-model="no" class="form-control no" placeholder="病歷號/床號/身分證字號" >
        <div class="input-group-append">
          <button class="btn" type="button" v-on:click="load" >Load</button>
        </div>
      </div>
    </div>
    <div class="right">
      <i class="fa fa-search"></i>
      <div class="logout" v-on:click="logout()" replace>
        <i class="fa fa-sign-out-alt"></i>
        <span>Logout</span>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      isExpanded: false,
      no:"",
      status:""
    }
  },
  methods: {
    toggleExpand() {
      //Side Menu Toggle
      this.isExpanded = !this.isExpanded
      this.$emit('isExpanded', this.isExpanded)
    },
    logout() {
      //Logout
      let logout = confirm('Sure you want to log out?')
      if (logout == true) {
        this.$emit('authenticated', false)
        this.$router.replace({ name: 'login' })
      }
    },
    load(){
      if (this.no){
        this.status=""
        this.$wf.note.sess({no:this.no}).then(($raw)=>{
          let $sess=$raw.data
          if ($sess.fee_no){
            this.$router.push({name:'edit',params:{fee_no:$sess.fee_no}})

          }
        })
        
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/global.scss';

header {
  display: flex;
  justify-content: space-between;
  z-index: 2;
  position: relative;
  padding: 8px 10px;
  border-bottom: 1px solid #dadce0;

  .left {
    display: flex;
    align-items: center;

    .hamburger {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      padding: 12px;
      cursor: pointer;
      height: 45px;
      width: 45px;
      background: #ededed;
    }

    .logo-b {
      margin-left: 20px;
      height: 41px;
      width: auto;

      @media screen and (max-width: $break-medium) {
        display: none;
      }
    }
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: left;
    flex: 3;
    margin: 0 15px;

    @media screen and (max-width: $break-medium) {
      justify-content: center;
    }
    .search_box{
        width:30rem;
        padding-left: 0.5rem;
    }
    .no {
      /*
      padding: 1.2rem 1rem 1.2rem 3.2rem;
      height: 40px;
      font-size: 0.9rem;
      color: #4a4a4a;
      border: none;
      border-radius: 0;
      position: relative;
      right: 0;
      letter-spacing: 0.05rem;
      background: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-128.png)
        #ececec;
      background-repeat: no-repeat;
      background-position: 1rem 50%;
      background-size: 2rem;
      outline: 0;
      transition: background 0.3s ease-out, opacity 0.5s ease-out;
      width: 50%;
      */
      background: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-128.png);
      background-repeat: no-repeat;
      background-position: 0.3rem 50%;
      background-size: 1.5rem;
      padding-left:2rem;
      @media screen and (max-width: 1024px) {
        width: 100%;
      }

      @media screen and (max-width: $break-medium) {
        width: 70%;
      }

      @media screen and (max-width: $break-small) {
        width: 70%;
      }
    }
  
    button {
      /*
      height: 40px;
      width: 120px;
      color: #fff;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      cursor: pointer;
      outline: 0;
      transition: all 0.4s ease-out;
      border-radius: 0;
      background: $blue;
      */
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      @media screen and (max-width: $break-small) {
        width: 70px;
        font-size: 12px;
        letter-spacing: 1px;
        padding: 8px;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .fa-search {
      display: none;
    }

    .logout {
      cursor: pointer;

      i {
        margin-right: 5px;
      }

      span {
        @media screen and (max-width: $break-medium) {
          display: none;
        }
      }
    }
  }
}
</style>
