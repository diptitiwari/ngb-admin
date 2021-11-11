<!-- =========================================================================================
    File Name: FormWizardIconTab.vue
    Description: Form wizard with numbers in tabs
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vx-card :title="$t('label.heading.createcustomer')">
    <div class="mt-5">
      <form-wizard
        color="rgba(var(--vs-primary), 1)"
        :title="null"
        :subtitle="null"
        finishButtonText="Submit"
        @on-complete="formSubmitted"
      >
        <tab-content
          :title="$t('label.heading.createcustomer')"
          class="mb-5"
          icon="feather icon-home"
        >
          <!-- tab 1 content -->
          <div class="vx-row">
            <div class="vx-col md:w-1/3 w-full mt-3">
              <input
                class="w-full font-semibold mb-2"
                type="file"
                :label="$t('label.heading.userprofile')"
              />
              <vs-input :label="$t('label.entity')" v-model="cust.officeId" class="w-full font-semibold mb-2" required/>
              <small class="date-label font-semibold">{{$t('label.title')}}</small>
              <v-select
                label="text"
                v-model="cust.title"
                placeholder="Select Title"
                :options="titleOptions"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full mb-2"
              />
              <vs-input
                :label="$t('label.input.lastname')"
                v-model="cust.lastname"
                class="w-full font-semibold mb-2"
                required
              />
              <vs-input :label="$t('label.phone')" v-model="cust.phone" class="w-full font-semibold mb-2" required/>
            </div>
            <div class="vx-col md:w-1/3 w-full mt-3">
              <small class="date-label font-semibold">{{$t('label.clientcategeory')}}</small>
              <v-select
                label="text"
                v-model="cust.clientCategory"
                :options="getCustomerTemplate.clientCategoryDatas"
                :reduce="categoryType => categoryType.id"
                placeholder="Select Categeory"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full mb-2"
                required
              />
              <vs-input
                :label="$t('label.input.firstname')"
                v-model="cust.firstname"
                class="w-full font-semibold mb-2"
                required
              />
              <vs-input
                :label="$t('label.input.middlename')"
                v-model="cust.middlename"
                class="w-full font-semibold mb-2"
              />

              <vs-input :label="$t('label.homephone')" v-model="cust.homePhoneNumber" class="w-full font-semibold mb-2" required/>
              <vs-input
                type="email"
                :label="$t('label.input.email')"
                v-model="cust.email"
                class="w-full font-semibold mb-2"
                required
              />
            </div>
            <div class="vx-col md:w-1/3 w-full mt-3">
              <small class="date-label font-semibold">{{$t('label.input.idproof')}}</small>
              <v-select
                label="text"
                v-model="cust.idKey"
                :options="getCustomerTemplate.idProofs"
                :reduce="mCodeValue => mCodeValue.id"
                placeholder="Select Id Proof"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full mb-2"
              />
              <vs-input
                :label="$t('label.input.idproofvalue')"
                v-model="cust.idValue"
                class="w-full font-semibold mb-2"
              />
              <vs-input :label="$t('label.cafid')" v-model="cust.externalId" class="w-full mb-2 font-semibold" />
              <small class="date-label font-semibold">{{$t('label.input.preferences')}}</small>
              <v-select
                label="text"
                v-model="cust.billMode"
                :options="getCustomerTemplate.preferences"
                :reduce="mCodeValue => mCodeValue.id"
                placeholder="Select preferences"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full mb-2"
                required
              />
              <ul class="leftx flex mt-base">
                <li class="mr-2">
                  <vs-radio
                    v-model="cust.entryType"
                    vs-name="radios1"
                    vs-value="IND"
                  >{{$t('label.radio.individual')}}</vs-radio>
                </li>
                <li class="mr-2">
                  <vs-radio
                    v-model="cust.entryType"
                    vs-name="radios1"
                    vs-value="ORP"
                  >{{$t('label.radio.corporate')}}</vs-radio>
                </li>
              </ul>
              <ul class="leftx flex mt-base" v-if="cust.entryType === 'ORP'">
                <li class="mr-2">
                  <vs-checkbox
                    v-model="isParent"
                    class="mb-3">
                    Is Parent
                  </vs-checkbox>
                </li>
                <li class="mr-2" v-if="!isParent">
                  <v-select
                    label="text"
                    v-model="cust.parentId"
                    :options="[]"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    class="min-w-200 w-full mb-2"
                  />
                </li>
              </ul>
            </div>
          </div>
        </tab-content>

        <!-- tab 2 content -->
        <tab-content
          :title="$t('label.heading.primary')"
          class="mb-5"
          icon="feather icon-briefcase"
        >
          <div class="vx-row">
            <div class="vx-col md:w-1/3 w-full mt-5">
              <vs-input
                :label="$t('label.input.address')"
                v-model="address.primary.addressNo"
                class="w-full font-semibold mb-2"
              />

              <vs-input
                :label="$t('label.input.distict')"
                disabled
                v-model="address.primary.district"
                class="w-full font-semibold mb-2"
              />
            </div>
            <div class="vx-col md:w-1/3 w-full mt-5">
              <vs-input
                :label="$t('label.street')"
                v-model="address.primary.street"
                class="w-full font-semibold mb-2"
              />
              <vs-input
                :label="$t('label.state')"
                disabled
                v-model="address.primary.state"
                class="w-full font-semibold mb-2"
              />
            </div>
            <div class="vx-col md:w-1/3 w-full mt-5">
              <small class="date-label font-semibold">{{$t('label.city/area')}}</small>
              <v-select
                label="text"
                v-model="address.primary.city"
                :options="getCustomerTemplate.addressTemplateData.cityData"
                placeholder="Select City"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full mb-2"
                @input="handlerCityChange('primary')"
              />
              <vs-input
                :label="$t('label.country')"
                disabled
                v-model="address.primary.country"
                class="w-full font-semibold mb-2"
              />
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col md:w-full">
              <vs-input
                :label="$t('label.zipcode')"
                v-model="address.primary.zipCode"
                class="w-full font-semibold mb-2"
              />
            </div>
          </div>
        </tab-content>

        <!-- tab 3 content -->
        <tab-content :title="$t('label.Billing')" class="mb-5" icon="feather icon-book">
          <div class="vx-row">
            <vs-checkbox v-model="billingAddAsPrimary" class="mb-3">Is Your Billing Address Same As Primary Address</vs-checkbox>
          </div>
          <div class="vx-row">
            <div class="vx-col md:w-1/3 w-full mt-5">
              <vs-input
                :label="$t('label.input.address')"
                v-model="address.billing.addressNo"
                class="w-full font-semibold mb-2"
              />

              <vs-input
                :label="$t('label.input.distict')"
                disabled
                v-model="address.billing.district"
                class="w-full mb-2 font-semibold"
              />
            </div>
            <div class="vx-col md:w-1/3 w-full mt-5">
              <vs-input
                :label="$t('label.street')"
                v-model="address.billing.street"
                class="w-full mb-2 font-semibold"
              />
              <vs-input
                :label="$t('label.state')"
                disabled
                v-model="address.billing.state"
                class="w-full mb-2 font-semibold"
              />
            </div>
            <div class="vx-col md:w-1/3 w-full mt-5">
              <small class="date-label font-semibold">{{$t('label.city/area')}}</small>
              <v-select
                label="text"
                v-model="address.billing.city"
                placeholder="Select City"
                :options="getCustomerTemplate.addressTemplateData.cityData"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full font-semibold mb-2"
                @input="handlerCityChange('primary')"
              />
              <vs-input
                :label="$t('label.country')"
                disabled
                v-model="address.billing.country"
                class="w-full font-semibold mb-2"
              />
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col md:w-full">
              <vs-input
                :label="$t('label.zipcode')"
                v-model="address.billing.zipCode"
                class="w-full font-semibold mb-2"
              />
            </div>
          </div>
        </tab-content>
      </form-wizard>
    </div>
  </vx-card>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import vSelect from "vue-select";
import {getDate} from '../../../plugins';
import {getCityTemplate} from "@/http/entity";
import {addClients} from "@/http/customer";
export default {
  data() {
    return {
      address: {
        primary: {
          addressNo: null,
          street: null,
          city: null,
          state: null,
          country: null,
          district: null,
          zipCode: null,
          addressType: "PRIMARY"
        },
        billing: {
          addressNo: null,
          street: null,
          city: null,
          state: null,
          country: null,
          district: null,
          zipCode: null,
          addressType: "BILLING"
        }
      },
      isParent: false,
      cust: {
        entryType: null,
        clientCategory: null,
        officeId: null,
        title: null,
        lastname: null,
        phone: null,
        email: null,
        idKey: null,
        externalId: null,
        idValue: null,
        billMode: null,
        homePhoneNumber: null,
        middlename: null,
        firstname: null,
        locale: null,
        active: true,
        dateFormat: 'dd MMMM yyyy',
        activationDate: getDate(this.getCustomerTemplate.activationDate),
        flag: false,
        address: []
      },
      billingAddAsPrimary: false,
      titleOptions: [
        { text: "Mr", value: "mr" },
        { text: "Mrs", value: "mrs" },
        { text: "Ms", value: "ms" },
        { text: "Miss", value: "miss" }
      ]
    };
  },
  computed: {
    getCustomerTemplate () {
      return this.$store.getters['customer/getClientsTemplate']
    },
  },
  methods: {
    async cityTemplate(type) {
      try {
        const response = await getCityTemplate(this.cust.primary.city);
        this.address[type].district = response.data.district;
        this.address[type].state = response.data.state;
        this.address[type].country = response.data.country;
      } catch (error) {
        console.log(
          "something went to wrong while retrieving city template:",
          error
        );
      }
    },
    async formSubmitted() {
      this.cust.address.push(this.address.primary);
      this.cust.address.push(this.address.billing);

      try {
        await addClients(this.customer);
        this.$router.push('/customers')
      } catch (e) {
        console.log(
          "something went to wrong while creating customer",
          error
        );
      }
    }
  },
  components: {
    FormWizard,
    TabContent,
    "v-select": vSelect
  },
  watch: {
    billingAddAsPrimary(newValue) {
      if(newValue) this.address.billing = this.address.primary;
    },
    'cust.entryType'(newValue) {
      if(newValue === 'ORP') {
        this.customer['parentId'] = 0;
      } else {
        delete this.customer['parentId']
      }
    },
  }
};
</script>
<style lang="css" >
.disabled-upload {
  display: none !important;
}
</style>
