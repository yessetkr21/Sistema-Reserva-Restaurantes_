const mongoose = require('mongoose'); // Importa mongoose para interactuar con MongoDB desde nodejs

const EmployeeSchema = new mongoose.Schema({ //crear tabla en mongodb cada empleado tiene ..
    name: String,
    email: String,
    password: String,
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);

module.exports = EmployeeModel;
