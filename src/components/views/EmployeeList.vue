<!-- В блоке <template> определена разметка компонента: -->
<template>
  <!-- Компоненту EmployeeTable передаются следующие атрибуты:
     employees="employees" - связывает свойство employees компонента EmployeeTable с массивом employees из родительского компонента.
     @edit="selectEmployee" - прослушивает событие edit компонента EmployeeTable и вызывает метод selectEmployee из родительского компонента.
     @remove="deleteEmployee" - прослушивает событие remove компонента EmployeeTable и вызывает метод deleteEmployee из родительского компонента. -->
  <div>
      <EmployeeTable
      :employees="employees"
      @edit="selectEmployee"
      @remove="deleteEmployee"
    />
  </div>
</template>

<script>

import EmployeeTable from "@/components/views/EmployeeTable";


export default {
  components: {
    EmployeeTable,
  }

};
</script>