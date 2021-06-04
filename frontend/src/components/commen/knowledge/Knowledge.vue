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
        <div class="knowledge">
            <h3>{{knowlegeTitle[0]}}</h3>
            <span>{{definition}}</span>
            <h3>{{knowlegeTitle[1]}}</h3>
            <span>{{content}}</span>
            <h3>{{knowlegeTitle[2]}}</h3>
            <div>{{condition}}</div>
        </div>
        <div  class="recent">
            <span style="color: #B43953">{{recentTitle}}</span>
            <span v-for="(recentContent,index) in recentContent ":key="index">
                <a class="link" @click="getrecent(recentContent)">{{recentContent}}</a>
            </span>
        </div>
        <div class="everyday">
            <h2> 日常生活垃圾分为</h2>
            <div>
                <img style="width: 100px;height: 100px" src="http://www.lajifenleichaxun.com//static/svg/1_3F6BA8.svg">
                <div class="everyday-content" style="color: #3F6BA8">
                    <h3>{{title1}}</h3>
                    <p>{{content1}}</p>
                </div>
            </div>
            <div>
                <img style="width: 100px;height: 100px" src="http://www.lajifenleichaxun.com//static/svg/2v_B43953.svg">
                <div class="everyday-content" style="color: #B43953">
                    <h3>{{title2}}</h3>
                    <p>{{content2}}</p>
                </div>
            </div>
            <div>
                <img style="width: 100px;height: 100px" src="http://www.lajifenleichaxun.com//static/svg/3v_48925B.svg">
                <div class="everyday-content" style="color: #48925B">
                    <h3>{{title3}}</h3>
                    <p>{{content3}}</p>
                </div>
            </div>
            <div>
                <img style="width: 100px;height: 100px" src="http://www.lajifenleichaxun.com//static/svg/4_89918B.svg">
                <div class="everyday-content" style="color: #89918B">
                    <h3>{{title4}}</h3>
                    <p>{{content4}}</p>
                </div>
            </div>
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
                condition:"",
                recentTitle:'',
                recentContent:[],
                title1:'',
                title2:'',
                title3:'',
                title4:'',
                content1:'',
                content2:'',
                content3:'',
                content4:'',

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
                this.title1 = res.data.title1
                this.title2 = res.data.title2
                this.title3 = res.data.title3
                this.title4 = res.data.title4
                this.content1 = res.data.content1
                this.content2 = res.data.content2
                this.content3 = res.data.content3
                this.content4 = res.data.content4

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
                    this.title1 = res.data.title1
                    this.title2 = res.data.title2
                    this.title3 = res.data.title3
                    this.title4 = res.data.title4
                    this.content1 = res.data.content1
                    this.content2 = res.data.content2
                    this.content3 = res.data.content3
                    this.content4 = res.data.content4
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
                    this.title1 = res.data.title1
                    this.title2 = res.data.title2
                    this.title3 = res.data.title3
                    this.title4 = res.data.title4
                    this.content1 = res.data.content1
                    this.content2 = res.data.content2
                    this.content3 = res.data.content3
                    this.content4 = res.data.content4
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
                    this.title1 = res.data.title1
                    this.title2 = res.data.title2
                    this.title3 = res.data.title3
                    this.title4 = res.data.title4
                    this.content1 = res.data.content1
                    this.content2 = res.data.content2
                    this.content3 = res.data.content3
                    this.content4 = res.data.content4
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
 }
 .link:hover{
     color: rosybrown;
     cursor:pointer;
 }
  /*垃圾属性*/
.nature {
    position: absolute;
    top: 300px;
    left: 600px;
    font-size: 30px;
}
/*垃圾分类的知识*/
.knowledge{
    position: absolute;
    top: 370px;
    width: 600px;
    left: 500px;
}
/*热门查询*/
.recent{
    position: absolute;
    width: 600px;
    top: 570px;
    left: 500px;

}
    /*日常分类*/
.everyday{
    position: absolute;
    width: 600px;
    top: 700px;
    left: 500px;
    padding-bottom: 50px;
}
.everyday-content{
    position: relative;
    top: -80px;
   left: 120px;
}
</style>
