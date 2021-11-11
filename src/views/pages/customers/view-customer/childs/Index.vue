<template>
  <vx-card class="mb-base">
    <vs-table
      :max-items="descriptionItems[0]"
      pagination
      :data="childs"
      description
      search
      :description-items="descriptionItems"
      description-title="Registries"
      description-connector="of"
      description-body="Pages"
    >
      <template slot="header">
        <!-- ADD NEW -->
      </template>
      <template slot="thead">
        <vs-th>{{$t('label.input.accountnumber')}}</vs-th>
        <vs-th>{{$t('label.heading.name')}}</vs-th>
        <vs-th>{{$t('label.heading.email')}}</vs-th>
        <vs-th>{{$t('label.heading.status')}}</vs-th>
        <vs-th>{{$t('label.cellphone')}}</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="index" v-for="(child, index) in data">
          <vs-td :data="child.accountNumber">{{child.accountNumber}}</vs-td>

          <vs-td :data="child.email">{{child.email}}</vs-td>
          <vs-td :data="child.status">
            <vs-chip
              :color="getOrderStatusColor(child.status)"
              class="product-order-status"
            >{{child.status}}</vs-chip>
          </vs-td>
          <vs-td :data="child.phone">{{child.phone}}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>
<script>
import { getChildsByClientId } from "@/http/customer";
import { notifyWarning } from "@/plugins";

export default {
  props: ["clientId"],
  data() {
    return {
      descriptionItems: [5, 10, 15]
    };
  },
  computed: {
    clientDetail() {
      return this.$store.getters["customer/getClientDetail"];
    },
    childs() {
      return this.$store.getters["customer/getClientChild"];
    }
  },
  methods: {
    getOrderStatusColor(status) {
      if (status === "Inactive") return "dark";
      if (status === "New") return "warning";
      return "success";
    },
    async getChilds() {
      try {
        const response = await getChildsByClientId(this.clientId);
        this.$store.dispatch("customer/setClientChild", response.data);
      } catch (error) {
        notifyWarning(error.defaultUserMessage, "Something went wrong");
        console.log("something went to wrong while retrieving child: ", error);
      }
    }
  },
  created() {
    this.getChilds();
  }
};
</script>
<style lang="scss" scoped>
</style>
