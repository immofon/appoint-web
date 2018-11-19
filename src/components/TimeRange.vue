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
      time_ranges: []
    };
  },
  computed: {
    time_ranges_table() {
      return this.time_ranges.map(tr => {
        return {
          id: `${tr.from}_${tr.to}`,
          from: utils.unix2time(tr.from),
          during: `${Math.ceil((tr.to - tr.from) / 60)}分钟`,
          teacher: tr.teacher
        };
      });
    }
  },
  mounted() {
    (async () => {
      try {
        const r1 = await rpc.call("appointment.student.status");
        switch (r1.details.status) {
          case "appointed":
            this.$router.push("/student/appointed");
            break;
          case "done":
            this.$router.push("/student/done");
            break;
        }

        const ret = await rpc.call("appointment.student.time_ranges");
        let trs = Object.values(ret.details).map(tr_raw => {
          console.log(tr_raw);
          const [from, to, teacher] = tr_raw.split(":");
          return {
            from,
            to,
            teacher
          };
        });

        trs = trs.sort((a, b) => {
          return a.from > b.from;
        });
        const now = Math.round(new Date().getTime() / 1000);
        trs = trs.filter(tr => {
          return tr.from > now;
        });
        this.time_ranges = trs;
        console.log(trs);
      } catch (e) {
        if (e.status == "unauthorized") {
          this.$router.push("/login");
        }
        console.log(e);
      }
    })();
  },
  methods: {
    appoint(tr) {
      (async () => {
        try {
          await rpc.call("appointment.student.appoint", { tr_id: tr.id });
          this.$router.push("/student/appointed");
        } catch (e) {
          if (e.status == "unauthorized") {
            this.$router.push("/login");
          }
          console.log(e);
        }
      })();
    }
  }
};
</script>

