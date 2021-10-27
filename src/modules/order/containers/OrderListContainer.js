import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import {get,isEmpty,isEqual} from "lodash";
import moment from "moment";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ApiActions from "../../../services/api/Actions";
import OrderScheme from "../../../schema/OrderScheme";
import {confirmAlert} from "react-confirm-alert";
import ApiService from "../ApiService";
import {toast} from "react-toastify";
import ContentLoader from "../../../components/loader/ContentLoader";
import {Table} from "../../../components/table";
import {Edit, Eye, Trash,PlusCircle,MinusCircle} from "react-feather";
import Flex from "../../../components/flex/Flex";
import OrderSearch from "../components/order/OrderSearch";
import Select from "../../../components/elements/select/Select";
import Button from "../../../components/button";
import Title from "../../../components/title";
import Box from "../../../components/box";
import Normalizer from "../../../services/normalizer";

const OrderListContainer = ({history, orders, entities, isFetched, totalItems, getOrdersList}) => {
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({page: 0});
    useEffect(() => {
        getOrdersList({...filter});
    }, []);

    orders = Normalizer.Denormalize(orders,[OrderScheme],entities);
    const deleteOrder = (id) => {
        confirmAlert({
            title: 'Ишончингиз комилми?',
            buttons: [
                {
                    label: 'Ўчириш',
                    onClick: () => {
                        setLoading(true);
                        ApiService.DeleteOrder(id).then((res) => {
                            if (res && res.data) {
                                setLoading(false);
                                toast.success('SUCCESS');
                                getOrdersList({...filter});
                            }
                        }).catch((error) => {
                            setLoading(false);
                            if (error.response && error.response.data) {
                                toast.error(`${error.response.data}`)
                            }
                        })
                    }
                },
                {
                    label: 'Бекор қилиш',
                }
            ]
        });
    };
    return (
        <>{isFetched ?<>
            <Row className={'mb-24'}>
                <Col xs={12}>
                    <hr/>
                </Col>
            </Row>
            <Row className={'mb-24'} align={'center'}>
                <Col xs={6}>
                    <Title>Ордерларни рўйхатга олиш </Title>
                </Col>
                <Col xs={6} className={'text-right'}>
                    <Button success lg thin handleClick={() => history.push('/order/create')}>Янги яратиш</Button>
                    <Button className={'ml-16'} outlined lg
                            thin>Экспорт</Button>
                </Col>
            </Row>
            <Row className={'mb-16'}>
                <Col xs={12}>
                    <Box oval>
                        <Row>
                            <Col xs={12}>
                                <Flex justify={'space-between'}>
                                    <Flex>
                                        <OrderSearch className={'mr-16'}/>
                                        <Select placeholder={'Зўравонлик турлари'} className={'mr-16'}/>
                                        <Select placeholder={'Вилоят'} className={'mr-16'}/>

                                    </Flex>
                                    <Button success>Қидириш</Button>
                                </Flex>
                            </Col>
                        </Row>
                    </Box>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {isFetched ? <Table current={get(filter, 'page', 0)}
                                        paginate={({selected}) => setFilter(filter => ({...filter, page: selected}))}
                                        totalItems={totalItems}
                                        columns={['ID', 'Ҳимоя ордер серияси', 'Вилоят', 'Туман', 'Маҳалла',  'Очилиш сабаби', 'Ёпилиш сабаби','Шахсни кўшиш','Ҳолати',  'Ордер берилган\n' +
                                        'вақти', 'Actions']}>
                        {
                            !isEmpty(orders) ? orders && orders.map((order, index) => <tr key={get(order, '_id')}>
                                <td>{index + 1}</td>
                                <td>{get(order, 'protectionorderseries', '-')}</td>
                                <td>{get(order, 'regiId.name', '-')}</td>
                                <td>{get(order, 'districtId.name', '-')}</td>
                                <td>{get(order, 'mfy.name', '-')}</td>
                                <td>{get(order, 'basisorder.name', '-')}</td>
                                <td>{get(order, 'basistermination.name', '-')}</td>
                                <td><PlusCircle className={'mr-8 cursor-pointer'} color="#15BF22" size={36}
                                         onClick={() => history.push(`/order/attach/victim/${get(order, '_id')}`)}/><MinusCircle className={' cursor-pointer'} color="#E58B8B" size={36}
                                                                                                                                 onClick={() => history.push(`/order/attach/violent/${get(order, '_id')}`)}/></td>
                                <td className={'w-200'}>
                                    {isEqual(get(order, 'orderstatus.name'),'узайтирилган') && <Button danger status>{get(order, 'orderstatus.name', '-')}</Button>}
                                    {isEqual(get(order, 'orderstatus.name'),'тугатилган') && <Button success status>{get(order, 'orderstatus.name', '-')}</Button>}
                                    {isEqual(get(order, 'orderstatus.name'),'янги берилган') && <Button primary status>{get(order, 'orderstatus.name', '-')}</Button>}
                                </td>
                                <td>{moment(get(order, 'createdAt', '-')).format("DD-MM-YYYY")}</td>
                                <td>
                                    <Eye className={'mr-8 cursor-pointer'} color="#FFC700" size={24}
                                         onClick={() => history.push(`/order/view/${get(order, '_id')}`)}/>
                                    <Edit className={'mr-8 cursor-pointer'} color="#2BCC71" size={24}
                                          onClick={() => history.push(`/order/update/${get(order, '_id')}`)}/>
                                    <Trash
                                        onClick={() => deleteOrder(get(order, '_id'))} className={'cursor-pointer'}
                                        color="#E3111A" size={24}/></td>
                            </tr>) : <tr>
                                <td colSpan={4}>Маълумот мавжуд эмас</td>
                            </tr>
                        }
                    </Table> : <ContentLoader/>}
                </Col>
            </Row>
        </>:<ContentLoader />
        }
        </>
    );
}
;

const mapStateToProps = (state) =>
{
    return {
        entities: get(state, 'normalizer.entities', {}),
        orders: get(state, 'normalizer.data.order-list.result.oreders', []),
        isFetched: get(state, 'normalizer.data.order-list.isFetched', false),
        totalItems: get(state, 'normalizer.data.order-list.result.totalItems', 0),
    }
}
const mapDispatchToProps = (dispatch) =>
{
    return {
        getOrdersList: ({page = 0, size = 20}) => {
            const storeName = 'order-list';
            const entityName = 'order';
            const scheme = {oreders: [OrderScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/orders',
                    config: {
                        params: {
                            page: page + 1,
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        setListTrigger: () => dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                scheme: {},
                storeName: 'order-list',
            },
        })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(OrderListContainer));
