<template>
  <div style="width: 100%;">
    <div
        style="background-color: white;height: 50px; margin-top: 5px; border-radius: 5px; margin-bottom: 20px;padding: 10px; ">
      <!--      <Search></Search>-->
      <div class="input_name">
        <el-input v-model="name" style="width: 150px" placeholder="请输入需要查询的姓名" @keyup.enter="this.load"></el-input>
        <el-button icon="" style="margin-left: 5px" type="primary" @click="load">搜索</el-button>
        <el-button type="danger" @click="deleteUser" class="subUser">删除</el-button>
        <el-button type="primary" @click="dialogVisible = true" class="subUser">新增&修改</el-button>
      </div>

      <!--      <el-button type="primary" @click="dialogVisible_up = true" class="upUser">修改</el-button>-->

    </div>

    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%; border-radius: 5px"
              @selection-change="handleSelectionChange" height="450">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="id" label="员工编号" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" show-overflow-tooltip></el-table-column>
      <el-table-column prop="phone" label="电话" show-overflow-tooltip></el-table-column>
      <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
      <el-table-column prop="education" label="学历" show-overflow-tooltip></el-table-column>
      <el-table-column prop="birthday" label="生日" show-overflow-tooltip></el-table-column>
      <el-table-column prop="department.id" label="部门编号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="position.id" label="职位编号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="state.name" label="状态" show-overflow-tooltip></el-table-column>
    </el-table>
    <!-- 新增与修改表单 -->
    <el-dialog title="员工信息" :visible.sync="dialogVisible">
      <el-form :model="form" size="small" inline="true" :rules="rules" ref="yg_form" v-loading="loading">
        <el-form-item label="员工编号" :label-width="formLabelWidth" prop="id">
          <el-input v-model="form.id" autocomplete="off" class="input_yg"></el-input>
        </el-form-item>

        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" class="input_yg"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off" class="input_yg"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off" class="input_yg"></el-input>
        </el-form-item>

        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off" class="input_yg"></el-input>
        </el-form-item>

        <el-form-item label="学历" :label-width="formLabelWidth" prop="education">
          <el-select v-model="form.education" placeholder="请选择学历">
            <el-option label="高中" value="高中"></el-option>
            <el-option label="大学" value="大学"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="生日" :label-width="formLabelWidth" prop="birthday">
          <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <br>

        <el-form-item label="部门编号" :label-width="formLabelWidth" prop="dept_id">
          <el-select v-model="form.dept_id" placeholder="请选择部门编号">
            <el-option :label="item.id" :value="item.id" v-for="item in dept_id"></el-option>
<!--            <el-option label="2" value="2"></el-option>-->
          </el-select>
        </el-form-item>

        <el-form-item label="职位编号" :label-width="formLabelWidth" prop="pos_id">
          <el-select v-model="form.pos_id" placeholder="请选择职位编号">
            <el-option :label="item.id" :value="item.id" v-for="item in position_id"></el-option>
<!--            <el-option label="2" value="2"></el-option>-->
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth" prop="state_name">
          <el-select v-model="form.state_name" placeholder="请选择状态">
            <el-option label="离职" value="离职" ></el-option>
            <el-option label="在职" value="在职" ></el-option>
            <!--            <el-option label="2" value="2"></el-option>-->
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false;updateUser()">修 改</el-button>
        <el-button type="primary" @click="dialogVisible = false;submitUser()">新 增</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改嵌入表单 -->


  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: "User",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      dialogVisible_dl: false,
      delarr: [],
      dept_id:[],
      position_id:[],
      id: "",
      name: "",
      input: "",
      form: {
        id: '',
        name: '',
        sex: '',
        education: '',
        birthday: '',
        dept_id: '',
        pos_id: '',
        email: '',
        phone: '',
        address: '',
        updateFlag: '',
        state_name:'',
      },
      ids: [],
      shuzu: [],
      loading: false,
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur'}
        ],
        id: [
          {required: true, message: '请输入员工编号', trigger: 'blur'}
        ],
        birthday: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        education: [
          {required: true, message: '请输入学历', trigger: 'blur'}
        ],
        dept_id: [
          {required: true, message: '请选择部门编号', trigger: 'change'}
        ],
        pos_id: [
          {required: true, message: '请选择职业编号', trigger: 'change'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        phone: [
          {required: true, message: '请输入电话', trigger: 'blur',},
        ],
        address: [
          {required: true, message: '请输入地址', trigger: 'blur'}
        ],
      },
      formLabelWidth: '80px',
    }
  },
  // created() {
  //   this.load()
  // },
  mounted() {
    this.load()
    this.get_dp_id()
    this.get_pt_id()
  },
  watch() {
    // for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
    //   this.delarr.push(this.multipleSelection[i].id)
    // }
    // this.handleSelectionChange()

  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // for (let i = 0; i <= val.length - 1; i++) {
      //   this.delarr.push(val[i].id)
      // }
      this.delarr = this.multipleSelection.map(v => v.id)
    },

    //获取部门id
    get_dp_id(){
      this.$axios.get("/dept/list").then((res) => {
        if (res) {
          this.dept_id = res.data.rows
          console.log(this.dept_id)
        }else {
          console.log("获取部门数据失败")
        }
      })
    },

    //获取职位id
    get_pt_id(){
      this.$axios.get("/position/list").then((res) => {
        if (res) {
          this.position_id = res.data.rows
          // console.log(this.dept_id)
        }else {
          console.log("获取职位数据失败")
        }
      })
    },

    //加载数据
    load() {
      this.$axios.get("/empl/list", {
        params: {
          // id:this.id,
          name: this.name
        }
      }).then((res) => {
        if (res) {
          this.tableData = res.data.rows
        } else {
          this.$message.error("系统异常")

        }
      }).catch((error) => {
        this.$message.error("系统异常")
      })
    },

    submitUser() {
      this.$refs.yg_form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.updateFlag = 'no'
          this.$axios.post('/empl/save', qs.stringify(this.form)).then((res) => {
            if (res.data.code == "200") {
              this.loading = false
              this.$message.success("上传成功！~~~~~~~~~~")
              // this.form={}
              this.load()
              this.$refs.yg_form.resetFields()
            } else {
              this.$message.error('上传失败，参数不合法或有重复~~~')
              this.load()
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
    updateUser() {
      this.$refs.yg_form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.updateFlag = 'yes'
          this.$axios.post('/empl/save', qs.stringify(this.form)).then((res) => {
            if (res.data.code == "200") {
              this.loading = false
              this.$message.success("修改成功！~~~~~~")
              // this.form={}
              this.load()
              this.$refs.yg_form.resetFields()
            } else {
              this.$message.error('修改失败')
              this.load()
              this.loading = false
              this.$refs.yg_form.resetFields()
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
    deleteUser() {
      // this.axios.post('/empl/delete',this.delarr)
      // for (let i = 0; i <= this.multipleSelection.length -1; i++) {
      //   this.delarr = this.multipleSelection[i].id
      // }
      // const ids = new FormData()
      // ids.values(this.multipleSelection.map(v=>v.id))
      this.delarr = this.multipleSelection.map(v => v.id)
      if (this.delarr != ""){
        let deldata = {
          ids: this.delarr.join(',')
        }
        this.$axios.post('/empl/delete', qs.stringify(deldata)).then(res => {
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
        this.$message.error('请选择需要删除的数据')
        return false
      }
    },
  }
}
</script>

<style scoped>
.subUser {
  /*margin-top: 10px;*/
  /*margin-right: 10px;*/
  float: right;
}

.upUser {
  /*margin-top: 10px;*/
  /*margin-right: 10px;*/
  /*float: right;*/
}

/*.input_yg {*/
/*  !*width: 200px;*!*/
/*}*/
.input_name {
  /*  width: 200px;*/
  /*  margin-left: 10px;*/
  /*  margin-top: 10px;*/
}
</style>