<template>
  <div style="width: 100%;">
    <div
        style="background-color: white;height: 50px; margin-top: 5px; border-radius: 5px; margin-bottom: 20px;padding: 10px; ">
      <div class="input_name">
        <el-button type="primary" @click="dialogVisible = true" class="subAdmin" style="float: right">新增</el-button>
      </div>
    </div>

      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%; border-radius: 5px" height="450">
        <el-table-column prop="id" label="管理员编号" width="100"></el-table-column>
        <el-table-column prop="username" label="管理员姓名" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="password" label="密码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="role_name" label="角色名" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增表单 -->
      <el-dialog title="管理员信息" :visible.sync="dialogVisible">
        <el-form :model="form" size="small" inline="true" ref="admin_form" v-loading="loading">
          <el-form-item label="管理员姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.username" autocomplete="off" class="input_yg"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="form.password" autocomplete="off" class="input_yg"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false;submitAdmin()">新增/修改</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
      </el-dialog>

  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "Admin",
  data() {
    return{
      dialogVisible: false,
      loading:'',
      tableData: [],
      multipleSelection: [],
      form: {
        id: '',
        username: '',
        password: '',
        role_name: ''
      },
      formLabelWidth: '90px',
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$axios.get('/admin/list').then(res => {
        this.tableData = res.data.rows
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDelete(index, row) {
      if (row.id == 1){
        this.$message.error("超级管理员不能删除")
        return false
      }else {
        let data = {
          ids: row.id
        }
        this.$axios.post('/admin/delete',qs.stringify(data)).then(res => {
          if (res) {
            this.$message.success('删除成功')
            this.load()
          }else {
            this.$message.error('删除失败')
          }
        }).catch(error => {
          this.$message.error('系统异常')
        })
      }
    },
    handleEdit(index, row) {
      this.form.id = row.id
      this.dialogVisible = true
    },
    submitAdmin() {
      this.$refs.admin_form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$axios.post('/admin/save',qs.stringify(this.form)).then(res => {
            if (res.data.code == 200) {
              this.$message.success("上传成功")
              this.loading = false
              this.$refs.admin_form.resetFields()
              this.load()
            }else {
              this.$message.error("上传失败")
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>