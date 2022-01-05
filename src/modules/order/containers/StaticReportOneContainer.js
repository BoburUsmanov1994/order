import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Title from "../../../components/title";
import {Table} from "../../../components/table";
import ApiActions from "../../../services/api/Actions";
import {get, head, isEmpty, keys} from "lodash";
import Loader from "../../../components/loader";
import RangeCalendar from "../../../components/range-calendar";
import ContentLoader from "../../../components/loader/ContentLoader";
import Flex from "../../../components/flex/Flex";
import {PDFDownloadLink} from "@react-pdf/renderer";
import PdfReport from "../../../components/pdf";
import Text from "../../../components/text";
import exportImg from "../../../assets/images/icons/export.png";
import moment from "moment";


const StaticReportOneContainer = ({
                                      history,
                                      user,
                                      entities,
                                      isFetched,
                                      getStaticReportOne,
                                      reports
                                  }) => {
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({
        page: 0, from: moment().subtract(3, 'months').format("YYYY-MM-DD"),
        to: moment().add(2, 'days').format("YYYY-MM-DD")
    });


    useEffect(() => {
        getStaticReportOne({...filter})
    }, [filter]);


    return (
        <>
            <Row className={'mb-24'}>
                <Col xs={12}>
                    <hr/>
                </Col>
                <Col xs={12}>
                    {loading && <Loader/>}
                </Col>
            </Row>
            <Row className={'mb-24'} align={'center'}>
                <Col xs={9}>
                    <Title lg>Статистик ҳисоботлар</Title>
                </Col>
                <Col xs={3} className={'text-right'}>
                    <RangeCalendar lg handleCalendar={({
                                                           startDate,
                                                           endDate
                                                       }) => setFilter(filter => ({
                        ...filter,
                        from: moment(startDate).format("YYYY-MM-DD"),
                        to: moment(endDate).format("YYYY-MM-DD")
                    }))}/>
                </Col>
            </Row>
            <Row className={'mb-24'}>
                <Col xs={12} className={'mb-24'}>
                    <Flex justify={'flex-end'}>
                        {isFetched && <PDFDownloadLink
                            document={<PdfReport from={get(filter, 'from')}
                                                 to={get(filter, 'to')}
                                                 title={`Статистик ҳисоботлар`}
                                                 titles={['ID', 'Номи', ...get(head(get(reports, 'basisorder.data')), 'data').map(({name}) => name)]}
                                                 items={reports} isStaticReport/>} fileName={`report.pdf`}>
                            {({blob, url, loading, error}) => <Text className={'cursor-pointer'}>Хисоботни
                                экспорт
                                қилиш <img src={exportImg} className={'ml-16'}
                                           alt=""/></Text>}
                        </PDFDownloadLink>}</Flex>
                </Col>
                <Col xs={12}>
                    {isFetched ? <Table
                        columns={['ID', 'Номи', ...get(head(get(reports, 'basisorder.data')), 'data').map(({name}) => name)]}>
                        {
                            !isEmpty(keys(reports)) ? keys(reports) && keys(reports).map((key, index) => <>
                                <tr
                                    key={index + 1}>
                                    <td>
                                        <strong>{index + 1}</strong>
                                    </td>
                                    <td>
                                        <strong>{
                                            get(reports, `${key}.name`)
                                        }</strong>
                                    </td>
                                    <td colSpan={14}>
                                        {get(reports, `${key}.count`)}
                                    </td>

                                </tr>
                                {
                                    get(reports, `${key}.data`).map((report, i) => <tr key={i + 1}>
                                        <td>{`${index + 1}.${i + 1}`}</td>
                                        <td>{
                                            get(report, 'name', '-')
                                        }</td>
                                        {
                                            get(report, 'data', []).map(({count}) => <td>{count}</td>)
                                        }
                                    </tr>)
                                }

                            </>) : <tr>
                                <td colSpan={16}>Маълумот мавжуд эмас</td>
                            </tr>
                        }
                    </Table> : <ContentLoader/>}
                </Col>
            </Row>

        </>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        reports: get(state, 'normalizer.data.static-report-one.result', {}),
        isFetched: get(state, 'normalizer.data.static-report-one.isFetched', false),
        user: get(state, 'auth.user', {})
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getStaticReportOne: ({from = '2021-01-01', to = '2021-12-31'}) => {
            const storeName = 'static-report-one';
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: '/reports/report-1',
                    config: {
                        params: {
                            from,
                            to
                        },
                    },
                    storeName,
                },
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StaticReportOneContainer));
