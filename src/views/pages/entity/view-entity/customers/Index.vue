<template>
  <div>
    <vx-card>
      <vs-table
        :max-items="descriptionItems[0]"
        class="mt-3"
        pagination
        :data="customers.clientDatas"
        description
        search
        multiple
        v-model="customertbl"
        :description-items="descriptionItems"
        description-title="Registries"
        description-connector="of"
        description-body="Pages"
      >
        <template slot="header" color="primary">
          <!-- ADD NEW -->
          <span class="vx-col order-1">
            <vs-button
              icon-pack="feather"
              icon="icon-plus"
              size="small"
              @click="reaload"
            >{{$t('label.renewal')}}</vs-button>
          </span>
        </template>
        <template slot="thead">
          <vs-th>{{$t('label.Stb Number')}}</vs-th>
          <vs-th>{{$t('label.Customer Number')}}</vs-th>
          <vs-th>{{$t('label.Name')}}</vs-th>
          <vs-th>{{$t('label.Mobile Number')}}</vs-th>
          <vs-th>{{$t('label.Order Number')}}</vs-th>
          <vs-th>{{$t('label.Active Date')}}</vs-th>
          <vs-th>{{$t('label.Expiry Date')}}</vs-th>
          <vs-th>{{$t('label.Balance Amount')}}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :key="index" v-for="(customer, index) in data">
            <vs-td :data="customer.stbId">{{customer.stbId}}</vs-td>
            <vs-td :data="customer.accountNo">{{customer.accountNo}}</vs-td>
            <vs-td :data="customer.displayName">{{customer.displayName}}</vs-td>
            <vs-td :data="customer.phone">{{customer.phone}}</vs-td>
            <vs-td :data="customer.orderId">{{customer.orderId}}</vs-td>
            <vs-td :data="getDate(customer.startDate)">{{getDate(customer.startDate)}}</vs-td>
            <vs-td :data="getDate(customer.endDate)">{{getDate(customer.endDate)}}</vs-td>
            <vs-td :data="customer.balanceAmount">{{customer.balanceAmount}}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>
<script>
import { getEntityCustomers, getEntityById } from "@/http/entity";
import moment from "moment";
export default {
  props: ["entityId"],
  data() {
    return {
      descriptionItems: [5, 10, 15],
      customertbl: ""
    };
  },
  methods: {
    async getCustomers() {
      try {
        const response = await getEntityCustomers(this.entityId);
        this.$store.dispatch("entity/setEntityCustomers", response.data);
      } catch (e) {
        console.log(
          "Something went wrong while retrieving entity Customers",
          e
        );
      }
    },
    async reaload() {
      try {
        const response = await getEntityById(this.entityId);
        this.$store.dispatch("entity/setEntityDetail", response.data);
      } catch (e) {
        console.log("Something went wrong while retrieving entity", e);
      }
    },
    getDate(date) {
      if (date) {
        return moment(date.join("/")).format("DD MMMM YYYY");
      }
      return null;
    }
  },
  computed: {
    customers() {
      return this.$store.getters["entity/getEntityCustomers"];
    }
  },
  created() {
    this.getCustomers();
    this.reaload();
  }
};
</script>
<style lang="scss" scoped>
</style>