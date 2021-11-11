<template>
  <div>
    <div id="user-data user-card" v-if="clientId && clientDetail">
      <div class="vx-row">
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
              <div class="vx-col md:w-10/12 xl:w-10/12">
                <div class="sm-flex-direction">
                  <div class="vx-row sm-order-2">
                    <div class="vx-col w-full md:w-1/2 lg:w-1/4 xl:w-1/4 mb-1">
                      <h6>
                        <span class="font-semibold">{{$t('label.heading.accountno')}}: &nbsp;</span>
                        <span>{{clientDetail.accountNo}}</span>
                      </h6>
                    </div>
                    <div class="vx-col w-full md:w-1/2 lg:w-1/4 xl:w-1/4 mb-1">
                      <h6>
                        <span class="font-semibold">{{$t('label.heading.accounttype')}}:&nbsp;</span>
                        <span>{{clientDetail.AccountType}}</span>
                      </h6>
                    </div>
                    <div class="vx-col w-full md:w-1/2 lg:w-1/4 xl:w-1/4 mb-1">
                      <h6>
                        <span class="font-semibold">{{$t('label.stbserialno')}}:&nbsp;</span>
                        <span>{{getSerialNo('STB')}}</span>
                      </h6>
                    </div>
                    <div class="vx-col w-full md:w-1/2 lg:w-1/4 xl:w-1/4 mb-1">
                      <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
                        <vx-tooltip text="OfficeHierarchy" position="bottom" delay=".3s">
                          <span>OfficeHierarchy</span>
                          <feather-icon
                            icon="ChevronDownIcon"
                            svgClasses="h-4 w-4"
                            class="cursor-pointer p-2"
                          ></feather-icon>
                        </vx-tooltip>
                        <vs-dropdown-menu>
                          <ul class="vx-navbar__starred-pages-more--list">
                            <li class="starred-page--more flex items-center cursor-pointer">
                              <span class="px-2 pt-2 pb-1">LCO1->MSO->Service Provider</span>
                            </li>
                          </ul>
                        </vs-dropdown-menu>
                      </vs-dropdown>
                    </div>
                  </div>
                  <div class="vx-row sm-order-3 mb-2">
                    <div class="vx-col w-full md:w-1/2 lg:w-1/4 xl:w-1/4 mb-2">
                      <h6>
                        <span class="font-semibold">{{$t('label.scserialno')}}:&nbsp;</span>
                        <span>{{getSerialNo('SC')}}</span>
                      </h6>
                    </div>
                    <div class="vx-col w-full md:w-1/2 lg:w-1/4 xl:w-1/4 mb-2">
                      <h6>
                        <span class="font-semibold">{{$t('label.heading.entity')}}:&nbsp;</span>
                        <span>{{clientDetail.officeName}}</span>
                      </h6>
                    </div>
                    <div class="vx-col w-full md:w-1/2 lg:w-1/4 xl:w-1/4 mb-2">
                      <h6>
                        <span class="font-semibold">{{$t('label.heading.balance')}}:&nbsp;</span>
                        <span>{{clientDetail.balanceAmount}}</span>
                      </h6>
                    </div>
                    <div class="vx-col w-full md:w-1/2 lg:w-1/4 xl:w-1/4 mb-2">
                      <h6>
                        <span class="font-semibold">{{$t('label.noncurrencybalance')}}:&nbsp;</span>
                        <span></span>
                      </h6>
                    </div>
                  </div>
                  <div class="vx-row mb-1 sm-order-1 mb-1">
                    <div class="vx-col w-full xl:w-full">
                      <h6>
                        <div class="flex items-center">
                          <vx-tooltip text="active" position="bottom" delay=".3s">
                            <div class="h-3 w-3 rounded-full mr-1 bg-success"></div>
                          </vx-tooltip>
                          <span class="text-sm font-semibold">{{clientDetail.displayName}}</span>
                        </div>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="vx-col w-full md:w-1/12 xl:w-1/12">
                <div class="p-4 flex items-center justify-center sm-jusify-end">
                  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
                    <vs-button
                      radius
                      color="primary"
                      type="relief"
                      icon-pack="feather"
                      icon="icon-settings"
                    ></vs-button>
                    <vs-dropdown-menu class="vx-navbar-dropdown">
                      <ul style="min-width: 10rem">
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="contactInfoPopup=true"
                        >
                          <feather-icon icon="PhoneIcon" svgClasses="w-4 h-4" />
                          <span class="ml-2">{{$t('label.heading.contactinfo')}}</span>
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="popupActivo2=true"
                        >
                          <feather-icon icon="MapIcon" svgClasses="w-4 h-4" />
                          <span class="ml-2">{{$t('tab.addressinfo')}}</span>
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click="popupActivo3=true"
                        >
                          <feather-icon icon="BookIcon" svgClasses="w-4 h-4" />
                          <span class="ml-2">{{$t('tab.billinginfo')}}</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="customer-tab">
        <div slot="no-body" class="tabs-container pt-6" id="view-customer-tab">
          <vs-tabs alignment="fixed" v-model="activeTab" class="tab-action-btn-fill-conatiner">
            <vs-tab :label="$t('label.heading.serviceorders')">
              <div class="tab-text">
                <vx-card class="mb-base">
                  <div class="vx-row">
                    <div class="vx-col md:w-full lg:w-full w-full">
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
                              size="small"
                              @click="serviceWD = !serviceWD"
                            >{{$t('label.servicewithoutdevice')}}</vs-button>
                          </div>
                        </li>
                        <li>
                          <div
                            class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                          >
                            <vs-button
                              color="primary"
                              icon-pack="feather"
                              icon="icon-tag"
                              class="truncate"
                              size="small"
                              @click="createTicket = !createTicket"
                            >{{$t('label.createticket')}}</vs-button>
                          </div>
                        </li>
                        <li>
                          <div
                            class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                          >
                            <vs-button
                              color="primary"
                              icon-pack="feather"
                              icon="icon-crosshair"
                              class="truncate"
                              size="small"
                            >{{$t('label.button.activation')}}</vs-button>
                          </div>
                        </li>
                        <li>
                          <div
                            class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                          >
                            <vs-button
                              color="primary"
                              icon-pack="feather"
                              icon="icon-refresh-cw"
                              class="truncate"
                              size="small"
                              @click="getClient"
                            >{{$t('label.button.refresh')}}</vs-button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <vs-table
                    v-show="!serviceWD && !createTicket"
                    :max-items="5"
                    class="service-order-tbl"
                    pagination
                    :data="clientDetail.clientServiceData"
                    v-model="selectedService"
                    multiple
                  >
                    <template slot="header" color="primary">
                      <!-- ADD NEW -->
                      <h4 class="mb-2">{{$t('label.serviceoverview')}}</h4>
                    </template>
                    <template slot="thead">
                      <vs-th>{{$t('label.serviceid')}}</vs-th>
                      <vs-th>{{$t('label.servicecode')}}</vs-th>
                      <vs-th>{{$t('label.servicedescription')}}</vs-th>
                      <vs-th>{{$t('label.heading.startdate')}}</vs-th>
                      <vs-th>{{$t('label.lastmodifieddate')}}</vs-th>
                      <vs-th>{{$t('label.heading.status')}}</vs-th>
                      <vs-th>{{$t('label.info')}}</vs-th>
                      <vs-th>{{$t('label.action')}}</vs-th>
                    </template>
                    <template slot-scope="{data}">
                      <vs-tr :key="index" :data="service" v-for="(service, index) in data">
                        <vs-td :data="service.id">{{service.id}}</vs-td>

                        <vs-td :data="service.serviceCode">{{service.serviceCode}}</vs-td>
                        <vs-td :data="service.serviceDescription">{{service.serviceDescription}}</vs-td>

                        <vs-td :data="getDate(service.startdate)">{{getDate(service.startdate)}}</vs-td>
                        <vs-td
                          :data="getDate(service.lastmodifieddate)"
                        >{{getDate(service.lastmodifieddate)}}</vs-td>
                        <vs-td :data="service.status">
                          <vs-chip
                            :color="getOrderStatusColor(service.status)"
                            class="product-order-status"
                          >{{service.status}}</vs-chip>
                        </vs-td>
                        <vs-td>
                          <div v-if="isServiceSelected(service)">
                            <feather-icon
                              title="View Client Service Details"
                              icon="EyeIcon"
                              svgClasses="w-5 h-5 hover:text-primary stroke-current"
                              @click="alert('hello')"
                              class="ml-2"
                            />
                            <feather-icon
                              title="View Provisioning Details"
                              icon="InfoIcon"
                              svgClasses="w-5 h-5 hover:text-danger stroke-current"
                              class="ml-2"
                            />
                            <feather-icon
                              title="Order Work Flow"
                              icon="ArrowDownIcon"
                              svgClasses="w-5 h-5 hover:text-danger stroke-current"
                            />
                          </div>
                        </vs-td>
                        <vs-td>
                          <div v-if="service.status === 'ACTIVE' && isServiceSelected(service)">
                            <feather-icon
                              title="Add Plans"
                              icon="ShoppingCartIcon"
                              svgClasses="w-5 h-5 hover:text-danger stroke-current"
                              class="ml-2"
                            />
                            <feather-icon
                              title="Command Center"
                              icon="TerminalIcon"
                              svgClasses="w-5 h-5 hover:text-danger stroke-current"
                              class="ml-2"
                            />
                            <feather-icon
                              title="Suspend"
                              icon="PauseIcon"
                              svgClasses="w-5 h-5 hover:text-danger stroke-current"
                              class="ml-2"
                            />
                            <feather-icon
                              title="Cancel Plans"
                              icon="XIcon"
                              svgClasses="w-5 h-5 hover:text-danger stroke-current"
                              class="ml-2"
                            />
                            <feather-icon
                              title="Add Device"
                              icon="GridIcon"
                              svgClasses="w-5 h-5 hover:text-danger stroke-current"
                              class="ml-2"
                            />
                            <feather-icon
                              title="Terminate"
                              icon="SquareIcon"
                              svgClasses="w-5 h-5 hover:text-danger stroke-current"
                              class="ml-2"
                            />
                            <feather-icon
                              title="Re-Track"
                              icon="Maximize2Icon"
                              svgClasses="w-5 h-5 hover:text-danger stroke-current"
                            />
                          </div>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                  <div v-show="serviceWD">
                    <div>
                      <service-without-device :clientId="clientId" />
                    </div>
                  </div>
                  <div v-show="createTicket">
                    <div>
                      <h4 class="mb-3">{{$t('label.createticket')}}</h4>
                    </div>
                    <create-ticket />
                  </div>
                </vx-card>
                <div class="vx-row" v-show="!serviceWD && !createTicket">
                  <div class="vx-col w-full md:w-2/5 lg:w-2/5 sm-mb-base">
                    <vx-card>
                      <vs-table
                        :max-items="5"
                        class="service-order-tbl"
                        pagination
                        :data="deviceOverView"
                        v-model="selected"
                      >
                        <template slot="header" color="primary">
                          <!-- ADD NEW -->
                          <h4 class="mb-2">{{$t('label.ordersoverview')}}</h4>
                        </template>
                        <template slot="thead">
                          <vs-th>{{$t('label.serviceid')}}</vs-th>
                          <vs-th>{{$t('label.itemCode')}}</vs-th>
                          <vs-th>{{$t('label.Serial No')}}</vs-th>
                          <vs-th>{{$t('label.action')}}</vs-th>
                        </template>
                        <template slot-scope="{data}">
                          <vs-tr :key="index" :data="device" v-for="(device, index) in data">
                            <vs-td :data="device.clientServiceId">{{device.clientServiceId}}</vs-td>

                            <vs-td :data="device.itemCode">{{device.itemCode}}</vs-td>
                            <vs-td :data="device.provserialnumber">{{device.provserialnumber}}</vs-td>
                            <vs-td>
                              <div>
                                <feather-icon
                                  title="Swap"
                                  icon="ShuffleIcon"
                                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                  class="ml-2"
                                  v-if="device.status === 'ACTIVE'"
                                />
                                <feather-icon
                                  title="Pairing Serial NO"
                                  icon="InfoIcon"
                                  @click="oneTimeSales(device.provserialnumber)"
                                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                />
                              </div>
                            </vs-td>
                          </vs-tr>
                        </template>
                      </vs-table>
                    </vx-card>
                  </div>
                  <div class="vx-col w-full md:w-3/5 lg:w-3/5 sm-mb-base">
                    <vx-card>
                      <vs-table
                        :max-items="5"
                        class=" service-order-tbl"
                        pagination
                        :data="orderOverView"
                        v-model="selected"
                        @selected="handleSelected"
                      >
                        <template slot="header" color="primary">
                          <!-- ADD NEW -->
                          <h4 class="mb-2">{{$t('label.deviceoverview')}}</h4>
                        </template>
                        <template slot="thead">
                          <vs-th>{{$t('label.serviceid')}}</vs-th>
                          <vs-th>{{$t('label.activation.plan')}}</vs-th>
                          <vs-th>{{$t('startDateSelect')}}</vs-th>
                          <vs-th>{{$t('endDateSelect')}}</vs-th>
                          <vs-th>{{$t('label.price')}}</vs-th>
                          <vs-th>{{$t('label.plan.status')}}</vs-th>
                          <vs-th>{{$t('label.action')}}</vs-th>
                        </template>
                        <template slot-scope="{data}">
                          <vs-tr :key="index" :data="order" v-for="(order, index) in data">
                            <vs-td :data="order.clientServiceId">{{order.clientServiceId}}</vs-td>

                            <vs-td :data="order.planDescription">{{order.planDescription}}</vs-td>
                            <vs-td :data="getDate(order.startDate)">{{getDate(order.startDate)}}</vs-td>
                            <vs-td :data="getDate(order.endDate)">{{getDate(order.endDate)}}</vs-td>

                            <vs-td :data="order.price">{{order.price}}</vs-td>
                            <vs-td :data="order.status">
                              <vs-chip
                                :color="getOrderStatusColor(order.status)"
                                class="product-order-status"
                              >{{order.status}}</vs-chip>
                            </vs-td>
                            <vs-td>
                              <div v-if="order.status === 'ACTIVE'">
                                <feather-icon
                                  title="Change Plan"
                                  icon="SettingsIcon"
                                  @click="clientPlans()"
                                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                  class="ml-2"
                                />
                                <feather-icon
                                  title="Cancel"
                                  icon="XIcon"
                                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                                  class="ml-2"
                                />
                              </div>
                            </vs-td>
                          </vs-tr>
                        </template>
                      </vs-table>
                    </vx-card>
                  </div>
                </div>
              </div>
            </vs-tab>
            <vs-tab :label="$t('label.heading.moreinfo')">
              <div class="tab-text">
                <more-info :clientId="clientId" />
              </div>
            </vs-tab>
            <vs-tab :label="$t('label.notes')">
              <div class="tab-text">
                <vx-card class="mb-base">
                  <div class="vx-row">
                    <div class="vx-col w-full">
                      <small class="date-label">{{$t('label.code.description')}}</small>
                      <vs-textarea v-model="note.note"></vs-textarea>
                    </div>
                    <div class="vx-col w-full">
                      <vs-button
                        color="primary"
                        icon-pack="feather"
                        icon="icon-plus"
                        class="truncate mt-2 float-right"
                        size="small"
                        @click="addNote"
                      >{{$t('label.addnote')}}</vs-button>
                    </div>
                    <div
                      class="vx-col w-full mt-3"
                      v-for="(note, index) in clientNotes"
                      :key="index"
                    >
                      <div class="vx-row">
                        <div
                          class="vx-col w-full border-`b border-l-0 border-r-0 border-t-0 d-theme-border-grey-light border-solid flex justify-between flex items-center"
                        >
                          <div class="flex items-center">
                            <div class="flex flex-col">
                              <h5 class="mb-1">{{note.note}}</h5>
                              <div class="flex items-center">
                                <span class="text-sm font-semibold">{{note.id}}</span>
                              </div>
                            </div>
                          </div>
                          <div class="flex flex-col justify-end">
                            <span class="text-right">Created by : {{clientDetail.displayName}}</span>
                            <div class="flex justify-end mt-2">
                              <span class="text-right">Created on : {{getDate(note.createdOn)}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </vx-card>
              </div>
            </vs-tab>
            <vs-tab :label="$t('label.heading.device')">
              <div class="tab-text">
                <vx-card class="mb-base">
                  <div class="vx-row">
                    <div class="vx-col w-full">
                      <vs-table
                        :max-items="5"
                        pagination
                        search
                        :data="clientDetail.oneTimeSaleData"
                      >
                        <template slot="header"></template>
                        <template slot="thead">
                          <vs-th>{{$t('label.serviceid')}}</vs-th>
                          <vs-th>{{$t('label.saletype')}}</vs-th>
                          <vs-th>{{$t('label.saleDate')}}</vs-th>
                          <vs-th>{{$t('label.itemCode')}}</vs-th>
                          <vs-th>{{$t('label.heading.serialno')}}</vs-th>
                          <vs-th>{{$t('table.chargecode')}}</vs-th>
                          <vs-th>{{$t('label.quantity')}}</vs-th>
                          <vs-th>{{$t('label.totalPrice')}}</vs-th>
                          <vs-th>{{$t('label.warrantydate')}}</vs-th>
                          <vs-th>{{$t('label.allocate')}}</vs-th>
                          <vs-th v-if="propertyMaster">{{$t('label.propertycode')}}</vs-th>
                          <vs-th>{{$t('table.heading.actions')}}</vs-th>
                        </template>

                        <template slot-scope="{data}">
                          <vs-tr :key="index" v-for="(device, index) in data">
                            <vs-td :data="device.clientServiceId">{{device.clientServiceId}}</vs-td>
                            <vs-td :data="device.saleType">{{device.saleType}}</vs-td>
                            <vs-td :data="getDate(device.saleDate)">{{getDate(device.saleDate)}}</vs-td>
                            <vs-td :data="device.itemCode">{{device.itemCode}}</vs-td>
                            <vs-td :data="device.serialNo">{{device.serialNo}}</vs-td>
                            <vs-td :data="device.chargeCode">{{device.chargeCode}}</vs-td>
                            <vs-td :data="device.quantity">{{device.quantity}}</vs-td>
                            <vs-td :data="device.totalPrice">{{device.totalPrice}}</vs-td>
                            <vs-td
                              :data="getDate(device.warrantyDate)"
                            >{{getDate(device.warrantyDate)}}</vs-td>
                            <vs-td
                              :data="device.hardwareAllocated"
                              v-if="device.units==='PIECES'"
                            >{{device.hardwareAllocated}}</vs-td>
                            <vs-td v-else></vs-td>
                            <vs-td
                              :data="device.propertyCode"
                              v-if="propertyMaster"
                            >{{onetimesale.propertyCode}}</vs-td>
                            <vs-td>
                              <feather-icon
                                title="UnAssign Device"
                                icon="XIcon"
                                svgClasses="w-5 h-5 hover:text-primary stroke-current"
                                @click="deallocateDevice(device)"
                              />
                            </vs-td>
                          </vs-tr>
                        </template>
                      </vs-table>
                    </div>
                  </div>
                </vx-card>
              </div>
            </vs-tab>
            <vs-tab :label="$t('label.heading.tickets')">
              <div class="tab-text">
                <Ticket :clientId="clientId" />
              </div>
            </vs-tab>
            <vs-tab :label="$t('label.heading.ondemand')">
              <div class="tab-text">
                <on-demand :clientId="clientId" />
              </div>
            </vs-tab>
            <vs-tab :label="$t('label.heading.accounts')">
              <div class="tab-text">
                <Accounts :clientId="clientId" />
              </div>
            </vs-tab>
            <vs-tab :label="$t('label.heading.payments')">
              <div class="tab-text">
                <Payments :clientId="clientId" />
              </div>
            </vs-tab>
            <vs-tab :label="$t('label.heading.statements')">
              <div class="tab-text">
                <Statement :clientId="clientId" />
              </div>
            </vs-tab>
            <vs-tab :label="$t('tab.activitylog')">
              <div class="tab-text">
                <ActivityLog />
              </div>
            </vs-tab>
            <vs-tab :label="$t('label.child')">
              <div class="tab-text">
                <Child :clientId="clientId" />
              </div>
            </vs-tab>
            <vs-tab :label="$t('label.heading.actions')">
            <template slot="tab-head">
                    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
                        <vx-tooltip text="OfficeHierarchy" position="bottom" delay=".3s">
                          <span>{{$t('label.heading.actions')}}</span>
                          <feather-icon
                            icon="ChevronDownIcon"
                            svgClasses="h-4 w-4"
                            class="cursor-pointer p-2"
                          ></feather-icon>
                        </vx-tooltip>
                        <vs-dropdown-menu>
                          <ul class="vx-navbar__starred-pages-more--list">
                            <li class="starred-page--more flex items-center cursor-pointer">
                              <span class="px-2 pt-2 pb-1">LCO1->MSO->Service Provider</span>
                            </li>
                          </ul>
                        </vs-dropdown-menu>
                      </vs-dropdown>
            </template>
            <div class="tab-text">
              </div>
            </vs-tab>
          </vs-tabs>
        </div>
      </div>
      <div class="centerx">
        <vs-popup
          classContent="popup-example"
          :title="$t('label.heading.contactinfo')"
          :active.sync="contactInfoPopup"
        >
          <div class="vx-col flex-1" id="account-info-col-1">
            <span class="float-right">
              <feather-icon
                icon="EditIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="editContactpopup=true"
              />
              <feather-icon
                icon="XIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="closeCustomerpopup=true"
              />
            </span>
            <table>
              <tr>
                <td class="font-semibold">{{$t('label.heading.customername')}}:</td>
                <td>{{clientDetail.displayName}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{$t('label.parentchild')}}:</td>
                <td>{{clientDetail.parentInfo}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{$t('label.createddate')}}:</td>
                <td>{{getDate(clientDetail.activationDate)}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{$t('label.heading.email')}}:</td>
                <td>{{clientDetail.email}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{$t('label.cellphone')}}:</td>
                <td>{{clientDetail.phone}}</td>
              </tr>
            </table>
          </div>
          <vs-popup :title="$t('label.editcustomer')" :active.sync="editContactpopup">
            <form>
              <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <vs-input :label="$t('label.loc')" class="w-full font-semibold" icon-no-border />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <vs-input
                    :label="$t('label.password')"
                    type="password"
                    class="w-full font-semibold"
                    icon-no-border
                  />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <small class="date-label font-semibold">{{$t('label.title')}}</small>
                  <v-select
                    label="text"
                    :options="idType"
                    placeholder="Select Title"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    class="min-w-200 w-full vs-search-categeory font-semibold"
                  />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <small class="date-label font-semibold">{{$t('label.clientcategory')}}</small>
                  <v-select
                    label="text"
                    :options="category"
                    placeholder="Select Categeory"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    class="min-w-200 w-full vs-search-categeory"
                  />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <vs-input :label="$t('label.heading.firstname')" class="w-full font-semibold" icon-no-border />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <vs-input :label="$t('label.heading.lastname')" class="w-full font-semibold" icon-no-border />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <vs-input :label="$t('label.cafid')" class="w-full font-semibold" icon-no-border />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <vs-input :label="$t('label.email')" class="w-full font-semibold" icon-no-border />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <vs-input :label="$t('label.homephone')" class="w-full font-semibold" icon-no-border />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <vs-input :label="$t('label.phone')" class="w-full font-semibold" icon-no-border />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <vs-input :label="$t('label.username')" class="w-full font-semibold" icon-no-border />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <vs-input
                    :label="$t('label.client.select.image')"
                    type="file"
                    class="w-full font-semibold"
                    icon-no-border
                  />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <small class="date-label font-semibold">{{$t('label.input.idproof')}}</small>
                  <v-select
                    label="text"
                    :options="idProof"
                    placeholder="Select Id Proof"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    class="min-w-200 w-full vs-search-categeory font-semibold"
                  />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 w-full">
                  <vs-input :label="$t('label.input.idproofvalue')" class="w-full font-semibold" icon-no-border />
                </div>
              </div>

              <div class="vx-row">
                <span class="ml-4 mr-1">
                  <vs-button type="border" @click="editContactpopup=false">{{$t('label.button.close')}}</vs-button>
                </span>
                <span class="ml-1 mr-2">
                  <vs-button>{{$t('label.button.save')}}</vs-button>
                </span>
              </div>
            </form>
          </vs-popup>
          <vs-popup :title="$t('label.closecustomer')" :active.sync="closeCustomerpopup">
            <form>
              <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
                <div class="vx-col mb-2 w-full">
                  <small class="date-label font-semibold">{{$t('label.heading.closuredate')}}</small>
                  <datepicker :label="$t('label.heading.closuredate')" class="font-semibold"></datepicker>
                </div>
                <div class="vx-col mb-2 w-full">
                  <small class="date-label font-semibold">{{$t('label.input.closurereason')}}</small>
                  <v-select
                    label="text"
                    placeholder="Select Close Reason"
                    :options="closeReason"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    class="min-w-200 w-full vs-search-categeory font-semibold"
                  />
                </div>
              </div>
              <div class="vx-row">
                <span class="ml-4 mr-1">
                  <vs-button type="border" @click="closeCustomerpopup=false">{{$t('label.button.close')}}</vs-button>
                </span>
                <span class="ml-1 mr-2">
                  <vs-button>{{$t('label.button.save')}}</vs-button>
                </span>
              </div>
            </form>
          </vs-popup>
        </vs-popup>
      </div>
      <div class="centerx">
        <vs-popup
          classContent="popup-example"
          :title="$t('tab.addressinfo')"
          :active.sync="popupActivo2"
        >
          <div class="vx-col flex-1" id="account-info-col-1">
            <span class="float-right">
              <feather-icon
                icon="EditIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="editAddressPopup=true"
              />
              <feather-icon
                icon="PlusCircleIcon"
                svgClasses="w-5 h-5 hover:text-danger stroke-current"
                class="ml-2"
                @click="addAddressPopup=true"
              />
            </span>
            <table>
              <tr>
                <td class="font-semibold">{{$t('label.heading.address')}}:</td>
                <td>{{clientDetail.addressNo}}/{{clientDetail.street}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{$t('label.district')}}:</td>
                <td>{{clientDetail.district}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{$t('label.heading.city')}}:</td>
                <td>{{clientDetail.city}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{$t('label.pincode')}}:</td>
                <td>{{clientDetail.zip}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{$t('label.state')}}:</td>
                <td>{{clientDetail.state}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{$t('label.country')}}:</td>
                <td>{{clientDetail.country}}</td>
              </tr>
            </table>
          </div>
          <vs-popup :title="$t('label.editaddress')" :active.sync="editAddressPopup">
            <form>
              <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
                <div class="vx-col mb-2 sm:w-1/2 md:w-1/2 lg:w-1/2">
                  <small class="font-semibold">{{$t('label.heading.primary')}}</small>
                  <vs-input :label="$t('label.addressno')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.street')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.heading.city')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.district')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.state')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.country')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.zipcode')" class="w-full mb-2 font-semibold" icon-no-border />
                </div>
                <div class="vx-col mb-2 sm:w-1/2 md:w-1/2 lg:w-1/2">
                  <small class="font-semibold">{{$t('label.Billing')}}</small>
                  <vs-input :label="$t('label.addressno')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.street')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.heading.city')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.district')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.state')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.country')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.zipcode')" class="w-full font-semibold mb-2" icon-no-border />
                </div>
              </div>

              <div class="vx-row">
                <span class="ml-4 mr-1">
                  <vs-button type="border" @click="editAddressPopup=false">{{$t('label.button.close')}}</vs-button>
                </span>
                <span class="ml-1 mr-2">
                  <vs-button>{{$t('label.button.save')}}</vs-button>
                </span>
              </div>
            </form>
          </vs-popup>
          <vs-popup :title="$t('label.addaddress')" :active.sync="addAddressPopup">
            <form>
              <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
                <div class="vx-col mb-2 w-full">
                  <small class="date-label font-semibold">{{$t('label.addresstype')}}</small>
                  <v-select
                    label="text"
                    placeholder="Select Address Type"
                    :options="addressType"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    class="min-w-200 w-full vs-search-categeory font-semibold mb-2"
                  />
                  <vs-input :label="$t('label.addressno')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.street')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.heading.city')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.district')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.state')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.country')" class="w-full font-semibold mb-2" icon-no-border />
                  <vs-input :label="$t('label.zipcode')" class="w-full font-semibold mb-2" icon-no-border />
                </div>
              </div>

              <div class="vx-row">
                <span class="ml-4 mr-1">
                  <vs-button type="border" @click="addAddressPopup=false">{{$t('label.button.close')}}</vs-button>
                </span>
                <span class="ml-1 mr-2">
                  <vs-button>{{$t('label.button.save')}}</vs-button>
                </span>
              </div>
            </form>
          </vs-popup>
        </vs-popup>
      </div>
      <div class="centerx">
        <vs-popup
          classContent="popup-example"
          :title="$t('tab.billinginfo')"
          :active.sync="popupActivo3"
        >
          <div class="vx-col flex-1" id="account-info-col-1 ">
            <table>
              <tr>
                <td class="font-semibold">{{$t('label.lastbillamount')}}:</td>
                <td>{{clientDetail.lastBillAmount}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{$t('label.lastbilldate')}}:</td>
                <td>{{clientDetail.lastBillDate}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{$t('label.lastpaidamount')}}:</td>
                <td>{{clientDetail.paidAmount}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{$t('label.lastpaymentdate')}}:</td>
                <td>{{getDate(clientDetail.lastPaymentDate)}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{$t('label.nbd')}}:</td>
                <td>{{getDate(clientDetail.nextBillDate)}}</td>
              </tr>
            </table>
          </div>
        </vs-popup>
      </div>
      <div class="centerx">
        <vs-popup
          classContent="popup-example"
          :title="$t('label.heading.createadjustment')"
          :active.sync="oneTimeSalesPopup"
        >
          <vs-table :data="oneTimeSalesData">
            <template slot="header"></template>
            <template slot="thead">
              <vs-th>Item Code</vs-th>
              <vs-th>{{$t('label.serialnumber')}}</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr :key="index" v-for="(sales, index) in data">
                <vs-td :data="sales.itemCode">{{sales.itemCode}}</vs-td>
                <vs-td :data="sales.serialNo">{{sales.serialNo}}</vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vs-popup>
      </div>
      <div class="centerx">
        <vs-popup
          classContent="popup-example"
          :title="$t('label.createorder')"
          :active.sync="clientPlanPopup"
        >
          <form>
            <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
              <div class="vx-col sm:w-full w-full">
                <small class="font-semibold">{{$t('label.heading.startdate')}}</small>
                <datepicker
                  placeholder="Select Date"
                  v-model="clientPlan"
                  class="mb-2 font-semibold"
                />
              </div>
              <div class="vx-col sm:w-full w-full">
                <small class="font-semibold">{{$t('label.salescataloge')}}</small>
                <v-select
                  label="name"
                  :options="salePlanCategory.allPlanDatas"
                  placeholder="Select One"
                  :reduce="name => name.id"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  class="min-w-200 w-full"
                />
              </div>
               <div class="vx-col sm:w-full w-full">
                <small class="font-semibold">{{$t('label.activation.plan')}}</small>
                 <v-select
            label="name"
            :options="plan"
            placeholder="Select One"
            :reduce="name => name.id"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            class="min-w-200 w-full"
          />
              </div>
              <div class="vx-col sm:w-full w-full">
              <vs-checkbox
              class="mt-3 font-semibold"
            >{{$t('label.order.autorenew')}}</vs-checkbox>
              </div>
            </div>

            <div class="vx-row">
              <span class="ml-4 mr-1">
                <vs-button
                  icon-pack="feather"
                  type="border"
                  icon="icon-x"
                  @click="clientPlanPopup=false"
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
</template>

<script>
// import HorizonalBtn from "@/layouts/components/HorizontalBtn.vue";
import { find, isNil } from "lodash";
import moment from "moment";
import {
  getClientById,
  deallocateClientDevice,
  getClientNotes,
  addClientNotes,
  getClientServiceDetail,
  getClientProvisioningDetail,
  getOneTimeSales,
  getSalesPlanCategory
} from "@/http/customer";
import ServiceWithoutDevice from "./service-order/ServiceWithoutDevice";
import CreateTicket from "./service-order/CreateTicket";
import MoreInfo from "./more-info/Index";
import Ticket from "./ticket/Index";
import OnDemand from "./ondemand/Index";
import Accounts from "./accounts/Index";
import Payments from "./payments/Index";
import Statement from "./statement/Index";
import ActivityLog from "../../Activity/ActivityLog";
import Child from "./childs/Index";
import Datepicker from "vuejs-datepicker";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import vSelect from "vue-select";

import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      datetime: null,
      descriptionItems: [5, 10, 15],
      descriptionItems1: [5, 10, 15],
      note: {
        note: ""
      },
      oneTimeSalesPopup: false,
      clientPlanPopup: false,
      oneTimeSalesData: [],
      user_data: null,
      user_not_found: false,
      activeTab: 0,
      contactInfoPopup: false,
      popupActivo2: false,
      popupActivo3: false,
      editContactpopup: false,
      closeCustomerpopup: false,
      editAddressPopup: false,
      addAddressPopup: false,
      OrderDate: "",
      addService: "",
      plan: "",
      planList: "",
      selectedService: [],
      serviceWD: false,
      createTicket: false,
      clientId: null,
      serviceInfo: {},
      provisioningInfo: {},
      serviceInfoPopup: false,
      provisioningInfoPopup: false,
      clientPlan: "",
      salePlanCategory:{}
    };
  },
  components: {
    // HorizonalBtn,
    ServiceWithoutDevice,
    CreateTicket,
    MoreInfo,
    Ticket,
    OnDemand,
    Accounts,
    Payments,
    ActivityLog,
    Statement,
    Child,
    flatPickr,
    quillEditor,
    Datepicker,
    "v-select": vSelect
  },
  computed: {
    clientDetail() {
      return this.$store.getters["customer/getClientDetail"];
    },
    clientNotes() {
      return this.$store.getters["customer/getClientNotes"];
    },
    deviceOverView() {
      const serviceIds = _.uniq(_.map(this.selectedService, "id"));
      return _.filter(this.clientDetail.oneTimeSaleData, item => {
        return _.indexOf(serviceIds, item.clientServiceId) >= 0;
      });
    },
    orderOverView() {
      const serviceIds = _.uniq(_.map(this.selectedService, "id"));
      return _.filter(this.clientDetail.orderData, item => {
        return _.indexOf(serviceIds, item.clientServiceId) >= 0;
      });
    }
  },
  methods: {
    getDate(date) {
      if (_.isArray(date)) {
        return moment(date.join("/")).format("DD MMMM YYYY");
      } else {
        return moment(date).format("DD MMMM YYYY");
      }
      return null;
    },
    getSerialNo(itemCode) {
      const item = find(this.clientDetail.oneTimeSaleData, { itemCode });
      return item ? item.serialNo : null;
    },
    getOrderStatusColor(status) {
      if (status === "Inactive") return "dark";
      if (status === "New") return "warning";
      if (status === "DRAFT") return "danger";
      return "success";
    },
    isServiceSelected(item) {
      return _.findIndex(this.selectedService, item) >= 0;
    },
    async getClient() {
      try {
        const response = await getClientById(this.clientId);
        this.$store.dispatch("customer/setClientDetail", response.data);
      } catch (error) {
        console.log(
          "something went to wrong while retrieving client by id:",
          error
        );
      }
    },
    oneTimeSales(serviceNo) {
      if (serviceNo) {
        this.oneTimeSalesPopup = true;
        this.getOneTimeSales(serviceNo);
      }
    },
    async getOneTimeSales(serialNo) {
      try {
        const response = await getOneTimeSales(serialNo);
        this.oneTimeSalesData = response.data;
      } catch (error) {
        console.log(
          "something went to wrong while retrieving client by id:",
          error
        );
      }
    },
    clientPlans() {
      this.clientPlanPopup = true;
      this.getSalesCategory();
    },
    async getSalesCategory() {
      try {
        const response = await getSalesPlanCategory({ category: "Base+Pack" });
        this.salePlanCategory = response.data.allPlanDatas;
      } catch (error) {
        console.log(
          "something went to wrong while retrieving sales plan category",
          error
        );
      }
    },
    async deallocateDevice(device) {
      try {
        const data = {
          clientId: this.clientId,
          clientServiceStatus: device.clientServiceStatus,
          isStraight: true,
          serialNo: device.serialNo
        };
        await deallocateClientDevice(device.id, data);
      } catch (error) {
        this.$vs.notify({
          title: "DeAllocate Device Attempt",
          text: error.defaultUserMessage,
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning"
        });
        console.log(
          "something went to wrong while de-allocating device ",
          error
        );
      }
    },
    async getNotes() {
      try {
        const response = await getClientNotes(this.clientId);
        this.$store.dispatch("customer/setClientNotes", response.data);
      } catch (error) {
        console.log(
          "something went to wrong while retrieving client by id:",
          error
        );
      }
    },
    async addNote() {
      try {
        await addClientNotes(this.clientId, this.note);
        this.getNotes();
        this.note.note = "";
      } catch (error) {
        console.log(
          "something went to wrong while retrieving client by id:",
          error
        );
      }
    },
    async getServiceInfo(serviceId) {
      try {
        const resp = await getClientServiceDetail(this.clientId, serviceId);
        this.serviceInfo = resp.data;
      } catch (error) {
        console.log(
          "something went to wrong while retrieving client service info:",
          error
        );
      }
    },
    async getProvisingDetail(serviceId) {
      try {
        const resp = await getClientProvisioningDetail(serviceId);
        this.povisioningInfo = resp.data;
      } catch (error) {
        console.log(
          "something went to wrong while retrieving client service info:",
          error
        );
      }
    },
    handleSelected (item) {
        this.$router.push({ path: `/view_order/${this.clientId}/${item.id}` })
      },
  },
  watch: {
    activeTab(newValue) {
      if (newValue === 2) this.getNotes();
    },
    provisioningInfoPopup(newValue) {
      if (!newValue) this.provisioningInfo = {};
    },
    serviceInfoPopup(newValue) {
      if (!newValue) this.serviceInfo = {};
    }
  },
  created() {
    this.clientId = this.$route.params.id;
    this.getClient();
    this.clientPlan = moment().format("DD MMMM YYYY");
  }
};
</script>

<style lang="scss">
// .open-item {
//   min-height: 290px;
// }
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
        @media screen and (max-width: 768px) {
          display: block;
        }
      }
    }
  }
}
.customer-tab {
  .vs-tabs--content {
    overflow-y: auto;
    overflow-x: hidden;
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
      padding-bottom: 1.5rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 768px) {
          display: block;
          min-width: 1000px;
        }
      }
    }
  }
}

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
.vs-tabs--ul {
  overflow: auto;
  white-space: nowrap;
}
.vs-tabs--ul::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background: transparent !important;
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
.avatar-notes {
  width: 65px;
  height: 65px;
  background: rgb(195, 195, 195) none repeat scroll 0% 0%;
}
#view-customer-tab .vs-tabs--content {
  padding: 11px 0px !important;
}
.vs-table--header .vs-table--search .vs-table--search-input {
  padding: 10px 28px;
}
.vx-card .vx-card__collapsible-content .vx-card__body {
  padding: 1rem !important;
}
// .avatar-pic{
//     z-index: 9999999999999;
//     margin-top: -38px;
//     margin-left: -10px;
//     box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.20);
// }
// .liveactive {
//   &::after {
//     content: "\A";
//     width: 10px;
//     height: 10px;
//     border-radius: 50%;
//     background: #00ce00;
//     display: inline-block;
//   }
// }
</style>
