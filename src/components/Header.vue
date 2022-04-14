<template>
  <div style="line-height: 60px; display: flex">
    <div style="flex: 1;" >
      <span :class="collapseBtnClass" style="cursor: pointer;font-size: 18px" @click="collapse"></span>
      <el-breadcrumb separator="/" style="display: inline-block;margin-left: 10px">
        <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-dropdown style="width: 150px; cursor: pointer; text-align: center" >
      <div style="display: inline-block">
        <span>{{ msg }}</span>
        <i class="el-icon-caret-bottom" style="margin-left: 5px"></i>
      </div>
      <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <router-link to="/person">个人信息</router-link>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <span style="text-decoration: none" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    collapse: '',
    pathName: String,
    user: Object,

  },
  data() {
    return {
      msg: "管理员",
    }
  },
  methods: {
    logout() {
      this.$axios.get('/admin/logout').then(res => {
        if (res) {
          localStorage.removeItem("user")
          this.$router.push("/login")
          this.$message.success("退出成功")
        }else {
          this.$message.error('退出失败')
        }
      })
    }
  },
  computed: {
    currentPathName () {
      return this.$store.state.currentPathName;　　//需要监听的数据
    }
  },
  watch: { //监听路由变化
    currentPathName (newVal, oldVal) {
      // console.log(newVal,oldVal)
    }
  }
}
</script>

<style scoped>

</style>