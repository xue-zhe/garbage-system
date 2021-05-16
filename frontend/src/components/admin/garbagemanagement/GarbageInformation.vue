<template>
    <div>
        <!--顶行栏-->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-input placeholder="请输入垃圾名称或类型或投放人账号" v-model="index" clearable  @clear="getGarbageListMultidata">
                        <el-button slot="append" icon="el-icon-search" @click="getgarbagelistMultidata"></el-button>
                    </el-input>
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
                    label="垃圾图片"
                    width="130">
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.imgs"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="垃圾类型"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="account"
                    label="投放人账号"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="garbagename"
                    label="垃圾名称"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="c"
                    label="操作"
                    width="180">
                <template slot-scope="scope" >
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="DeleteDialogVisible(scope.row.id)">删除</el-button>
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
    </div>
</template>

<script>

    import {getGarbageListMultidata,getgarbagelistMultidata,getgarbagedeleteMultidata} from "../../../network/admingarbage/admingarbage";

    export default {
        name: "GarbageIformation",
        data() {
            return {
                index:'',
                tableData: [],
                page:1,
                pagesize:10,
                total:0,
            }
        },
        created() {
            getGarbageListMultidata(this.page,this.pagesize).then(res=>{
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
                getGarbageListMultidata(this.page,this.pagesize).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total
                })
            },

            /**
             * 搜索
             * */
            //搜索
            getgarbagelistMultidata(){
                getgarbagelistMultidata(this.page,this.pagesize,this.index,).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total

                })
            },
            //取消搜索时
            getGarbageListMultidata(){
                getGarbageListMultidata(this.page,this.pagesize).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total
                })
            },
            /**
             * 进行垃圾记录删除
             * */
            DeleteDialogVisible(id){
                getgarbagedeleteMultidata(id).then(res=>{
                    this.$confirm('是否进行垃圾记录删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        if(res.data.status == 200){
                            getGarbageListMultidata(this.page,this.pagesize).then(res=>{
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
    .permissionbutton {
        margin: 30px 0;
    }
    .permission{
        margin: 20px 0;
    }
</style>