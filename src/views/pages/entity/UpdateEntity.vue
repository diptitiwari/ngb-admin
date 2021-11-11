<template xmlns="">
  <div>
    <div class="vx-row">
      <vx-card title no-shadow card-border>
        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="flex items-end px-3">
              <span class="font-medium text-lg leading-none">{{$t('label.editorganization')}}</span>
            </div>
            <vs-divider />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-full xs:w-full">
            <small class="font-semibold">{{$t('label.orgopenedon')}}</small>
            <datepicker placeholder="Select Date" v-model="entity.openingDate" class="mb-2 font-semibold" />
            <vs-input :label="$t('label.heading.entityname')" class="w-full mb-2 font-semibold" v-model="entity.name" />
            <!-- <vs-select
              class="w-full select-large"
              :label="$t('label.heading.entitytype')"
              v-model="entity.officeType"
            >
              <vs-select-item
                :key="index"
                :value="item.name"
                :text="item.name"
                v-for="(item,index) in entityTemplate.officeTypes"
                class="w-full"
              />
            </vs-select>-->
            <small class="date-label font-semibold">{{$t('label.heading.entitytype')}}</small>
            <v-select
              label="name"
              v-model="entity.officeType"
              :options="entityTemplate.officeTypes"
              :reduce="name => name.name"
              placeholder="--select One--"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              class="min-w-200 w-full mb-2"
            >
              <template v-slot:option="option">{{ option.name }}</template>
            </v-select>
            <small class="date-label font-semibold">{{$t('label.heading.parententity')}}</small>
            <v-select
              label="name"
              v-model="entity.parentId"
              :options="parentEntities"
              placeholder="--select One--"
               :reduce="name => name.id"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              class="min-w-200 w-full mb-2"
            >
              <template v-slot:option="option">{{ option.name }}</template>
            </v-select>
            <small class="date-label font-semibold">{{$t('label.businesstype')}}</small>
            <v-select
              label="mCodeValue"
              v-model="entity.businessType"
              :options="entityTemplate.businessTypes"
                  :reduce="mCodeValue => mCodeValue.id"
              placeholder="--select Search--"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              class="min-w-200 w-full mb-2"
            >
              <template v-slot:option="option">{{ option.mCodeValue }}</template>
            </v-select>
            <vs-input
              :label="$t('label.contactperson')"
              class="w-full mb-2 font-semibold"
              v-model="entity.contactPerson"
            />
            <vs-input :label="$t('label.phonenumber')" class="w-full mb-2 font-semibold" v-model="entity.phoneNumber" />
            <vs-input :label="$t('label.PANCARD No')" class="w-full mb-2 font-semibold" v-model="entity.pancardNo" />
            <vs-input :label="$t('label.GST Reg No')" class="w-full mb-2 font-semibold" v-model="entity.gstRegNo" />
            <!-- <vs-select
              class="w-full select-large "
              :label="$t('label.Commission Model')"
              v-model="entity.commisionModel"
            >
              <vs-select-item
                :key="index"
                :value="item"
                :text="item"
                v-for="(item,index) in commissionModalItem"
                class="w-full"
              />
            </vs-select>-->
            <small class="date-label font-semibold">{{$t('label.Commission Model')}}</small>
            <v-select
              label="item"
              v-model="entity.commisionModel"
              :options="commissionModalItem"
              placeholder="--select Search--"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              class="min-w-200 w-full mb-2"
            >
              <template v-slot:option="option">{{ option.item }}</template>
            </v-select>
            <vs-checkbox
              class="mt-3 font-semibold"
              v-model="entity.subscriberDues"
            >{{$t('label.Subscriber Dues')}}</vs-checkbox>
          </div>
          <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-full xs:w-full">
            <vs-input :label="$t('label.heading.email')" class="w-full mb-2 font-semibold" v-model="entity.email" />
            <vs-input :label="$t('label.addressname')" class="w-full mb-2 font-semibold" v-model="entity.addressName" />
            <small class="date-label font-semibold">{{$t('label.city/area')}}</small>
            <v-select
              label="item"
              v-model="entity.city"
              :options="entityTemplate.addressData.cityData"
              placeholder="--Select One--"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              @input="handlerCityChange"
              class="min-w-200 w-full mb-2"
            >
              <template v-slot:option="option">{{ option.item }}</template>
            </v-select>
            <vs-input
              :label="$t('label.district')"
              class="w-full mb-2 font-semibold"
              value="cityTemplate.district"
              v-model="entity.district"
            />
            <vs-input
              :label="$t('label.state')"
              class="w-full mb-2 font-semibold"
              value="cityTemplate.state"
              v-model="entity.state"
            />
            <vs-input
              :label="$t('label.heading.country')"
              class="w-full mb-2 font-semibold"
              value="cityTemplate.country"
              v-model="entity.country"
            />
            <vs-input :label="$t('label.zipcode')" class="w-full mb-2 font-semibold" v-model="entity.zip" />
            <vs-input
              :label="$t('label.Company Reg No')"
              class="w-full mb-2 font-semibold"
              v-model="entity.companyRegNo"
            />
            <small class="date-label font-semibold">{{$t('label.input.paymenttype')}}</small>
            <v-select
              label="item"
              v-model="entity.payment"
              :options="entityTemplate.paymentTypeEnum"
              placeholder="--select Search--"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              class="min-w-200 w-full mb-2"
            >
              <template v-slot:option="option">{{ option.item }}</template>
            </v-select>
            <small class="date-label font-semibold">{{$t('label.dasType')}}</small>
            <v-select
              label="name"
              v-model="entity.dasTypeValue"
              :options="entityTemplate.segmentTypes"
              placeholder="--Select One--"
               :reduce="name => name.id"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              class="min-w-200 w-full mb-2"
            >
              <template v-slot:option="option">{{ option.name }}</template>
            </v-select>
            <vs-upload
              text="Company Logo"
              limit="1"
              ref="profile"
              :show-upload-button="false"
              class="compose-mail-attachment"
              @change="this.profileUrl = this.$refs.profile.files[0];"
            />
          </div>
        </div>
        <div class="vx-row float-right my-2">
          <div class="vx-col w-full">
            <vs-button class="mr-3 mb-2" @click="updateEntity">{{$t('label.button.submit')}}</vs-button>
            <vs-button
              color="warning"
              type="border"
              class="mb-2"
              @click="resetForm"
            >{{$t('label.heading.reset')}}</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import { concat, filter } from "lodash";
import moment from "moment";
import {
  getEntityTemplate,
  getCityTemplate,
  getEntityById,
  updateEntity
} from "@/http/entity";
import Datepicker from "vuejs-datepicker";
import vSelect from "vue-select";

const entityEmptyObj = {
  name: "",
  officeType: "",
  parentId: null,
  businessType: "",
  contactPerson: "",
  phoneNumber: "",
  pancardNo: "",
  gstRegNo: "",
  commisionModel: 0,
  subscriberDues: false,
  email: "",
  addressName: "",
  city: "",
  state: "",
  country: "",
  district: "",
  zip: "",
  companyRegNo: "",
  payment: "",
  dasTypeValue: "",
  clientData: {},
  locale: "en",
  externalId:"",
  dateFormat: "dd MMMM yyyy",
  openingDate: moment().format("DD MMMM YYYY"),
};

export default {
  data() {
    return {
      entity: entityEmptyObj,
      parentEntities: [],
      commissionModalItem: ["Postpaid", "Prepaid"],
      errorMessage: "",
      id:''
    };
  },
  components: {
    Datepicker,
    "v-select": vSelect
  },
  computed: {
    entityTemplate() {
      return this.$store.getters["entity/template"];
    },
    cityTemplates() {
      return this.$store.getters["entity/getCityTemplate"];
    },
  },
  methods: {
    async getTemplate() {
      try {
        const template = await getEntityTemplate();
        this.$store.dispatch("entity/setTemplate", template.data);
      } catch (e) {
        console.log(
          "something went to wrong while retrieving entity template:",
          e
        );
      }
    },
    async cityTemplate() {
      try {
        const response = await getCityTemplate(this.entity.city);
        // this.$store.dispatch("entity/setCityTemplate", response.data);
        this.entity.district = response.data.district;
        this.entity.state = response.data.state;
        this.entity.country = response.data.country;
      } catch (error) {
        console.log(
          "something went to wrong while retrieving entity city:",
          error
        );
      }
    },
    async updateEntity() {
      this.entity.openingDate = moment(this.entity.openingDate).format(
        "DD MMMM YYYY"
      );
      const address = {
        addressNo: this.entity.addressName,
        city: this.entity.city,
        state: this.entity.state,
        country: this.entity.country,
        district: this.entity.district,
        zipCode: this.entity.zip
      };
      const clientData = {
        entryType: "IND",
        clientCategory: 20,
        officeId: this.entity.parentId,
        title: "Mr",
        lastname: ".",
        firstname: this.entity.contactPerson,
        phone: this.entity.phoneNumber,
        email: this.entity.email,
        idKey: 260,
        externalId: this.entity.externalId,
        billMode: "Both",
        idValue: "00000",
        locale: "en",
        active: true,
        dateFormat: "dd MMMM yyyy",
        activationDate: this.entity.openingDate,
        flag: false,
        address: [
          concat(address, { addressType: "PRIMARY" }),
          concat(address, { addressType: "BILLING" })
        ]
      };

      this.entity.clientData = clientData;
      if (this.entity.commisionModel === "Postpaid") {
        this.entity.commisionModel = 0;
      } else {
        this.entity.commisionModel = 1;
      }
      try {
        const resp = await updateEntity(this.id,this.entity);
        if (resp.data.officeId && resp.data.resourceId) {
          console.log("data update", this.entity);
          this.$router.push("/entity");
          this.resetForm();
        }
      } catch (e) {
        if (e.httpStatusCode) {
          this.errorMessage = e.errors[0].defaultUserMessage;
        }
        console.log("something went to wrong while creating entity:", e);
      }
    },
        async getEntity() {
      try {
        const response = await getEntityById(this.id);
        this.$store.dispatch("entity/setEntityDetail", response.data);
        this.entity=response.data
              if (this.entity.commisionModel === "0") {
        this.entity.commisionModel = "Postpaid";
      } else {
        this.entity.commisionModel = "Prepaid";
      }
        // console.log("data ave che", response.data);
      } catch (error) {
        console.log(
          "something went to wrong while retrieving entity by id:",
          error
        );
      }
    },
    resetForm() {
      this.entity = entityEmptyObj;
    },
    handlerCityChange(city) {
      this.cityTemplate();
    },
  },
  watch: {
    "entity.officeType": function(newValue) {
      this.parentEntities =
        _.filter(this.entityTemplate.allowedParents, {
          officeType: newValue
        }) || [];
    },

  },
  mounted(){
  },
  created() {
    this.getTemplate();
    this.id=this.$route.params.id;
    console.log('datA',this.id)
    this.getEntity()
  }
};
</script>
