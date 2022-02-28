const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pause,
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckbox    
    } = require('./helpers/inquierer');

const Tareas = require('./models/tareas');

require('colors');

console.clear();
const main = async() => {

    let opt = '';
    const tareas = new Tareas()
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }
    do{
        opt = await inquirerMenu();

        switch(opt){
            case '1':
                const desc = await leerInput('Ingrese descripcion de la tarea: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listadoCompleted();
            break;
            case '4':
                tareas.listadoPendientes();                
            break;
            case '5':
                const ids = await mostrarListadoCheckbox(tareas.listadoArr);            
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmar(`Desea borrar la tarea ${id}?`);
                    if(ok){
                        tareas.deleteTarea(id);
                        console.log('Tarea borrada'.red);
                    }
                }
            break;
        }

        guardarDB(tareas.listadoArr);

        await pause();
    }while(opt !== '0');
}

main();