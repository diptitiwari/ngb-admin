<template>
  <div>
    <vx-card class="mb-base">
      <vs-table :max-items="5" pagination :data="eventOrders" search>
        <template slot="header">
          <!-- ADD NEW -->
          <span class="order-1">
            <vs-button
              icon-pack="feather"
              icon="icon-plus"
              @click="eventOrderCreatePopup=true"
              size="small"
            >{{$t('button.addeventorder')}}</vs-button>
          </span>
        </template>
        <template slot="thead">
          <vs-th>{{$t('table.eventName')}}</vs-th>
          <vs-th>{{$t('table.bookedDate')}}</vs-th>
          <vs-th>{{$t('label.item.chargecode')}}</vs-th>
          <vs-th>{{$t('table.eventPrice')}}</vs-th>
          <vs-th>{{$t('label.heading.status')}}</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].eventName">{{data[indextr].eventName}}</vs-td>

            <vs-td :data="data[indextr].bookedDate">{{data[indextr].bookedDate}}</vs-td>
            <vs-td :data="data[indextr].chargecode">{{data[indextr].chargecode}}</vs-td>

            <vs-td :data="data[indextr].eventPrice">{{data[indextr].eventPrice}}</vs-td>
            <vs-td :data="data[indextr].status">
              <vs-chip
                :color="getOrderStatusColor(data[indextr].status)"
                class="product-order-status"
              >{{data[indextr].status}}</vs-chip>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
    <div class="centerx">
      <vs-popup
        classContent="popup-example"
        :title="$t('label.eventorder')"
        :active.sync="eventOrderCreatePopup"
      >
        <form>
          <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
            <div class="vx-col mb-2 w-full">
              <small class="date-label font-semibold">{{$t('label.eventdate')}}</small>
              <datepicker name="start-date" :label="$t('label.eventdate')"></datepicker>
            </div>
            <div class="vx-col mb-2 w-full">
              <small class="date-label font-semibold">{{$t('label.events')}}</small>
              <v-select
                label="text"
                :options="events"
                placeholder="Select Events"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full font-semibold"
              />
            </div>
            <div class="vx-col mb-2 w-full">
              <small class="date-label font-semibold">{{$t('label.formattype')}}</small>
              <v-select
                label="text"
                :options="formattype"
                placeholder="Select Format Type"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full font-semibold"
              />
            </div>
            <div class="vx-col mb-2 w-full">
              <small class="date-label font-semibold">{{$t('label.label.opttype')}}</small>
              <v-select
                label="text"
                :options="opttype"
                placeholder="Select OPT Type"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full font-semibold"
              />
            </div>
          </div>

          <div class="vx-row">
            <span class="ml-4 mr-1">
              <vs-button type="border">{{$t('label.button.clear')}}</vs-button>
            </span>
            <span class="ml-1 mr-2">
              <vs-button>{{$t('label.button.save')}}</vs-button>
            </span>
          </div>
        </form>
      </vs-popup>
    </div>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import vSelect from "vue-select";
import {getEventOrderByClient, clientEventOrderTemplate} from '@/http/customer'
export default {
  props: ["clientId"],
  data() {
    return {
      eventOrderCreatePopup: false,
      OnDemand: []
    };
  },
  computed: {
    eventOrders() {
      return this.$store.getters["customer/getClientEventOrders"];
    },
    eventTemplate() {
      return this.$store.getters["customer/getEventOrdersTemplate"];
    },
  },
  methods: {
    async getEventOrders() {
      try {
        const resp = await getEventOrderByClient(this.clientId);
        this.$store.dispatch("customer/setClientEventOrders", resp.data);
      } catch (e) {
        console.log('Something went wrong while retrieving event order for client: ', e);
      }
    },
    async getEventOrderTemplate() {
      try {
        const resp = await clientEventOrderTemplate(this.clientId);
        this.$store.dispatch("customer/SET_EVENT_ORDER_TEMPLATE", resp.data);
      } catch (e) {
        console.log('Something went wrong while retrieving event order for client: ', e);
      }
    }
  },
  components: {
    Datepicker,
    "v-select": vSelect
  },
  created () {
    this.getEventOrders();
  },
  watch: {
    eventOrderCreatePopup (newValue) {
      if(newValue) this.getEventOrderTemplate();
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
