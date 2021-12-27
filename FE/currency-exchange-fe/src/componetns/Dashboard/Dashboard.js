import { useState, useEffect } from "react";
import {Select, Layout, Row, Col, Typography, Alert} from 'antd';
import Marquee from "react-fast-marquee";
import { getCurrencies,getCurrencyTimeSeries,getAllCurrencyLatest } from "../../services/WebService";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
        getCurrencies()
            .then((response) => {
                setCurrencies(response.data);
                getAllCurrencyLatestHelper("", response.data);
            })
            .catch((err) => console.log(err))
    }, []);

    const getAllCurrencyLatestHelper = (selectedSymbol, currencies) => {
        getAllCurrencyLatest()
            .then((data) => {
                let x = [];
                currencies.forEach((currency ) => {
                    x.push({...currency, rate:data.data.rates[currency.symbol]});
                })
                setCurrencies(x);
                if(selectedSymbol && selectedSymbol !== ""){
                    setCurrencyLatest(data.data.rates[selectedSymbol]);
                }
            })
    }
    const handleSelectCurrency = (symbol) => {
        setCurrencySelected(symbol);
        getAllCurrencyLatestHelper(symbol, currencies);

        const endDate = new Date();
        let startDate = new Date(); 
        startDate.setDate( startDate.getDate() - 14);
        getCurrencyTimeSeries(symbol,startDate.toLocaleDateString('en-CA'), endDate.toLocaleDateString('en-CA'))
            .then((data) => {
                let x = [];
                while (startDate <= endDate) {
                    x.push({date:startDate.toLocaleDateString('en-CA'), value: data.data.rates[startDate.toLocaleDateString('en-CA')][symbol]})
                    startDate.setDate( startDate.getDate() +1);
                }
                setCurrencyData(x);
            })
        
    }

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
                            {currencies.map(currency => <Option key={currency.symbol} value={currency.symbol}>{currency.description} : {currency.symbol}</Option>)}
                            
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
                        <ResponsiveContainer width="100%" minHeight="300px">
                            <LineChart
                                width={500}
                                height={300}
                                data={currencyData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </>
                    :
                    null
                }
                <Alert style={{marginTop:'2em'}}
                    type="info"
                    message="Live Market Rates"
                    description={
                        <Marquee pauseOnHover gradient={false}>
                            {currencies.map((currency) => <Text>{currency.symbol} => {currency.rate},&nbsp; &nbsp;</Text>)}
                        </Marquee>
                    }
                />
            </Content>
          
        </Layout>
    )
}
