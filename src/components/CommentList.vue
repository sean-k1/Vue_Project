<template>
  <tr>
    <td>{{ cwriter }}</td>
    <td class="text-left">{{ ccontent }}</td>
  </tr>
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
