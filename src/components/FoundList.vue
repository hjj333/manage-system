<template>
  <div class="container">
    <div>
      <el-form :inline="true" ref="add" :model="search">
        <el-form-item label="按照时间筛选">
          <el-date-picker v-model="search.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
          <el-date-picker v-model="search.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
         <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="handleSearch">筛选</el-button>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" size="small" icon="view" @click="handleAdd" v-if="user.identity == 'manager'">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table :data="tableData" max-height="450" border style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="date" label="创建日期" align="center" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
        <el-table-column prop="descripe" label="收支描述" align="center" width="180"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="170">
          <template slot-scope="scope">
            <span style="color: #00d053">{{scope.row.income}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="170">
          <template slot-scope="scope">
            <span style="color: #f56767">{{scope.row.expend}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" align="center" width="170">
          <template slot-scope="scope">
            <span style="color: #f56767">{{scope.row.expend}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.page_index"
      :page-sizes="pagination.page_sizes"
      :page-size="pagination.page_size"
      :layout="pagination.layout"
      :total="pagination.total"
    ></el-pagination>
    <Dialog :dialog="dialog" :form_data="form_data"></Dialog>
  </div>
</template>
<script>
import * as api from "../api/api";
import Dialog from "../components/Dialog";
export default {
  data() {
    return {
      search: {
        startTime: '',
        endTime: ''
      },
      tableData: [], // 显示的列表数据
      allTableData: [], // 所有的列表数据
      filterTableData: [],
      dialog: {
        show: false,
        title: "",
        option: ""
      },
      form_data: {
        date: "2005-11-17 03:24:00",
        type: "",
        descripe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: 0
      },
      pagination: {
        page_index: 1, // 当前位于哪一页
        total: 0, // 总数
        page_size: 5, // 每页显示多少条
        page_sizes: [5, 10, 15, 20], // 每页可以显示的总条数
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      }
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    // 显示资金列表
    getProfile() {
      api
        .getlist()
        .then(res => {
          this.allTableData = res.data;
          this.filterTableData = res.data;
          // 设置分页数据
          this.setPagination();
        })
        .catch(err => {});
    },
    // 编辑
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      },
      this.form_data = {
        date: row.date,
        type: row.type,
        descripe: row.descripe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row.id
      };
    },
    // 删除
    handleDelete(index, row) {
      api
        .deletelist(row.id)
        .then(res => {
          this.$message("删除成功");
          this.getProfile();
        })
        .catch(err => {});
    },
    // 添加
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      },
      this.form_data = {
        date: "",
        type: "",
        descripe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
        };
    },
    setPagination() {
      // 分页属性设置
      this.pagination.total = this.allTableData.length;
      // 显示默认的分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.pagination.page_size;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.page_size = val;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.pagination.page_size;
      });
    },
    handleCurrentChange(val) {
      // 当前页
      let sortnum = this.pagination.page_size * (val- 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置显示的分页数据
      this.tableData = table.filter((item, index) => {
        return index < this.pagination.page_size;
      });
    },
    handleSearch() {
      if (!this.search.startTime || !this.search.endTime) {
        this.$message({
          type: 'warning',
          message: '请选择时间'
        });
        this.getProfile();
        return
      }
      const sTime = this.search.startTime.getTime()
      const eTime = this.search.endTime.getTime()
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date)
        let time = date.getTime()
        return time >= sTime && time <= eTime
      })
      this.setPagination()
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  components: {
    Dialog
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btn {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
