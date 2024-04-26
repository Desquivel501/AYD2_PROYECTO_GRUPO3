import React from "react";
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ImageBackground, Image, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Row, Col } from "../../components/MyGrid/MyGrid";
import { Searchbar } from 'react-native-paper';
import { ProductCard } from "../../components/ProductCard/ProductCard";

import { storeData, getData } from "../../utils/Storage";

import { PedidoCard } from "../../components/PedidoCard/PedidoCard";
import { VentaCard } from "../../components/PedidoCard/VentaCard";

import { Button as PaperButton, RadioButton } from "react-native-paper";

import { LineChart, BarChart } from "react-native-chart-kit";


export default function ReporteVendedorView({ navigation }) {

    const [ventas, setVentas] = React.useState([])
    const [reporte, setReporte] = React.useState("Productos")

    const [reporteProductos, setReporteProductos] = React.useState({
        labels: ["January", "February", "March", "April", "May", "June"],
        data: [ 1, 2, 3, 4, 5, 6]
    })
    const [reporteFecha, setReporteFecha] = React.useState({
        labels: ["January", "February", "March", "April", "May", "June"],
        data: [ 1, 2, 3, 4, 5, 6]
    })

    const handleClick = (id) => {
        const pedido = pedidos.find((pedido) => pedido.purchase_id === id);
        storeData("pedido", pedido)
        navigation.navigate("Pedido", { id: id });
    }

    useFocusEffect(
        React.useCallback( () => {

            getData("user").then((user) => {

                fetch(`http://34.16.176.103:8080/user/sales?dpi=${user.id}`).then((response) => {
                    return response.json();
                }).then((data) => {
                    if(data != null || data != undefined || data.length > 0) {

                        let newReporte = {
                            labels: [],
                            data: []
                        };

                        data.forEach(element => {
                            if(newReporte.labels.indexOf(element.name) == -1) {
                                newReporte.labels.push(element.name);
                                newReporte.data.push(1);
                            } else {
                                newReporte.data[newReporte.labels.indexOf(element.name)] += 1;
                            }
                           
                        });
                        setReporteProductos(newReporte);
                        
                        

                        let newReporteFecha = {
                            labels: [],
                            data: []
                        };

                        data.forEach(element => {

                            const MyDate = new Date(element.date);
                            const ParsedDate = MyDate.getDate() + "/" + (MyDate.getMonth() + 1) + "/" + MyDate.getFullYear();

                            if(newReporteFecha.labels.indexOf(ParsedDate) == -1) {
                                newReporteFecha.labels.push(ParsedDate);
                                newReporteFecha.data.push(1);
                            } else {
                                newReporteFecha.data[newReporteFecha.labels.indexOf(ParsedDate)] += 1;
                            }
                           
                        });

                        let combinedData = newReporteFecha.labels.map((label, index) => {
                            return { label: label, value: newReporteFecha.data[index] };
                        });
                        
                        // Sort the combined data by date
                        combinedData.sort((a, b) => {
                            const dateAList = a.label.split("/");
                            const dateBList = b.label.split("/");
                            const dateA = new Date(dateAList[2], dateAList[1] - 1, dateAList[0]);
                            const dateB = new Date(dateBList[2], dateBList[1] - 1, dateBList[0]);
                            return dateA - dateB;
                        });

                        // Separate sorted labels and values back into separate arrays
                        let sortedLabels = combinedData.map(item => item.label);
                        let sortedValues = combinedData.map(item => item.value);

                        // Update original data object
                        newReporteFecha.labels = sortedLabels;
                        newReporteFecha.values = sortedValues;

                        setReporteFecha(newReporteFecha);
                    }
                });
            });
        }, [])
    );

    return (
        <View style={styles.container}>

            <View style={styles.container_products}>

                <Text style={styles.title_pedidos}>Reportes</Text>

                {/* <Button title="Ver Reporte"/> */}

                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf:"left",
                    marginTop: 10,
                }}>
                    Tipo de reporte:    
                </Text>

                <View style={styles.button_group}>

                    <RadioButton.Group onValueChange={newValue => setReporte(newValue)} value={reporte}>
                        <RadioButton.Item label="Productos" value="Productos" style={{width: "100%"}}/>
                        <RadioButton.Item label="Fecha" value="Fecha" style={{width: "100%"}}/>
                    </RadioButton.Group>
        
                    
                </View>

                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={true}
                    horizontal={true}
                    directionalLockEnabled={true}
                >
                    {
                        reporte == "Productos" ?
                        <BarChart
                            data={{
                                labels: reporteProductos.labels,
                                datasets: [
                                    {
                                    data: reporteProductos.data
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width + 150} // from react-native
                            height={350}
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#456CB2",
                                backgroundGradientFrom: "#456CB2",
                                backgroundGradientTo: "#7C98C9",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#456CB2"
                                },
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                            verticalLabelRotation={30}
                            paddingRight={30}
                        />
                        :
                        <LineChart
                            data={{
                                labels: reporteFecha.labels,
                                datasets: [
                                    {
                                    data: reporteFecha.data
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width + 200} // from react-native
                            height={350}
                            // yAxisLabel="$"
                            // yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                            verticalLabelRotation={30}
                        />
                    }
  
                </ScrollView>
            </View>

        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },

    container_products: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "90%",
    },

    input: {
        backgroundColor: "#fff",
        padding: 10,
        width: "80%",
        marginTop: 15,
        color: "#000",
    },
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    button_group: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        width: "95%",
        // marginTop: 10,
        marginBottom: 10,
    },

    button_login: {
        marginTop: 20,
        width: "80%",
    },
    search: {
        width: "95%",
        marginTop: 10,
        marginBottom: 10
        // position: "absolute",
    },
    image_product: {
        width: "80%",
        height: 150
    },
    item: {
        backgroundColor: "#f9c2ff",
        width: "90%", 
        borderColor:  "#000", 
        borderWidth:  1,
    },
    line: {
        borderBottomColor: '#989a9b',
        borderBottomWidth: 1,
        width: '100%',
        // marginVertical: 10,
      },
    title_pedidos: {
        fontSize: 30,
        fontWeight: "bold",
        // marginBottom: 3,
        marginTop: 10,
        marginLeft: 10,
        paddingBottom: 10,
        alignSelf: "flex-start",
    },
});
  