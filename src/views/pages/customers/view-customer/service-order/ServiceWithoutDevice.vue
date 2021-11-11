<template>
  <div class="vx-row mt-3">
    <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-full xs:w-full mb-base">
      <h4 class="mb-3">{{$t('label.order.details')}}</h4>
      <small class="date-label font-semibold">Order Date *</small>
      <datepicker name="start-date" :label="$t('label.orderdate')" readonly></datepicker>
      <small class="date-label font-semibold">{{$t('label.button.addservice')}}</small>
      <v-select
        label="text"
        v-model="addService"
        :options="serviceTemplate.serviceData"
        placeholder="Select Service"
        :reduce="serviceCode => serviceCode.id"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
        class="min-w-200 w-full mb-2"
      />
      <!-- USER PROFILE CARD -->
    </div>
    <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-full xs:w-full">
      <h4 class="mb-3">{{$t('label.plandetail')}}</h4>
      <small class="date-label">{{$t('label.input.planlist')}}</small>
      <v-select
        label="name"
        v-model="planList"
        :options="salePlanCategory.allPlanDatas"
        :reduce="name => name.id"
        placeholder="Select Plan List"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
        class="min-w-200  w-full mb-2"
      />
      <small class="date-label font-semibold">{{$t('label.plan')}}</small>
      <v-select
        label="text"
        v-model="plan"
        :options="planOptions"
        placeholder="Select Plan"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
        class="min-w-200 w-full mb-2"
      />
      <div class="vx-row float-right mt-2">
        <div class="vx-col sm:w-full w-full">
          <vs-button class="mr-3 mb-2">{{$t('label.button.submit')}}</vs-button>
          <vs-button color="warning" type="border" class="mb-2">{{$t('label.heading.reset')}}</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getClientServiceTemplate,
  getOneTimeSalesTemplate,
  getSalesPlanCategory,
  getClientServiceDetails
} from "@/http/customer";
import Datepicker from "vuejs-datepicker";
import vSelect from "vue-select";
export default {
  props: ["clientId"],
  data() {
    return {
      serviceTemplate: {},
      salePlanCategory: {},
      salesTemplate: {},
      service: {

      },
      serviceDetails: []
    };
  },
  components: {
    Datepicker,
    "v-select": vSelect
  },
  methods: {
    async getServiceTemplate() {
      try {
        const response = await getClientServiceTemplate();
        this.serviceTemplate = response.data;
      } catch (error) {
        console.log(
          "something went to wrong while retrieving client service template",
          error
        );
      }
    },
    async oneTimeSaleTemplate() {
      try {
        const response = await getOneTimeSalesTemplate();
        this.salesTemplate = response.data;
      } catch (error) {
        console.log(
          "something went to wrong while retrieving client service template",
          error
        );
      }
    },
    async getSalesCategory() {
      try {
        const response = await getSalesPlanCategory({category: 'Base+Pack'});
        this.salePlanCategory = response.data.allPlanDatas;
      } catch (error) {
        console.log(
          "something went to wrong while retrieving sales plan category",
          error
        );
      }
    },
    async getServiceDetails() {
      try {
        const response = await getClientServiceDetails({
          clientId: this.clientId,
          paramCategory: 'S'
        });
        this.salePlanCategory = response.data;
      } catch (error) {
        console.log(
          "something went to wrong while retrieving sales plan category",
          error
        );
      }
    },
    getTemplates() {
      this.getServiceTemplate();
      this.getSalesCategory();
      this.oneTimeSaleTemplate();
    }
  },
  created () {
    this.getTemplates();
  }
};
</script>
<style lang="scss" scoped>
</style>
