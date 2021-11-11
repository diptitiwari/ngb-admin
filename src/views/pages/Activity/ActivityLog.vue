<template>
  <div>
    <div class="vx-rowmx-1">
      <vx-card>
        <vs-table
          :max-items="descriptionItems[0]"
          pagination
          :data="transactionHistoryOfficeList"
          description
          search
          :description-items="descriptionItems"
          description-title="Registries"
          description-connector="of"
          description-body="Pages"
          class="mx-2"
        >
          <template slot="header">
            <!-- ADD NEW -->
                    <ul class="horizontal-sm-btn flex  mb-2 order-1">
          <li>
            <div class="p-1 cursor-pointer flex items-center text-lg font-medium w-full">
        <datepicker name="start-date" :placeholder="$t('label.heading.startdate')" v-model="search.fromDate"></datepicker>
            </div>
          </li>
          <li>
            <div class="p-1 cursor-pointer flex items-center text-lg font-medium w-full">
        <datepicker name="end-date" :placeholder="$t('label.heading.startdate')" v-model="search.toDate"></datepicker>
            </div>
          </li>
                    <li>
            <div class="p-1 cursor-pointer flex items-center text-lg font-medium w-full">
              <vs-button color="primary" type="border" icon-pack="feather" class="mr-sm-3" icon="icon-search" @click="getTransactionHistoryOfficeList"></vs-button>
            </div>
          </li>

        </ul>
          </template>
          <template slot="thead">
            <vs-th>{{$t('table.officeId')}}</vs-th>
            <vs-th>{{$t('label.heading.transactiondate')}}</vs-th>
            <vs-th>{{$t('label.heading.transactiontype')}}</vs-th>
            <vs-th>{{$t('label.heading.History')}}</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="index" v-for="(history, index) in data">
              <vs-td :data="history.officeId">{{history.officeId}}</vs-td>

              <vs-td :data="getFormattedDate(history.transactionDate)">{{getFormattedDate(history.transactionDate)}}</vs-td>
              <vs-td :data="history.transactionType">{{history.transactionType}}</vs-td>

              <vs-td :data="history.history">
                {{getHistory(history)}}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
    </div>

    <vs-popup :title="$t('label.filterbydate')" :active.sync="filterPopup">
      <div class="vx-row md:w-1/2 lg:w-1/2 sm:w-full mb-6">
        <small class="date-label">{{$t('label.heading.startdate')}}</small>
        <datepicker name="start-date" v-model="search.fromDate"></datepicker>
      </div>
      <div class="vx-row md:w-1/2 lg:w-1/2 sm:w-full mb-6">
        <small class="date-label">{{$t('label.heading.enddate')}}</small>
        <datepicker name="end-date" v-model="search.toDate"></datepicker>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-2/3 w-full">
          <vs-button class="mr-3 mb-2" @click="getTransactionHistoryOfficeList">{{$t('label.button.Search')}}</vs-button>
        </div>
      </div>
    </vs-popup>

  </div>
</template>
<script>
  import moment from 'moment';
  import Datepicker from "vuejs-datepicker";
  import {getTransactionHistoryOffice} from '@/http/transaction';
  export default {
    components: { Datepicker },
    data () {
      return {
        user_data: null,
        user_not_found: false,
        searchOption: 0,
        descriptionItems: [5, 10, 15],
        filterPopup: false,
        search: {
          fromDate: moment().startOf('month').format('YYYY-MM-DD'),
          toDate: moment().endOf('month').format('YYYY-MM-DD')
        }
      }
    },
    computed: {
      transactionHistoryOfficeList() {
        return this.$store.getters['transaction/transactionHistoryOffice'];
      }
    },
    methods: {
      getFormattedDate(timeStamp) {
        return moment(timeStamp).format('DD MMMM YYYY hh:mm a');
      },
      getOrderStatusColor (status) {
        if (status == 'closed') return 'danger'
        if (status == 'inactive') return 'success'
        return 'primary'
      },
      async getTransactionHistoryOfficeList() {
        const fromDate = moment(this.search.fromDate).startOf('month').format('YYYY-MM-DD');
        const toDate =  moment(this.search.toDate).endOf('month').format('YYYY-MM-DD');
        try {
          const history = await getTransactionHistoryOffice(fromDate, toDate);
          this.$store.dispatch("transaction/setTransactionHistoryOffice", history.data.pageItems);
          if (this.filterPopup) this.filterPopup = false;
        } catch (e) {
          console.log('something went to wrong while retrieving transaction history office:', e);
        }
      },
      getHistory(activity) {
        const eventTypeCategoryMsg = {

          //client related data
          "CREATE CLIENT" : "Client Created Successfully with Name:"+activity.firstname+activity.lastname,
          "UPDATE CLIENT" : "Update Successfully:"+activity.officeTransfer,
          "UPDATE ADDRESS" : "Client Address Updated successfully with ",
          "DELETE CLIENT" : "Client Closed successfully with ReasonId "+activity.closureReasonId,

          //add plan data
          "CREATE MULTIPLEORDERS"  : "PlanCode : "+"("+activity.planCode+")"+"   "+"PlanDescription : "+"("+activity.planDescription+")",

          //order related data
          "CREATE ORDER" : "PlanCode :"+activity.planCode+" Contract Period :"+activity.contractPeriod,
          "CHANGEPLAN ORDER" : "PlanCode : "+activity.planCode+" , "+" ChangedPlan : "+activity.changePlanDetail+" , "+"  Contract Period : "+activity.contractPeriod,
          "DELETE ORDER" : "Order Deleted successfully",
          "EXTENSION ORDER" : "Order Extended to "+activity.extensionPeriod+" Due To "+activity.extensionReason,
          "RECONNECT ORDER" : "Order Re-Connected successfully with OrderId : "+activity.resourceId,
          "REACTIVE ORDER" : "Order Re-Activated successfully with OrderId : "+activity.resourceId,
          "SUSPEND ORDER" : "Order Suspended with reason "+activity.suspensionReason+" and Description "+activity.suspensionDescription,
          "RETRACKOSDMESSAGE ORDER" : "Order Re-Track OSD Message Added with commandName : "+activity.commandName,
          "APPLYPROMO ORDER" : "Apply Promo Added for Order with Promo Id : "+activity.promoId,
          "TERMINATE ORDER" : "Order Terminated successfully with OrderId : "+activity.resourceId,
          "DISCONNECT ORDER" : "Order Disconnected Successfully with OrderId : "+activity.orderNo,
          "DISCONNECT MULTIPLEORDERS" :  "PlanCode : "+"("+activity.planCode+")"+"    "+"PlanDescription : "+"("+activity.planDescription+")",

          //payments related Data
          "CREATE PAYMENT" : "Payment Done Successfully with Amount : "+activity.amountPaid+ " , "+ "Reciept No : " +activity.receiptNo,
          "CANCEL PAYMENT" : "Payment Cancelled successfully with remarks "+activity.cancelRemark,

          //itemsale related data
          "CREATE ONETIMESALE" : "Item Sale Created Successfully with Charge Code "+activity.chargeCode+" ,UnitPrice "+activity.unitPrice+"" +
            " ,Total Price "+activity.totalPrice+" ,Quantity "+activity.quantity+" and SaleType "+activity.saleType+"",

          "CREATE NEWSALE" : "NEWSALE Created Successfully With Price : "+activity.totalPrice+" , " +
            "Quantity : "+activity.quantity+ "," + "  SaleType : "+activity.saleType+" With Serial Number "+activity.serialNo,

          "DEALLOCATE INVENTORY" : "Deallocated item",
          "DELETE ONETIMESALE"   : "Item sale deleted Successfully",
          "RENEWAL ORDER"   : "Order Renewaled Sucessfully with : "+activity.orderNo,

          "CREATE EVENTORDER" : "Event Order Done Successfully Event Id"+activity.eventId+", Format "+activity.formatType,

          //more info related data
          "CREATE PARENTCLIENT" : "Parent Added to Client successfully",
          "CREATE CLIENTCARDDETAILS" : "Client Credit Card Details Added successfully",

          //notes related data
          "CREATE CLIENTNOTE" : "Client Notes Created Successfully",

          //statement related data
          "DELETE BILLMASTER" : "Bill Statement Deleted successfully",

          //client identifier related data
          "CREATE CLIENTIDENTIFIER" : "Client Identifier Added successfully",
          "DELETE CLIENTIDENTIFIER" : "Client Identifier Deleted successfully",

          //ticket related data
          "CREATE TICKET" : "Ticket Created Successfully",
          "CLOSE TICKET" : "Ticket Closed Successfully",

          //client contact information related data
          "CREATE Client_Contact_Info" : "Client Contact Information Added successfully",
          "UPDATE Client_Contact_Info" : "Client Contact Information Updated successfully",
          "DELETE Client_Contact_Info" : "Client Contact Information Deleted successfully",

          //credit distribution related data
          "CREATE CREDITDISTRIBUTION" : "Credit Distribution ",

          //adjustment related data
          "CREATE ADJUSTMENT" : "AmountPaid:"+activity.amount_paid+" AdjustmentType:"+activity.adjustment_type+" AdjustmentCode:"+activity.adjustment_code+" Remarks:"+activity.Remarks,

          "CREATE OWNEDHARDWARE" : "Owned Hardware Created",
          "CREATE ALLOCATION" : "Allocation Added successfully",

          //self care related data
          "SELFREGISTRATION ACTIVATE" : "Selfcare Registration Activated",
          "CREATE SELFCARE" : "Selfcare Account Created successfully with UserName:"+activity.userName,

          // Redemption related data
          "CREATE REDEMPTION":"Redemption done successfully PinNumber:"+activity.pinNumber,

          // ServiceTransfer related data
          "CREATE SERVICETRANSFER":"Service transfered from "+activity.oldPropertyCode +" to "+activity.newPropertyCode+" with Shift Charge Amount "+activity.shiftChargeAmount,

          //clientservice related data
          "CREATE CLIENTSERVICE":"Client Service Created Successfully For ServiceId : "+activity.serviceId+"",

          //clientsimpleactivation data
          "CREATE CLIENTSIMPLEACTIVATION" : "Client Simple Activation Is Successful For ServiceId : "+activity.serviceId+"",

          //provisioning details data
          "CONFIRM PROVISIONINGDETAILS" :"Provisioning Details Confirmed",

          //client serviceactivation data
          "CREATE CLIENTSERVICEACTIVATION" :"Client Service Activated Successfully",

          //clientservice terminate data
          "TERMINATE CLIENTSERVICE" :"Client Service Terminated Successfully",

          //swaphardware device data
          "SWAP HARDWAREDEVICE" :"Device Swapped Successfully From :"+activity.oldSerialNo +" To:"+activity.newSerialNo+"",

          //clientservice suspend data
          "SUSPEND CLIENTSERVICE" :"Client Service Suspended Successfully ",

          //clientservice reactivate data
          "REACTIVE CLIENTSERVICE" :"Client Service ReActivated Successfully ",

          //organization  data
          "CREATE OFFICE" : "Create Office successfully with officeId:"+activity.resourceId,
          "UPDATE OFFICE" : "Update Office successfully with officeId:"+activity.resourceId,
          "DELETE PARTNERAGREEMENT": "Delete partnerAgreement successfully",
          "CREATE PARTNERAGREEMENT": "Create partnerAgreement successfully",
          "CREATE OFFICEADJUSTMENT": "Create officeadjustment successfully",
          "CREATE OFFICEPAYMENT": "Create officepayment successfully",
          "CREATE OFFICE" :"Create office successfully ",
          "UPDATE OFFICE" :"Update office successfully "
        };
        return eventTypeCategoryMsg[activity.transactionType];
      }
    },
    created () {
      this.getTransactionHistoryOfficeList();
    }
  }
</script>
<style lang="scss" scoped>
  .vs-table--search {
    max-width: 100%;
  }
</style>
