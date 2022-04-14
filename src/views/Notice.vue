<template>
  <div>
    <div style="float: left">
      <el-input v-model="search" size="mini" placeholder="输入id搜索"/>
    </div>
    <el-button type="primary" style="margin-left: 5px" @click="getById">搜索</el-button>
    <el-button type="primary" style="margin-left: 5px" @click="exhibition">新增公告</el-button>
    <el-table :data="tableData2"
              style="width: 100%; margin-top: 2px; border-radius: 5px" height="159">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="发布者" prop="editor"></el-table-column>
      <el-table-column label="日期" prop="date"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div id="main" v-show="markdownVisible" style="margin-top: 5px">
      <mavon-editor v-model="value" style="max-height: 332px" />
      <el-button type="primary" style="float: right; margin-top: 2px" @click="preservation">保存</el-button>
    </div>
    <el-dialog title="公告信息" :visible.sync="dialogVisible">
      <el-form :model="form" size="small"  ref="gg_form" v-loading="loading">

        <el-form-item label="标题" label-width="120px" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入标题" style="width: 220px"></el-input>
        </el-form-item>
        <!--        <el-form-item label="发布者" label-width="120px" prop="admin">-->
        <!--          <el-input v-model="form.admin" autocomplete="off" placeholder="请输入标题"></el-input>-->
        <!--        </el-form-item>-->
<!--        <el-form-item label="发布日期" label-width="120px" prop="date">-->
<!--          <el-date-picker-->
<!--              v-model="form.date"-->
<!--              type="date"-->
<!--              placeholder="选择日期">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false;release()">发 布</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>

</template>


<script>
import 'mavon-editor/dist/css/index.css'
import qs from "qs";

export default {

  name: "Notice",
  data() {
    return {
      markdownVisible: false,
      value: "",
      tableData2: [],
      search: '',
      loading: false,
      dialogVisible: false,
      form: {
        id: '',
        title: '',
        content: "",
        editor: "",
        // date: "",
      },
      markdownOptionAll: {}
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.$axios.get("/post/list", {
        params: {
          id: this.id
        }
      }).then((res) => {
        if (res) {
          this.tableData2 = res.data.rows
        } else {
          this.$message.error("异常系统")
        }
      })
    },
    changeData(arg, name) {
      // arg[1]
    },
    handleEdit(index, row) {
      console.log(row);
      this.markdownVisible = true
      this.value = row.content
      // this.form.admin_id = row.admin.id
      this.form.id = row.id
    },
    handleDelete(index, row) {
      console.log(row);
      let deldata = {
        ids: row.id
      }
      this.$axios.post('/post/delete', qs.stringify(deldata)).then(res => {
        if (res) {
          this.deldata = []
          this.$message.success("删除成功！~~~~~~~~~")
          this.value = ""
          this.load()
        } else {
          this.$message.error("删除失败！")
        }
      }).catch((error) => {
        this.$message.error("系统异常！")
      })
    },
    Try() {
      console.log(this.value)
    },
    exhibition() {
      this.value = ""
      this.form.id = ""
      this.markdownVisible = true
    },
    preservation() {

      // this.$axios.post('/post/save')
      // this.markdownVisible = false
      this.dialogVisible = true
    },
    release() {
      this.loading = true
      this.dialogVisible = false
      this.form.content = this.value
      this.form.editor = window.localStorage.getItem("user").replace("\"","").replace("\"","")
      // this.form.admin_id = "1"
      this.$axios.post('/post/save',qs.stringify(this.form)).then((res)=>{
        if (res.data.code == "200") {
          this.loading = false
          this.$message.success("上传成功！~~~~~~~~~~")
          // this.form={}
          this.load()
          this.$refs.gg_form.resetFields()
          this.value = ""
        }else {
          this.$message.error('上传失败，参数不合法或有重复~~~')
          this.load()
          this.loading = false
        }
      })
    },
    getById() {

      if (this.search != "") {
        let data = {
          id: this.search,
        }
        this.$axios.post("/post/getById", qs.stringify(data)).then(res => {
          if (res) {
            this.tableData2 = res.data.rows
            this.$message.success('搜索成功')
          } else {
            this.$message.error('搜索失败')
          }
        })
      }else {
        this.$message.error("请输入id搜索")
        return false
      }
    }

  },

}
</script>

<style scoped>

</style>