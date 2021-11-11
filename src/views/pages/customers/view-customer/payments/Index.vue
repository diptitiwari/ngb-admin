<template>
  <div>
    <vx-card class="mb-base">
      <vs-table
        :max-items="5"
        pagination
        :data="transactions"
        description
        search
      >
        <template slot="header">
          <!-- ADD NEW -->
          <div class="mr-md-2 mb-1 order-1">
            <datepicker name="end-date" :placeholder="$t('endDate')" v-model="endDate"></datepicker>
          </div>
          <div class="mr-md-2 mb-1 order-1">
            <datepicker name="start-date" :placeholder="$t('startDate')" v-model="startDate"></datepicker>
          </div>
          <div class="mr-md-2 mb-1 order-1">
            <vs-button color="primary" type="border" icon-pack="feather" icon="icon-search" @click="getTransactions"></vs-button>
          </div>
          <div class="mr-md-2 mb-1 order-1">
            <vs-button @click="makePaymentPopup=true">{{$t('label.button.makepayment')}}</vs-button>
          </div>
        </template>
        <template slot="thead">
          <vs-th>{{$t('table.username')}}</vs-th>
          <vs-th>{{$t('label.heading.transactionid')}}</vs-th>
          <vs-th>{{$t('label.heading.transactiondate')}}</vs-th>
          <vs-th>{{$t('label.heading.transactiontype')}}</vs-th>
          <vs-th>{{$t('label.transactioncategory')}}</vs-th>
          <vs-th>{{$t('label.creditamount')}}</vs-th>
          <vs-th>{{$t('label.denitamount')}}</vs-th>
          <vs-th>{{$t('label.cancelremark')}}</vs-th>
          <vs-th>{{$t('label.heading.actions')}}</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="index" v-for="(transaction, index) in data">
            <vs-td :data="transaction.userName">{{transaction.userName}}</vs-td>
            <vs-td :data="transaction.transactionId">{{transaction.transactionId}}</vs-td>
            <vs-td :data="getDate(transaction.transDate)">{{getDate(transaction.transDate)}}</vs-td>
            <vs-td :data="transaction.transactionType">{{transaction.transactionType}}</vs-td>
            <vs-td :data="transaction.transactionCategory">{{transaction.transactionCategory}}</vs-td>
            <vs-td :data="transaction.creditAmount">{{transaction.creditAmount}}</vs-td>
            <vs-td :data="transaction.amount">{{transaction.debitamount}}</vs-td>
            <vs-td :data="transaction.cancelRemark">{{transaction.cancelRemark}}</vs-td>
            <vs-td>
              <feather-icon
                title="Print Payment"
                icon="DownloadCloudIcon"
                class="mr-1"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
              />
              <feather-icon
                title="cancle Payment"
                icon="XIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
              />
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
    <div class="centerx">
      <vs-popup
        classContent="popup-example"
        :title="$t('label.heading.payinvoice')"
        :active.sync="makePaymentPopup"
      >
        <form>
          <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
            <div class="vx-col mb-2 w-full">
              <vs-radio
                v-model="radios1"
                vs-value="luis"
                class="mr-2"
              >{{$t('label.heading.account')}}</vs-radio>
              <vs-radio v-model="radios1" vs-value="luis" class="mr-2">{{$t('label.invoice')}}</vs-radio>
              <vs-radio v-model="radios1" vs-value="luis">{{$t('label.deposit')}}</vs-radio>
            </div>
            <div class="vx-col mb-2 w-full">
              <datepicker :placeholder="$t('label.paymentdate')" class="font-semibold"></datepicker>
            </div>
            <div class="vx-col mb-2 w-full">
              <small class="date-label font-semibold">{{$t('label.paymentType')}}</small>
              <v-select
                label="text"
                :options="paymentType"
                placeholder="Select Payment Type"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full font-semibold"
              />
            </div>
            <div class="vx-col mb-2 w-full">
              <vs-input :label="$t('label.amount')" class="w-full font-semibold" icon-no-border />
            </div>
            <div class="vx-col mb-2 w-full">
              <vs-input :label="$t('label.receiptno')" class="w-full font-semibold" icon-no-border />
            </div>
            <div class="vx-col mb-2 w-full">
              <quill-editor v-model="content1" class="font-semibold"></quill-editor>
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
import { quillEditor } from "vue-quill-editor";
import vSelect from "vue-select";
import moment from 'moment';
import {getTransactionDetails} from '@/http/customer'

export default {
  props: ["clientId"],
  data() {
    return {
      startDate: moment().subtract(1,'d').format('DD MMMM YYYY'),
      endDate: moment().subtract(8,'d').format('DD MMMM YYYY'),
      makePaymentPopup: false,
      activityLog: [
        {
          c_id: "",
          transaction_date: "",
          transaction_type: "",
          History: ""
        }
      ],
    };
  },
  components: { Datepicker, quillEditor, "v-select": vSelect },
  computed: {
    transactions() {
      return this.$store.getters["customer/getTransactionDetails"];
    },
  },
  methods: {
    getDate(date) {
      return moment(date.join("/")).format("DD MMMM YYYY");
    },
    async getTransactions() {
      const params = {
        fromDate: moment(this.startDate).format('DD-MM-YYYY'),
        toDate: moment(this.endDate).format('DD-MM-YYYY'),
        type: 'PAYMENT'
      }
      try {
        const resp = await getTransactionDetails(params, this.clientId);
        this.$store.dispatch("customer/setTransactionDetails", resp.data.pageItems);
      } catch(e) {
        console.log('Something went wrong while retrieving transactions details: ', e);
      }
    }
  },
  created () {
    this.getTransactions();
  }
};
</script>
<style lang="scss" scoped>
</style>
