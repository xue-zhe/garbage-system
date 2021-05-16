<template>
    <el-card class="box-card">
        <div class="notictitle">
            <span>公告栏</span>
        </div>
        <div class="content-left">
            <h2>通知栏</h2>
            <p v-model="text" style="margin-top: 10px">{{text}}<p/>
        </div>
        <div class="content-right">
            <h2>奖励栏</h2>
            <el-carousel style="margin-top: 10px" height="90px" direction="vertical" :autoplay="true">
                <el-carousel-item v-for="(text,index) in prize" :key="index">
                    <p class="medium">给账号为{{text.account}} 的同学{{text.prize}}</p>
                </el-carousel-item>
            </el-carousel>
            <h2 style="margin-top: 10px">处罚栏</h2>
            <el-carousel style="margin-top: 10px"  height="90px" direction="vertical" :autoplay="true">
                <el-carousel-item v-for="(text,index) in punish" :key="index">
                    <p class="medium">惩罚账号为{{text.account}}的同学{{text.punish}}</p>
                </el-carousel-item>
            </el-carousel>
        </div>
    </el-card>
</template>

<script>
   import {getawardMultidata,getintegralMultidata} from "../../../network/home/home";
   import {getTextListMultidata} from "../../../network/adminannouncement/adminannouncement";

   export default {
        name: "Notice",
        data(){
            return{
                text:'',
                prize:[],
                punish:[],
                page:1,
                pagesize:10,
            }
        },
        created() {
            getawardMultidata().then(res=>{
                this.prize = res.data.data
            })
            getintegralMultidata().then(res=>{
                this.punish = res.data.data
            })
            getTextListMultidata(this.page,this.pagesize).then(res=>{
                this.text = res.data.result.data[0].text
            })
        }
    }
</script>
<style scoped>
.box-card{
    margin-top: 5px;
    height: 500px;
    width: 100%;
    background: url("../../../assets/background.png") no-repeat center center;
    background-size: cover;
}
    .notictitle{
        height: 80px;
        width: 100%;
        position: relative;
        text-align: center;
        font-size: 30px;
        color: darkolivegreen;
    }
    .content-left{
        position: relative;
        left: 200px;
        top: 50px;
        height: 300px;
        width: 550px;
    }
    .content-right{
        position: relative;
        top: -250px;
        left: 800px;
        height: 200px;
        width: 450px;
    }
</style>