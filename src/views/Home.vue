<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div id="pie" style="width: 500px;height: 400px"></div>
      </el-col>
      <el-col :span="12">
        <div id="line" style="width: 400px;height: 400px"></div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import * as echarts from 'echarts';


export default {
  name: "Home",
  data(){
    return {
      valueData:[],
      DeptData:[],
      deptNameData:[],
    }
  },
  created() {

  },
  methods: {

  },
  mounted() {

      this.$axios.get('/empl/edu').then((res)=>{
        if (res){
          this.valueData = res.data.rows[0]
          let msg = [
            { value: this.valueData.g, name: '高中' },
            { value: this.valueData.d, name: '大学' },
            { value: this.valueData.y, name: '研究生' },
            { value: this.valueData.b, name: '博士' },
          ]
          optionPieChat(msg)
        }else {
          this.$message.error("没接收到数据")
        }
      })

    // var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
    // var lineDom = document.getElementById('line');
    // var lineChart = echarts.init(lineDom);
    // var option;
    // lineChart.showLoading();
    // $.get(ROOT_PATH + '/data/asset/data/flare.json', function (data) {
    //   lineChart.hideLoading();
    //   data.children.forEach(function (datum, index) {
    //     index % 2 === 0 && (datum.collapsed = true);
    //   });
    //   lineChart.setOption(
    //       (option = {
    //         tooltip: {
    //           trigger: 'item',
    //           triggerOn: 'mousemove'
    //         },
    //         series: [
    //           {
    //             type: 'tree',
    //             data: [data],
    //             top: '1%',
    //             left: '7%',
    //             bottom: '1%',
    //             right: '20%',
    //             symbolSize: 7,
    //             label: {
    //               position: 'left',
    //               verticalAlign: 'middle',
    //               align: 'right',
    //               fontSize: 9
    //             },
    //             leaves: {
    //               label: {
    //                 position: 'right',
    //                 verticalAlign: 'middle',
    //                 align: 'left'
    //               }
    //             },
    //             emphasis: {
    //               focus: 'descendant'
    //             },
    //             expandAndCollapse: true,
    //             animationDuration: 550,
    //             animationDurationUpdate: 750
    //           }
    //         ]
    //       })
    //   );
    // });
    // option && lineChart.setOption(option);

    var pieDom = document.getElementById('pie');
    let pieChart = echarts.init(pieDom);
    let optionPieChat = (function (msg) {
      let option = {
        title: {
          text: '员工学历统计',
          subtext: '比例图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '学历',
            type: 'pie',
            radius: '50%',
            data:msg,
            // data: [
            //   // { value: 2, name: '高中' },
            //   // { value: 5, name: '大学' },
            //   // { value: 2, name: '研究生' },
            //   // { value: 3, name: '博士' },
            //   { value: this.valueData, name: '高中' },
            //   { value: this.valueData, name: '大学' },
            //   { value: this.valueData, name: '研究生' },
            //   { value: this.valueData, name: '博士' },
            // ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    option && pieChart.setOption(option);
  })
  }
}
</script>

<style scoped>

</style>