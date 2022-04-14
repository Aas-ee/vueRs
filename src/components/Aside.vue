<template>
  <el-menu :default-openeds="['1']"
           :default-active="this.$route.path"
           style="min-height: 100% ;overflow-x: hidden ;"
           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           :router="true"
           @select="handleSelect"
  >
    <div style="height: 110px;line-height: 30px;text-align: center">
      <img src="../assets/token.png" alt=""
           style="width: 150px;height: 60px;position: relative;top: -5px;margin-right: 5px" v-show="logoTextShow"><br>
      <b style="color: white;margin-right: 5px" v-show="logoTextShow">人事管理系统</b>
    </div>
    <el-menu-item index="/home">
      <i class="el-icon-house"></i>
      <span slot="title">主页</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-s-custom"></i>
      <span slot="title">员工信息管理</span>
    </el-menu-item>
    <el-menu-item index="/position">
      <i class="el-icon-postcard"></i>
      <span slot="title">职位信息</span>
    </el-menu-item>
    <el-menu-item index="/department">
      <i class="el-icon-office-building"></i>
      <span slot="title">部门管理</span>
    </el-menu-item>
    <el-menu-item index="/notice">
      <i class="el-icon-s-claim"></i>
      <span slot="title">公告管理</span>
    </el-menu-item>
    <el-menu-item index="/admin">
      <i class="el-icon-s-platform"></i>
      <span slot="title">管理员管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean,
  },
  methods: {
    handleSelect(index) {
      console.log(index)
      console.log(this.$route.name)
    }
  }
}
</script>

<style scoped>

</style>