<template>
  <div id="sidebars-customizer">
    <div id="user-data parentx-demo-2 " v-if="entityId && entityDetail">
      <div class="vx-row mb-base">
        <div class="vx-col w-full md:w-full xl:w-full">
          <div class="vx-card p-2 sm-flex-direction">
            <div class="vx-row">
              <div class="vx-col md:w-1/12 xl:w-1/12">
                <img
                  src="@/assets/images/avatar/avatar.png"
                  id="avatar-col"
                  class="rounded avatar-pic"
                />
              </div>
              <div class="vx-col md:w-11/12 xl:w-11/12">
                <div class="sm-flex-direction">
                  <div class="vx-row sm-order-2 mb-2">
                    <div class="vx-col w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-3">
                      <h6>
                        <span class="font-semibold">{{$t('label.parentorg')}}: &nbsp;</span>
                        <span>{{entityDetail.parentName}}</span>
                      </h6>
                    </div>
                    <div class="vx-col w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-3">
                      <h6>
                        <span class="font-semibold">{{$t('label.businesstype')}}:&nbsp;</span>
                        <span>{{entityDetail.businessType}}</span>
                      </h6>
                    </div>
                  </div>
                  <div class="vx-row sm-order-3 mb-2">
                    <div class="vx-col w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-3">
                      <h6>
                        <span class="font-semibold">{{$t('label.heading.balance')}}:&nbsp;</span>
                        <span>{{entityDetail.balanceAmount}}</span>
                      </h6>
                    </div>
                    <div class="vx-col w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-3">
                      <h6>
                        <span class="font-semibold">{{$t('label.creditlimit')}}:&nbsp;</span>
                        <span></span>
                      </h6>
                    </div>
                  </div>
                  <div class="vx-row mb-1 sm-order-1 mb-2">
                    <div class="vx-col w-full xl:w-full">
                      <h6>
                        <div class="flex items-center">
                          <vx-tooltip text="active" position="bottom" delay=".3s">
                            <div class="h-3 w-3 rounded-full mr-1 bg-success"></div>
                          </vx-tooltip>
                          <span class="text-sm font-semibold">{{entityDetail.name}}</span>
                        </div>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col md:w-full lg:w-full sm:w-full w-full mb-base">
          <vx-card>
            <vs-collapse type="border" accordion>
              <vs-sidebar
                position-right
                parent="#parentx-demo-2"
                :hidden-background="true"
                default-index="1"
                color="primary"
                class="sidebarx"
                spacer
                v-model="paymentsActive"
              >
                <div class="header-right-sidebar" slot="header">
                  <p class="font-semibold">Create Payments</p>
                </div>
                <vs-sidebar-item index="12">
                  <vs-input :label="$t('label.collectionby')" class="w-full" icon-no-border />
                </vs-sidebar-item>
                <vs-sidebar-item index="13">
                  <datepicker
                    name="start-date"
                    class="w-full"
                    :placeholder="$t('label.input.paymentdate')"
                  ></datepicker>
                </vs-sidebar-item>
                <vs-sidebar-item index="14">
                  <vs-select
                    :label="$t('label.input.paymenttype')"
                    class="selectExample w-full vs-search-categeory"
                  >
                    <vs-select-item
                      :key="index"
                      :value="item.value"
                      :text="item.text"
                      v-for="(item,index) in paymenttype"
                    />
                  </vs-select>
                </vs-sidebar-item>
                <vs-sidebar-item index="15">
                  <vs-input :label="$t('label.input.amount')" class="w-full" icon-no-border />
                </vs-sidebar-item>
                <vs-sidebar-item index="16">
                  <vs-input :label="$t('label.receiptno')" class="w-full" icon-no-border />
                </vs-sidebar-item>
                <vs-sidebar-item index="17">
                  <vs-checkbox>Is Wallet</vs-checkbox>
                </vs-sidebar-item>
                <vs-sidebar-item index="18">
                  <vs-textarea :label="$t('label.notes')" class="w-full" />
                </vs-sidebar-item>
                <vs-sidebar-item class="float-right">
                  <vs-button color="primary" class="mr-2">Save</vs-button>
                  <vs-button color="primary" type="border">Cancel</vs-button>
                </vs-sidebar-item>
                <!-- <div class="footer-sidebar" slot="footer">
                  <vs-button icon="" color="primary" type="flat">Save</vs-button>
                  <vs-button icon="settings" color="primary" type="border">Cancel</vs-button>
                </div>-->
              </vs-sidebar>
              <vs-collapse-item>
                <div slot="header">{{entityDetail.name}}</div>
                <div class="vx-row">
                  <div class="vx-col w-full md:w-full lg:w-full">
                    <ul class="horizontal-sm-btn flex mb-2 float-right">
                      <li>
                        <div
                          class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                        >
                          <vs-button
                            color="primary"
                            icon-pack="feather"
                            icon="icon-plus"
                            class="truncate"
                            @click="active = !active"
                            size="small"
                          >{{$t('label.addticket')}}</vs-button>
                        </div>
                      </li>
                      <li>
                        <div
                          class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                        >
                          <vs-button
                            color="primary"
                            icon-pack="feather"
                            icon="icon-dollar-sign"
                            class="truncate"
                            @click="paymentsActive = !paymentsActive"
                            size="small"
                          >{{$t('label.payments')}}</vs-button>
                        </div>
                      </li>
                      <li>
                        <div
                          class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                        >
                          <vs-button
                            color="primary"
                            icon-pack="feather"
                            icon="icon-sliders"
                            class="truncate"
                            @click="AdjustmentPopup=true"
                            size="small"
                          >{{$t('label.adjustments')}}</vs-button>
                        </div>
                      </li>
                      <li>
                        <div
                          class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                        >
                          <vs-button
                            color="primary"
                            icon-pack="feather"
                            icon="icon-edit"
                            class="truncate"
                            @click="editEntity(entityId)"
                            size="small"
                          >{{$t('label.prospects.edit')}}</vs-button>
                        </div>
                      </li>
                      <li>
                        <div
                          class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                        >
                          <vs-button
                            color="primary"
                            icon-pack="feather"
                            icon="icon-plus"
                            class="truncate"
                            @click="additionalInfo=true"
                            size="small"
                          >{{$t('label.createagreement')}}</vs-button>
                        </div>
                      </li>
                      <li>
                        <div
                          class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                        >
                          <vs-button
                            color="primary"
                            icon-pack="feather"
                            icon="icon-plus"
                            class="truncate"
                            @click="additionalInfo=true"
                            size="small"
                          >{{$t('tab.invoices')}}</vs-button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="vx-row">
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full xs:w-full">
                    <vx-card title no-shadow card-border>
                      <div class="block overflow-x-auto">
                        <vs-table stripe :data="entityDetail">
                          <template>
                            <vs-tr>
                              <vs-td>{{$t('label.heading.entitycode')}}</vs-td>

                              <vs-td>{{entityDetail.externalId}}</vs-td>
                            </vs-tr>
                            <vs-tr>
                              <vs-td>{{$t('label.heading.entityname')}}</vs-td>

                              <vs-td>{{entityDetail.name}}</vs-td>
                            </vs-tr>
                            <vs-tr>
                              <vs-td>{{$t('label.heading.entitytype')}}</vs-td>

                              <vs-td>{{entityDetail.officeType}}</vs-td>
                            </vs-tr>
                            <vs-tr>
                              <vs-td>{{$t('label.orgopenedon')}}</vs-td>

                              <vs-td>{{getDate(entityDetail.openingDate)}}</vs-td>
                            </vs-tr>
                            <vs-tr>
                              <vs-td>{{$t('label.contactperson')}}</vs-td>

                              <vs-td>{{entityDetail.contactPerson}}</vs-td>
                            </vs-tr>
                            <vs-tr>
                              <vs-td>{{$t('label.email')}}</vs-td>

                              <vs-td>{{entityDetail.email}}</vs-td>
                            </vs-tr>
                            <vs-tr>
                              <vs-td>{{$t('table.heading.phonenumber')}}</vs-td>

                              <vs-td>{{entityDetail.phoneNumber}}</vs-td>
                            </vs-tr>
                          </template>
                        </vs-table>
                      </div>
                    </vx-card>
                  </div>
                  <div class="vx-col lg:w-1/2 md:w-1/2 sm:w-full xs:w-full">
                    <vx-card title no-shadow card-border>
                      <div class="block overflow-x-auto">
                        <vs-table stripe :data="entityDetail">
                          <template slot-scope="{data}">
                            <vs-tr>
                              <vs-td>{{$t('label.addressname')}}</vs-td>

                              <vs-td>{{entityDetail.addressName}}</vs-td>
                            </vs-tr>
                            <vs-tr>
                              <vs-td>{{$t('label.heading.city/area')}}</vs-td>

                              <vs-td>{{entityDetail.city}}</vs-td>
                            </vs-tr>
                            <vs-tr>
                              <vs-td>{{$t('label.district')}}</vs-td>

                              <vs-td>{{entityDetail.officeType}}</vs-td>
                            </vs-tr>
                            <vs-tr>
                              <vs-td>{{$t('label.state')}}</vs-td>

                              <vs-td>{{entityDetail.state}}</vs-td>
                            </vs-tr>
                            <vs-tr>
                              <vs-td>{{$t('label.country')}}</vs-td>

                              <vs-td>{{entityDetail.country}}</vs-td>
                            </vs-tr>
                            <vs-tr>
                              <vs-td>{{$t('label.zipcode')}}</vs-td>

                              <vs-td>{{entityDetail.zip}}</vs-td>
                            </vs-tr>
                            <vs-tr>
                              <vs-td>{{$t('label.gstregno')}}</vs-td>

                              <vs-td>{{entityDetail.gstRegNo}}</vs-td>
                            </vs-tr>
                          </template>
                        </vs-table>
                      </div>
                    </vx-card>
                  </div>
                </div>
              </vs-collapse-item>
            </vs-collapse>
          </vx-card>
        </div>
      </div>
      <div class="customer-tab">
        <div slot="no-body" class="tabs-container  pt-6" id="view-customer-tab">
            <vs-tabs alignment="fixed" v-model="activeTab" class="tab-action-btn-fill-conatiner">
              <vs-tab :label="$t('label.agreementDetail')">
                <div class="tab-text">
                  <agreement-details :entityId="entityId" />
                </div>
              </vs-tab>

              <vs-tab :label="$t('label.heading.ticket')">
                <div class="tab-text">
                  <Tickets :entityId="entityId" />
                </div>
              </vs-tab>
              <vs-tab :label="$t('tab.partnersDisbursements')">
                <div class="tab-text">
                  <Disbursements />
                </div>
              </vs-tab>
              <vs-tab :label="$t('label.heading.financialtransactions')">
                <div class="tab-text">
                  <Transactions />
                </div>
              </vs-tab>
              <vs-tab :label="$t('label.anchor.customers')">
                <div class="tab-text">
                  <Customers :entityId="entityId" />
                </div>
              </vs-tab>
            </vs-tabs>
        </div>
        <vs-sidebar
          position-right
          parent="#parentx-demo-2"
          :hidden-background="true"
          default-index="1"
          color="primary"
          class="sidebarx"
          spacer
          v-model="active"
        >
          <div class="header-right-sidebar" slot="header">
            <p class="font-semibold">Add Ticket</p>
          </div>
          <vs-sidebar-item index="1">
            <vs-input :label="$t('label.ticketdate')" class="w-full" v-model="ticket.ticketDate" />
          </vs-sidebar-item>
          <vs-sidebar-item index="2">
            <v-select
              label="mCodeValue"
              :options="ticketTemplates.problemsDatas"
              placeholder="Select Categeory"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              class="min-w-200 w-full"
            >
              <template v-slot:option="option">{{ option.mCodeValue }}</template>
            </v-select>
          </vs-sidebar-item>
          <vs-sidebar-item index="3">
            <v-select
              label="teamCode"
              :options="ticketTemplates.TicketTeamMappingData"
              placeholder="Select Team"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              class="min-w-200 w-full"
            />
          </vs-sidebar-item>
          <vs-sidebar-item index="4">
            <!-- <datepicker
                    name="start-date"
                    class="w-full"
                    :placeholder="$t('label.DueTime')"
            ></datepicker>-->
            <flat-pickr
              :config="configdateTimePicker"
              class="w-full"
              :placeholder="$t('label.DueTime')"
            />
          </vs-sidebar-item>
          <vs-sidebar-item index="6">
            <v-select
              label="value"
              :options="ticketTemplates.priorityType"
              placeholder="Select Priority"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              class="min-w-200 w-full"
            />
          </vs-sidebar-item>
          <vs-sidebar-item index="7">
            <v-select
              label="value"
              :options="planOptions"
              placeholder="Select Sub Categeory"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              class="min-w-200 w-full"
            />
          </vs-sidebar-item>
          <vs-sidebar-item index="8">
            <v-select
              label="mCodeValue"
              :options="ticketTemplates.sourceData"
              placeholder="Select Source"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              class="min-w-200 w-full"
            />
          </vs-sidebar-item>
          <vs-sidebar-item>
            <v-select
              label="text"
              :options="teamUserOptions"
              placeholder="Select Team User"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              class="min-w-200 w-full"
            />
          </vs-sidebar-item>
          <vs-sidebar-item index="9">
            <vs-input :placeholder="$t('label.title')" class="w-full" icon-no-border />
          </vs-sidebar-item>
          <vs-sidebar-item index="10">
            <vs-textarea :label="$t('label.heading.description')" class="w-full" />
          </vs-sidebar-item>
          <vs-sidebar-item index="5">
            <vs-upload
              text="File"
              limit="1"
              ref="profile"
              :show-upload-button="false"
              class="compose-mail-attachment"
              @change="this.profileUrl = this.$refs.profile.files[0];"
            />
          </vs-sidebar-item>
          <vs-sidebar-item index="11" class="float-right">
            <vs-button color="primary" class="mr-2">FTR</vs-button>
            <vs-button color="primary" class="mr-2">Save</vs-button>
            <vs-button color="primary" type="border">Cancel</vs-button>
          </vs-sidebar-item>
          <!-- <div class="footer-sidebar" slot="footer">
                  <vs-button icon="" color="primary" type="flat">Save</vs-button>
                  <vs-button icon="settings" color="primary" type="border">Cancel</vs-button>
          </div>-->
        </vs-sidebar>
        <div class="centerx">
          <vs-popup
            classContent="popup-example"
            :title="$t('label.heading.createadjustment')"
            :active.sync="AdjustmentPopup"
          >
            <form>
              <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
                <div class="vx-col sm:w-full w-full">
                  <small class="font-semibold">{{$t('label.adjustmentdate')}}</small>
                  <datepicker
                    placeholder="Select Date"
                    v-model="adjustment.adjustmentDate"
                    class="mb-2 font-semibold"
                  />
                </div>
                <div class="vx-col sm:w-full w-full">
                  <small class="font-semibold">{{$t('label.adjustmentdate')}}</small>
                  <v-select
                    label="adjustmentCode"
                    :options="adjustmentTemplates.data"
                    placeholder="Select One"
                    :reduce="adjustmentCode => adjustmentCode.id"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    class="min-w-200 w-full"
                  />
                </div>
                <div class="vx-col sm:w-full w-full">
                  <vs-input
                    :label="$t('label.adjustmentamount')"
                    type="text"
                    class="w-full font-semibold"
                  />
                </div>
                <div class="vx-col sm:w-full w-full">
                  <small class="font-semibold">{{$t('label.adjustmenttype')}}</small>
                  <v-select
                    label="discountType"
                    :options="adjustmentTemplates.discountOptions"
                    placeholder="Select One"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    class="min-w-200 w-full"
                  />
                </div>
                <div class="vx-col sm:w-full w-full">
                  <small class="font-semibold">{{$t('label.heading.notes')}}</small>
                  <vs-textarea class="w-full" />
                </div>
              </div>

              <div class="vx-row">
                <span class="ml-4 mr-1">
                  <vs-button
                    icon-pack="feather"
                    type="border"
                    icon="icon-x"
                    @click="cancel"
                  >{{$t('label.button.cancel')}}</vs-button>
                </span>
                <span class="ml-1 mr-2">
                  <vs-button icon-pack="feather" icon="icon-search">{{$t('label.button.Search')}}</vs-button>
                </span>
              </div>
            </form>
          </vs-popup>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
// import HorizonalBtn from "@/layouts/components/HorizontalBtn.vue";
import {
  getEntityById,
  getTicketTemplate,
  getAdjustmentsTemplate
} from "@/http/entity";
import moment from "moment";
import _ from "lodash";
import AgreementDetails from "./agreement-detail/Index";
import Tickets from "./tickets/Index";
import Disbursements from "./disbursements/Index";
import Transactions from "./transactions/Index";
import Customers from "./customers/Index";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Datepicker from "vuejs-datepicker";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import vSelect from "vue-select";
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
  locale: "en",
  dateFormat: "dd MMMM yyyy",
  ticketDate: null,
  ticketURL: "https://smartway.trigital.in/app/#/viewTicket/10",
  ticketTime: null,
  file: null
};
const adjustmentObj = {
  adjustmentDate: null
};
export default {
  data() {
    return {
      datetime: null,
      descriptionItems: [5, 10, 15],
      user_data: null,
      user_not_found: false,
      activeTab: 0,
      active: false,
      ticket: ticketObj,
      adjustment: adjustmentObj,
      paymentsActive: false,
      AdjustmentPopup: false,
      entityId: null,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "d-m-Y H:i"
      },
      paymenttype: [],
      teamUserOptions: [],
      planOptions: []
    };
  },
  components: {
    // HorizonalBtn,
    AgreementDetails,
    Tickets,
    Disbursements,
    Customers,
    Transactions,
    VuePerfectScrollbar,
    Datepicker,
    flatPickr,
    "v-select": vSelect
  },
  computed: {
    entityDetail() {
      return this.$store.getters["entity/getEntityDetail"];
    },
    ticketTemplates() {
      return this.$store.getters["entity/getTicketTemplate"];
    },
    adjustmentTemplates() {
      return this.$store.getters["entity/getAdjustmentsTemplate"];
    }
  },
  methods: {
    async getEntity() {
      try {
        const response = await getEntityById(this.entityId);
        this.$store.dispatch("entity/setEntityDetail", response.data);
        // console.log("data ave che", response.data);
      } catch (error) {
        console.log(
          "something went to wrong while retrieving entity by id:",
          error
        );
      }
    },
    editEntity(id) {
      this.$router.push(`/edit_entity/${id}`);
    },
    getDate(date) {
      if (date) {
        return moment(date.join("/")).format("DD MMMM YYYY");
      }
      return null;
    },
    cancel() {
      this.AdjustmentPopup = false;
    },
    async ticketTemplate() {
      try {
        const response = await getTicketTemplate();
        this.$store.dispatch("entity/setTicketTemplate", response.data);
      } catch (error) {
        console.log(
          "something went to wrong while retrieving entity tickets:",
          error
        );
      }
    },
    async adjustmentTemplate() {
      try {
        const response = await getAdjustmentsTemplate();
        this.$store.dispatch("entity/setAdjustmentsTemplate", response.data);
      } catch (e) {
        console.log(
          "something went to wrong while retrieving entity adjustment:",
          e
        );
      }
    }
  },
  created() {
    this.entityId = this.$route.params.id;
    this.getEntity();
    this.ticketTemplates();
    this.adjustmentTemplates();
  },
  watch: {
    active(newValue) {
      if (newValue) {
        this.ticketTemplate();
        this.ticket.ticketDate = moment().format("DD MMMM YYYY hh:mm:ss a");
      }
    },
    AdjustmentPopup(newValue) {
      if (newValue) {
        this.adjustmentTemplate();
        this.adjustment.adjustmentDate = moment().format("DD MMMM YYYY");
      }
    }
  }
};
</script>

<style lang="scss">
#page-user-view {
  .service-order-tbl {
    td {
      min-width: 102px !important;
    }
  }
}
.popup-example {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}
.customer-tab {
  .vs-tabs--content {
    max-height: 27rem !important;
    overflow-y: auto;
    overflow-x: hidden;
    padding-top: 10px;
    &:hover {
      overflow-y: auto;
      transition: 0.2s;
      transition-delay: 0.2s;
    }
  }
}
#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }
}
.vs-tabs--content::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
}

.vs-tabs--content::-webkit-scrollbar {
  width: 4px;
}

.vs-tabs--content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #7367f0;
}

.liveactive {
  &::after {
    content: "\A";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #00ce00;
    display: inline-block;
  }
}
.vs-sidebar {
  z-index: 9999999;
}
#parentx {
  overflow: hidden;
  height: 500px;
  position: relative;
}
#sidebars-customizer .vs-sidebar {
  max-width: 360px !important;
}
.vs-sidebar .vs-sidebar--items {
  overflow-y: auto;
  overflow-x: hidden;
}
.vs-sidebar--items::-webkit-scrollbar {
  width: 0px;
  background: transparent !important;
}
.header-right-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    > button {
      margin-left: 10px;
    }
  }
}

.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > button {
    border: 0px solid rgba(0, 0, 0, 0) !important;
    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
    border-radius: 0px !important;
  }
}
.flatpickr-calendar.open {
  z-index: 999999999999;
}
.vs-con-textarea {
  margin-bottom: 0px !important;
}
</style>
