<template>
        <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item  v-for="(img,index) in tableData" :key="index">
                <img :src="img.banner" width="100%" height="100%">
            </el-carousel-item>
        </el-carousel>
</template>

<script>
    import {getBannerListMultidata} from "../../../network/adminbanner/adminbanner";

    export default {
        name: "Banner",
        data(){
            return{
                tableData: [],
                page:1,
                pagesize:10,
                total:0,
            }
        },
        created() {
            getBannerListMultidata(this.page,this.pagesize).then(res=>{
                this.tableData=res.data.result.data
                this.total = res.data.total[0].total
            })
        }
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>