import React from 'react'
import CustomNavbar from '../../components/navbar/navbar'
import { useUserPermission } from '../../utilities/Security/Permission';

export default function AdminReportsView() {
    //useUserPermission(0);
    return (
        <div>
            <CustomNavbar />
            <div className='tittle-history'>
                <h1 style={{ textAlign: 'center' }}>Reportes Administrativos</h1>
                <hr />
            </div>
            <div className='tittle-history'>
                <h3 style={{ textAlign: 'center' }}>Productos mas vendidos</h3>
                {/* <hr /> */}
            </div>
            <div className='box-table'>
                <table className="table table-striped table-success">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            <th>Imagen</th>
                            <th>Cantidad vendida</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {data.map((item) => (
                            <tr key={item.id_compra}>
                                <td>{item.id_compra}</td>
                                <td>{item.nombre_producto}</td>
                                <td>{item.vendedor}</td>
                                <td>{item.precio}</td>
                                <td><img src={item.imagen} alt="Imagen del producto" style={{ width: '100px', height: 'auto' }} /></td>
                            </tr>
                        ))}
                    </tbody> */}
                </table>
            </div>
            <div className='tittle-history'>
                <h3 style={{ textAlign: 'center' }}>Vendedores con mas ventas</h3>
                {/* <hr /> */}
            </div>
            <div className='box-table'>
                <table className="table table-striped table-success">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>DPI</th>
                            <th>Imagen</th>
                            <th>Estado</th>
                            <th>Ventas realizadas</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {data.map((item) => (
                            <tr key={item.id_compra}>
                                <td>{item.id_compra}</td>
                                <td>{item.nombre_producto}</td>
                                <td>{item.vendedor}</td>
                                <td>{item.precio}</td>
                                <td><img src={item.imagen} alt="Imagen del producto" style={{ width: '100px', height: 'auto' }} /></td>
                            </tr>
                        ))}
                    </tbody> */}
                </table>
            </div>
            <div className='tittle-history'>
                <h3 style={{ textAlign: 'center' }}>Categorias mas vendidas</h3>
                {/* <hr /> */}
            </div>
            <div className='box-table'>
                <table className="table table-striped table-success">
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Cantidad vendida</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {data.map((item) => (
                            <tr key={item.id_compra}>
                                <td>{item.id_compra}</td>
                                <td>{item.nombre_producto}</td>
                                <td>{item.vendedor}</td>
                                <td>{item.precio}</td>
                                <td><img src={item.imagen} alt="Imagen del producto" style={{ width: '100px', height: 'auto' }} /></td>
                            </tr>
                        ))}
                    </tbody> */}
                </table>
            </div>
        </div>
    )
}
