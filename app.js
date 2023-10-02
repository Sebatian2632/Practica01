const express = require("express");
const app = express();
const puerto = process.env.PORT || 3000;
//Midlware
app.use(express.json());

//Arreglo de Proyectos
let Proyectos = [
    {id: 1, nombre: "Diseño de una página de inicio", descripcion: "Diseño de la página de inicio de un sitio web de noticias",fecha_inicio: "09/04/2015",fecha_fin: "15/08/2015"},
    {id: 2, nombre: "Desarrollo de un sitio web",descripcion: "Desarrollo de un sitio web corporativo para una empresa",fecha_inicio: "15/09/2005",fecha_fin: "25/11/2006"},
    {id: 3, nombre: "Diseño de un logotipo",descripcion: "Diseño de un logotipo para una marca de ropa",fecha_inicio: "03/04/2010",fecha_fin: "12/06/2010"},
    {id: 4, nombre: "Desarrollo de un videojuego",descripcion: "Desarrollo de un videojuego de aventuras",fecha_inicio: "20/07/2014",fecha_fin: "02/09/2016"},
    {id: 5, nombre: "Investigación científica",descripcion: "Realización de una investigación científica en el campo de la biología",fecha_inicio: "08/03/2017",fecha_fin: "14/12/2018"},
    {id: 6, nombre: "Proyecto de construcción",descripción: "Construcción de un edificio de oficinas",fecha_inicio: "10/01/2020",fecha_fin: "22/04/2021"},
    {id: 7, nombre: "Desarrollo de una aplicación web",descripcion: "Desarrollo de una aplicación web de comercio electrónico",fecha_inicio: "05/06/2018",fecha_fin: "17/09/2019"},
    {id: 8, nombre: "Proyecto de investigación histórica",descripcion: "Investigación histórica sobre la antigua Roma",fecha_inicio: "12/02/2012",fecha_fin: "29/11/2013"},
    {id: 9, nombre: "Desarrollo de una aplicación móvil de fitness",descripcion: "Desarrollo de una aplicación móvil de seguimiento de ejercicios",fecha_inicio: "17/09/2019",fecha_fin: "03/12/2020"},
    {id: 10,nombre: "Proyecto de investigación en inteligencia artificial",descripcion: "Investigación en el campo de la inteligencia artificial y el aprendizaje automático",fecha_inicio: "28/11/2021",fecha_fin: "10/03/2023"}        
]

//Arreglo de Tareas
let Tareas = [
    {id: 1,id_proyecto: 1,nombre: "Creación del formulario en Android",descripcion: "Crear un formulario utilizando el software AndroiudStudio",fecha_asignacion: "18/09/2002",estado: "Completada"},
    {id: 2,id_proyecto: 2,nombre: "Desarrollo de la página de inicio",descripcion: "Diseñar y desarrollar la página de inicio del sitio web",fecha_asignacion: "20/09/2005",estado: "En progreso"},
    {id: 3,id_proyecto: 2,nombre: "Diseño de la página de contacto",descripcion: "Realizar el diseño de la página de contacto del sitio web",fecha_asignacion: "25/09/2005",estado: "Pendiente"},
    {id: 4,id_proyecto: 2,nombre: "Implementación de funcionalidad de registro",descripcion: "Agregar la funcionalidad de registro de usuarios al sitio web",fecha_asignacion: "02/10/2005",estado: "Completada"},
    {id: 5,id_proyecto: 2,nombre: "Optimización de imágenes",descripcion: "Optimizar las imágenes del sitio web para mejorar la velocidad de carga",fecha_asignacion: "12/10/2005",estado: "En progreso"},
    {id: 6,id_proyecto: 3,nombre: "Diseño de logotipo principal",descripcion: "Crear el diseño principal del logotipo de la marca de ropa",fecha_asignacion: "05/04/2010",estado: "Completada"},
    {id: 7,id_proyecto: 3,nombre: "Diseño de etiquetas de ropa",descripcion: "Diseñar las etiquetas de ropa con el logotipo",fecha_asignacion: "10/04/2010",estado: "Pendiente"},
    {id: 8,id_proyecto: 3,nombre: "Selección de colores de la marca",descripcion: "Elegir la paleta de colores de la marca de ropa",fecha_asignacion: "15/04/2010",estado: "En progreso"},
    {id: 9,id_proyecto: 3,nombre: "Diseño de etiquetas de ropa interior",descripcion: "Diseñar las etiquetas de ropa interior con el logotipo",fecha_asignacion: "25/04/2010",estado: "Completada"},
    {id: 10,id_proyecto: 3,nombre: "Selección de telas",descripcion: "Elegir las telas para la nueva colección de ropa",fecha_asignacion: "30/04/2010",estado: "En progreso"}           
]

//Crud para los proyectos:
app.get('/socios/v1/proyectos', (req,res)=>{
    if(Proyectos.length > 0)
    {
        res.status(200).json({
            estado:1,
            mensaje:"A continuación se muestran los proyectos existentes:",
            proyectos: Proyectos
        })
    }
    else
    {
        res.status(404).json({
            estado:0,
            mensaje:"Por el momento no se cuentan con proyectos",
            proyectos: Proyectos
        })
    }
})

app.get('/socios/v1/proyectos/:id', (req,res)=>{
    const id = req.params.id;
    const proyecto = Proyectos.find(proyecto=>proyecto.id==id)
    if(proyecto)
    {
        res.status(200).json({
            estado:1,
            mensaje:"A continuación se muestra la información del proyecto solicitado",
            proyecto:proyecto
        })
    }
    else
    {
        res.status(404).json({
            estado:0,
            mensaje:"Proyecto no encontrado"
        })
    }
})

app.post('/socios/v1/proyectos', (req,res)=>{
    const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;
    const maxId = Proyectos.reduce((max, proyecto) => (proyecto.id > max ? proyecto.id : max), 0);
    const id = maxId + 1;
    if (!nombre || !descripcion || !fecha_inicio || !fecha_fin) {
        res.status(400).json({
            estado: 0,
            mensaje: "Falta información referente al proyecto"
        });
    }
    else
    {
        const proyecto = {id:id,nombre:nombre,descripcion:descripcion,fecha_inicio:fecha_inicio,fecha_fin:fecha_fin};
        const logitInicial = Proyectos.length;
        Proyectos.push(proyecto)
        if(Proyectos.length>logitInicial)
        {
            res.status(201).json({
                estado:1,
                mensaje:"Se agrego el proyecto con exito",
                proyecto:proyecto
            })
        }
        else
        {
            res.status(500).json({
                estado:0,
                mensaje:"Ocurrio un error al momento de subir el proyecto",
            })
        }
    }
})

app.put('/socios/v1/proyectos/:id', (req,res)=>{
    const {id} = req.params;
    const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;
    if(!nombre || !descripcion || !fecha_inicio || !fecha_fin)
    {
        res.status(400).json({
            estado:0,
            mensaje:"Faltan información referente al proyecto"
        })
    }
    else
    {
        const posActualizar = Proyectos.findIndex(proyecto => proyecto.id==id)
        if(posActualizar!= -1)
        {
            Proyectos[posActualizar].nombre = nombre;
            Proyectos[posActualizar].descripcion = descripcion;
            Proyectos[posActualizar].fecha_inicio = fecha_inicio;
            Proyectos[posActualizar].fecha_fin = fecha_fin;
            res.status(200).json({
                estado: 1,
                mensaje: "Información del proyecto actualizado",
                proyecto: Proyectos[posActualizar]
            })            
        }
        else
        {
            res.status(404).json({
                estado:0,
                mensaje:"Proyecto no encontrado"
            })
        }
    }
})

app.delete('/socios/v1/proyectos/:id', (req,res)=>{
    const {id} = req.params;
    const indiceEliminar = Proyectos.findIndex(proyecto => proyecto.id == id)
    if(indiceEliminar != -1)
    {
        Proyectos.splice(indiceEliminar,1);
        res.status(201).json({
            estado:1,
            mensaje:"Proyecto eliminado con exito"
        })
    }
    else
    {
        res.status(404).json({
            estado:0,
            mensaje:"Proyecto no encontrado"
        })
    }
})

//Crud para los tareas:
app.get('/socios/v1/tareas', (req,res)=>{
    if(Tareas.length > 0)
    {
        res.status(200).json({
            estado:1,
            mensaje:"A continuación se muestran los tareas existentes:",
            Tareas: Tareas
        })
    }
    else
    {
        res.status(404).json({
            estado:0,
            mensaje:"Por el momento no se cuentan con tareas para este proyecto",
            tareas: Tareas
        })
    }
})

app.get('/socios/v1/tareas/:id', (req,res)=>{
    const id = req.params.id;
    const tarea = Tareas.find(tarea=>tarea.id==id)
    if(tarea)
    {
        res.status(200).json({
            estado:1,
            mensaje:"A continuación se muestra la información de la tarea solicitada",
            tarea:tarea
        })
    }
    else
    {
        res.status(404).json({
            estado:0,
            mensaje:"Tarea no encontrado"
        })
    }
})

app.post('/socios/v1/tareas', (req,res)=>{
    const { id_proyecto, nombre, descripcion, fecha_asignacion, estado } = req.body;
    const maxId = Tareas.reduce((max, tarea) => (tarea.id > max ? tarea.id : max), 0);
    const id = maxId + 1;
    if (!id_proyecto || !nombre || !descripcion || !fecha_asignacion || !estado) {
        res.status(400).json({
            estado: 0,
            mensaje: "Falta información referente a la tarea"
        });
    }
    else
    {
        const tarea = {id:id,id_proyecto:id_proyecto,nombre:nombre,descripcion:descripcion,fecha_asignacion:fecha_asignacion,estado:estado};
        const logitInicial = Tareas.length;
        Tareas.push(tarea)
        if(Tareas.length>logitInicial)
        {
            res.status(201).json({
                estado:1,
                mensaje:"Se agrego la tarea con exito",
                tarea:tarea
            })
        }
        else
        {
            res.status(500).json({
                estado:0,
                mensaje:"Ocurrio un error al momento de subir la tarea",
            })
        }
    }
})

app.put('/socios/v1/tareas/:id', (req,res)=>{
    const {id} = req.params;
    const { id_proyecto, nombre, descripcion, fecha_asignacion, estado } = req.body;
    if(!id_proyecto || !nombre || !descripcion || !fecha_asignacion || !estado)
    {
        res.status(400).json({
            estado:0,
            mensaje:"Faltan información referente a la tarea"
        })
    }
    else
    {
        const posActualizar = Tareas.findIndex(tarea => tarea.id==id)
        if(posActualizar!= -1)
        {
            Tareas[posActualizar].id_proyecto = id_proyecto;
            Tareas[posActualizar].nombre = nombre;
            Tareas[posActualizar].descripcion = descripcion;
            Tareas[posActualizar].fecha_asignacion = fecha_asignacion;
            Tareas[posActualizar].estado = estado;
            res.status(200).json({
                estado: 1,
                mensaje: "Información de la tarea actualizado",
                tarea: Tareas[posActualizar]
            })            
        }
        else
        {
            res.status(404).json({
                estado:0,
                mensaje:"Tarea no encontrado"
            })
        }
    }
})

app.delete('/socios/v1/tareas/:id', (req,res)=>{
    const {id} = req.params;
    const indiceEliminar = Tareas.findIndex(tarea => tarea.id == id)
    if(indiceEliminar != -1)
    {
        Tareas.splice(indiceEliminar,1);
        res.status(201).json({
            estado:1,
            mensaje:"Tarea eliminado con exito"
        })
    }
    else
    {
        res.status(404).json({
            estado:0,
            mensaje:"Tarea no encontrado"
        })
    }
})

//Mostrar todas las tareas de un proyecto:
app.get('/socios/v1/proyectos/:id/tareas', (req, res) => {
    const proyectoId = req.params.id;
    const tareasProyecto = Tareas.filter(tarea => tarea.id_proyecto == proyectoId);
    if (tareasProyecto.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: "Todas las tareas del proyecto:",
            tareas: tareasProyecto
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontraron tareas para este proyecto.",
            tareas: []
        });
    }
});

//Mostrar tareas de un proyecto por estado (usando Query String para el estado):
app.get('/socios/v1/proyectos/:id/tareas/estado', (req, res) => {
    const proyectoId = req.params.id;
    const estado = req.query.estado; // Obtener el estado de la consulta de la URL

    // Filtrar las tareas del proyecto por estado (si se especifica)
    let tareasProyecto = Tareas.filter(tarea => tarea.id_proyecto == proyectoId);

    if (estado) {
        tareasProyecto = tareasProyecto.filter(tarea => tarea.estado === estado);
    } else {
        // Si no se especifica un estado, ordenar primero por estado (Pendiente, En progreso, Completada)
        tareasProyecto.sort((a, b) => {
            const estados = ['Pendiente', 'En progreso', 'Completada'];
            return estados.indexOf(a.estado) - estados.indexOf(b.estado);
        });
    }

    // Verificar si se encontraron tareas después de aplicar los filtros o el ordenamiento
    if (tareasProyecto.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: `Tareas del proyecto ${proyectoId} ${estado ? 'filtradas por estado' : 'ordenadas por estado (Pendiente, En progreso, Completada)'}:`,
            tareas: tareasProyecto
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: `No se encontraron tareas para el proyecto ${proyectoId} con el estado '${estado || 'especificado'}'.`,
            tareas: []
        });
    }
});



//Mostrar tareas de un proyecto por fecha de inicio (usando Query String para la fecha de inicio):
app.get('/socios/v1/proyectos/:id/tareas/fecha-inicio', (req, res) => {
    const proyectoId = req.params.id;
    const fechaInicioParam = req.query.fechaInicio;

    let tareasProyecto = Tareas.filter(tarea => tarea.id_proyecto == proyectoId);

    // Si se especifica una fecha de inicio, convertirla al formato de fecha deseado (por ejemplo, yyyy-mm-dd)
    let fechaInicio = null;
    if (fechaInicioParam) {
        const fechaParts = fechaInicioParam.split('/');
        if (fechaParts.length === 3) {
            // Formato: dd/mm/yyyy
            fechaInicio = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`;
        }
    }

    // Filtrar las tareas por fecha de inicio si se especifica
    if (fechaInicio) {
        tareasProyecto = tareasProyecto.filter(tarea => tarea.fecha_asignacion === fechaInicio);
    }

    // Ordenar las tareas por fecha de inicio de la más antigua a la más reciente
    tareasProyecto.sort((a, b) => {
        const fechaA = new Date(a.fecha_asignacion);
        const fechaB = new Date(b.fecha_asignacion);
        return fechaA - fechaB;
    });

    if (tareasProyecto.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: fechaInicio ? `Tareas del proyecto con fecha de inicio '${fechaInicioParam}' ordenadas por fecha de inicio:` : `Todas las tareas del proyecto ordenadas por fecha de asignación:`,
            tareas: tareasProyecto
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: fechaInicio ? `No se encontraron tareas con fecha de inicio '${fechaInicioParam}' para este proyecto.` : `No se encontraron tareas para este proyecto.`,
            tareas: []
        });
    }
});




//Mostrar todas las tareas de un proyecto paginadas (usando Query String para especificar número de página y registros por página):
app.get('/socios/v1/proyectos/:id/tareas/paginadas', (req, res) => {
    const proyectoId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    let tareasProyecto = Tareas.filter(tarea => tarea.id_proyecto == proyectoId);

    // Ordenar las tareas por fecha de asignación de la más antigua a la más reciente
    tareasProyecto.sort((a, b) => {
        const fechaA = new Date(a.fecha_asignacion);
        const fechaB = new Date(b.fecha_asignacion);
        return fechaA - fechaB;
    });

    // Obtener las tareas en la página especificada
    const tareasPaginadas = tareasProyecto.slice(startIndex, endIndex);

    if (tareasPaginadas.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: `Tareas del proyecto (página ${page}, ${perPage} registros por página) ordenadas por fecha de asignación:`,
            tareas: tareasPaginadas
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontraron tareas para este proyecto en la página especificada.",
            tareas: []
        });
    }
});


//Mostrar una tarea específica de un proyecto:
app.get('/socios/v1/proyectos/:id_proyecto/tareas/:id_tarea', (req, res) => {
    const proyectoId = req.params.id_proyecto;
    const tareaId = req.params.id_tarea;
    const tarea = Tareas.find(t => t.id_proyecto == proyectoId && t.id == tareaId);
    if (tarea) {
        res.status(200).json({
            estado: 1,
            mensaje: "Información de la tarea solicitada:",
            tarea: tarea
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Tarea no encontrada en este proyecto."
        });
    }
});





app.listen(puerto,()=>{
    console.log('Servidor corriendo en el puerto: ', puerto);
})