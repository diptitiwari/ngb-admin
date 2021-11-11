<!-- =========================================================================================
    File Name: DashboardEcommerce.vue
    Description: Dashboard - Ecommerce
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div>
    <div class="vx-row">
      <div
        class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4"
        v-for="(data, index) in dashboardCardData"
        :key="index"
      >
        <statistics-card-line
          hideChart
          class="mb-base"
          :icon="data.icon"
          icon-right
          :statistic="data.value"
          :statisticTitle="data.title"
        />
      </div>
    </div>
    <div class="vx-row mb-base">
      <div class="vx-col w-full">
        <vx-card>
          <div>
            <vs-tabs position="left">
              <vs-tab label="Client Details for Head Office">
                <div class="tab-text" v-if="clientDetailsChart">
                  <vue-apex-charts
                    type="donut"
                    height="350"
                    :options="clientDetailsChart.chartOptions"
                    :series="clientDetailsChart.series"
                  ></vue-apex-charts>
                </div>
              </vs-tab>
              <vs-tab label="Client Trends for Head Office">
                <div class="tab-text">
                  <vue-apex-charts
                    type="bar"
                    height="350"
                    :options="apexChatData.clientTrendsChart.chartOptions"
                    :series="apexChatData.clientTrendsChart.series"
                  ></vue-apex-charts>
                  <div class="flex flex-wrap">
                    <div class=" sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                      <vs-select
                        autocomplete
                        class="selectExample"
                        label="Office"
                        v-model="office"
                      >
                        <vs-select-item
                          v-for="(item,index) in officeItem"
                          :key="index"
                          :value="item.value"
                          :text="item.text"
                        />
                      </vs-select>
                    </div>
                    <div class="sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/4">
                      <ul class="leftx flex mt-base">
                        <li class="mr-2">
                          <vs-radio v-model="calendar" vs-value="day">Day</vs-radio>
                        </li>
                        <li class="mr-2">
                          <vs-radio v-model="calendar" vs-value="week">Week</vs-radio>
                        </li>
                        <li class="mr-2">
                          <vs-radio v-model="calendar" vs-value="month">Month</vs-radio>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </vs-tab>
              <vs-tab label="Amount Collected for Current Month">
                <div class="tab-text">
                  <vue-apex-charts
                    type="donut"
                    height="350"
                    :options="apexChatData.pieChart.chartOptions"
                    :series="apexChatData.pieChart.series"
                  ></vue-apex-charts>
                </div>
              </vs-tab>
              <vs-tab label="Stock Item Details for Current Month">
                <div class="tab-text">
                  <vue-apex-charts
                    type="donut"
                    height="350"
                    :options="apexChatData.pieChart.chartOptions"
                    :series="apexChatData.pieChart.series"
                  ></vue-apex-charts>
                </div>
              </vs-tab>
              <vs-tab label="Tickets Statistics for Head Office">
                <div class="tab-text">
                  <vue-apex-charts
                    type="donut"
                    height="350"
                    :options="apexChatData.pieChart.chartOptions"
                    :series="apexChatData.pieChart.series"
                  ></vue-apex-charts>
                </div>
              </vs-tab>
              <vs-tab label="STB Count">
                <div class="tab-text">
                  <vue-apex-charts
                    type="donut"
                    height="350"
                    :options="stbChart.chartOptions"
                    :series="stbChart.series"
                  ></vue-apex-charts>
                </div>
              </vs-tab>
            </vs-tabs>
          </div>
        </vx-card>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-full xs:w-full mb-base">
        <!-- USER PROFILE CARD -->
        <vx-card title="User Profile" class="profile-card-hight">
          <!-- ACTION SLOT -->
          <template slot="actions">
            <feather-icon icon="MoreHorizontalIcon"></feather-icon>
          </template>

          <!-- OTEHR DATA -->
          <div class="mt-5">
            <h6>User Name:</h6>
            <p>{{getUserDetail.username}}</p>
          </div>

          <div class="mt-5">
            <h6>Entity Name:</h6>
            <p>{{getUserDetail.officeName}}</p>
          </div>

          <div class="mt-5">
            <h6>Status:</h6>
            <p>Authenticated</p>
          </div>

          <div class="mt-5">
            <h6>Primary Email:</h6>
            <p>{{getUserDetail.email}}</p>
          </div>
        </vx-card>
      </div>
      <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-full xs:w-full">
        <vx-card title="Recent Frequent Activities">
          <vx-timeline :data="timelineData"/>
        </vx-card>
        <!-- <vx-card title="Recent Frequent Activities" class="pb-base"></vx-card>
        <div class="vx-row mt-base flex flex-wrap">
          <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6 mx-auto cursor">
            <a href="fbfdb" class>
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="EyeIcon"
                statisticTitle="Importing"
              />
            </a>
          </div>
          <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6 mx-auto cursor">
            <a href="fbfdb" class>
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="BriefcaseIcon"
                statisticTitle="Jobs"
              />
            </a>
          </div>
          <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6 mx-auto cursor">
            <a href="fbfdb" class>
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="UsersIcon"
                statisticTitle="Create Client"
              />
            </a>
          </div>
          <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6 mx-auto cursor">
            <a href="fbfdb" class>
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="HelpCircleIcon"
                statisticTitle="Help"
              />
            </a>
          </div>
          <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6 mx-auto cursor">
            <a href="fbfdb" class>
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="SettingsIcon"
                statisticTitle="System"
              />
            </a>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  import _ from 'lodash'
  import moment from 'moment'
  import apexChatData from './charts-and-maps/charts/apex-charts/apexChartData'
  import VxTimeline from '@/components/timeline/VxTimeline'
  import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
  import { getAmountCollected, getSTBCounts, getCardData, getClientCounts } from '../http/dashboard'

  const pieChartOptionsObj = {
    series: [],
    chartOptions: {
      dataLabels: {
        enabled: false
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      legend: { show: true },
      chart: {
        type: 'pie',
        offsetY: 0,
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1
        },
        toolbar: {
          show: false
        }
      },
      stroke: {
        lineCap: 'round'
      },
      colors: ['#8e44ad', '#28C76F', '#EA5455', '#FF9F43', '#7367F0'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#8e44ad', '#28C76F', '#EA5455', '#FF9F43', '#7367F0']
        }
      }
    }
  }

  export default {
    data () {
      return {
        apexChatData: apexChatData,
        office: 0,
        officeItem: [
          { text: 'A.Adarsh', value: 0 },
          { text: 'A.Sridar', value: 1 },
          { text: 'Bixpathi.A', value: 2 }
        ],
        calendar: 'month',
        timelineData: [
          {
            color: 'primary',
            icon: 'PlusIcon',
            title: 'importing',
            time: '25 mins Ago',
            route: '/importing'
          },
          {
            color: 'warning',
            icon: 'BriefcaseIcon',
            title: 'Jobs',
            time: '15 Days Ago',
            route: '/jobs'
          },
          {
            color: 'danger',
            icon: 'CodesandboxIcon',
            title: 'Inventory',
            time: '20 days ago',
            route: '/inventory'
          },
          {
            color: 'success',
            icon: 'UsersIcon',
            title: 'Create Client',
            time: '20 days ago',
            route: '/createclient'
          },
          {
            color: 'primary',
            icon: 'HelpCircleIcon',
            title: 'Help',
            time: '25 days ago',
            route: '/help'
          },
        ],
        dashboardCardData: {
          c_active: {
            title: 'Active',
            icon: 'UserCheckIcon',
            value: 0
          },
          c_inactive: {
            title: 'InActive',
            icon: 'UserXIcon',
            value: 0
          },
          c_allocated: {
            title: 'Allocated',
            icon: 'UserPlusIcon',
            value: 0
          },
          c_instock: {
            title: 'InStock',
            icon: 'DownloadIcon',
            value: 0
          }
        }
      }
    },
    components: {
      StatisticsCardLine,
      VxTimeline,
      VueApexCharts
    },
    computed: {
      getUserDetail () {
        return this.$store.getters['auth/userDetail']
      },
      clientDetailsChart () {
        const clientCounts = this.$store.getters['dashboard/getClientCounts'];
        const clientDetailsChart = _.cloneDeep(pieChartOptionsObj);
        clientDetailsChart.series = _.map(clientCounts, 'ccounts');
        clientDetailsChart.chartOptions.labels = _.map(clientCounts, 'status');
        return clientDetailsChart;
      },
      stbChart () {
        const stbCounts = this.$store.getters['dashboard/getSTBCounts'];
        const stbChart = _.cloneDeep(pieChartOptionsObj);
        stbChart.series = _.map(stbCounts, 'cnt');
        stbChart.chartOptions.labels = _.map(stbCounts, 'TotalSTBs');
        return stbChart;
      }
    },
    methods: {
      async getDashboardData () {
        try {
          const response = await getCardData()
          this.$store.dispatch('dashboard/setDashBoardData', response.data)
          _.forEach(response.data, (value, key) => {
            if (!_.isNil(this.dashboardCardData[key])) {
              this.dashboardCardData[key].value = value
            }
          })
        } catch (error) {
          console.log('something went to wrong while getting dashboard data :', error)
        }
      },
      async getChartClientDetails () {
        try {
          const response = await getClientCounts()
          this.$store.dispatch('dashboard/setClientCounts', response.data);
        } catch (error) {
          console.log('something went to wrong while getting client counts:', error)
        }
      },
      async getSTBCounts () {
        try {
          const response = await getSTBCounts()
          this.$store.dispatch('dashboard/setSTBCounts', response.data)
        } catch (error) {
          console.log('something went to wrong while getting client counts:', error)
        }
      },
      async getAmountCollected () {
        const startDate = moment().startOf('month').format('YYYY-MM-DD')
        const endDate = moment().endOf('month').format('YYYY-MM-DD')

        try {
          const response = await getAmountCollected()
          this.stbChart = _.cloneDeep(pieChartOptionsObj)
          this.stbChart.series = _.map(response.cnt, 'ccounts')
          this.stbChart.chartOptions.labels = _.map(response.data, 'TotalSTBs')
        } catch (error) {
          console.log('something went to wrong while getting amount collected for current month', error)
        }
      }
    },
    created () {
      this.getDashboardData()
      this.getChartClientDetails()
      this.getSTBCounts()
    }
  }
</script>

<style lang="scss">
  .chat-card-log {
    height: 400px;

    .chat-sent-msg {
      background-color: #f2f4f7 !important;
    }
  }

  .cursor {
    cursor: pointer;
  }
</style>
