
const employeeForm = document.getElementById("employeeForm");
const empName = document.getElementById("empName");
const empAge = document.getElementById("empAge");
const department = document.getElementById("department");
const salary = document.getElementById("salary");
const employeeTable = document.getElementById("employeeTable");
const message = document.getElementById("message");

const employees = [];

employeeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameValue = empName.value.trim();
    const ageValue = empAge.value;
    const departmentValue = department.value.trim();
    const salaryValue = salary.value;

    if (
        nameValue === "" ||
        ageValue === "" ||
        departmentValue === "" ||
        salaryValue === ""
    ) {
        message.textContent = "Please fill in all fields.";
        return;
    }

    const ageNumber = Number(ageValue);
    const salaryNumber = Number(salaryValue);

    if (
        !Number.isFinite(ageNumber) ||
        ageNumber <= 0 ||
        !Number.isFinite(salaryNumber) ||
        salaryNumber <= 0
    ) {
        message.textContent = "Age and salary must be positive numbers.";
        return;
    }

    const employee = {
        name: nameValue,
        age: ageNumber,
        department: departmentValue,
        salary: salaryNumber
    };

    employees.push(employee);

    employeeTable.innerHTML = "";

    employees.forEach((employee, index) => {
        employeeTable.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${employee.name}</td>
                <td>${employee.age}</td>
                <td>${employee.department}</td>
                <td>₹${employee.salary}</td>
            </tr>
        `;
    });

    message.textContent = "Employee registered successfully!";
    employeeForm.reset();
});
