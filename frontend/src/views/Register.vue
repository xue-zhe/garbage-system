<template>
    <div id="register">
        <el-form  class="register-box" :model="registerForm" :rules="rules" ref="registerForm"  >
            <h3 class="title">垃圾分类系统</h3>
            <el-form-item prop="account" >
                <el-input
                        id="login-username"
                        prefix-icon="el-icon-user"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        v-model="registerForm.account"
                        placeholder="请输入账号" clearable>
                </el-input>
            </el-form-item>
            <el-form-item  prop="password" >
                <el-input
                        id="login-password"
                        show-password
                        prefix-icon="el-icon-lock"
                        v-model="registerForm.password"
                        placeholder="请输入密码"
                        clearable>
                </el-input>
            </el-form-item>
            <el-form-item  prop="password" >
                <el-input
                        id="login-password1"
                        show-password
                        prefix-icon="el-icon-lock"
                        v-model="registerForm.repassword"
                        placeholder="请输入再次输入密码"
                        clearable>
                </el-input>
            </el-form-item>
            <el-form-item class="register-input-cold">
                <el-input
                        prefix-icon=""
                        v-model="registerForm.code"
                        placeholder="请输入验证码"
                        clearable
                >

                </el-input>
                <div style="margin-top: 10px" @click="code" class="register-code">
                    <span v-html="registerForm.img"></span>
                </div>

            </el-form-item>
            <el-button id="register-button"  @click="Register" type="primary">
                <span>注册</span>
            </el-button>
            <!--验证码-->

        </el-form>
    </div>
</template>
<script>
    import {getRegisterMultidata} from "../network/register/register";
    import {getVerificationMultidata} from "../network/verification/verification";

    export default {
        name: "Register",
        data(){
            return{
                registerForm:{
                    account:'',
                    password:'',
                    repassword:'',
                    recode:'',
                    code:'',
                    img:'',
                },
                rules: {
                    account: [
                        { required: true, message: '请输入长度为11位的手机号码', trigger: 'blur'},
                        {min: 11, max: 11, message: '请输入长度为11位的手机号码', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'change'},
                        {min:3,max:18,message:'请输入6-18位的密码',trigger: 'blur' }
                    ],
                    repassword: [
                        {required: true , message: '请再次输入密码', trigger: 'change'},
                        {min:3,max:18,message:'请输入6-18位的密码',trigger: 'blur' }
                    ],
                },
            }
        },
        created() {
          //  getRegisterMultidata()
            getVerificationMultidata().then(res => {
                this.registerForm.img = res.data.img;
                this.registerForm.recode = res.data.text
            })
        },
        methods: {
            Register() {
                this.$refs.registerForm.validate(valid => {
                    if (valid) {
                        if (this.registerForm.code == this.registerForm.recode){
                            if (this.registerForm.password == this.registerForm.repassword){
                                getRegisterMultidata(this.registerForm.account, this.registerForm.password).then(res => {
                                    console.log(res.data)
                                    if (res.data.status == 200) {
                                        this.$router.push('/login')
                                        this.$message({
                                            message: res.data.msg,
                                            type: 'success'
                                        });
                                    }else {
                                        if(res.data.code===202){
                                            this.$message.error('验证码错误，请重新输入！');
                                        }else{
                                            this.$message.error('密码错误，请从新输入');
                                        }
                                    }
                                })
                            }else {
                                this.$message({
                                    message: '两次密码不一致，请重新输入！',
                                    type: 'warning'
                                });
                            }
                        }else {
                            getVerificationMultidata().then(res => {
                                this.registerForm.img = res.data.img;
                                this.registerForm.recode = res.data.text;
                                this.$message({
                                    message: '验证码错误，请重新输入！',
                                    type: 'warning'
                                });
                            })
                        }
                    } else {
                        this.$message({
                            message: '请正确填写账号和密码！',
                            type: 'warning'
                        });
                    }
                })
            },
            code()
            {
                getVerificationMultidata().then(res => {
                    this.registerForm.img = res.data.img;
                    this.registerForm.recode = res.data.text;
                })
            }
        }
    }
</script>

<style >
    #register{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: url("../assets/registerbackground.jpg") no-repeat center center;
        background-size: cover;
    }
    .title {
        margin: 0 auto 30px auto;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
    }
    .register-box{
        position:relative;
        border-radius: 6px;
        background: rgba(0, 0, 0, .15);
        width: 350px;
        padding: 25px 25px 5px 25px;
    }
    .register-code{
        top: -58px;
        left: 190px;
        position: relative;
        width: 130px;
        height: 60px;
    }
    .register-input-cold{
        width: 50%
    }
    #register-button{
        position: relative;
        top:-25px;
        width: 100%;
    }
</style>