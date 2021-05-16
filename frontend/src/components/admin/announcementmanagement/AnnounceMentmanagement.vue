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
                    prop="text"
                    label="公告"
                    width="500">
            </el-table-column>
            <el-table-column
                    prop="c"
                    label="操作"
                    width="160">
                <template slot-scope="scope" >
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="EditDialogVisible(scope.row.id)">修改</el-button>
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
        <!--轮播图信息修改-->
        <el-dialog
                style="padding-top:0;padding-bottom: 0"
                title="修改公告"
                :visible.sync="editDialogVisible"
                width="50%">
            <el-input
                    type="textarea"
                    :rows="10"
                    placeholder="请输入内容"
                    v-model="announcement">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="gettexteditMultidata">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    import {getTextListMultidata,gettexteditMultidata} from "../../../network/adminannouncement/adminannouncement";

    export default {
        name: "AnnounceMentmanagement",
        data() {
            return {
                announcement:'',
                id:'',
                tableData: [],
                page:1,
                pagesize:10,
                total:0,
                editDialogVisible:false,
            }
        },
        created() {
            getTextListMultidata(this.page,this.pagesize).then(res=>{
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
                getTextListMultidata(this.page,this.pagesize).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total
                })
            },
            EditDialogVisible(id){
              this.id = id
              this.editDialogVisible = true
            },
            gettexteditMultidata(){
                gettexteditMultidata(this.id,this.announcement).then(res=>{
                    if(res.data.status == 200){
                        this.editDialogVisible = false
                        getTextListMultidata(this.page,this.pagesize).then(res=>{
                            this.tableData=res.data.result.data
                            this.total = res.data.total[0].total
                        })
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                    }
                })
            }
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