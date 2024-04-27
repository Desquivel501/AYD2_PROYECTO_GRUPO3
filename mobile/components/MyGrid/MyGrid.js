import React from "react";
import { View } from "react-native";


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
    }
  };
  

export const Col = ({ numRows, children }) => {
return  (
    <View style={styles[`${numRows}col`]}>{children}</View>
)
}

export const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
)
