<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div>
    <div>
      <div slot="no-body" class="tabs-container px-6 pt-6">
          <vs-tabs alignment="fixed" v-model="activeTab" class="tab-action-btn-fill-conatiner"> 
          <vs-tab :label="$t('label.heading.userprofile')" >
            <div class="tab-text">
              <vx-card>
              <div class="vx-row">
                <div class="vx-col w-full lg:w-2/5 md:w-2/5 sm:w-full xs:w-full mb-base">
                  <!-- USER PROFILE CARD -->
                  <vx-card no-shadow card-border>
                    <div class="vx-row">
                      <div class="vx-col w-full">
                        <div class="flex items-end px-3">
                          <feather-icon svgClasses="w-6 h-6" icon="UserIcon" class="mr-2" />
                          <span
                            class="font-medium text-lg leading-none"
                          >{{$t('label.userinformation')}}</span>
                        </div>
                        <vs-divider />
                      </div>
                    </div>

                    <div class="block overflow-x-auto">
                      <div class="mt-5">
                        <h6>{{$t('label.heading.username')}}:</h6>
                        <p>{{getUserDetail.username}}</p>
                      </div>

                      <div class="mt-5">
                        <h6>{{$t('label.heading.entityname')}}:</h6>
                        <p>{{getUserDetail.officeName}}</p>
                      </div>

                      <div class="mt-5">
                        <h6>{{$t('label.heading.status')}}:</h6>
                        <p>Authenticated</p>
                      </div>

                      <div class="mt-5">
                        <h6>{{$t('label.heading.primaryemail')}}:</h6>
                        <p>{{getUserDetail.email}}</p>
                      </div>
                    </div>
                  </vx-card>
                </div>
                <div class="vx-col w-full lg:w-3/5 md:w-3/5 sm:w-full xs:w-full">
                  <vx-card title no-shadow card-border>
                    <div class="vx-row">
                      <div class="vx-col w-full">
                        <div class="flex items-end px-3">
                          <feather-icon svgClasses="w-6 h-6" icon="UsersIcon" class="mr-2" />
                          <span class="font-medium text-lg leading-none">{{$t('label.userrole')}}</span>
                        </div>
                        <vs-divider />
                      </div>
                    </div>
                    <div class="block overflow-x-auto">
                      <vs-table stripe :data="getUserDetail.selectedRoles">
                        <template slot="thead">
                          <vs-th
                            class="font-semibold text-base text-left px-3 py-2"
                          >{{$t('label.heading.role')}}</vs-th>
                          <vs-th
                            class="font-semibold text-base text-left px-3 py-2"
                          >{{$t('label.heading.description')}}</vs-th>
                        </template>

                        <template slot-scope="{data}">
                          <vs-tr :key="indextr" v-for="(role, indextr) in data">
                            <vs-td>{{role.name}}</vs-td>

                            <vs-td>{{role.description}}</vs-td>
                          </vs-tr>
                        </template>
                      </vs-table>
                    </div>
                  </vx-card>
                </div>
              </div>
              </vx-card>
            </div>
          </vs-tab>
          <vs-tab
            :label="$t('label.heading.changepassword')"
          >
            <div class="tab-text">
              <vx-card>
              <vs-row vs-type="flex" vs-justify="center">
  <vs-col vs-type="flex" vs-justify="center" vs-align="center" class="md:w-1/2 lg:w-1/2 sm:w-full">
                      <vs-input
                    type="password"
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-lock"
                    icon-no-border
                    :label="$t('label.input.password')"
                    v-model="changePassword.password"
                  />
  </vs-col>
</vs-row>
              <vs-row vs-type="flex" vs-justify="center">
  <vs-col vs-type="flex" vs-justify="center" vs-align="center" class="md:w-1/2 mt-2 lg:w-1/2 sm:w-full">
                  <vs-input
                    type="password"
                    class="w-full"
                    icon-pack="feather"
                    icon="icon-lock"
                    icon-no-border
                    :label="$t('label.input.repeatpassword')"
                    v-model="changePassword.repeatPassword"
                  />
  </vs-col>
</vs-row>
              <vs-row vs-type="flex" vs-justify="flex-end">
  <vs-col vs-type="flex" vs-justify="center" vs-align="center" class="w-full mt-2 sm:w-full">
             <vs-button
                    class="mr-3 mb-2"
                    @click="updatePassword"
                  >
                    {{$t('label.button.submit')}}
                  </vs-button>
                  <vs-button
                    color="warning"
                    type="border"
                    class="mb-2"
                  >{{$t('label.heading.reset')}}</vs-button>
  </vs-col>
</vs-row>
              </vx-card>
            </div>
          </vs-tab>
          <vs-tab :label="$t('label.button.Activitylog')">
            <div class="tab-text">
              <ActivityLog />
            </div>
          </vs-tab>
        </vs-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import {changePassword} from '@/http/auth'
import ActivityLog from "../Activity/ActivityLog";
export default {
  components: {
    Datepicker,
    ActivityLog
  },
  data() {
    return {
      user_data: null,
      user_not_found: false,
      activeTab: 0,
      startDate: "",
      endDate: "",
      activityLog: [
        {
          c_id: "",
          transaction_date: "",
          transaction_type: "",
          History: ""
        }
      ],
      descriptionItems: [3, 5, 10],
      changePassword: {
        password: "",
        repeatPassword: "",
      }
    };
  },
  computed: {
    getUserDetail () {
      return this.$store.getters['auth/userDetail'];
    },
  },
  methods: {
    getOrderStatusColor(status) {
      if (status == "disabled") return "danger";
      if (status == "Enabled") return "success";
      return "primary";
    },
    async updatePassword() {
      try {
        await changePassword(this.changePassword, this.getUserDetail.id);
        this.$store.dispatch("auth/logout").then (resp => this.$router.push('/login'));
      } catch (e) {
        console.log('something went to wrong while changing password', e)
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
#data-list-list-view {
  .vs-con-table {
    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 20px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
