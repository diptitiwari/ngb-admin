<template>
  <div>
    <vx-card class="mb-base">
      <vs-table
        :max-items="5"
        pagination
        :data="billMasterList"
        search
      >
        <template slot="header">
          <!-- ADD NEW -->
          <span class="order-1">
          <vs-button icon-pack="feather" icon="icon-plus" size="small" @click="genereate=true">{{$t('button.genereate')}}</vs-button>
        </span>
        </template>
        <template slot="thead">
          <vs-th>{{$t('label.billdate')}}</vs-th>
          <vs-th>{{$t('label.duedate')}}</vs-th>
          <vs-th>{{$t('table.amount')}}</vs-th>
          <vs-th>{{$t('label.heading.actions')}}</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="index" v-for="(master, index) in data">
            <vs-td :data="getDate(master.billDate)">{{getDate(master.billDate)}}</vs-td>
            <vs-td :data="getDate(master.dueDate)">{{getDate(master.dueDate)}}</vs-td>
            <vs-td :data="master.amount">{{master.amount}}</vs-td>
            <vs-td>
              <feather-icon
                title="View HTML"
                icon="FileTextIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                class="mr-2"
              />
              <feather-icon
                title="Save as PDF"
                icon="DownloadIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                class="mr-2"
              />
              <feather-icon
                title="Send Mail"
                icon="MessageSquareIcon"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                class="mr-2"
                @click="sendEmail"
              />
              <feather-icon
                title="Cancel"
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
        :title="$t('label.statements')"
        :active.sync="genereate"
      >
        <form>
          <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
            <div class="vx-col mb-2 w-full">
              <small class="date-label font-semibold">{{$t('label.eventdate')}}</small>
              <datepicker name="start-date" :label="$t('label.eventdate')" class="font-semibold"></datepicker>
            </div>
            <div class="vx-col mb-2 w-full">
              <small class="date-label font-semibold">{{$t('label.heading.description')}}</small>
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
  import { quillEditor } from 'vue-quill-editor'
  import Datepicker from 'vuejs-datepicker'
  import {getClientBillMaster, sendBillMasterEmail} from '@/http/customer'
  import moment from 'moment';

  export default {
    props: ["clientId"],
    data () {
      return {
        genereate: false,
        statement: []
      }
    },
    computed: {
      billMasterList() {
        return this.$store.getters["customer/getBillMasterData"];
      },
    },
    methods: {
      getDate(date) {
        return moment(date.join("/")).format("DD MMMM YYYY");
      },
      async getBillMaster() {
        try {
          const resp = await getClientBillMaster(this.clientId);
          this.$store.dispatch("customer/setBillMasterData", resp.data.pageItems);
        } catch(e) {
          console.log('Something went wrong while retrieving client bill master: ', e);
        }
      },
      async sendEmail() {
        try {
          const resp = await sendBillMasterEmail(this.clientId);
          this.$vs.notify({
            title: 'Mail Sent',
            text: 'Mail Sent SuccessFully',
            iconPack: 'feather',
            icon: 'check-circle',
            color: 'Success'
          })
        } catch(e) {
          this.$vs.notify({
            title: 'Cancel Statement Attempt Failed',
            text: e.defaultUserMessage,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'warning'
          })
          console.log('Something went wrong while sending mail bill master: ', e);
        }
      }
    },
    components: {
      quillEditor,
      Datepicker
    },
    created () {
      this.getBillMaster();
    }
  }
</script>
<style lang="scss" scoped>
</style>
