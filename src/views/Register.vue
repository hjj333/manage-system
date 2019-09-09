<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">后台管理系统</span>
        <el-form
          :model="user"
          :rules="rules"
          label-width="80px"
          class="register_form"
          ref="ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="user.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input v-model="user.password2" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item label="选择身份">
            <el-select v-model="user.identity" placeholder="请选择身份">
              <el-option label="管理员" value="guanliyuan"></el-option>
              <el-option label="员工" value="yuangong"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
import * as api from "../api/api";
import * as cf from "../api/commonfunction";
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: "",
        avatar: ""
      },
      rules: {
        name: [
          {
            required: true, // 是否必填
            message: "用户名不能为空", // 显示校验错误信息
            trigger: "blur" // 触发：失去焦点
          },
          {
            min: 2,
            max: 10,
            message: "用户名长度2到10个字符",
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 3,
            max: 10,
            message: "长度为3到10个字符",
            triggle: "blur"
          }
        ],
        password2: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 3,
            max: 10,
            message: "长度为3到10个字符",
            triggle: "blur"
          },
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
        if (valid) {
          (async () => {
            let result = await cf.isexistsemail(this.user.email);
            if (result.isexists) {
              this.$message.error("错了哦，email已经占用");
              return;
            } else {
              //可以注册
              let { identity, password, name, email, avatar } = this.user;
              this.newuser = {
                identity,
                password,
                name,
                email,
                avatar
              };
            }
            api
              .adduser(this.newuser)
              .then(res => {
                // element-ui 为 Vue.prototype 添加了全局方法 $message
                this.$message({
                  message: "帐号注册成功！",
                  type: "success"
                });
              })
              .catch(err => {});
            this.$router.push("/login");
          })();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style>
.register {
  position: relative;
  width: 100%;
  height: 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.title {
  font-family: "Microsoft Yahei";
  font-weight: bold;
  font-size: 26px;
  color: red;
}
.register_form {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
  width: 100%;
}
</style>
