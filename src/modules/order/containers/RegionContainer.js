import React, {useState,useEffect} from 'react';
import {Col, Row} from "react-grid-system";
import {get, includes} from "lodash";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import SubHeaderBox from "../../../components/subheader";
import ProgressBox from "../../../components/progressbar";
import Title from "../../../components/title";
import Radio from "../../../components/elements/radio";
import Flex from "../../../components/flex/Flex";
import Text from "../../../components/text";
import RangeCalendar from "../../../components/range-calendar";
import CustomAreaChart from "../../../components/chart/AreaChart";
import Dropdown from "../../../components/dropdown";
import {CustomPieChart} from "../../../components/chart";
import RegionScheme from "../../../schema/RegionScheme";
import ApiActions from "../../../services/api/Actions";
import DistrictScheme from "../../../schema/DistrictScheme";
import Normalizer from "../../../services/normalizer";
import Slider from "../../../components/slider";
import exportImg from "../../../assets/images/icons/export.png";
import Map from "../../../components/map";
import ContentLoader from "../../../components/loader/ContentLoader";


const RegionContainer = ({history,id,entities,getDistrictsList,districts,region,isFetched,getOneRegion}) => {
    const [items] = useState([]);
    const [activeItems,setActiveItems] = useState([1,2,3]);
    const [active, setActive] = useState(null);

    useEffect(()=>{
        getOneRegion({region_id:id});
        getDistrictsList({regId:id});
    },[id]);

    districts = Normalizer.Denormalize(districts,[DistrictScheme],entities);
    region = Normalizer.Denormalize(region,RegionScheme,entities);
    return (
        <>{ isFetched ? <>
            <Row className={'mb-16'}>
                <Col xs={10}>
                    <SubHeaderBox className={'mb-32'}/>
                    <Row className={'mb-32'} align={'center'} gutterWidth={60}>
                        <Col xs={4}>
                            <Title md>{(get(region,'name'))} худудлари бўйича статистика  </Title>
                        </Col>
                        <Col xs={6}>
                            <Slider active={active} setActive={setActive} items={districts} />
                        </Col>
                        <Col xs={2} className={'text-right'}>
                            <Flex justify={'flex-end'}>
                                <Text className={'cursor-pointer'}>Хисоботни экспорт
                                    қилиш <img src={exportImg} className={'ml-16'}
                                               alt=""/></Text>
                            </Flex>
                        </Col>
                    </Row>
                    <Row className={'mb-32'}>
                        <Col xs={5}>
                            <Row>
                                <Col xs={12}>
                                    <Map nopopup transfer viewBox={get(region,'viewBox','')} transform={get(region,'transform','')} items={districts} setActive={setActive} active={active} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Col>
                <Col xs={2}>
                    <ProgressBox/>
                </Col>
            </Row>

            <Row align={'center'} className={'mb-32'}>
                <Col xs={5}>
                    <Title md>Тазйиқ ва зўравонликдан жабрланган хотин-қизларни статистикаси</Title>
                </Col>
                <Col xs={4}>
                    <Flex>
                        <Radio className={'mr-16'} label={'Умумий ордерлар сони'} danger/>
                        <Radio className={'mr-16'} label={'Жабрланувчилар'} warning/>
                        <Radio label={'Айбдорлар'} primary/>
                    </Flex>
                </Col>
                <Col xs={3} className={'text-right'}>
                    <Flex justify={'flex-end'}>
                        <Text>Саралаш</Text>
                        <RangeCalendar/>
                    </Flex>
                </Col>
            </Row>
            <Row className={'mb-32'}>
                <Col xs={12}>
                    <CustomAreaChart type={'monotone'}/>
                </Col>
            </Row>

            <Row className={'mb-24'}>
                <Col xs={8}>
                    <Title md>Тазйиқ ва зўравонликдан жабрланган хотин - қизларни ҳисобга олиш ягона
                        статистикаси
                    </Title>
                </Col>
                <Col xs={4} className={'text-right'}>
                    <Dropdown items={items} activeItems={activeItems} setActiveItems={setActiveItems} />
                </Col>
            </Row>
            <Row>
                {items && items.map(({id, name}) => includes(activeItems, id) && <Col key={id} xs={4}>
                    <CustomPieChart name={name}/>
                </Col>)
                }
            </Row>
            </>:<ContentLoader />}
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        entities:get(state,'normalizer.entities',{}),
        region: get(state, 'normalizer.data.get-one-region.result.region', {}),
        districts: get(state, 'normalizer.data.district-list.result.districts', []),
        isFetched: get(state, 'normalizer.data.get-one-region.isFetched', false),

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDistrictsList: ({regId, page = 1}) => {
            const storeName = 'district-list';
            const entityName = 'region';
            const scheme = {districts: [DistrictScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `/districts/reg/${regId}`,
                    config: {
                        params: {},
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getOneRegion: ({region_id}) => dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `/regions/${region_id}`,
                config: {
                    params: {},
                },
                scheme: {region: RegionScheme},
                storeName: 'get-one-region',
                entityName: 'region',
            },
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegionContainer));
