<template>
    <div>
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
                    prop="account"
                    label="学生账号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="integral"
                    label="积分"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="prize"
                    label="奖励"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="punish"
                    label="处罚"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="c"
                    label="操作"
                    width="180">
                <template slot-scope="scope" >
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="PrizeDialogVisible(scope.row.account)">奖励</el-button>
                    <el-button type="danger" size="mini" icon="el-icon-edit" @click="PunishDialogVisible(scope.row.account)">惩罚</el-button>
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
        <!--发放奖品-->
        <el-dialog
                style="padding-top:0;padding-bottom: 0"
                title="奖励"
                :visible.sync="prizeDialogVisible"
                width="25%">
            <span>
                 <el-form ref="form" :model="form" label-width="80px">
                       <el-form-item label="奖品">
                           <el-select v-model="form.prize" placeholder="请选择要发放的奖品">
                               <el-option label="奖励一个U盘" value="奖励一个U盘"></el-option>
                               <el-option label="奖励一套手帐本" value="奖励一套手帐本"></el-option>
                               <el-option label="奖励一套文具" value="奖励一套文具"></el-option>
                               <el-option label="奖励一套纪念明信片" value="奖励一套纪念明信片"></el-option>
                           </el-select>
                       </el-form-item>
                   </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="prizeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="getprizeMultidata">确 定</el-button>
            </span>
        </el-dialog>
        <!--公布处罚-->
        <el-dialog
                style="padding-top:0;padding-bottom: 0"
                title="惩罚"
                :visible.sync="punishDialogVisible"
                width="25%">
            <span>
                 <el-form ref="form" :model="form" label-width="80px">
                       <el-form-item label="惩罚">
                           <el-select v-model="form.punish" placeholder="请选择惩罚方式">
                               <el-option label="打扫垃圾桶周围垃圾一天" value="打扫垃圾桶周围垃圾一天"></el-option>
                               <el-option label="打扫垃圾桶周围垃圾两天" value="打扫垃圾桶周围垃圾两天"></el-option>
                               <el-option label="垃圾桶旁边监督值日一天" value="垃圾桶旁边监督值日一天"></el-option>
                               <el-option label="垃圾桶旁边监督值日两天" value="垃圾桶旁边监督值日两天"></el-option>
                           </el-select>
                       </el-form-item>
                   </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="punishDialogVisible= false">取 消</el-button>
                <el-button type="primary" @click=" getpunishMultidata">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

   import {getIntegarListMultidata,getprizeMultidata,getpunishMultidata} from "../../../network/adminintegar/adminintegar";

   export default {
        name: "IntegralManagement",
        data() {
            return {
                form:{
                    account:'',
                    prize:'',
                    punish:'',
                },
                tableData: [],
                page:1,
                pagesize:10,
                total:0,
                prizeDialogVisible:false,
                punishDialogVisible:false,
            }
        },
        created() {
            getIntegarListMultidata(this.page,this.pagesize).then(res=>{
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
                getIntegarListMultidata(this.page,this.pagesize).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total
                })
            },
            /**
             * 发放奖品
             * */
            PrizeDialogVisible(account){
                this.prizeDialogVisible=true
                this.form.account= account
            },
            getprizeMultidata(){
                getprizeMultidata(this.form.account, this.form.prize).then(res=>{
                    this.prizeDialogVisible = false
                    if(res.data.status== 200){
                        this.$message({
                            message: '发放成功！',
                            type: 'success'
                        });
                        getIntegarListMultidata(this.page,this.pagesize).then(res=>{
                            this.tableData=res.data.result.data
                            this.total = res.data.total[0].total
                        })
                    }
                })
            },
            /**
             * 公布处罚
             * */
            PunishDialogVisible(account){
               this.punishDialogVisible = true
               this.form.account= account
            },
            getpunishMultidata(){
                getpunishMultidata(this.form.account, this.form.punish).then(res=>{
                    this.punishDialogVisible = false
                    if(res.data.status== 200){
                        this.$message({
                            message: '公布成功！',
                            type: 'success'
                        });
                        getIntegarListMultidata(this.page,this.pagesize).then(res=>{
                            this.tableData=res.data.result.data
                            this.total = res.data.total[0].total
                        })
                    }
                })
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