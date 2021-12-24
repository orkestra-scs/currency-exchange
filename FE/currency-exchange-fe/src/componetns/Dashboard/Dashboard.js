import { useState, useEffect } from "react";
import { Select, Layout, Row, Col,Typography } from 'antd';
import { Line } from '@ant-design/charts';
import { getCurrencies, getCurrenyLatest,getCurrenyTimeSeries } from "../../services/WebService";
import NavBar from '../Navigation/NavBar';
const { Header, Content } = Layout;
const { Option } = Select;
const { Title,Text } = Typography;

export default function DashboardScreen(){
    const [currencies, setCurrencies] = useState([]);
    const [currencyData, setCurrencyData] = useState([{ date: '0', value: 0 }]);
    const [currencyLatest, setCurrencyLatest] = useState('');
    const [currencySelected, setCurrencySelected] = useState('');

    useEffect(() => {
        handleGetCurrencies();
    }, []);

    const handleGetCurrencies = () => {
        getCurrencies()
        .then((response) => {
            setCurrencies(response.data);
        })
        .catch((err) => console.log(err))
    }
    const handleSelectCurrency = (symbol) => {
        setCurrencySelected(symbol);
        getCurrenyLatest(symbol)
            .then((data) => setCurrencyLatest(data.data.rates[symbol]));


        const endDate = new Date();
        let startDate = new Date(); 
        startDate.setDate( startDate.getDate() - 14);
        getCurrenyTimeSeries(symbol,startDate.toLocaleDateString('en-CA'), endDate.toLocaleDateString('en-CA'))
            .then((data) => {
                let x = [];
                while (startDate <= endDate) {
                    x.push({date:startDate.toLocaleDateString('en-CA'), value: data.data.rates[startDate.toLocaleDateString('en-CA')][symbol]})
                    startDate.setDate( startDate.getDate() +1);
                }
                setCurrencyData(x);
            })
        
    }
    const chartConfig = {
        data:currencyData,
        padding: 'auto',
        xField: 'date',
        yField: 'value',
        xAxis: {
          tickCount: 5,
        },
        smooth: true,
      };
    return(
        <Layout>
            <Header className="header" style={{background: 'inherit'}}> <NavBar/> </Header>
            <Content style={{ padding: '2em 50px' }}>
                <Row>
                    <Col span={6}><Title level={2} > Select a Currency </Title>  </Col>
                    <Col span={6}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select a currency"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                            onSelect={(e) => handleSelectCurrency(e)}
                        >   
                            {currencies.map(currency => <Option value={currency.symbol}>{currency.description} : {currency.symbol}</Option>)}
                            
                        </Select>
                    </Col>
                </Row>  
                { currencySelected?
                    <>
                        <Row>
                            <Col span={6}>
                                <Title level={3}>USD/{currencySelected}</Title>
                                <Text > ({currencyLatest})</Text>
                            </Col>
                        </Row>  
                        <Line {...chartConfig} />
                    </>
                    :
                    null
                }
                
            </Content>
          
        </Layout>
    )
}
