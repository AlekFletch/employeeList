<template>
  <div id="app">
    <EmployeeList />
  </div>
</template>

<script>
import EmployeeList from "./components/views/EmployeeList.vue";

export default {
  name: "App",
  components: {
    EmployeeList,
  },
};
</script>