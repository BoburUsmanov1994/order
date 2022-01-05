import React from 'react';
import {Document, Page, StyleSheet} from "@react-pdf/renderer";
import PDFHeader from "./pdf-header";
import styled from "styled-components";
import PDFTable from "./pdf-table";
import PDFStaticReportTable from "./pdf-static-report-table";

const StyledPdf = styled.div`

`;
const styles = StyleSheet.create({
    page: {
        flex:1,
        flexDirection: 'column',
        padding:'20 15 15 30',
        height:'500px',
        width:1000
    },
});

const PdfReport = ({from = '',to='',title='',items=[],isStaticReport = false,titles = []}) => {

    return (
        <Document >
            <Page size="A4"  style={styles.page}>
                <PDFHeader from={from} title={title} to={to}  />
                {isStaticReport ? <PDFStaticReportTable items={items} titles={titles} /> : <PDFTable items={items} />}
            </Page>
        </Document>
    );
};

export default PdfReport;
