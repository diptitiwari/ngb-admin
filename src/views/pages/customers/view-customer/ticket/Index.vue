<template>
  <div>
    <vx-card class="mb-base">
      <vs-table :max-items="5" pagination :data="tickets" search>
        <template slot="header">
          <!-- ADD NEW -->
          <span class="vx-col order-1">
            <vs-button
              icon-pack="feather"
              icon="icon-plus"
              @click="ticketCreatePopup=true"
              size="small"
            >{{$t('label.creatticket')}}</vs-button>
          </span>
        </template>
        <template slot="thead">
          <vs-th>{{$t('label.heading.id')}}</vs-th>
          <vs-th>{{$t('label.priority')}}</vs-th>
          <vs-th>{{$t('label.ticketdate')}}</vs-th>
          <vs-th>{{$t('label.problemcode')}}</vs-th>
          <vs-th>{{$t('label.heading.status')}}</vs-th>
          <vs-th>{{$t('label.assignto')}}</vs-th>
          <vs-th>{{$t('label.lastcomment')}}</vs-th>
          <vs-th>{{$t('label.FileName')}}</vs-th>
          <vs-th>{{$t('label.heading.actions')}}</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="index" v-for="(ticket, index) in data">
            <vs-td :data="ticket.id">{{ticket.id}}</vs-td>

            <vs-td :data="ticket.priority">{{ticket.priority}}</vs-td>
            <vs-td :data="getDate(ticket.ticketDate)">{{getDate(ticket.ticketDate)}}</vs-td>

            <vs-td :data="ticket.problemCode">{{ticket.problemCode}}</vs-td>
            <vs-td :data="ticket.status">{{ticket.status}}</vs-td>
            <vs-td :data="ticket.userName">{{ticket.userName}}</vs-td>

            <vs-td :data="ticket.lastComment">{{ticket.lastComment}}</vs-td>
            <vs-td :data="ticket.file">{{ticket.file}}</vs-td>
            <vs-td>
              <feather-icon
                title="Download Uploaded File"
                icon="DownloadIcon"
                class="mr-1"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
              />
              <feather-icon
                title="Add Comment"
                icon="EditIcon"
                class="mr-1"
                svgClasses="w-5 h-5 hover:text-primary stroke-current"
              />
              <feather-icon
                title="Close Ticket"
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
        :active.sync="ticketCreatePopup"
      >
        <form>
          <div class="vx-row mt-3">
            <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-full xs:w-full">
              <vs-input :label="$t('label.ticketdate')" class="w-full font-semibold mb-2" v-model="ticket.ticketDate"/>
              <small class="date-label font-semibold">{{$t('label.heading.category')}}</small>
              <v-select
                v-model="ticket.problemCode"
                label="mCodeValue"
                :reduce="mCodeValue => mCodeValue.id"
                :options="template.problemsDatas"
                placeholder="Select Categeory"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full my-2"
              />
              <small class="date-label font-semibold">{{$t('label.team')}}</small>
              <v-select
                v-model="ticket.teamCode"
                label="teamCode"
                :reduce="teamCode => teamCode.id"
                :options="template.TicketTeamMappingData"
                placeholder="Select Team"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full my-2"
              />
              <small class="date-label font-semibold">{{$t('label.source')}}</small>
              <v-select
                v-model="ticket.sourceOfTicket"
                label="mCodeValue"
                :reduce="mCodeValue => mCodeValue.id"
                :options="template.sourceData"
                placeholder="Select Source"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full my-2"
              />
              <!-- USER PROFILE CARD -->
            </div>
            <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-full xs:w-full">
              <small class="date-label font-semibold">{{$t('label.heading.priority')}}</small>
              <v-select
                v-model="ticket.priority"
                label="value"
                :reduce="value => value.id"
                :options="template.priorityType"
                placeholder="Select Priority"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full my-2"
              />
              <small class="date-label font-semibold">{{$t('label.subcategory')}}</small>
              <v-select
                v-model="ticket.subCategory"
                label="value"
                :reduce="subCategory => subCategory.id"
                :options="subCategoryItem"
                placeholder="Select Sub Categeory"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full my-2"
              />
              <small class="date-label font-semibold">{{$t('label.teamuser')}}</small>
              <v-select
                v-model="ticket.teamUserId"
                label="text"
                :reduce="username => username.id"
                :options="teamUsersItem"
                placeholder="Select Team User"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                class="min-w-200 w-full my-2"
              />
              <vs-input
                :label="$t('label.ticket.file')"
                id="file"
                type="file"
                ref="docFile"
                class="w-full font-semibold"
                icon-no-border
                @change="ticket.file = $refs.docFile.files[0];"
              />
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col w-full">
              <small class="date-label font-semibold">{{$t('label.duetime')}}</small>
              <flat-pickr
                :config="configdateTimePicker"
                class="w-full vs-inputx vs-input--input normal font-semibold mb-2"
                placeholder="Select Date"
              />
            </div>
          </div>
          <div class="vx-row my-2">
            <div class="vx-col w-full">
              <small class="date-label font-semibold">{{$t('label.heding.description')}}</small>
              <quill-editor v-model="content" class="mb-2"></quill-editor>
            </div>
          </div>
          <div class="vx-row my-2">
            <div class="vx-col w-full">
              <vs-button class="mr-3 mb-2">{{$t('label.button.submit')}}</vs-button>
              <vs-button class="mr-3 mb-2">{{$t('label.heading.reset')}}</vs-button>
              <vs-button color="primary" type="border" class="mb-2">{{$t('label.heading.ftr')}}</vs-button>
            </div>
          </div>
        </form>
      </vs-popup>
    </div>
  </div>
</template>
<script>
  import Datepicker from 'vuejs-datepicker'
  import flatPickr from 'vue-flatpickr-component'
  import 'flatpickr/dist/flatpickr.css'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { getClientTickets, getTicketTemplate, getTicketSubCategory, getTicketTeamUsers } from '@/http/customer'
  import moment from 'moment'
  import vSelect from 'vue-select'

  import { quillEditor } from 'vue-quill-editor'
  const ticketObj = {
    dueTime: null,
    assignedTo: 1,
    priority: null,
    sourceOfTicket: null,
    problemCode: null,
    subCategory: null,
    teamCode: null,
    teamUserId: null,
    description: null,
    locale: 'en',
    dateFormat: 'dd MMMM yyyy',
    ticketDate:  null,
    ticketURL: 'https://smartway.trigital.in/app/#/viewTicket/10',
    ticketTime: null,
    file: null
  };

export default {
  props: ["clientId"],
  data () {
    return {
      ticketCreatePopup: false,
      configdateTimePicker: {
        dateFormat: "d-m-Y H:i"
      },
      ticket: ticketObj,
      subCategoryItem: [],
      teamUsersItem: [{ id: null, username: 'all' }]
    };
  },
  components: {
    Datepicker,
    flatPickr,
    quillEditor,
    "v-select": vSelect
  },
  computed: {
    tickets () {
      return this.$store.getters["customer/getClientTickets"];
    },
    template () {
      return this.$store.getters["customer/getTicketTemplate"];
    }
  },
  methods: {
    getDate (date) {
      if (date) return moment(date.join("/")).format("DD MMMM YYYY");
      return null;
    },
    async getTickets () {
      try {
        const response = await getClientTickets(this.clientId);
        this.$store.dispatch("customer/setClientTickets", response.data);
      } catch (error) {
        console.log(
          "something went to wrong while retrieving client tickets:",
          error
        );
      }
    },
    async ticketTemplate () {
      try {
        const response = await getTicketTemplate();
        this.$store.dispatch("customer/setTicketTemplate", response.data);
      } catch (error) {
        console.log(
          "something went to wrong while retrieving client tickets:",
          error
        );
      }
    },
    async getSubCategory (categoryId) {
      try {
        const response = await getTicketSubCategory(categoryId);
        this.subCategoryItem = response.data.subCategory;
      } catch (e) {
        console.log('something went to wrong while retrieving sub category:', error)
      }
    },
    async getTeamUsers (teamId) {
      try {
        const response = await getTicketTeamUsers(teamId);
        this.teamUsersItem = _.concat(this.teamUsersItem, response.data.teamUsers);
      } catch (e) {
        console.log('something went to wrong while retrieving team users:', error)
      }
    }
  },
  created () {
    this.getTickets();
  },
  watch: {
    ticketCreatePopup (newValue) {
      if (newValue) {
        this.ticketTemplate();
        this.ticket.ticketDate = moment().format('DD MMMM YYYY hh:mm:ss a');
      }
    },
    'ticket.problemCode' (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getSubCategory(this.ticket.problemCode);
      }
    },
    'ticket.teamCode' (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getTeamUsers(this.ticket.teamCode);
      }
    },
    'ticket.dueTime' (newValue, oldValue) {
      debugger
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
