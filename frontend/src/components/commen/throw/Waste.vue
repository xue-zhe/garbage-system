<template>
       <div id="waste">
           <div class="throw-waster">
               <div class="upload-waster">
                   <div class="title">垃圾投放</div>
                   <el-upload
                           :action="uploadurl"
                           :on-preview="handlePreview"
                           :on-remove="handleRemove"
                           :on-success="handlesuccess"
                           list-type="picture">
                       <el-button size="mini" type="primary">垃圾图片上传</el-button>
                   </el-upload>
                   <span ><img :src="previewpath" class="previewpath"></span>
                   <el-form ref="form" :model="form" label-width="80px">
                       <el-form-item label="垃圾名称">
                           <el-input v-model="form.wastename"></el-input>
                       </el-form-item>
                       <el-form-item label="垃圾类型">
                           <el-select v-model="form.wastetype" placeholder="请选择垃圾类型">
                               <el-option label="其他垃圾" value="其他垃圾"></el-option>
                               <el-option label="有毒垃圾" value="有毒垃圾"></el-option>
                               <el-option label="可回收垃圾" value="可回收垃圾"></el-option>
                               <el-option label="厨余垃圾" value="厨余垃圾"></el-option>
                           </el-select>
                       </el-form-item>
                   </el-form>
                   <el-button class="throw-button"  @click="throws" type="primary">
                       <span>投放垃圾</span>
                   </el-button>
               </div>

           </div>

       </div>
</template>

<script>
    import {getThrowMultidata,getReferIntegralMultidata,getAmendIntegralMultidata} from "../../../network/throw/throw";
    export default {
        name: "Waste",
        data() {
            return {
                form:{
                    wastename: '',
                    wastetype: '',
                    imgs:'',
                    integral:'',  //积分
                    account:'',
                    type:'',
                },
                uploadurl:'http://localhost:3000/imgs/upload',
                previewpath:'',
            }
        },
        created() {
        },
        methods: {
            //图片预览效果
            handlePreview(file){
               this.previewpath=file.response
            },
            //处理移除操作
            handleRemove(){

            },
            //上传成功的处理函数
            handlesuccess(response){
                this.form.imgs = response.url
            },

            //上传垃圾数据
            throws(){
                this.form.account = window.sessionStorage.getItem('account')
                this.form.type = window.sessionStorage.getItem('wastetype')
                getReferIntegralMultidata(this.form.account).then(res=>{
                    if (this.form.type == this.form.wastetype){
                        this.form.integral = res.data.data[0].integral+1
                    }else {
                        this.form.integral = res.data.data[0].integral-1
                    }
                    getAmendIntegralMultidata(this.form.account,this.form.integral).then(res=>{
                        console.log(res)
                    })
                })
                getThrowMultidata(this.form.imgs,this.form.wastetype,this.form.account,this.form.wastename).then(res => {
                    console.log(res.data)
                    if (res.data.status == 200) {
                        this.$router.push('/throw')
                        this.$message({
                            message:  res.data.msg,
                            type: 'success'
                        });
                    }
                })
            }


        }
    }
</script>

<style scoped>
    #waste{
        background: url("../../../assets/throwbackground.jpg") no-repeat center center;
        height: 660px;
        width: 100%;
        background-size: cover;
    }
    .throw-waster{
        position: relative;
        border-radius: 6px;
        background: rgba(0, 0, 0, .15);
        width: 400px;
        top: 150px;
        left:650px;
    }
    .upload-waster{
        padding: 25px;
    }
    .title{
        margin: 0 auto 5px auto;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
    }
    .throw-button{
        width: 100%;
    }
</style>