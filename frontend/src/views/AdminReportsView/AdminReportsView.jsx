import React, { useEffect, useState } from 'react'
import CustomNavbar from '../../components/navbar/navbar'
import { useUserPermission } from '../../utilities/Security/Permission';
import { useQuery } from 'react-query';
import { getReporteAdminC, getReporteAdminP, getReporteAdminV } from '../../api/adminApi';
import Chart from 'react-apexcharts'

const dumbCategories = [
    { "categoria": "Electrónicos", "cantidad-ventas": 120 },
    { "categoria": "Libros", "cantidad-ventas": 200 },
    { "categoria": "Ropa", "cantidad-ventas": 150 },
    { "categoria": "Alimentos", "cantidad-ventas": 300 },
    { "categoria": "Muebles", "cantidad-ventas": 75 },
    { "categoria": "Juguetes", "cantidad-ventas": 80 },
    { "categoria": "Deportes", "cantidad-ventas": 90 },
    { "categoria": "Belleza", "cantidad-ventas": 100 },
    { "categoria": "Automóviles", "cantidad-ventas": 50 },
    { "categoria": "Jardín", "cantidad-ventas": 60 }
]

const dumbProducts = [
    { "product_id": 101, "nombre": "Producto 1", "precio": 99.99, "descripcion": "Este es el producto 1", "imagen": "https://placehold.co/400", "cantidad-vendidos": 120 },
    { "product_id": 102, "nombre": "Producto 2", "precio": 89.99, "descripcion": "Este es el producto 2", "imagen": "https://placehold.co/400", "cantidad-vendidos": 200 },
    { "product_id": 103, "nombre": "Producto 3", "precio": 79.99, "descripcion": "Este es el producto 3", "imagen": "https://placehold.co/400", "cantidad-vendidos": 150 },
    { "product_id": 104, "nombre": "Producto 4", "precio": 69.99, "descripcion": "Este es el producto 4", "imagen": "https://placehold.co/400", "cantidad-vendidos": 300 },
    { "product_id": 105, "nombre": "Producto 5", "precio": 59.99, "descripcion": "Este es el producto 5", "imagen": "https://placehold.co/400", "cantidad-vendidos": 75 },
    { "product_id": 106, "nombre": "Producto 6", "precio": 49.99, "descripcion": "Este es el producto 6", "imagen": "https://placehold.co/400", "cantidad-vendidos": 80 },
    { "product_id": 107, "nombre": "Producto 7", "precio": 39.99, "descripcion": "Este es el producto 7", "imagen": "https://placehold.co/400", "cantidad-vendidos": 90 },
    { "product_id": 108, "nombre": "Producto 8", "precio": 29.99, "descripcion": "Este es el producto 8", "imagen": "https://placehold.co/400", "cantidad-vendidos": 100 },
    { "product_id": 109, "nombre": "Producto 9", "precio": 19.99, "descripcion": "Este es el producto 9", "imagen": "https://placehold.co/400", "cantidad-vendidos": 50 },
    { "product_id": 110, "nombre": "Producto 10", "precio": 9.99, "descripcion": "Este es el producto 10", "imagen": "https://placehold.co/400", "cantidad-vendidos": 60 }
]

const dumbVendors = [
    { "name": "Usuario 1", "email": "usuario1@mail.com", "dpi": 123456, "image": "https://placehold.co/400", "state": 0, "cantidad-ventas": 120 },
    { "name": "Usuario 2", "email": "usuario2@mail.com", "dpi": 234567, "image": "https://placehold.co/400", "state": 1, "cantidad-ventas": 200 },
    { "name": "Usuario 3", "email": "usuario3@mail.com", "dpi": 345678, "image": "https://placehold.co/400", "state": 2, "cantidad-ventas": 150 },
    { "name": "Usuario 4", "email": "usuario4@mail.com", "dpi": 456789, "image": "https://placehold.co/400", "state": 0, "cantidad-ventas": 300 },
    { "name": "Usuario 5", "email": "usuario5@mail.com", "dpi": 567890, "image": "https://placehold.co/400", "state": 1, "cantidad-ventas": 75 },
    { "name": "Usuario 6", "email": "usuario6@mail.com", "dpi": 678901, "image": "https://placehold.co/400", "state": 2, "cantidad-ventas": 80 },
    { "name": "Usuario 7", "email": "usuario7@mail.com", "dpi": 789012, "image": "https://placehold.co/400", "state": 0, "cantidad-ventas": 90 },
    { "name": "Usuario 8", "email": "usuario8@mail.com", "dpi": 890123, "image": "https://placehold.co/400", "state": 1, "cantidad-ventas": 100 },
    { "name": "Usuario 9", "email": "usuario9@mail.com", "dpi": 901234, "image": "https://placehold.co/400", "state": 2, "cantidad-ventas": 50 },
    { "name": "Usuario 10", "email": "usuario10@mail.com", "dpi": 102345, "image": "https://placehold.co/400", "state": 0, "cantidad-ventas": 60 }
]

export default function AdminReportsView() {
    //useUserPermission(0);
    const { data: reporteProductos, isLoading: isLoadingProductos, isError: isErrorProductos } = useQuery('productos', getReporteAdminP);
    const { data: reporteVendedores, isLoading: isLoadingVendedores, isError: isErrorVendedores } = useQuery('vendedores', getReporteAdminV);
    const { data: reporteCategorias, isLoading: isLoadingCategorias, isError: isErrorCategorias } = useQuery('categorias', getReporteAdminC);

    /* const seriesCategories = dumbCategories.map(item => item['cantidad-ventas']);
    const labelsCategories = dumbCategories.map(item => item['categoria']);
    const seriesProducts = dumbProducts.map(item => item['cantidad-vendidos']);
    const labelsProducts = dumbProducts.map(item => item['nombre']);
    const seriesVendors = dumbVendors.map(item => item['cantidad-ventas']);
    const labelsVendors = dumbVendors.map(item => item['name']); */
    console.log(reporteProductos);


    const [seriesCategories, setseriesCategories] = useState([]);
    const [labelsCategories, setlabelsCategories] = useState([]);
    const [seriesProducts, setseriesProducts] = useState([]);
    const [labelsProducts, setlabelsProducts] = useState([]);
    const [seriesVendors, setseriesVendors] = useState([]);
    const [labelsVendors, setlabelsVendors] = useState([]);

    useEffect(() => {
        if (Array.isArray(reporteProductos) && !isLoadingProductos) {
            setseriesProducts(reporteProductos.map(item => item['cantidad-vendidos']));
            setlabelsProducts(reporteProductos.map(item => item['nombre']));
        }
        if (Array.isArray(reporteVendedores) && !isLoadingVendedores){
            setseriesVendors(reporteVendedores.map(item => item['cantidad-ventas']));
            setlabelsVendors(reporteVendedores.map(item => item['name']));
        }
        if (Array.isArray(reporteCategorias) && !isLoadingCategorias){
            setseriesCategories(reporteCategorias.map(item => item['cantidad-ventas']));
            setlabelsCategories(reporteCategorias.map(item => item['categoria']));
        }
    }, [reporteProductos, reporteVendedores, reporteCategorias]);

    /* const seriesCategories = reporteCategorias ? reporteCategorias?.map(item => item['cantidad-ventas']) : [];
    const labelsCategories = reporteCategorias ? reporteCategorias?.map(item => item['categoria']) : [];
    const seriesProducts = reporteProductos ? reporteProductos?.map(item => item['cantidad-vendidos']) : [];
    const labelsProducts = reporteProductos ? reporteProductos?.map(item => item['nombre']) : [];
    const seriesVendors = reporteVendedores ? reporteVendedores?.map(item => item['cantidad-ventas']) : [];
    const labelsVendors = reporteVendedores ? reporteVendedores?.map(item => item['name']) : []; */

    const optionsProductos = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: labelsProducts,
        },
    };

    const seriesProductos = [{
        name: 'Cantidad Vendida',
        data: seriesProducts,
    }];

    const optionsVendedores = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: labelsVendors,
        },
    };

    const seriesVendedores = [{
        name: 'Ventas Realizadas',
        data: seriesVendors,
    }];

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
                {isLoadingProductos ? (
                    <p>Loading...</p>
                ) : isErrorProductos ? (
                    <p>Error al cargar productos</p>
                ) : (
                    /*  <table className="table table-striped table-success">
                         <thead>
                             <tr>
                                 <th>ID</th>
                                 <th>Nombre</th>
                                 <th>Precio</th>
                                 <th>Descripcion</th>
                                 <th>Imagen</th>
                                 <th>Cantidad vendida</th>
                             </tr>
                         </thead> */
                    /* <tbody>
                    {data.map((item) => (
                        <tr key={item.id_compra}>
                            <td>{item.id_compra}</td>
                            <td>{item.nombre_producto}</td>
                            <td>{item.vendedor}</td>
                            <td>{item.precio}</td>
                            <td><img src={item.imagen} alt="Imagen del producto" style={{ width: '100px', height: 'auto' }} /></td>
                        </tr>
                    ))}
                </tbody> */
                    /*  </table> */
                    <Chart options={optionsProductos} series={seriesProductos} type="bar" height={350} />
                )}
                {/* <Chart options={optionsProductos} series={seriesProductos} type="bar" height={350} /> */}
            </div>
            <div className='tittle-history'>
                <h3 style={{ textAlign: 'center' }}>Vendedores con mas ventas</h3>
                {/* <hr /> */}
            </div>
            <div className='box-table'>
                {isLoadingVendedores ? (
                    <p>Loading...</p>
                ) : isErrorVendedores ? (
                    <p>Error al cargar vendedores</p>
                ) : (
                    /* <table className="table table-striped table-success">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>DPI</th>
                                <th>Imagen</th>
                                <th>Estado</th>
                                <th>Ventas realizadas</th>
                            </tr>
                        </thead> */
                    /* <tbody>
                    {data.map((item) => (
                        <tr key={item.id_compra}>
                            <td>{item.id_compra}</td>
                            <td>{item.nombre_producto}</td>
                            <td>{item.vendedor}</td>
                            <td>{item.precio}</td>
                            <td><img src={item.imagen} alt="Imagen del producto" style={{ width: '100px', height: 'auto' }} /></td>
                        </tr>
                    ))}
                </tbody> */
                    /* </table> */
                    <Chart options={optionsVendedores} series={seriesVendedores} type="bar" height={350} />
                )}
                {/* <Chart options={optionsVendedores} series={seriesVendedores} type="bar" height={350} /> */}
            </div>
            <div className='tittle-history'>
                <h3 style={{ textAlign: 'center' }}>Categorias mas vendidas</h3>
                {/* <hr /> */}
            </div>
            <div className='box-table'>
                {isLoadingCategorias ? (
                    <p>Loading...</p>
                ) : isErrorCategorias ? (
                    <p>Error al cargar categorias</p>
                ) : (
                    <Chart options={{ labelsCategories }} series={seriesCategories} type="donut" width="100%" />
                )}

            </div>
        </div>
    )
}
