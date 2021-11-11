<template>
  <div>
    <div class="vx-row mt-3">
      <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-full xs:w-full">
        <vs-input :label="$t('label.ticketdate')" class="w-full font-semibold mb-2" />
        <!-- <vs-select class="w-full select-large my-2" :label="$t('label.heading.category')">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item,index) in categoryOptions"
            class="w-full"
          />
        </vs-select>-->
        <small class="date-label font-semibold">{{$t('label.heading.category')}}</small>
        <v-select
          label="text"
          :options="categoryOptions"
          placeholder="Select Categeory"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
          class="min-w-200 w-full mb-2 font-semibold"
        />
        <!-- <vs-select class="w-full select-large my-2" :label="$t('label.team')">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item,index) in teamOptions"
            class="w-full"
          />
        </vs-select>-->
        <small class="date-label font-semibold">{{$t('label.team')}}</small>
        <v-select
          label="text"
          :options="teamOptions"
          placeholder="Select Team"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
          class="min-w-200 w-full mb-2"
        />
        <!-- <vs-select class="w-full select-large my-2" :label="$t('label.source')">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item,index) in sourceOptions"
            class="w-full"
          />
        </vs-select>-->
        <small class="date-label font-semibold">{{$t('label.source')}}</small>
        <v-select
          label="text"
          :options="sourceOptions"
          placeholder="Select Source"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
          class="min-w-200 w-full mb-2"
        />
        <!-- USER PROFILE CARD -->
      </div>
      <div class="vx-col w-full lg:w-1/2 md:w-1/2 sm:w-full xs:w-full">
        <!-- <vs-select class="w-full select-large" :label="$t('label.heading.priority')">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item,index) in priorityOptions"
            class="w-full"
          />
        </vs-select>-->
        <small class="date-label font-semibold">{{$t('label.heading.priority')}}</small>
        <v-select
          label="text"
          :options="priorityOptions"
          placeholder="Select Priority"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
          class="min-w-200 w-full mb-2"
        />
        <!-- <vs-select class="w-full select-large my-2" :label="$t('label.subcategory')">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item,index) in planOptions"
            class="w-full"
          />
        </vs-select>-->
        <small class="date-label font-semibold">{{$t('label.subcategory')}}</small>
        <v-select
          label="text"
          :options="planOptions"
          placeholder="Select Sub Categeory"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
          class="min-w-200 w-full mb-2"
        />
        <!-- <vs-select class="w-full select-large my-2" :label="$t('label.teamuser')">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item,index) in teamUserOptions"
            class="w-full"
          />
        </vs-select>-->
        <small class="date-label font-semibold">{{$t('label.teamuser')}}</small>
        <v-select
          label="text"
          :options="teamUserOptions"
          placeholder="Select Team User"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
          class="min-w-200 w-full mb-2"
        />
        <vs-input :label="$t('label.ticket.file')" type="file" class="w-full" />
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full">
        <small class="date-label font-semibold">{{$t('label.duetime')}}</small>
        <flat-pickr
          :config="configdateTimePicker"
          class="w-full vs-inputx vs-input--input normal mb-2"
          placeholder="Date Time"
        />
        <small class="date-label font-semibold">{{$t('label.heding.description')}}</small>
        <quill-editor v-model="content" class="w-full mb-2"></quill-editor>
        <div class="vx-row float-right my-2">
          <div class="vx-col w-full">
            <vs-button class="mr-3 mb-2">{{$t('label.button.submit')}}</vs-button>
            <vs-button class="mr-3 mb-2">{{$t('label.heading.reset')}}</vs-button>
            <vs-button color="primary" type="border" class="mb-2">{{$t('label.heading.ftr')}}</vs-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "d-m-Y H:i"
      }
    };
  },
  components: {
    Datepicker,
    flatPickr,
    quillEditor,
    "v-select": vSelect
  }
};
</script>
<style lang="scss" scoped>
</style>