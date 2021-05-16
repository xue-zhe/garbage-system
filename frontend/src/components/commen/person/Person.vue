<template>
    <div id="person">
       <div class="person-box">
           <div class="person-message">
               <div class="title">学生个人中心</div>
               <el-form ref="form" :model="form" label-width="80px">
                   <el-form-item label="电话/账号">
                       <el-input :disabled="true" v-model="form.phone"></el-input>
                   </el-form-item>
                   <el-form-item label="学生姓名">
                       <el-input v-model="form.name"></el-input>
                   </el-form-item>
                   <el-form-item label="学生学号">
                       <el-input v-model="form.studentno"></el-input>
                   </el-form-item>
                   <el-form-item label="学生学院">
                       <el-input v-model="form.college"></el-input>
                   </el-form-item>
                   <el-form-item label="学生专业">
                       <el-input v-model="form.major"></el-input>
                   </el-form-item>
                   <el-form-item label="学生宿舍">
                       <el-input v-model="form.dormitoryno"></el-input>
                   </el-form-item>
               </el-form>
               <el-button class="button"  @click="amendinformation" type="primary">
                   <span>信息修改</span>
               </el-button>
               <el-button class="button"  @click="amendpassword" type="primary">
                   <span>修改密码</span>
               </el-button>
               <el-button class="button"  @click="loginout" type="primary">
                   <span>注销</span>
               </el-button>
           </div>
       </div>

    </div>
</template>

<script>
    import {getPersonReferMultidata,getPersonAmendMultidata} from "../../../network/person/person";

    export default {
        name: "Person",
        data() {
            return {
                form:{
                    name: '',
                    phone: '',
                    studentno:'',
                    major:'',  //积分
                    college:'',
                    dormitoryno:'',
                },
            }
        },
        created() {
            this.form.phone = window.sessionStorage.getItem('account')
            console.log(this.form.phone)
            getPersonReferMultidata(this.form.phone).then(res=>{
                if (res.data.status == 200){
                    this.form.name = res.data.data[0].name
                    this.form.studentno = res.data.data[0].studentno
                    this.form.college = res.data.data[0].college
                    this.form.major = res.data.data[0].major
                    this.form.dormitoryno = res.data.data[0].dormitoryno
                    this.$message({
                        message: '加载成功！',
                        type: 'success'
                    });
                }
            })
            // getThrowMultidata()
            // getReferIntegralMultidata()
        },
        methods: {
            //上传垃圾数据
            amendinformation(){
                getPersonAmendMultidata(this.form.phone,this.form.name,
                    this.form.studentno, this.form.college,
                    this.form.major, this.form.dormitoryno).then(res=>{
                        if (res.data.status == 200) {
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                        }
                    })
            },
            amendpassword() {
                this.$router.push('/personpassword')
            },
            /**
             *退出登录
             **/
            loginout(){
                window.sessionStorage.clear()
                this.$router.push('login')
                this.$message({
                    message: '退出成功！',
                    type: 'success'
                });
            }


        }
    }
</script>

<style scoped>
    #person{
        background: url("../../../assets/personbackground.jpg") no-repeat center center;
        height: 660px;
        width: 100%;
        background-size: cover;
    }
    .person-box{
        position: relative;
        border-radius: 6px;
        background: rgba(0, 0, 0, .15);
        width: 400px;
        top: 50px;
        left:650px;
    }
    .title{
        margin: 0 auto 30px auto;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
    }
    .person-message{
        padding: 20px;
    }
    .button{
        margin-bottom: 10px;
        width: 100%;
    }
    .el-button+.el-button{
        margin-left: 0;
    }
</style>