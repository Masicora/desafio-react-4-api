import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";


const link = "https://openlibrary.org/search/authors.json?q=";

const MiApi = () => {

    const [datos, setDatos] = useState([]);
    const [filtro, setFiltro] = useState("");

    const sortFunction = (data) => {
        const orderedData = data.sort(function (a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (b.name > a.name) {
                return -1;
            }
            return 0;
        });
        return orderedData;
    };

    const fetchDatos = async () => {
        const resp = await fetch(`${link}${filtro}`);
        const respDatos = await resp.json();
        setDatos(sortFunction(respDatos.docs));
    };
    useEffect(
        () => {
            fetchDatos();
        }, [filtro]
    );

    return (
        <>

            <h1>Buscador de Autores y sus Obras Destacadas</h1>
            <p>Escriba el nombre del autor que desee buscar</p>

            <input type="text" value={filtro} onChange={(e) => setFiltro(e.target.value)} />

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Autor</th>
                        <th>Obra Destacada</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.key}>
                            <td>{dato.name}</td>
                            <td>{dato.top_work}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};
export default MiApi; 