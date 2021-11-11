<template>
    <ul class="horizontal-sm-btn flex  justify-center mb-2">
        <li  v-for="(btn,index) in horizonalButton" :key="index">
            <div class="p-1  cursor-pointer flex items-center justify-center text-lg font-medium  w-full">
              <vs-button
                color="primary"
                icon-pack="feather"
                :icon="btn.icon"
                class=" truncate"
                @click="pagecall"
              >{{btn.heading}}</vs-button>
            </div>
        </li> 
    </ul>    
</template>
<script>
export default {
    props: ['horizonalButton'],
   data(){
       return {
           
       }
   },
   methods:{
     pagecall() {
        this.$emit('pagecall');
    }
   } 
}
</script>
<style lang="scss" scoped>
// @media screen and (max-width: 786px){
//   .horizontal-sm-btn{
//     flex-direction: column;
//   }
//}
</style>