<script setup lang="ts">
  import 'animate.css'
  import {
    useStore
  } from '@/stores'
  import {
    onMounted
  } from 'vue'
  import * as echarts from 'echarts' //echarts 5的引入
  import './assets/china'
  import {
    geoCoordMap
  } from './assets/geoMap'
  const store = useStore()

  onMounted(async () => {
    await store.getList()
    initCharts()
    initPie()
    initLine()
  })
  const initCharts = () => {
    const city = store.list.diseaseh5Shelf.areaTree[0].children
    store.item = city[1].children
    const data = city.map(v => {
      return {
        name: v.name,
        value: geoCoordMap[v.name].concat(v.total.nowConfirm),
        children: v.children
      }
    })
    const charts = echarts.init(document.querySelector('#china') as HTMLElement)

    charts.setOption({
      // backgroundColor: "black",
      geo: {
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"],
        layoutSize: "120%",
        itemStyle: {
          // normal: {
          areaColor: {
            type: "linear-gradient",
            x: 0,
            y: 1200,
            x2: 1000,
            y2: 0,
            colorStops: [{
                offset: 0,
                color: "#152E6E", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0673AD", // 50% 处的颜色
              },
            ],
            global: true, // 缺省为 false
          },
          shadowColor: "#0f5d9d",
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 0.5,
          // },

        },
        emphasis: {
          areaColor: "#0f5d9d",
        },

        regions: [{
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            // normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
              // },
            },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        }, ],
      },
      series: [{
          type: "map",
          // selectedMode: "multiple",
          map: "china",
          aspectScale: 0.8,
          layoutCenter: ["50%", "50%"], //地图位置
          layoutSize: "120%",
          zoom: 1, //当前视角的缩放比例
          // roam: true, //是否开启平游或缩放
          scaleLimit: {
            //滚轮缩放的极限控制
            min: 1,
            max: 2,
          },
          label: {
            show: true,
            color: "#FFFFFF",
            fontSize: 12,
          },
          itemStyle: {
            // normal: {
            areaColor: "#0c3653",
            borderColor: "#1cccff",
            borderWidth: 1.8,
            // },

          },
          emphasis: {
            areaColor: "#56b1da",
            label: {
              show: true,
              color: "#fff",
            },
          },
          data: data,
        },
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
          // symbolSize: [30,120],
          // symbolOffset:[0, '-40%'] ,
          symbol: 'pin',
          symbolSize: [45, 45],
          label: {
            // normal: {
            show: true,
            color: '#fff',
            formatter(value: any) {
              return value.data.value[2]
            }
            // }
          },
          itemStyle: {
            // normal: {
            color: '#1E90FF', //标志颜色
            // }
          },
          data: data,
          zlevel: 1
        },
      ],
    })
    charts.on('click', (e: any) => {
      store.item = e.data.children
    })
  }

  const initPie = () => {
    const charts = echarts.init(document.querySelector('.box-left-pie') as HTMLElement)
    charts.setOption({
      tooltip: {
        trigger: 'item'
      },
      // legend: {
      //   top: '5%',
      //   left: 'center'
      // },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        // avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15'
          }
        },
        // labelLine: {
        //   show: false
        // },
        data: store.cityDetail.map(v => {
          return {
            name: v.city,
            value: v.nowConfirm
          }
        })
      }]
    })
  }
  const initLine = () => {
    const charts = echarts.init(document.querySelector('.box-left-line') as HTMLElement)
    charts.setOption({
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: store.cityDetail.map(v => v.city),
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      label: {
        show: true,
      },
      series: [{
        data: store.cityDetail.map(v => v.nowConfirm),
        type: 'line',
        smooth: true
      }]
    }  )
  }
</script>

<template>
  <div class="box">
    <div class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{ store.chinaAdd.localConfirmH5 }}</div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.nowConfirm }}</div>
          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.confirm }}</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.noInfect }}</div>
          <div>{{ store.chinaTotal.noInfect }}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.importedCase }}</div>
          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.dead }}</div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <div class="box-left-pie"></div>
      <div class="box-left-line"></div>
    </div>
    <div class="box-center" id="china">
    </div>
    <div class="box-right">
      <table class="table" cellspacing="0" border="1">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group enter-active-class="animate__animated animate__flipInX" tag="tbody">
          <tr v-for="item in store.item" :key="item.name">
            <td align="center">{{item.name}}</td>
            <td align="center">{{item.today.confirm}}</td>
            <td align="center">{{item.total.confirm}}</td>
            <td align="center">{{item.total.heal}}</td>
            <td align="center">{{item.total.dead}}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>
<style lang="scss">
  * {
    padding: 0;
    margin: 0;
  }

  $itemColor: #41b0db;
  $itemBg: #223651;
  $itemBorder: #212028;

  html,
  body,
  #app {
    height: 100%;
  }

  .box {
    height: 100%;
    background: url('./assets/1.jpg');
    overflow: hidden;

    display: flex;
    padding: 10px;
    color: #fff;

    &-left {
      width: 400px;

      &-card {
        display: grid;
        grid-template-columns: auto auto auto;
        grid-template-rows: auto auto;

        section {
          background: $itemBg;
          border: 1px solid $itemBorder;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 14px;

          div:nth-child(2) {
            color: $itemColor;
            padding: 10px 0;
            font-size: 20px;
            font-weight: bold;
          }
        }
      }

      &-pie {
        height: 350px;
        margin-top: 20px;
        background: $itemBg;
      }

      &-line {
        height: 350px;
        margin-top: 20px;
        background: $itemBg;
      }
    }

    &-center {
      flex: 1;
    }

    &-right {
      width: 400px;

      .table {
        width: 100%;
        background: #212028;

        tr {
          th {
            padding: 5px;
            white-space: nowrap;
          }

          td {
            padding: 5px 10px;
            width: 100px;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>