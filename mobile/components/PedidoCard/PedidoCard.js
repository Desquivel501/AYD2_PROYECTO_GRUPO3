import React from "react";
import { View, Image, Text, Button, TouchableWithoutFeedback } from "react-native";

export const PedidoCard = (props) => {

    const {
        id,
        vendedor,
        total,
        onSelect
    } = props;

    const handleSelect = () => {
        onSelect(id);
    };

    return (
        <TouchableWithoutFeedback onPress={handleSelect}>
            <View style={styles.product_card_view}>
                <View style={styles.text_col}>
                    <Text style={styles.title_product}>Pedido #{id}</Text>
                    <Text style={styles.product_description}>Vendedor: {vendedor}</Text>
                    {/* <Text style={styles.product_description}>{description} </Text> */}
                </View>
                <View style={styles.image_col}>
                    <Text style={styles.price_product}>GTQ{total}</Text>
                </View>

                <View style={styles.image_col}>
                    <Image source={{uri: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_info_outline_48px-512.png"}} style={{width: 30, height: 30}} />
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
        flex: 2,
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