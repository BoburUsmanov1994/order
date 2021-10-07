import React, {useState} from 'react';
import {Col, Row} from "react-grid-system";
import {isEqual,includes,get} from "lodash";
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
import dropdownData from "../../../mock/dropdownData";

const RegionContainer = () => {
    const [items] = useState(dropdownData);
    const [activeItems,setActiveItems] = useState([1,2,3])
    return (
        <>
            <Row className={'mb-32'}>
                <Col xs={10}>
                    <SubHeaderBox className={'mb-32'}/>
                    <Row align={'center'} className={'mb-32'}>
                        <Col xs={5}>
                            <Title sm>Тазйиқ ва зўравонликдан жабрланган хотин-қизларни статистикаси</Title>
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
                    <Row>
                        <Col xs={12}>
                            <CustomAreaChart type={'monotone'}/>
                        </Col>
                    </Row>
                </Col>
                <Col xs={2}>
                    <ProgressBox/>
                </Col>
            </Row>
            <Row className={'mb-24'}>
                <Col xs={8}>
                    <Title lg>Тазйиқ ва зўравонликдан жабрланган хотин - қизларни ҳисобга олиш ягона
                        статистикаси
                    </Title>
                </Col>
                <Col xs={4} className={'text-right'}>
                    <Dropdown items={items} activeItems={activeItems} setActiveItems={setActiveItems} />
                </Col>
            </Row>
            <Row>
                {items && items.map(({id, name}) => includes(activeItems,id) && <Col key={id} xs={4}>
                    <CustomPieChart name={name}/>
                </Col>)
                }

            </Row>
        </>
    );
};

export default RegionContainer;
