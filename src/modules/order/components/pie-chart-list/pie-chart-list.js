import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import {get, includes, isEqual} from "lodash";
import {Col, Row} from "react-grid-system";
import {CustomPieChart} from "../../../../components/chart";
import Title from "../../../../components/title";
import Dropdown from "../../../../components/dropdown";
import {request} from "../../../../services/api";
import axios from "axios";
import Loader from "../../../../components/loader";
import moment from "moment";

const StyledPieChartList = styled.div`
`;

const PieChartList = ({

                          startDate = '',
                          endDate = '',
                          getPieChartMessages,
                          regId = '',
                          messages,
                          title = 'Республика',
                          ...props
                      }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeMessages, setActiveMessages] = useState([]);
    const [filter, setFilter] = useState({
        from: moment().subtract(3, 'months').format("YYYY-MM-DD"),
        to: moment().add(2, 'days').format("YYYY-MM-DD"),
        regId: '',
        distId: '',
        mfyId: ''
    });

    useEffect(() => {
        getPieChartMessages();
    }, []);
    useEffect(() => {
        if (get(messages, 'isFetched')) {
            setActiveMessages(get(messages, 'result.Messages', []).filter(({condition}) => isEqual(condition, 'true')).map(({_id}) => _id))
        }
    }, [messages]);

    useEffect(() => {

        if (get(messages, 'isFetched')) {
            setLoading(true);
            axios.all(get(messages, 'result.Messages', []).filter(({_id}) => includes(activeMessages, _id)).map(({routers}) => request.get(`statistics${routers}`, {headers: {...filter}}))).then(axios.spread((...responses) => {
                setItems(responses.map(({data}) => data));
                setLoading(false);
            })).catch(errors => {
                console.error(errors);
                setLoading(false);
            });
        }
    }, [activeMessages, filter])


    useEffect(() => {
        if (startDate && endDate) {
            setFilter(filter => ({...filter, from: startDate, to: endDate}));
        }
        if (regId) {
            setFilter(filter => ({...filter, regId: regId}));
        }
    }, [startDate, endDate,regId]);

    if (loading) {
        return <Loader/>;
    }


    return (
        <StyledPieChartList {...props}>
            <Row className={'mb-24'}>
                <Col xs={8}>
                    <Title md>Тазйиқ ва зўравонликдан жабрланган хотин - қизларни ҳисобга олиш ягона
                        статистикаси
                    </Title>
                </Col>
                <Col xs={4} className={'text-right'}>
                    <Dropdown items={get(messages, 'result.Messages')} activeItems={activeMessages}
                              setActiveItems={setActiveMessages}/>
                </Col>
            </Row>
            <Row>
                {items && items.map((item, index) => <Col key={index + 1} xs={6}>
                    <CustomPieChart title={title} data={item} filter={filter}/>
                </Col>)
                }
            </Row>
        </StyledPieChartList>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        messages: get(state, 'normalizer.data.get-pie-chart-messages', {}),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPieChartMessages: () => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/messages`,
                config: {
                    params: {},
                },
                storeName: 'get-pie-chart-messages',
            },
        }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PieChartList);
