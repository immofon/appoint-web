<template>
    <div id="rt">
        管理学生
        <el-button @click="load" icon="el-icon-refresh">刷新</el-button>
        <br/>
        <el-checkbox-group v-model="filtered_value">
        <el-checkbox-button v-for="f in filters" :label="f.value" :key="f.value">{{f.text}}</el-checkbox-button>

    </el-checkbox-group>
        <el-table
        ref="manage_student"
      :data="students_view"
      style="width: 100%">   
      <el-table-column
        prop="account"
        label="学号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="status_name"
        label="状态">
      </el-table-column>
      <el-table-column
        label="时间"
        min-width="100">
        <template slot-scope="scope">
          <span style="margin-right:1rem">{{ scope.row.tr_from }}</span>
          <el-tag>{{ scope.row.tr_week }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作">
        <template v-if="scope.row.status=='wait_op'" slot-scope="scope">
          <el-button  @click="achieve(scope.row.id, scope.row.tr_id)" type="success" plain>
            完成谈话
          </el-button>
          <el-button  @click="breach(scope.row.id, scope.row.tr_id)" type="danger" plain>
            有事未到
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>
<script>
import utils from "@/api/utils.js";
import rpc from "@/api/rpc.js";
const DEBUG_wait_op = false;
export default {
  name: "ManageStudent",
  data() {
    return {
      students: [],
      filtered_value: ["wait_op", "wait_talk"],
      filters: [
        { text: "待处理", value: "wait_op" },
        { text: "待谈话", value: "wait_talk" },
        { text: "完成谈话", value: "done" },
        { text: "未预约", value: "unappointed" }
      ]
    };
  },
  mounted() {
    this.load();
  },
  computed: {
    students_view() {
      let students = this.students.map(s => {
        const status = this.get_status(s);
        return {
          id: s.id,
          account: s.account,
          name: s.name,
          status: status,
          status_name: this.status2name(status),
          tr_id: s.tr_id,
          tr_from: utils.unix2time(s.tr_from),
          tr_week: utils.unix2week(s.tr_from)
        };
      });
      return students.filter(s => {
        if (this.filtered_value.includes(s.status)) {
          return true;
        }
        return false;
      });
    }
  },
  methods: {
    load() {
      (async () => {
        try {
          const ret = await rpc.call("appointment.teacher.students");
          let students = Object.values(ret.details).map(raw => {
            const [id, account, name, status, tr_id, tr_from] = raw.split(":");
            return {
              id,
              account,
              name,
              status,
              tr_id,
              tr_from
            };
          });
          // sort
          students = students.sort((a, b) => {
            return Number(a.account) > Number(b.account);
          });
          this.students = students;
          console.log(JSON.stringify(students));
        } catch (e) {
          console.log(e);
          this.$router.push("/login");
        }
      })();
    },
    updateFilter(...filters) {
      console.log(filters);
      this.$nextTick(() => {
        this.filtered_value = filters;
      });
    },
    achieve(student_id, tr_id) {
      (async () => {
        try {
          const ret = await rpc.call(
            "appointment.teacher.manage.student@achieve",
            {
              tr_id
            }
          );
          this.$nextTick(() => {
            this.students = this.students.map(s => {
              if (s.id == student_id) {
                s.status = "done";
              }
              return s;
            });
          });
        } catch (e) {
          console.log(e);
          this.$message.error("操作失败");
        }
      })();
    },
    breach(student_id, tr_id) {
      (async () => {
        try {
          const ret = await rpc.call(
            "appointment.teacher.manage.student@breach",
            {
              tr_id
            }
          );
          this.$nextTick(() => {
            this.students = this.students.map(s => {
              if (s.id == student_id) {
                s.status = "unappointed";
              }
              return s;
            });
          });
        } catch (e) {
          console.log(e);
          this.$message.error("操作失败");
        }
      })();
    },
    get_status(student) {
      if (student.status == "done") {
        return "done";
      }
      if (student.status == "unappointed") {
        return "unappointed";
      }
      if (student.status == "appointed") {
        const now = Math.round(new Date().getTime() / 1000);
        if (DEBUG_wait_op) {
          return "wait_op";
        }
        if (now < Number(student.tr_from)) {
          return "wait_talk";
        } else {
          return "wait_op";
        }
      } else {
        return "error";
      }
    },
    status2name(s) {
      switch (s) {
        case "wait_op":
          return "待处理";
        case "done":
          return "完成谈话";
        case "unappointed":
          return "未预约";
        case "wait_talk":
          return "等待谈话";
        default:
          return "出错";
      }
    }
  }
};
</script>
