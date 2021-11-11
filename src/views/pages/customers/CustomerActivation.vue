<template>
  <vx-card :title="$t('label.button.activation')">
    <div class="mt-5">
      <form-wizard
        color="rgba(var(--vs-primary), 1)"
        :title="null"
        :subtitle="null"
        finishButtonText="Submit"
        @on-complete="formSubmitted"
      >
        <tab-content :title="$t('label.customer.details')" class="mb-5" icon="feather icon-user">
          <!-- tab 1 content -->
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input :label="$t('label.input.loc')" v-model="customerActivation.officeId" class="w-full font-semibold mb-2" />
              <vs-input
                :label="$t('label.input.fullname')"
                v-model="customerActivation.firstname"
                class="w-full font-semibold mb-2"
              />
              <vs-input :label="$t('label.phone')" v-model="customerActivation.phone" class="w-full mb-2 font-semibold" />
              <small class="date-label font-semibold">{{$t('label.input.idproof')}}</small>
              <v-select
                label="mCodeValue"
                v-model="customerActivation.idKey"
                :options="getCustomerTemplate.idProofs"
                :reduce="mCodeValue => mCodeValue.id"
                placeholder="Select Id Proof"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full mb-2"
              />
              <vs-input
                :label="$t('label.input.address')"
                v-model="customerActivation.addressNo"
                class="w-full mb-2 font-semibold"
              />
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5">
              <vs-input :label="$t('label.cafid')" v-model="customerActivation.externalId" class="w-full font-semibold mb-2" />
              <small class="date-label font-semibold">{{$t('label.city/area')}}</small>
              <v-select
                v-model="customerActivation.city"
                placeholder="Select City"
                :options="getCustomerTemplate.addressTemplateData.cityData"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full mb-2"
              />
              <vs-input
                type="email"
                :label="$t('label.input.email')"
                v-model="customerActivation.email"
                class="w-full font-semibold mb-2"
              />
              <vs-input
                :label="$t('label.input.idproofvalue')"
                v-model="customerActivation.idValue"
                class="w-full font-semibold mb-2"
              />
              <vs-input
                :label="$t('label.villege/street')"
                v-model="customerActivation.street"
                class="w-full font-semibold mb-2"
              />
            </div>
          </div>
        </tab-content>

        <!-- tab 2 content -->
        <tab-content :title="$t('label.service.details')" class="mb-5" icon="feather icon-settings">
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full mt-5">
              <small class="date-label font-semibold">{{$t('label.button.addservice')}}</small>
              <v-select
                label="serviceCode"
                v-model="customerActivation.serviceCode"
                placeholder="Select Service"
                :options="serviceTemplate.serviceData"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full mb-2"
                @input="handleServiceChange"
              />
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5" v-if="!$_.isEmpty(serviceDetails)">
              <small class="date-label font-semibold">{{serviceDetails[0].codeParamName}}</small>
              <v-select
                label="text"
                v-model="customerActivation.provisioningSystem"
                placeholder="Select Service"
                :options="$_.map(serviceDetails[0].details, 'systemcode')"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full mb-2"
              />
            </div>
          </div>
        </tab-content>

        <!-- tab 3 content -->
        <tab-content :title="$t('label.device.details')" class="mb-5" icon="feather icon-tablet">
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full mt-5">
              <v-select
                label="name"
                v-model="selectedPlan"
                :options="salePlanCategory"
                placeholder="Select Plan List"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full font-semibold mb-2"
                @input="handleSerialNoChange"
              />
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5" v-if="pairableDevice">
              <vs-input
                :label="$t('label.pairedserialnumber')"
                v-model="customerActivation.pairable_serialNumber"
                class="w-full mb-2 font-semibold"
              />
            </div>
          </div>
        </tab-content>
        <!-- tab 4 content -->
        <tab-content :title="$t('label.plan.details')" class="mb-5" icon="feather icon-book">
          <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full mt-5">
              <small class="date-label font-semibold">{{$t('label.input.planlist')}}</small>
              <v-select
                label="name"
                v-model="selectedPlan"
                :options="salePlanCategory"
                placeholder="Select Plan List"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full font-semibold mb-2"
                @input="handlePlanListChange"
              />
            </div>
            <div class="vx-col md:w-1/2 w-full mt-5">
              <small class="date-label font-semibold">{{$t('label.plan')}}</small>
              <v-select
                label="text"
                v-model="customerActivation.planCode"
                :options="planOptions"
                placeholder="Select Plan"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full mb-2"
              />
            </div>
          </div>
        </tab-content>
      </form-wizard>
    </div>
  </vx-card>
</template>

<script>
import Vue from 'vue';
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import vSelect from "vue-select";
import { getClientServiceTemplate,
  getSalesPlanCategory,
  getClientServiceDetails,
  getOrderTemplate
} from '@/http/customer'

Object.defineProperty(Vue.prototype, '$_', { value: _ })

export default {
  data() {
    return {
      orderTemplate: {},
      salePlanCategory: [],
      serviceTemplate: {},
      selectedPlan: null,
      pairableDevice: false,
      serviceDetails: {},
      planOptions:[],
      customerActivation: {
        firstname: null,
        externalId: null,
        phone: null,
        email: null,
        idValue: null,
        idKey: null,
        addressNo: null,
        street: null,
        city: null,
        serviceCode: null,
        stb_serialNumber: null,
        pairable_serialNumber: null,
        planCode: null,
        officeId: null,
        provisioningSystem: null
      }
    };
  },
  computed: {
    getCustomerTemplate () {
      return this.$store.getters['customer/getClientsTemplate'];
    }
  },
  methods: {
    formSubmitted() {
      alert("Form submitted!");
    },
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
    async getServiceDetails(serviceId) {
      try {
        const response = await getClientServiceDetails(serviceId,{
          paramCategory: 'S'
        });
        this.serviceDetails = response.data;
      } catch (error) {
        console.log(
          "something went to wrong while retrieving sales plan category",
          error
        );
      }
    },
    async getOrderTemplate(salesCatalogeId) {
      try {
        const response = await getOrderTemplate({
          planId: 0,
          salesCatalogeId: salesCatalogeId
        });
        this.orderTemplate = response.data;
      } catch (error) {
        console.log(
          "something went to wrong while retrieving sales plan category",
          error
        );
      }
    },
    handleServiceChange(item) {
      this.customerActivation.serviceCode = item.serviceCode;
      this.getServiceDetails(item.id)
    },
    handlePlanListChange(item) {
      this.selectedPlan = item.name;
      this.getOrderTemplate(item.id)
    }
  },
  components: {
    FormWizard,
    TabContent,
    "v-select": vSelect
  },
  created () {
    this.getServiceTemplate();

  },
  watch: {}
};
</script>
<style lang="css" >
</style>
