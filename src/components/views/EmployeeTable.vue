<!-- В разделе template определена разметка компонента -->
<template>
  <div>
    <div class="app-info">
      <h1>Учет и управление сотрудниками</h1>
      <h2>Общее число сотрудников: {{ numberOfEmployees }}</h2>
    </div>
    <button class="add-button" @click="openAddForm">Add Employee</button>

    <!-- <table> с классом "employee-table", в которой отображается таблица с данными о сотрудниках. -->
    <!-- <thead> содержит заголовки столбцов таблицы.
         <tbody> содержит строки таблицы, где каждая строка представляет одного сотрудника.
         Используется команда v-for для отображения каждого сотрудника из массива employees.
         Ключ каждой строки задается с помощью :key="employee.id".-->

    <table class="employee-table">
      <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Experience</th>
        <th>Age</th>
        <th>Address</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="employee in employees" :key="employee.id">
        <td>{{ employee.firstName }}</td>
        <td>{{ employee.lastName }}</td>
        <td>{{ employee.experience }}</td>
        <td>{{ employee.age }}</td>
        <td>{{ employee.address }}</td>
        <td class="action-buttons">
          <button class="edit-button" @click="openEditModal(employee)">Edit</button>
          <button class="delete-button" @click="deleteEmployee(employee.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <!-- <div> с классом "modal", который отображается только при условии showEditModal или showAddForm.
         Внутри него находится форма для редактирования или добавления сотрудника.
         <button> с классом "close-button", при нажатии на который вызывается метод closeForm, закрывающий модальное окно.
         <div> с классом "modal-content", содержащий заголовок формы в зависимости от значения showEditModal.
         <form> событие @submit.prevent вызывает метод saveEmployee() или addEmployee() в зависимости от значения showEditModal.
          Внутри формы находятся <label> и <input> для каждого поля сотрудника. Значения полей связаны с данными компонента с помощью директивы v-model. -->
    <div v-if="showEditModal || showAddForm" class="modal">
      <button class="close-button" @click="closeForm">×</button>
      <div class="modal-content">
        <h3 v-if="showEditModal">Редактирование сотрудника</h3>
        <h3 v-else>Добавление сотрудника</h3>
        <form @submit.prevent="showEditModal ? saveEmployee() : addEmployee()">
          <label for="edit-first-name">First Name:</label>
          <input id="edit-first-name" v-model="currentFirstName" required>

          <label for="edit-last-name">Last Name:</label>
          <input id="edit-last-name" v-model="currentLastName" required>

          <label for="edit-experience">Experience:</label>
          <input id="edit-experience" v-model="currentExperience" type="number" required>

          <label for="edit-age">Age:</label>
          <input id="edit-age" v-model="currentAge" type="number" required>

          <label for="edit-address">Address:</label>
          <input id="edit-address" v-model="currentAddress" required>

          <button type="submit">{{ showEditModal ? 'Save' : 'Add' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import {addEmployee, deleteEmployee, saveEmployee, getAllEmployees, getAmount} from '../controllers/EmployeeController';
import Employee from '../models/Employee';

export default {
       /* В блоке data() определены данные компонента:
       - employees - массив сотрудников, изначально пустой.
       - showEditModal - флаг, определяющий, отображается ли модальное окно для редактирования сотрудника.
       - editedEmployee - объект, содержащий данные редактируемого сотрудника.
       - showAddForm - флаг, определяющий, отображается ли форма для добавления нового сотрудника. */
  data() {
    return {
      employees: [],
      showEditModal: false,
      editedEmployee: null,
      showAddForm: false,
      numberOfEmployees: 0,
    };
  },
  /* created() вызывается метод fetchEmployees(), который получает список сотрудников при создании компонента.
   Также вызывается метод getAmountOfEmployees(), который получает количество сотрудников */
  created() {
    this.fetchEmployees();
    this.getAmountOfEmployees();
  },
  methods: {
    //fetchEmployees() - получает список сотрудников с помощью функции getAllEmployees() и сохраняет его в свойство employees.
    fetchEmployees() {
      this.employees = getAllEmployees();
    },
    //openEditModal(employee) - открывает модальное окно для редактирования сотрудника и сохраняет данные редактируемого сотрудника в свойстве editedEmployee.
    openEditModal(employee) {
      this.showEditModal = true;
      this.editedEmployee = { ...employee };
    },
    //deleteEmployee(employeeId) - вызывает функцию deleteEmployee(employeeId) для удаления сотрудника по его идентификатору и обновляет список сотрудников.
    deleteEmployee(employeeId) {
      deleteEmployee(employeeId);
      this.fetchEmployees();
      this.getAmountOfEmployees();
    },
    //saveEmployee() - вызывает функцию saveEmployee(this.editedEmployee) для сохранения изменений редактируемого сотрудника, закрывает модальное окно и обновляет список сотрудников.
    saveEmployee() {
      saveEmployee(this.editedEmployee);
      this.showEditModal = false;
      this.fetchEmployees();
    },
    openAddForm() {
      this.showAddForm = true;
      this.newEmployee = new Employee({ firstName: '', lastName: '', experience: 0, age: 0, address: '' });
    },
    //openAddForm() - открывает форму для добавления нового сотрудника и создает новый объект newEmployee.
    addEmployee() {
      addEmployee(this.newEmployee);
      this.showAddForm = false;
      this.fetchEmployees();
      this.getAmountOfEmployees();
    },
    //получает количество сотрудников
    getAmountOfEmployees() {
      this.numberOfEmployees = getAmount();
    },

    //закрывает форму и сбрасывает значения полей
    closeForm() {
      this.showEditModal = false;
      this.showAddForm = false;
      this.currentFirstName = '';
      this.currentLastName = '';
      this.currentExperience = null;
      this.currentAge = null;
      this.currentAddress = '';
    },
  },
  /*В блоке computed определены вычисляемые свойства компонента:
   currentFirstName, currentLastName, currentExperience, currentAge,
   currentAddress - свойства, которые получают и устанавливают значения полей сотрудника
    в зависимости от значения showEditModal.
    При изменении значения свойств также обновляются данные редактируемого сотрудника или нового сотрудника.*/
  computed: {
    currentFirstName: {
      get() {
        return this.showEditModal ? this.editedEmployee.firstName : this.newEmployee.firstName;
      },
      set(value) {
        if (this.showEditModal) {
          this.editedEmployee = { ...this.editedEmployee, firstName: value };
        } else {
          this.newEmployee = { ...this.newEmployee, firstName: value };
        }
      },
    },
    currentLastName: {
      get() {
        return this.showEditModal ? this.editedEmployee.lastName : this.newEmployee.lastName;
      },
      set(value) {
        if (this.showEditModal) {
          this.editedEmployee = { ...this.editedEmployee, lastName: value };
        } else {
          this.newEmployee = { ...this.newEmployee, lastName: value };
        }
      },
    },
    currentExperience: {
      get() {
        return this.showEditModal ? this.editedEmployee.experience : this.newEmployee.experience;
      },
      set(value) {
        if (this.showEditModal) {
          this.editedEmployee = { ...this.editedEmployee, experience: value };
        } else {
          this.newEmployee = { ...this.newEmployee, experience: value };
        }
      },
    },
    currentAge: {
      get() {
        return this.showEditModal ? this.editedEmployee.age : this.newEmployee.age;
      },
      set(value) {
        if (this.showEditModal) {
          this.editedEmployee = { ...this.editedEmployee, age: value };
        } else {
          this.newEmployee = { ...this.newEmployee, age: value };
        }
      },
    },
    currentAddress: {
      get() {
        return this.showEditModal ? this.editedEmployee.address : this.newEmployee.address;
      },
      set(value) {
        if (this.showEditModal) {
          this.editedEmployee = { ...this.editedEmployee, address: value };
        } else {
          this.newEmployee = { ...this.newEmployee, address: value };
        }
      },
    },
  },
};
</script>

<style>

.modal-content {
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px; /* Регулируйте отступ по необходимости */
  right: 10px; /* Регулируйте отступ по необходимости */
  border: none;
  background: transparent;
  font-size: 24px; /* Регулируйте размер по необходимости */
  cursor: pointer;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.employee-table th,
.employee-table td {
  border: 1px solid #ccc;
  padding: 8px;
}

.employee-table th {
  background-color: #f2f2f2;
}

.employee-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.employee-table tr:hover {
  background-color: #e6e6e6;
}

.action-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-button {
  margin-right: 15px;
}

.delete-button {
  margin-left: 15px;
}

.add-button {
  margin-top: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  border: 4px solid #31ad62;

}

.modal-content label {
  margin-right: 2px;
}
.modal-content input {
  margin-right: 5px;
}
.app-info {
  padding: 25px;
  background-color: #31ad62;
  border-radius: 4px;
  box-shadow: 15px 15px 30px rgba(0, 0, 0, 0.15);
  color: #fff;
}


</style>
