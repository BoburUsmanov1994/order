import React from 'react';
import {StyleSheet, Text, Image, View, Font} from '@react-pdf/renderer';
import {get,isEmpty,sum} from "lodash";
import NumberFormat from "react-number-format";
Font.register({
    family: "Roboto-B",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf"
});
Font.register({
    family: "Roboto-M",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    table: {
        width:'100%',
        borderCollapse:'collapse',
        borderRight:'1px solid #000',
    },


    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#DEE1E6',
        borderTop:'1px solid #000'
    },
    tableHeaderData:{
        fontSize: 12,
        padding: '5px 10px',
        color:'#000',
        fontFamily: "Roboto-M",
        width:'33.3%',
        borderLeft:'1px solid #000',
        borderBottom:'1px solid #000',

    },
    tableRow: {
        flexDirection: 'row',
        borderBottom:'1px solid #000',
    },
    tableRowData:{
        padding:'5px 10px',
        fontSize:11,
        width:'33.3%',
        fontFamily: "Roboto-M",
        borderLeft:'1px solid #000'
    },


});

const PDFTable = ({titles = ['Номи','Сони','Фоизи'],items=[]}) => {
    return (
        <View style={styles.container}>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    {
                        titles && titles.map((title,index) => <Text key={index+1} style={styles.tableHeaderData}>{title}</Text>)
                    }

                </View>

                {items && items.map(({name,count,percent},index) =><View key={index+1} style={styles.tableRow}>
                    <Text style={styles.tableRowData}>{name}</Text>
                    <Text style={styles.tableRowData}><NumberFormat displayType={'text'} thousandSeparator={' '} value={count}/></Text>
                    <Text style={styles.tableRowData}>{percent}%</Text>
                </View>)}
                {!isEmpty(items) ?  <View  style={styles.tableRow}>
                    <Text style={styles.tableRowData}>Жами</Text>
                    <Text style={styles.tableRowData}>{sum(items.map(({count}) => count))}</Text>
                    <Text style={styles.tableRowData}>100%</Text>
                </View>:<View  style={styles.tableRow}>
                    <Text style={styles.tableRowData}>Жами</Text>
                    <Text style={styles.tableRowData}>0</Text>
                    <Text style={styles.tableRowData}>0%</Text>
                </View>}
            </View>
        </View>
    );
};

export default PDFTable;
