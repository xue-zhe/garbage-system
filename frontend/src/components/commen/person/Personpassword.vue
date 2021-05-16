<template>
    <div id="person">
        <div class="person-box">
            <div class="person-message">
                <div class="title">学生个人中心</div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="电话/账号">
                        <el-input :disabled="true" v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="旧密码">
                        <el-input v-model="form.oldpassword"  show-password></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="form.newpassword"  show-password></el-input>
                    </el-form-item>
                    <el-form-item label="再次确定">
                        <el-input v-model="form.password"  show-password></el-input>
                    </el-form-item>
                </el-form>
                <el-button class="button"  @click="amendpassword" type="primary">
                    <span>修改密码</span>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {getPersonPasswordMultidata} from "../../../network/person/person";

    export default {
        name: "Personpassword",
        data() {
            return {
                form:{
                    phone: '',
                    oldpassword:'',
                    newpassword:'',
                    password:''
                },
            }
        },
        created() {
            this.form.phone = window.sessionStorage.getItem('account')
        },
        methods: {
            //上传垃圾数据
            amendpassword() {
                getPersonPasswordMultidata(this.form.phone,this.form.oldpassword,this.form.newpassword,this.form.password).then(res=>{
                    if (res.data.status == 200){
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        });
                        this.$router.push('/person')
                    }else {
                        this.$message({
                            message:res.data,
                            type: 'warning'
                        });
                    }
                })
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