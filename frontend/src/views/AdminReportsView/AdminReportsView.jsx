import React, { useEffect, useState } from 'react'
import CustomNavbar from '../../components/navbar/navbar'
import { useUserPermission } from '../../utilities/Security/Permission';
import { useQuery } from 'react-query';
import { getReporteAdminC, getReporteAdminP, getReporteAdminV } from '../../api/adminApi';
import Chart from 'react-apexcharts'

export default function AdminReportsView() {
    useUserPermission(0);
    const { data: reporteProductos, isLoading: isLoadingProductos, isError: isErrorProductos } = useQuery('productos', getReporteAdminP);
    const { data: reporteVendedores, isLoading: isLoadingVendedores, isError: isErrorVendedores } = useQuery('vendedores', getReporteAdminV);
    const { data: reporteCategorias, isLoading: isLoadingCategorias, isError: isErrorCategorias } = useQuery('categorias', getReporteAdminC);

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
            console.log(reporteCategorias.map(item => item['nombre_categoria']));
            setlabelsCategories(reporteCategorias.map(item => item['nombre_categoria']));
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
                    <Chart options={{ labels: labelsCategories }} series={seriesCategories} type="donut" width="100%" />
                )}

            </div>
        </div>
    )
}
