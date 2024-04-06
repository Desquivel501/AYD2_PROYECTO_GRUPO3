import React, { useEffect, useState } from 'react'
import CustomNavbar from '../../components/navbar/navbar'
import { useUserPermission } from '../../utilities/Security/Permission';
import { useQuery } from 'react-query';
import { getReporteAdminC, getReporteAdminP, getReporteAdminV } from '../../api/adminApi';
import Chart from 'react-apexcharts'
import { Col, Row } from 'react-bootstrap';
import { Award } from 'react-bootstrap-icons';
import './reports.css';
import { getData } from '../../api/api';

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

    const [topSales, setTopSales] = useState([
        {
            id: 1,
            usuario: 'Juan Perez',
            total: 1500,
            image: 'https://www.w3schools.com/howto/img_avatar.png',
            fecha: '2021-10-01',
            productos: [
                {
                    nombre: 'Producto 1',
                    cantidad: 5,
                    precio: 100,
                    image: 'https://placehold.co/400'
                },
                {
                    nombre: 'Producto 2',
                    cantidad: 5,
                    precio: 200,
                    image: 'https://placehold.co/400'
                },
            ],
            color: 'gold'
        },
        {
            id: 2,
            usuario: 'Maria Lopez',
            total: 800,
            image: 'https://www.w3schools.com/howto/img_avatar.png',
            fecha: '2021-10-02',
            productos: [
                {
                    nombre: 'Producto 1',
                    cantidad: 8,
                    precio: 100,
                    image: 'https://placehold.co/400'
                },
            ],
            color: 'gray'
        },
        {
            id: 3,
            usuario: 'Pedro Ramirez',
            total: 500,
            image: 'https://www.w3schools.com/howto/img_avatar.png',
            fecha: '2021-10-03',
            productos: [
                {
                    nombre: 'Producto 1',
                    cantidad: 3,
                    precio: 100,
                    image: 'https://placehold.co/400'
                },
                {
                    nombre: 'Producto 2',
                    cantidad: 1,
                    precio: 200,
                    image: 'https://placehold.co/400'
                },
            ],
            color: '#CD7F32'
        },
    ]);

    const [selectedSale, setSelectedSale] = useState(
        {
            id: 1,
            usuario: 'Juan Perez',
            total: 1500,
            image: 'https://www.w3schools.com/howto/img_avatar.png',
            fecha: '2021-10-01',
            productos: [
                {
                    nombre: 'Producto 1',
                    cantidad: 5,
                    precio: 100,
                    image: 'https://placehold.co/400'
                },
                {
                    nombre: 'Producto 2',
                    cantidad: 5,
                    precio: 200,
                    image: 'https://placehold.co/400'
                },
            ],
            color: 'gold'

        }
    );

    const [allSales, setAllSales] = useState({
        labels: ['2021-10-01', '2021-10-02', '2021-10-03', '2021-10-04', '2021-10-05', '2021-10-06', '2021-10-07'],
        data: [30, 40, 45, 50, 49, 60, 70]
    });

    useEffect(() => {
        let endpoint = 'user/get-all-purchases'
        getData({ endpoint }).then((data) => {
            if(data === undefined || data === null) return console.log("Error al cargar ventas");
            console.log(data);

            let newSales = []
            for (let i = 0; i < data.length; i++) {
                newSales.push({
                    id: data[i].purchase_id,
                    usuario: data[i].name,
                    total: data[i].total,
                    image: data[i].image,
                    fecha: data[i].date,
                    productos: data[i].products,
                    color: i == 0 ? 'gold' : i == 1 ? 'gray' : '#CD7F32'
                })
                if(i == 2) break;
            }
            setTopSales(newSales);
            setSelectedSale(newSales[0]);

            let salesByDay = {}
            data.forEach(sale => {
                const date = sale.date.split(' ')[0];
                if(salesByDay[date]){
                    salesByDay[date]++
                } else {
                    salesByDay[date] = 1
                }
            })



            let labels = Object.keys(salesByDay);
            let series = Object.values(salesByDay);

            labels.sort((a, b) => new Date(a) - new Date(b));
            series = labels.map(label => salesByDay[label]);
            
            console.log(labels);
            console.log(series);

            setAllSales({
                labels: labels,
                data: series
            })
        });

    }, []);

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
        <div
            className='report-root'
        >
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
                    <Chart options={optionsProductos} series={seriesProductos} type="bar" height={350} />
                )}
            </div>
            <div className='tittle-history'>
                <h3 style={{ textAlign: 'center' }}>Vendedores con mas ventas</h3>
            </div>
            <div className='box-table'>
                {isLoadingVendedores ? (
                    <p>Loading...</p>
                ) : isErrorVendedores ? (
                    <p>Error al cargar vendedores</p>
                ) : (
                    <Chart options={optionsVendedores} series={seriesVendedores} type="bar" height={350} />
                )}
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

            <div className='tittle-history'>
                <h3 style={{ textAlign: 'center' }}>Ventas por fecha</h3>
            </div>

            <div className='box-table'>
                <Chart options={{ labels: allSales.labels }} series={[{
                    name: 'Ventas',
                    data: allSales.data
                }]} type="line" width="100%" />
            </div>


            <div className='tittle-history'>
                <h3 style={{ textAlign: 'center' }}>Top ventas</h3>
                {/* <hr /> */}
            </div>

            <div className='box-table'>
                <Row>
                    <Col md={6}>
                        
                        <Row className='mb-2'>
                            <Col md={3}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Award size={50} style={{color: selectedSale.color}}/>
                            </Col>

                            <Col md={9}>
                                <h3 style={{ textAlign: 'center', fontWeight:'bold'}}>Venta #{selectedSale.id}</h3>
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col md={4}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    alt=""
                                    src={selectedSale.image}
                                    width="100"
                                    height="100"
                                    className="d-inline-block align-top"
                                />
                            </Col>
                            <Col md={8}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <h4 style={{ textAlign: 'center', }}>Usuario: {selectedSale.usuario}</h4>
                                <h4 style={{ textAlign: 'center', }}>Total: Q {selectedSale.total}</h4>
                                <h4 style={{ textAlign: 'center', }}>Fecha: {selectedSale.fecha}</h4>
                            </Col>
                        </Row>
                        
                        <Row className='mb-2'>
                            <Col md={12}>
                                <h4 style={{ textAlign: 'center', fontWeight:'bold' }}>Productos</h4>
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            {selectedSale.productos.map(product => (
                                <Col md={12} key={product.nombre}>
                                    <Row className='mb-2'>
                                        <Col md={4}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <img
                                                alt=""
                                                src={product.image}
                                                width="100"
                                                height="100"
                                                className="d-inline-block align-top"
                                            />
                                        </Col>
                                        <Col md={8}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <h4 style={{ textAlign: 'center', }}>{product.name}</h4>
                                            <h4 style={{ textAlign: 'center', }}>Q {product.price}  x{product.cantidad}</h4>
                                        </Col>
                                    </Row>
        
                                </Col>
                            ))}
                        </Row>

                    </Col>

                    <Col md={6}>
                        {
                            topSales.map(sale => (

                                selectedSale.id === sale.id ? null :
                                <div className='top-sale mr-3' key={sale.id} onClick={() => setSelectedSale(sale)}>
                                    <Row
                                        style={{
                                            border: "1px solid #e0e0e0",
                                            borderRadius: 10,
                                            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                                            transition: "all 0.3s ease",
                                            marginRight: 6,
                                            marginBottom: 6,
                                        }}
                                    >
                                        <Col md={4}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Award size={50} style={{color: sale.color}}/>
                                        </Col>
                                        <Col md={8}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <h4 style={{ textAlign: 'center', }}>{sale.usuario}</h4>
                                            <h4 style={{ textAlign: 'center', }}>Total: Q {sale.total}</h4>
                                        </Col>
                                    </Row>
                                </div>
                            ))
                        }
                    </Col>


                </Row>
            
            </div>

        </div>
    )
}
