import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";

const App = () => {

    const [tareas, setTareas] = useState([])
    const [descripcion, setDescripcion] = useState("");

    const mostrarTareas = async () => {
        const response = await fetch("api/tarea/Lista");
        if (response.ok) {
            const data = await response.json();
            setTareas(data);
        } else {
            console.log("Status Code: " + response.status);
        }
    }

    const formatDate = (string) => {
        let options = { year: "numeric", month: "long", day: "numeric" };
        let fecha = new Date(string).toLocaleDateString("es-ES", options);
        let hora = new Date(string).toLocaleTimeString();
        return fecha + " | " + hora
    }

    useEffect(() => {
        mostrarTareas();
    }, [])

    const guardarTarea = async(e) => {
        e.preventDefault()

        const response = await fetch("api/tarea/Guardar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ descripcion: descripcion })
        })

        if (response.ok) {
            setDescripcion("");
            await mostrarTareas();
        }
    }

    const eliminarTarea = async (id) => {

        const response = await fetch("api/tarea/Eliminar/" + id, {
            method: "DELETE",
        })

        if (response.ok) {
            await mostrarTareas();
        }
    }

    return (
        <div className="container bg-dark p-4 vh-100">
            <h2 className="text-white">Foro</h2>
            <div className="row">
                <div className="col-sm-12">
                    <form onSubmit={guardarTarea}>
                        <div className="input-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Descripcion del foro"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                            <button className="btn btn-success" type="submit">Agregar</button>
                        </div>
                    </form>

                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        {
                            tareas.map(
                                (item) => (
                                    <div key={item.id} className="list-group-item list-group-item-action">
                                        <h5 className="text-primary">{item.descripcion}</h5>
                                        <div className="d-flex justify-content-between">
                                            <small className="text-muted">{formatDate(item.fecha)}</small>
                                            <button onClick={() => eliminarTarea(item.id)} className="btn btn-sm btn-outline-danger">Eliminar</button>
                                        </div>
                                    </div>
                                    )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default App;