<template>
   <div id="throw">
       <div class="waste">
           <span class="ResidualWaste" @click="ResidualWaste">
               <img src="../../../assets/garbageSorting/ResidualWaste.png">
           </span>
           <span class="HazardousWaste" @click="HazardousWaste">
               <img src="../../../assets/garbageSorting/HazardousWaste.png">
           </span>
           <span class="FoodWaster" @click="FoodWaster">
               <img src="../../../assets/garbageSorting/FoodWaster.png">
           </span>
           <span class="Recyclables" @click="Recyclables">
               <img src="../../../assets/garbageSorting/Recyclables.png">
           </span>
       </div>
   </div>
</template>

<script>
    export default {
        name: "Throw",
        methods:{
            ResidualWaste(){
                window.sessionStorage.setItem('wastetype','其他垃圾')
                this.$router.push('/waste')
            },
            HazardousWaste(){
                window.sessionStorage.setItem('wastetype','有害垃圾')
                this.$router.push('/waste')
            },
            FoodWaster(){
                window.sessionStorage.setItem('wastetype','厨余垃圾')
                this.$router.push('/waste')
            },
            Recyclables(){
                window.sessionStorage.setItem('wastetype','可回收垃圾')
                this.$router.push('/waste')
            }

        }
    }
</script>

<style scoped>
    #throw{
        background: url("../../../assets/throwbackground.jpg") no-repeat center center;
        height: 660px;
        width: 100%;
        background-size: cover;
    }
    .waste{
        position: absolute;
        top: 300px;
        left:400px;
        cursor:pointer;
    }
</style>