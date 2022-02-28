const empleados = [
    {
        id: 1,
        nombre: 'Fernando'
    },{
        id: 2,
        nombre: 'Ricardo'
    },
    {
        id: 3,
        nombre: 'Carlos'
    }
];

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {   
        id: 2,
        salario: 1500
    }
];

const getEmpleado = id => {
    return new Promise((resolve, reject) => {
        const empleado = empleados.find( e => e.id === id)?.nombre
        empleado ? resolve(empleado) : reject (`No existe empleado con id ${id}`)
    })
}

const getSalario = id => {
     return new Promise((resolve, reject) => {
        const salario = salarios.find( s => s.id === id)?.salario
        salario ? resolve(salario) : reject (`El id ${id} no posee salario`)
    })
}

const getInfoEmpleados = async (id) => {
    try {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);
        return `El empleado ${empleado}, posee un salario de $${salario}`;
    } catch (error) {
        throw error;
    }
}

const id = 11;

getInfoEmpleados(id)
    .then(msg => {
        console.log('TODO BIEN');
        console.log(msg);
    })
    .catch(err => {
        console.log('TODO MAL');
        console.log(err);
    })