<template>
  <div>
    <vx-card>
      <vs-table
        :max-items="descriptionItems[0]"
        class="mt-3"
        pagination
        :data="agreementDetails"
        description
        :description-items="descriptionItems"
        description-title="Registries"
        description-connector="of"
        description-body="Pages"
      >
        <template slot="header" color="primary">
          <!-- ADD NEW -->
        </template>
        <template slot="thead">
          <vs-th>{{$t('table.plan.description')}}</vs-th>
          <vs-th>{{$t('label.contreffectdate')}}</vs-th>
          <vs-th>{{$t('label.contrenddate')}}</vs-th>
          <vs-th>{{$t('label.heading.actions')}}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].description">{{data[indextr].description}}</vs-td>

            <vs-td :data="data[indextr].contreffectdate">{{data[indextr].contreffectdate}}</vs-td>
            <vs-td :data="data[indextr].contrenddate">{{data[indextr].contrenddate}}</vs-td>
            <vs-td></vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>
<script>
export default {
  props: ["entityId"],
  data() {
    return {
      descriptionItems: [5, 10, 15],
      agreementDetails: []
    };
  }
};
</script>
<style lang="scss" scoped>
</style>