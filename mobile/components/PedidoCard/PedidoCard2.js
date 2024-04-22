import React from "react";
import { View, Image, Text, Button, TouchableWithoutFeedback } from "react-native";

export const PedidoCard2 = (props) => {

    const {
        name,
        cantidad,
        imagen,
        total,
    } = props;



    return (
        <TouchableWithoutFeedback>
            <View style={styles.product_card_view}>
                <View style={styles.text_col}>
                    <Text style={styles.title_product}>{name}</Text>
                    <Text style={styles.product_description}>Qty: {cantidad}</Text>
                </View>
                <View style={styles.image_col}>
                    <Text style={styles.price_product}>GTQ{total}</Text>
                </View>

                <View style={styles.image_col}>
                    <Image source={{uri: imagen}} style={{width: 65, height: 65, borderRadius:10}} />
                </View>
            </View>         
        </TouchableWithoutFeedback>
    );
}

const styles = {
    product_card_view: {
        flexDirection: "row",
        marginBottom: 15
    },
    image_col: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text_col: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "left",
        paddingLeft: 10,
        paddingTop: 10,
    },
    title_product: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 3
    },
    price_product: {
        fontSize: 17,
        fontWeight: "bold",
        color: "green",
        marginBottom: 3
    },
    product_description: {
        fontSize: 15,
        paddingRight: 10
    },
};