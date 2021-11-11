<template>
  <span>
    <vx-card class="mb-base">
      <div class="vx-row flow-root">
        <div class="vx-col md:w-full lg:w-full sm:w-full xs:w-full">
          <ul class="horizontal-sm-btn flex mb-2 float-right">
            <li>
              <div class="p-1 cursor-pointer flex items-center text-lg font-medium w-full">
                <vs-button
                  color="primary"
                  icon-pack="feather"
                  icon="icon-file-plus"
                  class="truncate"
                  @click="downloadDoc=true"
                  size="small"
                >{{$t('button.exportfinancialcsv/pdf')}}</vs-button>
              </div>
            </li>
            <li>
              <div class="p-1 cursor-pointer flex items-center text-lg font-medium w-full">
                <vs-button
                  color="primary"
                  icon-pack="feather"
                  icon="icon-sliders"
                  class="truncate"
                  @click="adjustment = !adjustment"
                  size="small"
                >{{$t('button.adjustment')}}</vs-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <vs-divider />
      <div v-show="!adjustment" class="vx-row">
        <vs-tabs alignment="fixed" position="left" v-model="activeTab">
          <vs-tab :label="$t('link.reports.all')">
            <div class="tab-text mx-2">
              <vs-table
                :max-items="5"
                pagination
                search
                :data="transactions"
              >
                <template slot="header" color="primary">
                  <!-- ADD NEW -->
                </template>
                <template slot="thead">
                  <vs-th>{{$t('table.username')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionid')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionDate')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionType')}}</vs-th>
                  <vs-th>{{$t('label.transaction.category')}}</vs-th>
                  <vs-th>{{$t('label.creditamount')}}</vs-th>
                  <vs-th>{{$t('label.denitamount')}}</vs-th>
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
                    <vs-td :data="transaction.amount">{{transaction.amount }}</vs-td>
                    <vs-td>
                      <feather-icon
                        title="Print Invoice"
                        icon="DownloadIcon"
                        class="mr-1"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      />
                      <feather-icon
                        v-if="transaction.transactionType === 'PAYMENT'"
                        title="Cancel Payment"
                        icon="XIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                      />
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
          </vs-tab>
          <vs-tab :label="$t('tab.invoices')">
            <div class="tab-text mx-2">
              <vs-table
                :max-items="5"
                pagination
                search
                :data="transactions"
              >
                <template slot="header" color="primary">
                  <!-- ADD NEW -->
                </template>
                <template slot="thead">
                  <vs-th>{{$t('table.username')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionid')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionDate')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionType')}}</vs-th>
                  <vs-th>{{$t('label.transaction.category')}}</vs-th>
                  <vs-th>{{$t('label.creditamount')}}</vs-th>
                  <vs-th>{{$t('label.denitamount')}}</vs-th>
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
                    <vs-td :data="transaction.amount">{{transaction.amount }}</vs-td>
                    <vs-td>
                      <feather-icon
                        title="Print Invocie"
                        icon="DownloadIcon"
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
            </div>
          </vs-tab>
          <vs-tab :label="$t('label.adjustments')">
            <div class="tab-text mx-2">
              <vs-table
                :max-items="5"
                pagination
                search
                :data="transactions"
              >
                <template slot="header" color="primary">
                  <!-- ADD NEW -->
                </template>
                <template slot="thead">
                  <vs-th>{{$t('table.username')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionid')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionDate')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionType')}}</vs-th>
                  <vs-th>{{$t('label.transaction.category')}}</vs-th>
                  <vs-th>{{$t('label.creditamount')}}</vs-th>
                  <vs-th>{{$t('label.denitamount')}}</vs-th>
                </template>
                <template slot-scope="{data}">
                  <vs-tr :key="index" v-for="(transaction, index) in data">
                    <vs-td :data="transaction.userName">{{transaction.userName}}</vs-td>

                    <vs-td :data="transaction.transactionId">{{transaction.transactionId}}</vs-td>
                    <vs-td :data="getDate(transaction.transDate)">{{getDate(transaction.transDate)}}</vs-td>

                    <vs-td :data="transaction.transactionType">{{transaction.transactionType}}</vs-td>
                    <vs-td :data="transaction.transactionCategory">{{transaction.transactionCategory}}</vs-td>

                    <vs-td :data="transaction.creditAmount">{{transaction.creditAmount}}</vs-td>
                    <vs-td :data="transaction.amount">{{transaction.amount }}</vs-td>
                    <vs-td>
                      <feather-icon
                        title="Print Invocie"
                        icon="DownloadIcon"
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
            </div>
          </vs-tab>
          <vs-tab :label="$t('label.journals')">
            <div class="tab-text mx-2">
              <vs-table
                :max-items="5"
                pagination
                search
                :data="transactions"
              >
                <template slot="header" color="primary">
                  <!-- ADD NEW -->
                </template>
                <template slot="thead">
                  <vs-th>{{$t('table.username')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionid')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionDate')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionType')}}</vs-th>
                  <vs-th>{{$t('label.transaction.category')}}</vs-th>
                  <vs-th>{{$t('label.creditamount')}}</vs-th>
                  <vs-th>{{$t('label.denitamount')}}</vs-th>
                </template>
                <template slot-scope="{data}">
                  <vs-tr :key="index" v-for="(transaction, index) in data">
                    <vs-td :data="transaction.userName">{{transaction.userName}}</vs-td>

                    <vs-td :data="transaction.transactionId">{{transaction.transactionId}}</vs-td>
                    <vs-td :data="getDate(transaction.transDate)">{{getDate(transaction.transDate)}}</vs-td>

                    <vs-td :data="transaction.transactionType">{{transaction.transactionType}}</vs-td>
                    <vs-td :data="transaction.transactionCategory">{{transaction.transactionCategory}}</vs-td>

                    <vs-td :data="transaction.creditAmount">{{transaction.creditAmount}}</vs-td>
                    <vs-td :data="transaction.amount">{{transaction.amount }}</vs-td>
                    <vs-td>
                      <feather-icon
                        title="Print Invocie"
                        icon="DownloadIcon"
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
            </div>
          </vs-tab>
          <vs-tab :label="$t('label.deposit')">
            <div class="tab-text mx-2">
              <vs-table
                :max-items="5"
                pagination
                search
                :data="transactions"
              >
                <template slot="header" color="primary">
                  <!-- ADD NEW -->
                </template>
                <template slot="thead">
                  <vs-th>{{$t('table.username')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionid')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionDate')}}</vs-th>
                  <vs-th>{{$t('label.heading.transactionType')}}</vs-th>
                  <vs-th>{{$t('label.transaction.category')}}</vs-th>
                  <vs-th>{{$t('label.creditamount')}}</vs-th>
                  <vs-th>{{$t('label.denitamount')}}</vs-th>
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
                    <vs-td :data="transaction.amount">{{transaction.amount }}</vs-td>
                    <vs-td>
                      <feather-icon
                        title="Print Invocie"
                        icon="DownloadIcon"
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
            </div>
          </vs-tab>
        </vs-tabs>
      </div>
      <div class="vx-row" v-show="adjustment">
        <div class="vx-col w-full mt-3">
          <form>
            <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
              <div class="vx-col mb-2 md:w-1/2 lg:w-1/2">
                <small class="date-label font-semibold">{{$t('label.adjustmentdate')}}</small>
                <datepicker :placeholder="$t('label.adjustmentdate')" class=""></datepicker>
              </div>
              <div class="vx-col mb-2 md:w-1/2 lg:w-1/2">
                <!-- <vs-select
                :label="$t('label.adjustmentcode')"
                class="selectExample w-full vs-search-categeory"
              >
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item,index) in adjustmentcode"
                />
                </vs-select>-->
                <small class="date-label font-semibold">{{$t('label.adjustmentcode')}}</small>
                <v-select
                  label="text"
                  placeholder="Select Adjustement Code"
                  :options="adjustmentcode"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  class="min-w-200 w-full "
                />
              </div>
              <div class="vx-col mb-2 md:w-1/2 lg:w-1/2">
                <vs-input :label="$t('label.adjustmentamount')" class="w-full font-semibold " icon-no-border />
              </div>
              <div class="vx-col mb-2 md:w-1/2 lg:w-1/2">
                <small class="date-label font-semibold">{{$t('label.adjustmentamounttype')}}</small>
                <v-select
                  label="text"
                  placeholder="Select Adjustment Type"
                  :options="adjustmentamounttype"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  class="min-w-200 w-full "
                />
              </div>
              <div class="vx-col mb-2 w-full">
                <small class="date-label font-semibold">{{$t('label.heading.notes')}}</small>
                <quill-editor v-model="content" class=""></quill-editor>
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
        </div>
      </div>
    </vx-card>
    <div class="centerx">
      <vs-popup
        classContent="popup-example"
        :title="$t('label.heading.addclientidentifier')"
        :active.sync="downloadDoc"
      >
        <form>
          <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
            <div class="vx-col mb-2 w-full">
              <small class="date-label font-semibold">{{$t('label.downloadtype.format')}}</small>
              <v-select
                label="text"
                placeholder="Select Format"
                :options="format"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full "
              />
            </div>
            <div class="vx-col mb-2 w-full">
              <small class="date-label font-semibold">{{$t('label.selectfromdate')}}</small>
              <datepicker :placeholder="$t('label.selectfromdate')" class=""></datepicker>
            </div>
            <div class="vx-col mb-2 w-full">
              <small class="date-label font-semibold">{{$t('label.selecttodate')}}</small>
              <datepicker :placeholder="$t('label.selecttodate')" class=""></datepicker>
            </div>
          </div>

          <div class="vx-row">
            <span class="ml-4 mr-1">
              <vs-button type="border">{{$t('label.prospects.cancel')}}</vs-button>
            </span>
            <span class="ml-1 mr-2">
              <vs-button>{{$t('label.confirm')}}</vs-button>
            </span>
          </div>
        </form>
      </vs-popup>
    </div>
  </span>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import { quillEditor } from "vue-quill-editor";
import vSelect from "vue-select";
import {getTransactionDetails} from '@/http/customer'
import moment from 'moment';

export default {
  props: ["clientId"],
  data() {
    return {
      switch1: true,
      serviceOrder: [],
      identifier: false,
      additionalInfo: false,
      documentsUploads: false,
      creditCardDetails: false,
      adjustment: false,
      downloadDoc: false,
      activeTab: 0
    };
  },
  components: {
    quillEditor,
    Datepicker,
    "v-select": vSelect
  },
  computed: {
    transactions() {
      return this.$store.getters["customer/getTransactionDetails"];
    },
  },
  methods: {
    getDate(date) {
      return moment(date.join("/")).format("DD MMMM YYYY");
    },
    async getTransactions(params) {
      try {
        const resp = await getTransactionDetails(params, this.clientId);
        this.$store.dispatch("customer/setTransactionDetails", resp.data.pageItems);
      } catch(e) {
        console.log('Something went wrong while retrieving transactions details: ', e);
      }
    }
  },
  created () {
    this.getTransactions({});
  },
  watch: {
    activeTab(newValue) {
      if(newValue === 0) this.getTransactions({})
      else if(newValue === 1) this.getTransactions({type: 'INVOICE'})
      else if(newValue === 2) this.getTransactions({type: 'ADJUSTMENT'})
      else if(newValue === 3) this.getTransactions({type: 'JOURNAL+VOUCHER'})
      else if(newValue === 4) this.getTransactions({type: 'DEPOSIT%26REFUND'});
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
