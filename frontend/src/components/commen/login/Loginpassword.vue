<template>
    <div id="person">
        <div class="person-box">
            <div class="person-message">
                <div class="title">密码找回</div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="账号">
                        <el-input :disabled="true" v-model="form.account"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="form.newpassword"  show-password></el-input>
                    </el-form-item>
                    <el-form-item label="再次确定">
                        <el-input v-model="form.password"  show-password></el-input>
                    </el-form-item>
                    <el-form-item class="login-input-cold" label="验证码">
                        <el-input
                                prefix-icon=""
                                v-model="form.code"
                                placeholder="请输入验证码"
                                clearable
                        >
                        </el-input>
                        <div style="margin-top: 10px" @click="code" class="login-code">
                            <span v-html="form.img"></span>
                        </div>
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

    import {getVerificationMultidata} from "../../../network/verification/verification";
    import {getForgetPasswordMultidata} from "../../../network/login/login";
    export default {
        name: "Loginpassword",
        data() {
            return {
                form:{
                    account: '',
                    newpassword:'',
                    password:'',
                    code:'',
                    img:'',
                    recode:''
                },
            }
        },
        created() {
            this.form.account = window.sessionStorage.getItem('account')
            getVerificationMultidata().then(res => {
                this.form.img = res.data.img;
                this.form.recode = res.data.text
            })
        },
        methods: {
            //上传垃圾数据
            amendpassword() {
                if(this.form.code == this.form.recode){
                    getForgetPasswordMultidata(this.form.account,this.form.newpassword,this.form.password).then(res=>{
                        if(res.data.status == 200){
                            this.$router.push('/login')
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                        }else {
                            getVerificationMultidata().then(res => {
                                this.form.img = res.data.img;
                                this.form.recode = res.data.text
                            })
                            this.$message({
                                message: res.data,
                                type: 'warning'
                            });
                        }
                    })
                }else{
                    getVerificationMultidata().then(res => {
                        this.loginForm.img = res.data.img;
                        this.loginForm.recode = res.data.text
                        this.$message({
                            message: '验证码错误，请重新输入！',
                            type: 'warning'
                        });
                    })
                }
            },
            code(){
                getVerificationMultidata().then(res => {
                    this.form.img = res.data.img;
                    this.form.recode = res.data.text
                })
            }
        }
    }
</script>
<style scoped>
    #person{
        position: absolute;
        background: url("../../../assets/loginbackground.jpg") no-repeat center center;
        height: 100%;
        width: 100%;
        background-size: cover;
    }
    .person-box{
        position: relative;
        border-radius: 6px;
        background: rgba(0, 0, 0, .15);
        width: 430px;
        top: 80px;
        left:550px;
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
    .login-code{
        top: -58px;
        left: 150px;
        position: relative;
        width: 130px;
        height: 60px;
    }
    .login-input-cold{
        width: 55%;
    }
    .button{
        margin-top: -10px;
        width: 100%;
    }
</style>