let employees = [
    { id: 1, firstName: 'John', lastName: 'Doe', experience: 5, age: 30, address: '123 Main St' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', experience: 3, age: 25, address: '456 Oak St' },
];

let numberOfEmployees = employees.length;

/* Функция addEmployee(newEmployee) принимает нового сотрудника newEmployee в качестве аргумента, генерирует новый id
 и добавляет нового сотрудника в массив employees*/
export function addEmployee(newEmployee) {
    const newEmployeeId = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
    newEmployee.id = newEmployeeId;
    employees.push({ ...newEmployee });
    numberOfEmployees = employees.length;
}

// Функция deleteEmployee(employeeId) принимает идентификатор сотрудника и исключает из массива employees
export function deleteEmployee(employeeId) {
    employees = employees.filter((employee) => employee.id !== employeeId);
    numberOfEmployees = employees.length;
}

/* Функция saveEmployee(editedEmployee) принимает отредактированного сотрудника editedEmployee, использует метод
 findIndex() для поиска индекса сотрудника с указанным идентификатором в массиве employees и сохраняет его*/

export function saveEmployee(editedEmployee) {
    const index = employees.findIndex((employee) => employee.id === editedEmployee.id);
    if (index !== -1) {
        employees.splice(index, 1, { ...editedEmployee });
    }
}

// Функция getAllEmployees() возвращает массив employees
export function getAllEmployees() {
    console.log('getAllEmployees')
    return employees;
}

// Функция getAmount() возвращает количество сотрудников
export function getAmount() {
    console.log('getAllEmployees')
    return numberOfEmployees;
}
