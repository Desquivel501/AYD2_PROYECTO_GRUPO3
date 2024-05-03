import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper';
import { getReporteAdminA, getReporteAdminC, getReporteAdminP, getReporteAdminV } from '../../api/adminApi';
import { useQuery } from 'react-query';
import { Image, TouchableOpacity } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
//import { getData } from '../../api/api';

const screenWidth = Dimensions.get("window").width;

export default function AdminReportesView() {
  const { data: reporteProductos, isLoading: isLoadingProductos, isError: isErrorProductos } = useQuery('productos', getReporteAdminP);
  const { data: reporteVendedores, isLoading: isLoadingVendedores, isError: isErrorVendedores } = useQuery('vendedores', getReporteAdminV);
  const { data: reporteCategorias, isLoading: isLoadingCategorias, isError: isErrorCategorias } = useQuery('categorias', getReporteAdminC);
  const { data: reporteAllPurchases, isLoading: isLoadingAllPurchases, isError: isErrorAllPurchases } = useQuery('all-purchases', getReporteAdminA);

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
    if (Array.isArray(reporteProductos) && !isLoadingProductos) {
      setseriesProducts(reporteProductos.map(item => item['cantidad-vendidos']));
      setlabelsProducts(reporteProductos.map(item => item['nombre']));
    }
    if (Array.isArray(reporteVendedores) && !isLoadingVendedores) {
      setseriesVendors(reporteVendedores.map(item => item['cantidad-ventas']));
      setlabelsVendors(reporteVendedores.map(item => item['name']));
    }
    if (Array.isArray(reporteCategorias) && !isLoadingCategorias) {
      setseriesCategories(reporteCategorias.map(item => item['cantidad-ventas']));
      console.log(reporteCategorias.map(item => item['nombre_categoria']));
      setlabelsCategories(reporteCategorias.map(item => item['nombre_categoria']));
    }

    if (!isLoadingAllPurchases && reporteAllPurchases) {
      let newSales = []
      for (let i = 0; i < reporteAllPurchases.length; i++) {
        newSales.push({
          id: reporteAllPurchases[i].purchase_id,
          usuario: reporteAllPurchases[i].name,
          total: reporteAllPurchases[i].total,
          image: reporteAllPurchases[i].image,
          fecha: reporteAllPurchases[i].date,
          productos: reporteAllPurchases[i].products,
          color: i == 0 ? 'gold' : i == 1 ? 'gray' : '#CD7F32'
        })
        if (i == 2) break;
      }
      setTopSales(newSales);
      setSelectedSale(newSales[0]);

      let salesByDay = {}
      reporteAllPurchases.forEach(sale => {
        const date = sale.date.split(' ')[0];
        if (salesByDay[date]) {
          salesByDay[date]++
        } else {
          salesByDay[date] = 1
        }
      })



      let labels = Object.keys(salesByDay);
      let series = Object.values(salesByDay);

      labels.sort((a, b) => new Date(a) - new Date(b));
      series = labels.map(label => salesByDay[label]);

      /* console.log(labels);
      console.log(series); */

      setAllSales({
        labels: labels,
        data: series
      })
    }
  }, [reporteProductos, reporteVendedores, reporteCategorias, reporteAllPurchases]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.textHabDes}>Reportes</Text>
        <Text style={styles.titulo}>Productos mas vendidos</Text>

        <ScrollView horizontal>
          <BarChart
            data={{
              labels: labelsProducts,
              datasets: [{ data: seriesProducts }]
            }}
            width={screenWidth + 200}
            height={350}
            verticalLabelRotation={30}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              
            }}
          />
        </ScrollView>

        <Text style={styles.titulo}>Vendedores con mas ventas</Text>
        <ScrollView horizontal>
          <BarChart
            data={{
              labels: labelsVendors,
              datasets: [{ data: seriesVendors }]
            }}
            width={screenWidth + 100}
            height={350}
            verticalLabelRotation={30}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: '#FF1F1F',
              backgroundGradientTo: '#FF1F1F',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
            }}
          />
        </ScrollView>

        <Text style={styles.titulo}>Categorias mas vendidas</Text>
        <ScrollView horizontal>
          <PieChart
            data={seriesCategories.map((value, index) => ({
              name: labelsCategories[index],
              value,
              color: `rgba(0, 0, 0, ${0.2 + index * 0.2})`, // Puedes ajustar la transparencia de los colores
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            }))}
            width={screenWidth + 100}
            height={250}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </ScrollView>

        <Text style={styles.titulo}>Ventas por fecha</Text>
        <ScrollView horizontal>
          <LineChart
            data={{
              labels: allSales.labels,
              datasets: [
                {
                  data: allSales.data,
                },
              ],
            }}
            width={screenWidth + 100}
            height={350}
            chartConfig={{
              backgroundColor: '#1FC2FF',
              backgroundGradientFrom: '#1FC2FF',
              backgroundGradientTo: '#1FC2FF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
          />
        </ScrollView>

        <Text style={styles.titulo}>Top ventas</Text>
        <Row>
          <Col style={styles.column}>
            <View style={styles.saleContainer}>
              <Row style={styles.saleHeader}>
                <Col size={12}
                  style={styles.saleHeaderTitle}
                >
                  <View style={[styles.awardContainer, { backgroundColor: selectedSale.color }]}>
                    <Text style={styles.awardText}>Venta #{selectedSale.id}</Text>
                  </View>
                </Col>
              </Row>
              <Row>
                <Col size={12}>
                  <Text style={styles.saleHeaderText}>{selectedSale.usuario}</Text>
                </Col>
              </Row>
              <Row>
                <Col size={12}
                  style={styles.saleImageCol}
                >
                  <Image source={{ uri: selectedSale.image }} style={styles.saleImage} />
                </Col>
              </Row>
              <Row>
                <Col size={12}>
                  <Text style={styles.saleText}>Usuario: {selectedSale.usuario}</Text>
                  <Text style={styles.saleText}>Total: Q {selectedSale.total}</Text>
                  <Text style={styles.saleText}>Fecha: {selectedSale.fecha}</Text>
                </Col>
              </Row>
              <Text style={[styles.saleText, { marginTop: 10 }]}>Productos:</Text>
              {selectedSale.productos.map((product, index) => (
                <>
                  <Row key={index} style={styles.productRow}>
                    <Col size={12}>
                      <Image source={{ uri: product.image }} style={styles.productImage} />
                    </Col>
                  </Row>
                  <Row>
                    <Col size={12}>
                      <Text style={styles.productName}>{product.nombre}</Text>
                      <Text style={styles.productText}>Q {product.precio} x{product.cantidad}</Text>
                    </Col>
                  </Row>
                </>
              ))}
            </View>
          </Col>
          <Col style={styles.column}>
            {topSales.map((sale) => (
              selectedSale.id === sale.id ? null : (
                <TouchableOpacity key={sale.id} style={styles.topSale} onPress={() => setSelectedSale(sale)}>
                  <Row style={[styles.saleRow, { borderColor: sale.color }]}>
                    <Col size={12}
                      style={styles.saleHeaderTitle}
                    >
                      <View style={[styles.awardContainer, { backgroundColor: sale.color }]}>
                        <Text style={styles.awardText}>#{sale.id}</Text>
                      </View>
                    </Col>
                    {/* <Col size={8}>
                      <Text style={styles.saleHeaderText}>{sale.usuario}</Text>
                    </Col> */}
                  </Row>
                  <Row>
                    <Col size={12}>
                      <Text style={styles.saleHeaderText}>{selectedSale.usuario}</Text>
                    </Col>
                  </Row>
                  <Text style={styles.saleText}>Total: Q {sale.total}</Text>
                </TouchableOpacity>
              )
            ))}
          </Col>
        </Row>
      </View>

    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 17,
    borderRadius: 10,
    marginHorizontal: "2%",
    marginTop: "15%",
    marginBottom: "2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titulo: {
    color: "#005A7A",
    marginTop: "5%",
    marginBottom: "5%",
    textAlign: "start",
    fontSize: 20,
    fontWeight: "bold",
  },
  tableHeader: {
    backgroundColor: "#212F3D",
  },
  tableHeader_v: {
    backgroundColor: "#0E6251",
  },
  tableHeader2: {
    backgroundColor: "#2874A6",
  },
  tableHeader2_v: {
    backgroundColor: "#148F77",
  },
  tablaRow2: {
    color: "black",
    textAlign: "center",
    fontSize: 11,
  },
  tablaRow: {
    fontSize: 11,
    color: "#F1C40F",
    textAlign: "center",
  },
  tablaRow2_v: {
    fontSize: 11,
    color: "black",
    textAlign: "center",
  },
  tablaRow_v: {
    fontSize: 11,
    color: "#BDC3C7",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  tableContainer: {
    backgroundColor: "#2C3E50",
    alignSelf: "stretch", // Asegurar que la tabla se estire horizontalmente
  },
  tableContainer_v: {
    backgroundColor: "#117864",
    alignSelf: "stretch", // Asegurar que la tabla se estire horizontalmente
  },
  containertables: {
    flex: 1,
  },
  line: {
    borderBottomColor: "#616A6B",
    borderBottomWidth: 1,
    marginTop: "7%",
  },
  textHabDes: {
    color: "#005A7A",
    marginVertical: "5%",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  icon_h: {
    flex: 1,
    height: 30,
    width: 30,
    backgroundColor: "#F1C40F",
    borderRadius: "20%",
    marginVertical: 2,
  },
  icon_d: {
    flex: 1,
    height: 30,
    width: 30,
    backgroundColor: "#BDC3C7",
    borderRadius: "20%",
    marginVertical: 2,
  },
  avatar: {
    flex: 1,
    height: 30,
    width: 30,
    borderRadius: "20%",
    marginVertical: 2,
  },
  column: {
    flex: 1,
  },
  saleContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  saleHeader: {
    marginBottom: 10,
  },
  saleHeaderTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  awardContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  awardText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  saleHeaderText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  saleImageCol:{
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saleImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  saleText: {
    marginTop: 5,
  },
  productRow: {
    marginBottom: 1,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontWeight: 'bold',
  },
  productText: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  topSale: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  saleRow: {
    marginBottom: 5,
    borderRadius: 10,
    padding: 10,
  },
});
/* const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 17,
    borderRadius: 10,
    marginHorizontal: "2%",
    marginTop: "15%",
    marginBottom: "2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titulo: {
    color: "#005A7A",
    marginTop: "5%",
    marginBottom: "5%",
    textAlign: "start",
    fontSize: 20,
    fontWeight: "bold",
  },
  tableHeader: {
    backgroundColor: "#212F3D",
  },
  tableHeader_v: {
    backgroundColor: "#0E6251",
  },
  tableHeader2: {
    backgroundColor: "#2874A6",
  },
  tableHeader2_v: {
    backgroundColor: "#148F77",
  },
  tablaRow2: {

    color: "black",
    textAlign: "center",
    fontSize: 11,
  },
  tablaRow: {
    fontSize: 11,
    color: "#F1C40F",
    textAlign: "center"
  },
  tablaRow2_v: {
    fontSize: 11,
    color: "black",
    textAlign: "center"
  },
  tablaRow_v: {
    fontSize: 11,
    color: "#BDC3C7",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  tableContainer: {
    backgroundColor: "#2C3E50",
    alignSelf: "stretch", // Asegurar que la tabla se estire horizontalmente


  },
  tableContainer_v: {
    backgroundColor: "#117864",
    alignSelf: "stretch", // Asegurar que la tabla se estire horizontalmente


  },
  containertables: {
    flex: 1
  },
  line: {
    borderBottomColor: "#616A6B",
    borderBottomWidth: 1,
    marginTop: "7%",
  },
  textHabDes: {
    color: "#005A7A",
    marginVertical: "5%",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  icon_h: {
    flex: 1,
    height: 30,
    width: 30,
    backgroundColor: "#F1C40F",
    borderRadius: "20%",
    marginVertical: 2,

  },
  icon_d: {
    flex: 1,
    height: 30,
    width: 30,
    backgroundColor: "#BDC3C7",
    borderRadius: "20%",
    marginVertical: 2,

  },
  avatar: {
    flex: 1,
    height: 30,
    width: 30,
    borderRadius: "20%",
    marginVertical: 2,

  }
}); */
