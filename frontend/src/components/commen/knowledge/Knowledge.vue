<template>
    <div class="bock">
        <div class="title-block">
            <img src="../../../assets/favicon.png" class="img-icon center-block" />
            <h1 class="titles">
                垃圾分类查询
            </h1>
        </div>
        <diV class="search">
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-input placeholder="请输入垃圾名称" v-model="index">
                        <el-button slot="append" icon="el-icon-search" @click=" getkonwledgeMultidata"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </diV>
        <div class="relate">
            <span>{{relateTitle}}</span>
            <span v-for="(relateContent,index) in relateContent" :key="index">
                <a  class="link" @click="getrelate(relateContent)">{{relateContent}}</a>
            </span>
        </div>
        <div class="nature">
            <span>{{natureTitle}}</span>
        </div>
        <div class="imgs">
            <img :src="url"/>
        </div>
        <div class="knowledge">
            <h3>{{knowlegeTitle[0]}}</h3>
            <span>{{definition}}</span>
            <h3>{{knowlegeTitle[1]}}</h3>
            <span>{{content}}</span>
            <h3>{{knowlegeTitle[2]}}</h3>
            <ul v-for="(condition,index) in condition" :key="index">
                <li style=" list-style:none;">{{condition}}</li>
            </ul>
        </div>
        <div  class="recent">
            <span>{{recentTitle}}</span>
            <span v-for="(recentContent,index) in recentContent ":key="index">
                <a class="link" @click="getrecent(recentContent)">{{recentContent}}</a>
            </span>
        </div>
    </div>
</template>

<script>
    import {getkonwledgeMultidata} from "../../../network/konwledge/konwledge";
    export default {
        name: "Knowledge",
        data(){
            return{
                index:'茶叶',
                relateTitle:'',
                relateContent:[],
                natureTitle:'',
                url:'',
                knowlegeTitle:[],
                definition:'',
                content:'',
                condition:[],
                recentTitle:'',
                recentContent:[]

            }
        },
        created() {
            getkonwledgeMultidata(this.index).then(res=>{
                this.relateTitle = res.data.relateTitle
                this.relateContent =res.data.relateContent
                this.natureTitle = res.data.natureTitle
                this.url = res.data.imgs
                this.knowlegeTitle = res.data.knowlegeTitle
                this.definition = res.data.definition
                this.content = res.data.content
                this.condition = res.data.condition
                this.recentTitle = res.data.recentTitle
                this.recentContent = res.data.recentContent
            })
        },
        methods:{
            getkonwledgeMultidata(){
                getkonwledgeMultidata(this.index).then(res=>{
                    this.relateTitle = res.data.relateTitle
                    this.relateContent =res.data.relateContent
                    this.natureTitle = res.data.natureTitle
                    this.url = res.data.imgs
                    this.knowlegeTitle = res.data.knowlegeTitle
                    this.definition = res.data.definition
                    this.content = res.data.content
                    this.condition = res.data.condition
                    this.recentTitle = res.data.recentTitle
                    this.recentContent = res.data.recentContent
                })
            },
            /**
             *相关查询函数
             **/
            getrelate(relateContent){
               this.index = relateContent
                getkonwledgeMultidata(this.index).then(res=>{
                    this.relateTitle = res.data.relateTitle
                    this.relateContent =res.data.relateContent
                    this.natureTitle = res.data.natureTitle
                    this.url = res.data.imgs
                    this.knowlegeTitle = res.data.knowlegeTitle
                    this.definition = res.data.definition
                    this.content = res.data.content
                    this.condition = res.data.condition
                    this.recentTitle = res.data.recentTitle
                    this.recentContent = res.data.recentContent
                })
            },
            /**
             *近期查询函数
             **/
            getrecent(recentContent){
                this.index = recentContent
                getkonwledgeMultidata(this.index).then(res=>{
                    this.relateTitle = res.data.relateTitle
                    this.relateContent =res.data.relateContent
                    this.natureTitle = res.data.natureTitle
                    this.url = res.data.imgs
                    this.knowlegeTitle = res.data.knowlegeTitle
                    this.definition = res.data.definition
                    this.content = res.data.content
                    this.condition = res.data.condition
                    this.recentTitle = res.data.recentTitle
                    this.recentContent = res.data.recentContent
                })
            }
        }
    }
</script>

<style scoped>
    /*标题框*/
 .title-block{
         position: absolute;
        left: 600px;
    }
.img-icon{
    display: inline;
    width: 100px;
}
 .titles{
     position: relative;
     display: inline;
     font-size: 30px;
     margin-top: 13px;
     top: -30px;
 }
 /*搜索框*/
 .search{
     position: absolute;
     top: 200px;
     left: 500px;
     width: 1000px;
 }
 /*相关查询框*/
 .relate{
    position: absolute;
     width: 600px;
     top: 250px;
     left: 500px;
 }
 /*查询*/
 .link{
     margin-right: 10px;
     cursor:pointer;
 }
 .link:hover{
     color: rosybrown;
 }
  /*垃圾属性*/
.nature {
    position: absolute;
    top: 300px;
    left: 600px;
    font-size: 30px;
}
/*垃圾图片*/
.imgs{
    position: absolute;
    top: 350px;
    width: 400px;
    left: 530px;
}
/*垃圾分类的知识*/
.knowledge{
    position: absolute;
    top: 660px;
    left: 500px;
}
/*热门查询*/
.recent{
    position: absolute;
    width: 600px;
    top: 870px;
    left: 500px;
    padding-bottom: 50px;
}
</style>