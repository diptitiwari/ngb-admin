<template>
  <div>
    <div class="vx-row">
      <vx-card>
        <vs-table
          :max-items="10"
          pagination
          :data="getCustomers"
          @selected="handleSelected"
        >
          <template slot="header">
            <!-- ADD NEW -->
            <div class="mr-md-2 mb-1">
              <ul class="horizontal-sm-btn flex mb-2">
                <li>
                  <div
                    class="p-1 cursor-pointer  text-lg font-medium w-full"
                  >
                    <v-select label="text" v-model="searchOption" placeholder="Select Search Option"
                              :options="searchItems" :dir="$vs.rtl ? 'rtl' : 'ltr'"
                              class="min-w-200 w-full font-semibold"/>
                  </div>
                </li>
                <li>
                  <div
                    class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                  >
                    <vs-input class="inputx font-semibold" placeholder="Search for Clients"/>
                  </div>
                </li>
              </ul>

            </div>
            <div class="">
              <ul class="horizontal-sm-btn flex mb-2 float-right">
                <li>
                  <div
                    class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                  >
                    <vs-button
                      icon-pack="feather"
                      icon="icon-search"
                      size="small"
                      @click="advancedSearchPopup=true"
                    >Advanced Search
                    </vs-button>
                  </div>
                </li>
                <li>
                  <div
                    class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                  >
                    <vs-button icon-pack="feather" size="small" icon="icon-archive"
                               @click="$router.push('/customer_activation').catch(() => {})">
                      {{$t('label.button.customeractivation')}}
                    </vs-button>
                  </div>
                </li>
                <li>
                  <div
                    class="p-1 cursor-pointer flex items-center text-lg font-medium w-full"
                  >
                    <vs-button icon-pack="feather" size="small" icon="icon-plus"
                               @click="$router.push('/create_customer').catch(() => {})">
                      {{$t('label.button.createcustomer')}}
                    </vs-button>
                  </div>
                </li>
              </ul>
            </div>
          </template>
          <template slot="thead">
            <vs-th>{{$t('label.heading.accountno')}}</vs-th>
            <vs-th>{{$t('label.heading.customername')}}</vs-th>
            <vs-th>{{$t('label.heading.entity')}}</vs-th>
            <vs-th>{{$t('label.heading.serialno')}}</vs-th>
            <vs-th>{{$t('label.heading.status')}}</vs-th>
            <vs-th>{{$t('label.heading.balance')}}</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="index" :data="customer" v-for="(customer, index) in data">
              <vs-td :data="customer.accountNo">{{customer.accountNo}}</vs-td>

              <vs-td :data="customer.displayName">{{customer.displayName}}</vs-td>
              <vs-td :data="customer.officeName">{{customer.officeName}}</vs-td>

              <vs-td :data="customer.hwSerialNumber">{{customer.hwSerialNumber}}</vs-td>
              <vs-td :data="customer.balanceAmount">{{customer.balanceAmount}}</vs-td>
              <vs-td :data="customer.status.value">
                <vs-chip
                  :color="getOrderStatusColor(customer.status.value)"
                  class="product-order-status"
                >{{customer.status.value}}
                </vs-chip>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
      <div class="centerx">
        <vs-popup classContent="popup-example" :title="$t('label.button.advancesearch')"
                  :active.sync="advancedSearchPopup">
          <form>
            <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
              <div class="vx-col sm:w-1/2 w-full">
                <vs-input
                  :label-placeholder="$t('label.input.firstname')"
                  type="text"
                  class="w-full font-semibold mb-2"
                  icon-pack="feather"
                  icon="icon-search"
                  icon-no-border
                  v-model="search.firstName"
                />
              </div>
              <div class="vx-col sm:w-1/2 w-full">
                <vs-input
                  :label-placeholder="$t('label.input.lastname')"
                  type="text"
                  class="w-full font-semibold mb-2"
                  icon-pack="feather"
                  icon="icon-search"
                  icon-no-border
                  v-model="search.lastName"
                />
              </div>
              <div class="vx-col sm:w-1/2 w-full">
                <vs-input
                  :label-placeholder="$t('label.city/area')"
                  type="text"
                  class="w-full font-semibold mb-2"
                  icon-pack="feather"
                  icon="icon-search"
                  icon-no-border
                  v-model="search.city"
                />
              </div>
              <div class="vx-col sm:w-1/2 w-full">
                <vs-input
                  :label-placeholder="$t('label.input.email')"
                  type="text"
                  class="w-full font-semibold mb-2"
                  icon-pack="feather"
                  icon="icon-search"
                  icon-no-border
                  v-model="search.email"
                />
              </div>
              <div class="vx-col sm:w-1/2 w-full">
                <vs-input
                  :label-placeholder="$t('label.phone')"
                  type="text"
                  class="w-full font-semibold mb-2"
                  icon-pack="feather"
                  icon="icon-search"
                  icon-no-border
                  v-model="search.phone"
                />
              </div>
              <div class="vx-col sm:w-1/2 w-full">
                <vs-input
                  :label-placeholder="$t('label.input.entitycode')"
                  type="text"
                  class="w-full font-semibold mb-2"
                  icon-pack="feather"
                  icon="icon-search"
                  icon-no-border
                  v-model="search.officeId"
                />
              </div>
              <div class="vx-col sm:w-1/2 w-full">
                <vs-input
                  :label-placeholder="$t('label.cafid')"
                  type="text"
                  class="w-full mb-2 font-semibold"
                  icon-pack="feather"
                  icon="icon-search"
                  icon-no-border
                  v-model="search.externalId"
                />
              </div>
              <div class="vx-col sm:w-1/2 w-full">
                <v-select
                  label="categoryType"
                  v-model="search.categoryType"
                  placeholder="Select Category Type"
                  :options="getCustomerTemplate.clientCategoryDatas"
                  :reduce="categoryType => categoryType.id"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  class="min-w-200 w-full vs-search-categeory font-semibold"/>
              </div>
            </div>

            <div class="vx-row">
              <span class="ml-4 mr-1">
                <vs-button icon-pack="feather" type="border" icon="icon-x" @click="clearSearch">{{$t('label.button.clear')}}</vs-button>
              </span>
              <span class="ml-1 mr-2">
                <vs-button
                  icon-pack="feather"
                  icon="icon-search"
                  @click="advanceSearch"
                >
                  {{$t('label.button.Search')}}
                </vs-button>
              </span>
            </div>
          </form>
        </vs-popup>
      </div>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  import { getClients, getClientsTemplate } from '@/http/customer'
  import vSelect from 'vue-select'

  export default {
    data () {
      return {
        user_data: null,
        user_not_found: false,
        searchOption: '',
        descriptionItems: [5, 10, 15],
        searchItems: [
          { text: 'Account No', value: 0 },
          { text: 'Chip Id', value: 1 },
          { text: 'Mobile No', value: 2 },
          { text: 'Email Id', value: 3 },
          { text: 'Serial No', value: 4 },
          { text: 'Legacy No', value: 5 }
        ],
        search: {
          firstName: '',
          lastName: '',
          city: '',
          email: '',
          phone: '',
          officeId: '',
          categoryType: '',
          externalId: '',
          limit: 1000
        },
        advancedSearchPopup: false
      }
    },
    components: {
      'v-select': vSelect,
    },
    computed: {
      getCustomers () {
        return this.$store.getters['customer/getClientsList']
      },
      getCustomerTemplate () {
        return this.$store.getters['customer/getClientsTemplate']
      },
    },
    methods: {
      getOrderStatusColor (status) {
        if (status === 'Inactive') return 'dark'
        if (status === 'New') return 'warning'
        return 'success'
      },
      handleSelected (item) {
        this.$router.push({ path: `/view_customer/${item.id}` })
      },
      async getCustomer (queryParams) {
        try {
          const response = await getClients(_.pickBy(queryParams, _.identity))
          this.$store.dispatch('customer/setClient', response.data.pageItems)
        } catch (error) {
          console.log('something went to wrong while retrieving client:', error)
        }
      },
      async getTemplate () {
        try {
          const response = await getClientsTemplate()
          this.$store.dispatch('customer/setClientTemplate', response.data)
        } catch (error) {
          console.log('something went to wrong while retrieving client template data :', error)
        }
      },
      advanceSearch () {
        this.getCustomer(this.search)
        this.advancedSearchPopup = false
      },
      clearSearch () {
        this.search = {
          firstName: '',
          lastName: '',
          city: '',
          email: '',
          phone: '',
          officeId: '',
          categoryType: '',
          externalId: '',
          limit: 1000
        }
      }
    },
    created () {
      this.getCustomer(this.search)
      this.getTemplate()
    },
  }
</script>
<style lang="scss" scoped>
  .vs-table--search {
    max-width: 100%;
  }

  .vs-search-categeory {
    margin-top: 17px;
  }
</style>
