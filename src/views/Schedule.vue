<template>
    <div id="schedule">
        <el-table
      :data="trs"
      style="width: 100%">
      <el-table-column
        label="开始时间"
        min-width="100">
        <template slot-scope="scope">
          <span style="margin-right:1rem">{{ scope.row.from_time }}</span>
          <el-tag>{{ scope.row.week }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="during"
        label="持续时间">
      </el-table-column>
      <el-table-column
        prop="account"
        label="学号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
    </el-table>
    </div>
</template>
<script>
import rpc from "@/api/rpc.js";
import utils from "@/api/utils.js";
export default {
  name: "Schedule",
  data() {
    return {
      trs: []
    };
  },
  mounted() {
    (async () => {
      try {
        const ret = await rpc.call("appointment.teacher.schedule");
        let trs = Object.values(ret.details).map(raw => {
          const [
            from,
            to,
            student_id,
            student_account,
            student_name
          ] = raw.split(":");

          return {
            from,
            from_time: utils.unix2time(from),
            to,
            during: `${Math.ceil((to - from) / 60)}分钟`,
            week: utils.unix2week(from),
            id: student_id,
            account: student_account,
            name: student_name
          };
        });
        trs = trs.sort((a, b) => {
          return a.from > b.from;
        });
        this.trs = trs;
      } catch (e) {
        console.log(e);
        this.$router.push("/login");
      }
    })();
  }
};
</script>
