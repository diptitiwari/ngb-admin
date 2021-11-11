<template>
  <div>
    <vx-card>
    <vs-table
      :max-items="descriptionItems[0]"
      class="mt-3"
      pagination
      :data="tickets"
      description
      search
      :description-items="descriptionItems"
      description-title="Registries"
      description-connector="of"
      description-body="Pages"
    >
      <template slot="header" color="primary">
        <!-- ADD NEW -->
      </template>
      <template slot="thead">
        <vs-th>{{$t('label.ticketNumber')}}</vs-th>
        <vs-th>{{$t('label.priority')}}</vs-th>
        <vs-th>{{$t('label.ticketdate')}}</vs-th>
        <vs-th>{{$t('label.problemcode')}}</vs-th>
        <vs-th>{{$t('label.ticket.status')}}</vs-th>
        <vs-th>{{$t('label.Title')}}</vs-th>
        <vs-th>{{$t('label.assignto')}}</vs-th>
        <vs-th>{{$t('label.lastcomment')}}</vs-th>
        <vs-th>{{$t('label.ticket.file')}}</vs-th>
        <vs-th>{{$t('label.heading.actions')}}</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="index" v-for="(ticket, index) in data">
          <vs-td :data="ticket.ticketNumber">{{ticket.ticketNumber}}</vs-td>
          <vs-td :data="ticket.priority">{{ticket.priority}}</vs-td>
          <vs-td :data="getDate(ticket.ticketDate)">{{getDate(ticket.ticketDate)}}</vs-td>
          <vs-td :data="ticket.problemDescription">{{ticket.problemDescription}}</vs-td>
          <vs-td :data="ticket.status">{{ticket.status}}</vs-td>
          <vs-td :data="ticket.title">{{ticket.title}}</vs-td>
          <vs-td :data="ticket.userName">{{ticket.userName}}</vs-td>
          <vs-td :data="ticket.lastComment">{{ticket.lastComment}}</vs-td>
          <vs-td :data="ticket.file">{{ticket.file}}</vs-td>
          <vs-td>
            <feather-icon
              title="Download Uploaded File"
              icon="DownloadIcon"
              svgClasses="w-5 h-5 hover:text-primary stroke-current"
            />
            <feather-icon
              @click="editTicket(ticket)"
              class="ml-1"
              title="Comment"
              icon="EditIcon"
              svgClasses="w-5 h-5 hover:text-primary stroke-current"
            />
            <feather-icon
              @click="removeTicket(ticket.id)"
              class="ml-1"
              title="Close"
              icon="XIcon"
              svgClasses="w-5 h-5 hover:text-primary stroke-current"
            />
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    </vx-card>
  </div>
</template>
<script>
import { getEntityTickets, deleteTickets } from "@/http/entity";
import moment from "moment";
export default {
  props: ["entityId"],
  data() {
    return {
      descriptionItems: [5, 10, 15],
      agreementDetails: []
    };
  },
  methods: {
    async getTickets() {
      try {
        const response = await getEntityTickets(this.entityId);
        this.$store.dispatch("entity/setEntityTickets", response.data);
      } catch (e) {
        console.log("Something went wrong while retrieving entity Tickets", e);
      }
    },
    getDate(date) {
      if (date) {
        return moment(date.join("/")).format("DD MMMM YYYY");
      }
      return null;
    },
    async removeTicket(id) {
      try {
        await deleteTickets(id);
        this.getTickets();
        console.log("data delete thaye che");
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    tickets() {
      return this.$store.getters["entity/getEntityTickets"];
    }
  },
  created() {
    this.getTickets();
  }
};
</script>
<style lang="scss" scoped>
</style>