let employees = JSON.parse(localStorage.getItem("employees")) || [];

const employeeForm = document.getElementById("employeeForm");
const empName = document.getElementById("empName");
const empAge = document.getElementById("empAge");
const empDepartment = document.getElementById("empDepartment");
const empSalary = document.getElementById("empSalary");
const employeeTable = document.getElementById("employeeTable");

// Display employees
const displayEmployees = () => {
    employeeTable.innerHTML = "";

    employees.forEach((employee) => {
        employeeTable.innerHTML += `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.age}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>
                    <button onclick="deleteEmployee('${employee.id}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
};

// Submit form
employeeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = empName.value.trim();
    const age = Number(empAge.value);
    const department = empDepartment.value.trim();
    const salary = Number(empSalary.value);

    // Validation
    if (
        name === "" ||
        department === "" ||
        empAge.value === "" ||
        empSalary.value === "" ||
        !Number.isFinite(age) ||
        !Number.isFinite(salary) ||
        age <= 0 ||
        salary <= 0
    ) {
        alert("Please enter valid employee details.");
        return;
    }

    // Create employee object
    const employee = {
        id: crypto.randomUUID(),
        name: name,
        age: age,
        department: department,
        salary: salary
    };

    // Add employee to array
    employees.push(employee);

    // Save array in localStorage
    localStorage.setItem("employees", JSON.stringify(employees));

    // Display updated employees
    displayEmployees();

    // Clear form
    employeeForm.reset();
});

// Delete employee
const deleteEmployee = (id) => {
    employees = employees.filter((employee) => employee.id !== id);

    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();
};

// Load saved employees when page opens
displayEmployees();