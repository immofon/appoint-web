<template>
    <div>
    <el-table
      :data="time_ranges_table"
      style="width: 100%">
      <el-table-column
        prop="from"
        label="开始时间"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="during"
        label="持续时间">
      </el-table-column>
      <!--
      <el-table-column
        prop="teacher"
        label="老师">
      </el-table-column>
      -->
      <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="appoint(scope.row)">
          预约
        </el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
</template>

<script>
import utils from "../api/utils.js";
import rpc from "../api/rpc.js";
export default {
  name: "TimeRange",
  data() {
    return {
      time_ranges: [
        { from: 1542096191, to: 1542096191 + 60 * 300, teacher: "庄老师" },
        { from: 1542096191, to: 1542096191 + 60 * 300, teacher: "庄老师" },
        { from: 1542096191, to: 1542096191 + 60 * 300, teacher: "庄老师" },
        { from: 1542096191, to: 1542096191 + 60 * 300, teacher: "庄老师" },
        { from: 1542096191, to: 1542096191 + 60 * 300, teacher: "庄老师" },
        { from: 1542096191, to: 1542096191 + 60 * 300, teacher: "庄老师" },
        { from: 1542096191, to: 1542096191 + 60 * 300, teacher: "庄老师" },
        { from: 1542096191, to: 1542096191 + 60 * 300, teacher: "庄老师" },
        { from: 1542096191, to: 1542096191 + 60 * 300, teacher: "庄老师" },
        { from: 1542096191, to: 1542096191 + 60 * 300, teacher: "庄老师" },
        { from: 1542096191, to: 1542096191 + 60 * 300, teacher: "庄老师" },
        { from: 1542096191, to: 1542096191 + 60 * 300, teacher: "庄老师" }
      ]
    };
  },
  computed: {
    time_ranges_table() {
      return this.time_ranges.map(tr => {
        return {
          id: `${tr.from}_${tr.to}`,
          from: utils.unix2time(tr.from),
          during: `${(tr.to - tr.from) / 60}分钟`,
          teacher: tr.teacher
        };
      });
    }
  },
  mounted() {
    (async () => {
      try {
        const ret = await rpc.call("appointment.student.time_ranges");
        console.log(ret);
      } catch (e) {
        console.log(e);
      }
    })();
  },
  methods: {
    appoint(tr) {
      this.$message(`appoint ${tr.id}`);
    }
  }
};
</script>

