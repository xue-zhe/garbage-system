<template>
    <div>
        <!--顶行栏-->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-input placeholder="请输入姓名或电话或学号" v-model="index" clearable  @clear="getUserlistMultidata">
                        <el-button slot="append" icon="el-icon-search" @click="getuserlistMultidata"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="useradd">添加用户</el-button>
                </el-col>
            </el-row>
        </el-card>
        <!-- 表格区-->
        <el-table
                :data="tableData"
                style="width: 100%"
                border>
            <el-table-column type="index"></el-table-column>
            <el-table-column
                    prop="id"
                    label="id"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="学生姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="电话号码"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="studentno"
                    label="学生学号"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="college"
                    label="学院"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="major"
                    label="专业"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="dormitoryno"
                    label="宿舍号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="c"
                    label="操作"
                    width="180">
                <template slot-scope="scope" >
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="EditDialogVisible(scope.row.phone)">修改</el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="DeleteDialogVisible(scope.row.phone)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页栏-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[10]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <!--用户信息修改-->
        <el-dialog
                style="padding-top:0;padding-bottom: 0"
                title="修改用户信息"
                :visible.sync="editDialogVisible"
                width="50%">
            <span>
                <el-form ref="form" :model="form" label-width="80px">
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
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="getusereditMultidata">确 定</el-button>
            </span>
        </el-dialog>
        <!--用户添加-->
        <el-dialog
                style="padding-top:0;padding-bottom: 0"
                title="添加新用户"
                :visible.sync="addDialogVisible"
                width="50%">
            <span>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="账号/电话">
                       <el-input v-model="form.phone"></el-input>
                   </el-form-item>
                   <el-form-item label="密码">
                       <el-input v-model="form.password" show-password></el-input>
                   </el-form-item>
                   <el-form-item label="再次确定">
                       <el-input v-model="form.repassword" show-password></el-input>
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
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="getuseraddMultidata">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    import {getUserListMultidata,
        getuserlistMultidata,
        getusereditMultidata,
        getuserdeleteMultidata,
        getuseraddMultidata} from "../../../network/adminuser/adminuserlist";

    export default {
        name: "UserIformation",
        data() {
            return {
                form:{
                    name: '',
                    phone: '',
                    password:'',
                    repassword:'',
                    studentno:'',
                    college:'',
                    major:'',
                    dormitoryno:'',
                },
                index:'',
                tableData: [],
                page:1,
                pagesize:10,
                total:0,
                editDialogVisible:false,
                addDialogVisible:false,
                permissionDialogVisible:false,
            }
        },
        created() {
            getUserListMultidata(this.page,this.pagesize).then(res=>{
                this.tableData=res.data.result.data
                this.total = res.data.total[0].total
            })
        },
        methods:{
            /**
             * 处理页数变化
             * */
            handleSizeChange(newSize){
                console.log( newSize)
            },
            /**
             * 更加页数进行搜索
             * */
            handleCurrentChange(newPage){
                this.page = newPage
                getUserListMultidata(this.page,this.pagesize).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total
                })
            },

            /**
             *添加相关用户
             * */
            useradd(){
                this.addDialogVisible = true
            },
            getuseraddMultidata(){
                if(this.form.password == this.form.repassword){
                    getuseraddMultidata(
                        this.form.name,
                        this.form.phone,
                        this.form.password,
                        this.form.studentno,
                        this.form.college,
                        this.form.major,
                        this.form.dormitoryno).then(res=>{
                            if(res.data.status == 200){
                                this.addDialogVisible = false
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                });
                            }else {
                                this.$message({
                                    message: '添加失败！',
                                    type: 'success'
                                });
                            }
                    })
                }else {
                    this.$message({
                        message: '两次密码不一致，请重新输入！',
                        type: 'warning'
                    })
                }
            },
            /**
             * 用户搜索
             * */
            //搜索
            getuserlistMultidata(){
                getuserlistMultidata(this.page,this.pagesize,this.index,).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total

                })
            },
            //取消搜索时
            getUserlistMultidata(){
                getUserListMultidata(this.page,this.pagesize).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total
                })
            },
            /**
             * 修改用户信息
             * */
            EditDialogVisible(phone){
                this.editDialogVisible=true
                this.form.phone= phone
                getuserlistMultidata(this.page,this.pagesize,this.form.phone,).then(res=>{
                    this.form.name = res.data.result.data[0].name
                    this.form.studentno = res.data.result.data[0].studentno
                    this.form.major = res.data.result.data[0].major
                    this.form.college = res.data.result.data[0].college
                    this.form.dormitoryno = res.data.result.data[0].dormitoryno
                })
            },
            getusereditMultidata(){
                getusereditMultidata(this.form.phone,this.form.name,
                    this.form.studentno, this.form.college,
                    this.form.major, this.form.dormitoryno).then(res=>{
                    if(res.data.status == 200){
                        this.editDialogVisible = false
                        getUserListMultidata(this.page,this.pagesize).then(res=>{
                            this.tableData=res.data.result.data
                            this.total = res.data.total[0].total
                        })
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                    }else{
                            this.$message({
                                message: '修改失败！',
                                type: 'warning'
                            })
                        }
                })
            },
            /**
             * 进行用户删除
             * */
            DeleteDialogVisible(phone){
                getuserdeleteMultidata(phone).then(res=>{
                    this.$confirm('是否进行用户删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        if(res.data.status == 200){
                            getUserListMultidata(this.page,this.pagesize).then(res=>{
                                this.tableData=res.data.result.data
                                this.total = res.data.total[0].total
                            })
                            this.$message({
                                message: '删除成功！',
                                type: 'success'
                            });
                        }else {
                                this.$message({
                                    message: '删除失败！',
                                    type: 'warning'
                                })
                        }
                    })
                }).catch(() => {
                    userInfo.shopState=!userInfo.shopState
                });
            },
        }
    }
</script>

<style scoped>
    .el-breadcrumb{
        margin-bottom: 15px;
        font-size: 14px;
    }
    .el-card{
        margin-bottom: 15px;

    }
    .el-table{
        margin-bottom: 15px;
    }
    .permissionbutton{
        margin: 30px 0;
    }
    .permission{
        margin: 20px 0;
    }
</style>