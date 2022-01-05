import React from 'react';
import {Font, StyleSheet, Text, View} from '@react-pdf/renderer';
import {get, keys} from "lodash";
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
        width: '100%',
        borderCollapse: 'collapse',
        borderRight: '1px solid #000',
    },


    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#DEE1E6',
        borderTop: '1px solid #000'
    },
    tableHeaderData: {
        fontSize: 6,
        padding: '3px',
        color: '#000',
        fontFamily: "Roboto-M",
        borderLeft: '1px solid #000',
        borderBottom: '1px solid #000',
        width: '6.25%',
        whiteSpace: 'nowrap',
        overflow:'hidden',
        textOverflow:'ellipsis'
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
    },
    tableRowData: {
        padding: '3px',
        fontSize: 7,
        width: '6.25%',
        fontFamily: "Roboto-M",
        borderLeft: '1px solid #000',
        whiteSpace: 'nowrap',
        overflow:'hidden',
        textOverflow:'ellipsis',
    },


});

const PDFStaticReportTable = ({titles = ['Номи', 'Сони', 'Фоизи'], items = []}) => {
    return (
        <View style={styles.container}>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    {
                        titles && titles.map((title, index) => <Text key={index + 1}
                                                                     style={styles.tableHeaderData}>{title}</Text>)
                    }

                </View>


                {keys(items) && keys(items).map((key, index) => <><View key={index + 1} style={styles.tableRow}>
                    <Text style={styles.tableRowData}>{index + 1}</Text>
                    <Text style={styles.tableRowData}>{get(items, `${key}.name`)}</Text>
                    <Text style={styles.tableRowData}><NumberFormat displayType={'text'} thousandSeparator={' '}
                                                                    value={get(items, `${key}.count`)}/></Text>
                </View>
                    {
                        get(items, `${key}.data`).map((item, i) => <View key={index + 1} style={styles.tableRow}>
                            <Text style={styles.tableRowData}>{`${index + 1}.${i + 1}`}</Text>
                            <Text style={styles.tableRowData}>{get(item, 'name', '-')}</Text>
                            {
                                get(item, 'data', []).map(({count}) => <Text style={styles.tableRowData}><NumberFormat
                                    displayType={'text'} thousandSeparator={' '}
                                    value={count}/></Text>)
                            }

                        </View>)
                    }
                </>)}
            </View>
        </View>
    );
};

export default PDFStaticReportTable;
