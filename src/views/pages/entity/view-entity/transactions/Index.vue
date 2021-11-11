<template>
  <div>
    <vx-card>
    <vs-table
      :max-items="descriptionItems[0]"
      class="mt-3"
      pagination
      :data="agreementDetails"
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
        <vs-th>{{$t('label.heading.transactionid')}}</vs-th>
        <vs-th>{{$t('label.transactiontype')}}</vs-th>
        <vs-th>{{$t('label.price.amount')}}</vs-th>
        <vs-th>{{$t('label.transDate')}}</vs-th>
        <vs-th>{{$t('label.transactionCategory')}}</vs-th>
        <vs-th>{{$t('label.cancelremark')}}</vs-th>
        <vs-th>{{$t('label.heading.actions')}}</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].transactionid">{{data[indextr].transactionid}}</vs-td>
          <vs-td :data="data[indextr].transactiontype">{{data[indextr].transactiontype}}</vs-td>
          <vs-td :data="data[indextr].amount">{{data[indextr].amount}}</vs-td>
          <vs-td :data="data[indextr].transDate">{{data[indextr].transDate}}</vs-td>
          <vs-td :data="data[indextr].transactionCategory">{{data[indextr].transactionCategory}}</vs-td>
          <vs-td :data="data[indextr].cancelremark">{{data[indextr].cancelremark}}</vs-td>
          <vs-td></vs-td>
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