<template>
  <div>
    <div class="pshow_bg" @click="startAuto"></div>
    <el-carousel autoplay="autoplay" indicator-position="outside" trigger="click" height="500px"
                 style="float:left;position:relative;left:20%;width: 60%" @click="stopAuto">
      <el-carousel-item v-for="item in postData" :key="item">
        <!--        <h3>{{ item }}</h3>-->
        <el-card class="box-card" >

            <div style="text-align: center" slot="header" class="clearfix">
              <span style="padding-left: 60px">{{ item.title }}
                <el-button style="float: right; padding: 3px 0" type="text" ><router-link to="/login" style="text-decoration-line: none">管理员登录</router-link></el-button></span><br>
              <span style="font-size: xx-small;">{{ item.editor }}&nbsp;&nbsp;{{ item.date }}</span>
<!--              <el-button style="float: right; padding: 3px 0" type="text" ><router-link to="/login" style="text-decoration-line: none">管理员登录</router-link></el-button>-->
            </div>


          <div  class="text item">
            {{ item.content }}
          </div>
        </el-card>
      </el-carousel-item>
    </el-carousel>

  </div>


</template>

<script>
export default {
  name: "Pshow",
  data() {
    return {
      autoplay: true,
      postData:[],
    }
  },
  computed:{
    commendContent(){
      let arr = this.postData.content.split("");
      return arr.map((item) => {
        return item === "\n" ? "<br>" : item
      }).join("")
    }
  },
  mounted() {
    this.get_Post()
  },
  methods:{
    startAuto:function(){
      if(this.autoplay == false){
        this.autoplay = true;
      }
    },
    stopAuto:function(){
      if(this.autoplay == true){
        this.autoplay = false;
      }
    },
    get_Post(){
      this.$axios.get('/post/list').then((res)=>{
        if (res){
          this.postData = res.data.rows
        }else {
          this.$message.error("接口无响应哎~")
        }
      })
    },
  }
}
</script>

<style scoped>
/*.el-carousel__item h3 {*/
/*  color: #475669;*/
/*  font-size: 18px;*/
/*  opacity: 0.75;*/
/*  line-height: 300px;*/
/*  margin: 0;*/
/*}*/

/*.el-carousel__item:nth-child(2n) {*/
/*  background-color: #99a9bf;*/
/*}*/

/*.el-carousel__item:nth-child(2n+1) {*/
/*  background-color: #d3dce6;*/
/*}*/

.text {
  font-size: 14px;
  /*text-indent: 32px;*/
  white-space:pre-line;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  /*width: 480px;*/
  border-radius: 0px;
  border: 0;
  height: 100%;
  /*background-color: rgba(191, 198, 211, 0.94);*/
  background-color: rgba(211, 221, 224, 0.69);
  background-image: url("https://img0.baidu.com/it/u=2592593803,2478995723&fm=253&fmt=auto&app=138&f=JPEG?w=353&h=500");
  background-repeat: no-repeat;
  position: fixed;
  background-size: 100% 100%;
}

.el-card_header {

}

.pshow_bg {
  width: 100%;
  /*background-color: #99a9bf;*/
  height: 100%;
  position: fixed;
  filter: blur(10px);
  background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F29%2F20200629024731_sayoh.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652277515&t=e6b9ce19e29ec031bd4ccece2070d65d");
}

</style>