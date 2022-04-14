<template>
  <div style="width: 100%;">
    <div style="background-color: white;height: 50px; margin-top: 5px; border-radius: 5px; margin-bottom: 20px; padding: 10px">
<!--      <el-button type="danger" @click="deletePosition" class="subPosition">删除</el-button>-->
<!--      <el-button type="primary" @click="dialogVisible = true" class="subPosition">新增</el-button>-->
      <div class="input_name">
        <el-input v-model="name" style="width: 200px" placeholder="请输入需要查询的职位名称" @keyup.enter="this.load()"></el-input>
        <el-button icon="" style="margin-left: 5px" type="primary" @click="load">搜索</el-button>
        <el-button type="danger" @click="deletePosition" class="subPosition">删除</el-button>
        <el-button type="primary" @click="dialogVisible = true" class="subPosition">新增&修改</el-button>
      </div>
    </div>
    <el-table ref="multipleTable" :data="tableData1" tooltip-effect="dark" style="width: 100%; border-radius: 5px"
              @selection-change="handleSelectionChange" height="450">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="id" label="职位编号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="职位名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="description" label="职位描述" show-overflow-tooltip></el-table-column>
  </el-table>

    <!--表单修改与新增-->
    <el-dialog title="职位信息" :visible.sync="dialogVisible">
      <el-form :model="form" size="small" inline="true" ref="zw_form" v-loading="loading">
        <el-form-item label="职位编号" :label-width="formLabelWidth" prop="id">
          <el-input v-model="form.id" autocomplete="off" class="input_yg" placeholder="新增职位时无需输入"></el-input>
        </el-form-item>
        <el-form-item label="职位名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" class="input_yg"></el-input>
        </el-form-item>
        <el-form-item label="职位描述" :label-width="formLabelWidth" prop="description">
          <el-input v-model="form.description" autocomplete="off" class="input_yg"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false;submitPosition()">新 增</el-button>
        <el-button type="primary" @click="dialogVisible = false;updatePosition()">修 改</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "Position",
  data() {
    return{
      tableData1: [],
      multipleSelection: [],
      dialogVisible: false,
      loading: false,
      formLabelWidth: '80px',
      name:'',
      form: {
        id: '',
        name: '',
        description: '',
        updateFlag:'',
      },
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$axios.get("/position/list",{
        params:{
          // id:this.id,
          name:this.name
        }
      }).then(res => {
        if (res) {
          this.tableData1 = res.data.rows
        }else {
          this.$message.error("异常系统")
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deletePosition(){
      this.delarr = this.multipleSelection.map(v=>v.id)
      if (this.delarr != ""){
        let deldata = {
          ids: this.delarr.join(',')
        }
        this.$axios.post('/position/delete', qs.stringify(deldata)).then(res => {
          if (res) {
            this.deldata = []
            this.$message.success("删除成功！~~~~~~~~~")
            this.load()
          } else {
            this.$message.error("删除失败！")
          }
        }).catch((error) => {
          this.$message.error("系统异常！")
        })
      }else {
        this.$message.error('请选择职位删除')
        return false
      }
    },
    submitPosition() {
      this.$refs.zw_form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.updateFlag = "no"
          this.$axios.post('/position/save', qs.stringify(this.form)).then((res) => {
            if (res.data.code == 200) {
              this.loading = false
              this.$message.success("上传成功！~~~~~~~~~~")
              // this.form={}
              this.load()
              this.$refs.zw_form.resetFields()
            } else {
              this.$message.error('上传失败，参数不合法或有重复~~~')
              this.loading = false
            }
          }).catch((error) => {
            this.$message.error("系统异常")
          })
        } else {
          this.$message.error('请输入所有字段！')
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
.subPosition {
  float: right;
}
.input_name{

}
</style>