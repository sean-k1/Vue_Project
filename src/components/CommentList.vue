<template>
  <div>
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">작성자</th>
            <th class="text-left">내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ cwriter }}</td>
            <td>{{ ccontent }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
 
<script>
export default {
  name: "commentList",
  props: {
    cwriter: { type: String },
    ccontent: { type: String },
  },
  methods: {},
};
</script>
