<template>
  <div v-if="orderId && orderDetail">
    <vx-card class="mb-base">
        <div class="vx-row">
                    <div class="vx-col md:w-full lg:w-full w-full">
                      <ul class="horizontal-sm-btn flex mb-2 float-right">
                        <li>
                          <div
                            class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                          >
                            <vs-button
                              color="primary"
                              icon-pack="feather"
                              icon="icon-x"
                              class="truncate"
                              size="small"
                            >{{$t('label.disconnect')}}</vs-button>
                          </div>
                        </li>
                        <li>
                          <div
                            class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                          >
                            <vs-button
                              color="primary"
                              icon-pack="feather"
                              icon="icon-gift"
                              class="truncate"
                              size="small"
                            >{{$t('label.applypromo')}}</vs-button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
      <div class="vx-row">
        <div class="vx-col md:w-1/2  lg:w-1/2 xl:w-1/2">
        <vx-card no-shadow card-border>
          <vs-table stripe :data="orderDetail.orderData">
            <template>
              <vs-tr>
                <vs-td>{{$t('table.orderid')}}</vs-td>
                <vs-td>{{orderDetail.orderData.orderNo}}</vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>{{$t('label.anchor.contractperiod')}}</vs-td>
                <vs-td>{{orderDetail.orderData.contractPeriod}}</vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>{{$t('label.heading.startdate')}}</vs-td>
                <vs-td>{{getDate(orderDetail.startDate)}}</vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>{{$t('label.ordertype')}}</vs-td>
                <vs-td></vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>{{$t('label.billingcycle')}}</vs-td>
                <vs-td></vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vx-card>
        </div>
         <div class="vx-col md:w-1/2  lg:w-1/2 xl:w-1/2">
         <vx-card no-shadow card-border>
          <vs-table stripe :data="orderDetail.orderData">
            <template>
              <vs-tr>
                <vs-td>{{$t('table.orderid')}}</vs-td>
                <vs-td>{{orderDetail.orderData.orderNo}}</vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>{{$t('label.anchor.contractperiod')}}</vs-td>
                <vs-td>{{orderDetail.orderData.contractPeriod}}</vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>{{$t('label.heading.startdate')}}</vs-td>
                <vs-td>{{getDate(orderDetail.startDate)}}</vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>{{$t('label.ordertype')}}</vs-td>
                <vs-td></vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td>{{$t('label.billingcycle')}}</vs-td>
                <vs-td></vs-td>
              </vs-tr>
            </template>
          </vs-table>
         </vx-card>
        </div>
      </div>
    </vx-card>
    
  </div>
</template>
<script>
import { getOrders } from "@/http/customer";
import moment from "moment";
export default {
  data() {
    return {
      orderId: null,
      clentId: null
    };
  },
  computed: {
    orderDetail() {
      return this.$store.getters["customer/getOrderDetail"];
    }
  },
  methods: {
    async getOrder() {
      try {
        const response = await getOrders(this.orderId);
        this.$store.dispatch("customer/setOrderDetail", response.data);
        // console.log("data ave che", response.data);
      } catch (error) {
        console.log(
          "something went to wrong while retrieving entity by id:",
          error
        );
      }
    },
    getDate(date) {
      return moment(date).format("DD MMMM YYYY");
    }
  },
  created() {
    this.orderId = this.$route.params.id;
    this.getOrder();
  }
};
</script>
<style lang="scss" scoped>
</style>