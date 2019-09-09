<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <el-form
        :model="form_data"
        ref="form"
        :rules="form_rules"
        label-width="120px"
        style="margin: 10px;width: auto"
      >
        <el-form-item label="收支类型">
          <el-select v-model="form_data.type" placeholder="收支类型">
            <el-option v-for="(list, index) in type_lists" :key="index" :label="list" :value="list"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="descripe" label="收支描述">
          <el-input type="descripe" v-model="form_data.descripe"></el-input>
        </el-form-item>
        <el-form-item prop="expend" label="收入">
          <el-input type="expend" v-model="form_data.expend"></el-input>
        </el-form-item>
        <el-form-item prop="income" label="支出">
          <el-input type="income" v-model="form_data.income"></el-input>
        </el-form-item>
        <el-form-item prop="cash" label="账户现金">
          <el-input type="cash" v-model="form_data.cash"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注">
          <el-input type="remark" v-model="form_data.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as api from "../api/api.js";
import moment from 'moment'
export default {
  props: {
    dialog: Object,
    form_data: Object
  },
  data() {
    return {
      type_lists: ["提现", "提现手续费", "充值", "优惠券", "充值礼券", "转账"],
      form_rules: {
        descripe: [
          { required: true, message: "描述不能为空", trigger: "blur" }
        ],
        expend: [{ required: true, message: "收入不能为空", trigger: "blur" }],
        income: [{ required: true, message: "支出不能为空", trigger: "blur" }],
        remark: [{ required: true, message: "备注不能为空", trigger: "blur" }],
        cash: [{ required: true, message: "账户现金不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.dialog.option == "add") {
            let now = moment();
            this.form_data.date = now.format('YYYY-MM-DD HH:mm:ss');
            api
              .addlist(this.form_data)
              .then(res => {
                // 成功的回调函数
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
              })
              .catch(err => {});
          } else if (this.dialog.option == "edit") {
            api
              .updatelist(this.form_data.id, this.form_data)
              .then(res => {
                // 成功的回调函数
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
              })
              .catch(err => {});
          }
        }
      });
    }
  }
};
</script>
