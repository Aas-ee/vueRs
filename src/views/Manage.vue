<template>
  <el-container style="min-height: 100vh ;background-color: rgba(211,221,224,0.69)">

    <el-aside :width="sideWidth + 'px'"
              style="background-color: rgb(238, 241, 246);box-shadow: rgb(0 21 41 / 35%) 2px 0px 6px;position: relative">
      <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
    </el-aside>

    <el-container>
      <el-header style="border-bottom: 1px solid #ccc;">
        <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse" />
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>

import Header from "../components/Header"
import Aside from "../components/Aside"

export default {
  name: 'Manage',
  props: {},
  components: {
    Header,
    Aside
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
      isCollapse: false,
      collapseBtnClass: 'el-icon-s-fold',
      sideWidth: 200,
      logoTextShow: Boolean
    }
  },
  methods: {
    collapse() {   //点击收缩按钮出发
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {   //收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    }
  }
}
</script>

<style scoped>

</style>
