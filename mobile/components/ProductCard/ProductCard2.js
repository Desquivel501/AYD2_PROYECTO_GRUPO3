import React from "react";
import { View, Image, Text, Button, TouchableWithoutFeedback, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

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

    menu_col: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        fontSize: 15
    },

    quantity_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // width: "100%",
        backgroundColor: "#acaeaf",
        borderRadius: 20,
        marginTop: 20,
        paddingHorizontal: 20,
        height: 40,
    },

};

export const ProductCard2 = (props) => {

    const {
        id,
        image,
        price,
        name,
        quantity,
        onChange
    } = props;

    const [newQuantity, setQuantity] = React.useState(Number(quantity));

    const handleSelect = () => {
        onSelect(id);
    };

    const changeQuantity = (newQuantity) => {
        setQuantity(newQuantity);
        onChange(id, newQuantity);
    };

    return (
        <TouchableWithoutFeedback>
            <View style={styles.product_card_view}>
                <View style={styles.image_col}>
                    <Image source={{uri: image}} style={{width: 65, height: 65,  borderRadius: 15,}} />
                </View>
                <View style={styles.text_col}>
                    <Text style={styles.title_product}>{name}</Text>
                    <Text style={styles.price_product}>Q {price * newQuantity}</Text>
                </View>

                <View style={styles.quantity_container} >

                    <Icon
                        name="minus"
                        size={12}
                        color="black"
                        onPress={() => newQuantity > 1 ? changeQuantity(newQuantity - 1) : null}
                    />

                    <Text style={{fontSize: 20, color: "black", marginHorizontal: 10}}>{newQuantity}</Text>

                    <Icon
                        name="plus"
                        size={12}

                        color="black"
                        onPress={() => newQuantity < 10 ? changeQuantity(newQuantity + 1) : null}
                    />

                </View>
                
            </View>
        </TouchableWithoutFeedback>
    );
}