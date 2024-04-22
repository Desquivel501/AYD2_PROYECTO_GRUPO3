import React from "react";
import { View, Image, Text, Button, TouchableWithoutFeedback } from "react-native";

const styles = {
    app: {
      flex: 4,
      marginHorizontal: "auto",
      width: 400,
    },
    row: {
      flexDirection: "row"
    },
    "1col":  {
      flex:  1,
      justifyContent: "center",
      alignItems: "center"
    },
    "2col":  {
      flex:  2,
      justifyContent: "center",
      alignItems: "center"
    },
    "3col":  {
      flex:  3,
      justifyContent: "center",
      alignItems: "center"
    },
    "4col":  {
      flex:  4,
      justifyContent: "center",
      alignItems: "center"
    },

    product_card_view: {
        flexDirection: "row",
        marginBottom: 15
    },

    product_card_view_create: {
        flexDirection: "row",
        marginBottom: 15,
        backgroundColor: "#e5e9ec",
        paddingVertical: 10,
        borderRadius: 10,
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
    title_new_product: {
        fontSize: 23,
        fontWeight: "bold",
        marginBottom: 3,
        
    },
    new_text_col: {
        flex: 2,
        justifyContent: "center",
        alignItems: "left",
        paddingLeft: 10,
        paddingTop: 10,
    },

};

export const ProductCard = (props) => {

    const {
        id,
        image,
        price,
        name,
        description,
        onSelect,
        crear = false
    } = props;

    const handleSelect = () => {
        onSelect(id);
    };

    return (
        <TouchableWithoutFeedback onPress={handleSelect}>
            {
                crear ? 
                <View style={styles.product_card_view_create}>
                    <View style={styles.new_text_col}>
                        <Text style={styles.title_new_product}>{name}</Text>
                    </View>
                    <View style={styles.image_col}>
                        <Image source={{uri: image}} style={{width: 50, height: 50,  borderRadius: 15,}} />
                    </View>
                </View>
             : 
                <View style={styles.product_card_view}>
                    <View style={styles.text_col}>
                        <Text style={styles.title_product}>{name}</Text>
                        <Text style={styles.price_product}>Q {price}</Text>
                        <Text style={styles.product_description}>{description} </Text>
                    </View>
                    <View style={styles.image_col}>
                        <Image source={{uri: image}} style={{width: 100, height: 100,  borderRadius: 15,}} />
                    </View>
                </View>
            }
            
        </TouchableWithoutFeedback>
    );
}