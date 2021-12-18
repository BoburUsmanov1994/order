import React from 'react';
import {Font, Image, StyleSheet, Text, View} from '@react-pdf/renderer';
import logo from "../../assets/images/mvd-logo.png";

Font.register({
    family: "Roboto-B",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf"
});
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        width: 80,
    },
    left: {
        width: '50%'
    },
    right: {
        width: '50%',
        flex: 1,
        flexDirection: 'column',
        fontFamily: "Roboto-B",

    },
    title: {
        fontSize: 18,
        textAlign: 'right',
        lineHeight: 1.45,
        fontWeight: 900,
        color: '#322A7D',
        marginBottom: 10
    },
    date: {
        fontSize: 12,
        textAlign: 'right',
        lineHeight: 1.45,
        fontWeight: 400,
    },
    line:{
        width:'100%',
        height:3,
        backgroundColor:'#322A7D',
        marginTop:10,
        marginBottom: 10
    },
    text:{
        fontSize: 14,
        textAlign: 'right',
        lineHeight: 1.45,
        fontWeight: 400,
        marginBottom:5
    }
});
const PDFHeader = ({from = '', to = '', title = ''}) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.left}>
                    <Image
                        src={logo}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.right}>
                    <Text style={styles.title}>ОТЧЁТ</Text>
                    <Text style={styles.text}>Отчёт по: {title}</Text>
                    <Text style={styles.date}>Дата от: {from}</Text>
                    <Text style={styles.date}>До: {to}</Text>
                </View>
            </View>
            <View style={styles.line}></View>
        </View>
    );
};

export default PDFHeader;
