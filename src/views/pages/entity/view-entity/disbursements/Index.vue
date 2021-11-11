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
        <vs-th>{{$t('label.id')}}</vs-th>
        <vs-th>{{$t('label.heading.transactionDate')}}</vs-th>
        <vs-th>{{$t('label.source')}}</vs-th>
        <vs-th>{{$t('label.commissionamount')}}</vs-th>
        <vs-th>{{$t('label.commissiontype')}}</vs-th>
        <vs-th>{{$t('label.commissionrate')}}</vs-th>
        <vs-th>{{$t('label.commissionamount')}}</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].id">{{data[indextr].id}}</vs-td>
          <vs-td :data="data[indextr].transactionDate">{{data[indextr].transactionDate}}</vs-td>
          <vs-td :data="data[indextr].source">{{data[indextr].source}}</vs-td>
          <vs-td :data="data[indextr].commissionamount">{{data[indextr].commissionamount}}</vs-td>
          <vs-td :data="data[indextr].commissiontype">{{data[indextr].commissiontype}}</vs-td>
          <vs-td :data="data[indextr].commissionrate">{{data[indextr].commissionrate}}</vs-td>
          <vs-td :data="data[indextr].commissionamount">{{data[indextr].commissionamount}}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
    </vx-card>
  </div>
</template>
<script>
export default {
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