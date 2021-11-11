<template>
  <div>
    <div class="vx-row">
      <vx-card v-show="!treeview">
        <vs-table
          :max-items="descriptionItems[0]"
          pagination
          :data="entities"
          description
          search
          @selected="handleSelected"
          :description-items="descriptionItems"
          description-title="Registries"
          description-connector="of"
          description-body="Pages"
        >
          <template slot="header">
            <!-- ADD NEW -->
            <!-- <div class="vs-table--search">
              <span class="mr-2 mb-1">
                <vs-button
                  icon-pack="feather"
                  icon="icon-git-branch"
                  @click="treeview = !treeview"
                >{{$t('label.button.treeview')}}</vs-button>
              </span>
              <span class="mr-2 mb-1">
                <vs-button
                  icon-pack="feather"
                  icon="icon-activity"
                  @click="$router.push('/officeactivitylog').catch(() => {})"
                >{{$t('label.button.Activitylog')}}</vs-button>
              </span>
              <span class="ml-2 mb-1">
                <vs-button
                  icon-pack="feather"
                  icon="icon-plus"
                  @click="$router.push('/createEntity').catch(() => {})"
                >{{$t('label.button.createentity')}}</vs-button>
              </span>
            </div> -->
          <div class="mr-2 mb-1 order-1">
            <vs-button
                  icon-pack="feather"
                  icon="icon-git-branch"
                  @click="treeview = !treeview"
                  size="small"
                >{{$t('label.button.treeview')}}</vs-button>
          </div>
          <div class="mr-2 mb-1 order-1">
            <vs-button
                  icon-pack="feather"
                  icon="icon-activity"
                  @click="$router.push('/officeactivitylog').catch(() => {})"
                  size="small"
                >{{$t('label.button.Activitylog')}}</vs-button>
          </div>
          <div class="mr-2 mb-1 order-1">
             <vs-button
                  icon-pack="feather"
                  icon="icon-plus"
                  @click="$router.push('/createEntity').catch(() => {})"
                  size="small"
                >{{$t('label.button.createentity')}}</vs-button>
          </div>
          </template>
          <template slot="thead">
            <vs-th>{{$t('label.heading.entityname')}}</vs-th>
            <vs-th>{{$t('label.heading.entitycode')}}</vs-th>
            <vs-th>{{$t('label.heading.parententity')}}</vs-th>
            <vs-th>{{$t('label.heading.entitytype')}}</vs-th>
            <vs-th>{{$t('label.heading.openedon')}}</vs-th>
            <vs-th>{{$t('label.heading.actions')}}</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="index" :data="entity" v-for="(entity, index) in data">
              <vs-td :data="entity.name">{{entity.name}}</vs-td>
              <vs-td :data="entity.externalId">{{entity.externalId}}</vs-td>
              <vs-td :data="entity.parentName">{{entity.parentName}}</vs-td>
              <vs-td :data="entity.officeType">{{entity.officeType}}</vs-td>
              <vs-td :data="getDate(entity.openingDate)">{{getDate(entity.openingDate)}}</vs-td>
              <vs-td class="whitespace-no-wrap">
                <feather-icon
                  icon="EditIcon"
                  title="edit"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current cursor"
                  @click.stop="editData(entity.id)"
                />
                <feather-icon
                  icon="PlusSquareIcon"
                  title="Update Credit Limit"
                  svgClasses="w-5 h-5 hover:text-warning stroke-current cursor"
                  @click.stop="updateCraditModel(entity.id)"
                  class="ml-2"
                />
                <feather-icon
                  icon="PlusCircleIcon"
                  title="Add ticket"
                  svgClasses="w-5 h-5 hover:text-success stroke-current cursor"
                  class="ml-2"
                  @click="addTicket(entity.id)"
                />
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
      <vx-card v-show="treeview">
        <div class="vx-row mt-4 mb-4 ">
          <div class="vx-col">
            <vs-button
              @click="treeview = !treeview"
              icon-pack="feather"
              icon="icon-corner-down-left"
              color="primary"
              type="filled"
              size="small"
            >Back</vs-button>
          </div>
        </div>
        <v-tree
          ref="tree"
          :data="treeData"
          :multiple="false"
          @node-check="nodechecked"
          @async-load-nodes="asyncLoad"
        />
      </vx-card>
      <div class="centerx">
        <vs-popup
          classContent="popup-example"
          :title="$t('label.heading.credit')"
          :active.sync="updateCraditPopup"
        >
          <form>
            <div class="vx-row md:w-full lg:w-full sm:w-full mb-6">
              <div class="vx-col sm:w-full w-full">
                <vs-input
                  :label="$t('label.creditlimit')"
                  type="text"
                  class="w-full font-semibold"
                  v-model="credit.creditLimitAmount"
                />
              </div>
            </div>

            <div class="vx-row">
              <span class="ml-4 mr-1">
                <vs-button
                  icon-pack="feather"
                  type="border"
                  icon="icon-x"
                  @click="clearCredit"
                >{{$t('label.button.clear')}}</vs-button>
              </span>
              <span class="ml-1 mr-2">
                <vs-button
                  icon-pack="feather"
                  icon="icon-search"
                  @click="updateCreditLimit"
                >{{$t('label.button.Search')}}</vs-button>
              </span>
            </div>
          </form>
        </vs-popup>
      </div>
    </div>
  </div>
</template>
<script>
import { getEntities,updateCreditLimit } from "@/http/entity";
import moment from "moment";
import { VTree, VSelectTree } from "vue-tree-halower";

export default {
  data() {
    return {
      searchOption: 0,
      treeview: false,
      descriptionItems: [5, 10, 15],
      updateCraditPopup: false,
      credit: {
        creditLimitAmount: "",
        id:""
      },
      initSelected: ["node-1"],
      treeData: [
        {
          title: "node1",
          expanded: false,
          async: true
        }
      ]
    };
  },
  components: {
    VTree,
    VSelectTree
  },
  computed: {
    entities() {
      return this.$store.getters["entity/getEntityList"];
    },
    entityTemplate() {
      return this.$store.getters["entity/template"];
    }
  },
  methods: {
    getDate(date) {
      return moment(date.join("/")).format("DD MMMM YYYY");
    },
    handleSelected(item) {
      this.$router.push({ path: `/view_entity/${item.id}` });
    },

    async getEntityList() {
      try {
        const entities = await getEntities();
        this.$store.dispatch("entity/setEntities", entities.data.pageItems);
      } catch (e) {
        console.log("something went to wrong while entities:", e);
      }
    },
    nodechecked(node, v) {
      alert("that a node-check envent ..." + node.title + v);
    },
    editData(id) {
      this.$router.push(`/edit_entity/${id}`);
    },
    updateCraditModel(id){
      this.updateCraditPopup = true;
      if(this.updateCraditPopup)
      {
        this.credit.id= id
      }
    },
    addTicket(id){
      this.$router.push(`/view_entity/${id}`);
      this.active=true;
    },
    async updateCreditLimit() {
      const credit={
        locale:"en",
        creditLimitAmount:this.credit.creditLimitAmount
      }
      try {
         const resp = await updateCreditLimit(this.credit.id,credit);
        console.log('credit limit data',resp.data)
      } catch (e) {
        console.log("something went to wrong while credit limit:", e);
      }
    },
    clearCredit(){
      this.credit.creditLimitAmount =""
      this.updateCraditPopup=false
    },
    async asyncLoad(node) {
      const { checked = false } = node;
      this.$set(node, "loading", true);
      let pro = await new Promise(resolve => {
        setTimeout(resolve, 2000, [
          { title: "test1", async: true },
          { title: "test2", async: true },
          { title: "test3" }
        ]);
      });
      if (!node.hasOwnProperty("children")) {
        this.$set(node, "children", []);
      }
      node.children.push(...pro);
      this.$set(node, "loading", false);
      if (checked) {
        this.$refs.tree.childCheckedHandle(node, checked);
      }
    }
  },
  created() {
    this.getEntityList();
    this.getTemplate();
  }
};
</script>
<style lang="scss" scoped>
.vs-table--search {
  max-width: 100%;
  margin-left: 0px !important;
}

.vuesax-app-is-ltr .vs-table--search {
  margin-left: 0;
}

.vs-search-categeory {
  margin-top: 17px;
}
</style>
