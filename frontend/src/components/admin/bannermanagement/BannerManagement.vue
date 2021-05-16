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
                    label="轮播图"
                    width="130">
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.banner"
                    ></el-image>
                </template>
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
                title="修改轮播图"
                :visible.sync="editDialogVisible"
                width="50%">
                   <el-upload
                           :action="uploadurl"
                           :on-preview="handlePreview"
                           :on-remove="handleRemove"
                           :on-success="handlesuccess"
                           list-type="picture">
                       <el-button size="mini" type="primary">轮播图上传</el-button>
                   </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="getbannereditMultidata">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    import {getBannerListMultidata,getbannereditMultidata} from "../../../network/adminbanner/adminbanner";

    export default {
        name: "BannerManagement",
        data() {
            return {
                banner:'',
                id:'',
                tableData: [],
                page:1,
                pagesize:10,
                total:0,
                editDialogVisible:false,
                uploadurl:'http://localhost:3000/imgs/upload',
                previewpath:'',
            }
        },
        created() {
            getBannerListMultidata(this.page,this.pagesize).then(res=>{
                console.log(res.data.result.data)
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
                getBannerListMultidata(this.page,this.pagesize).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total
                })
            },


            //图片预览效果
            handlePreview(file){
                this.previewpath=file.response
            },
            //处理移除操作
            handleRemove(){

            },
            //上传成功的处理函数
            handlesuccess(response){
                this.banner = response.url
            },
            EditDialogVisible(id){
                this.id = id,
                this.editDialogVisible = true
            },
            /**
             * 对轮播图进行传播
             * */
            getbannereditMultidata(){
                getbannereditMultidata(this.id,this.banner).then(res=>{
                    if(res.data.status == 200){
                        this.editDialogVisible = false
                        getBannerListMultidata(this.page,this.pagesize).then(res=>{
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