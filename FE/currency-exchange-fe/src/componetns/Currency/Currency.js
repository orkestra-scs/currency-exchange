import { useState, useEffect } from "react";
import { addCurrency,getCurrencies,deleteCurrency, updateCurrency } from "../../services/WebService";
import { Form, Input, Button,Table, Space, Popconfirm, Modal, Layout, Row, Col,Typography, message } from 'antd';
import NavBar from "../Navigation/NavBar";

const { Title } = Typography;
const { Header, Content } = Layout;

export default function CurrencyScreen(){
    const [symbol, setSymbol] = useState('');
    const [description, setDescription] = useState('');
    const [symbolEdit, setSymbolEdit] = useState('');
    const [descriptionEdit, setDescriptionEdit] = useState('');
    const [idEdit, setIdEdit] = useState(0);
    const [currencies, setCurrencies] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    useEffect(() => {
        handleGetCurrencies();
    }, []);

    const handleAddCurrency = () => {
        addCurrency({symbol,description})
        .then(() => {
            message.success("Created "+ symbol);
            setSymbol('');
            setDescription('');
            handleGetCurrencies();
        })
        .catch((err) => {
            console.log("error: " +err);
            message.error("Failed to create "+ symbol);
        })
    }

    const handleUpdateCurrency = () => {
        updateCurrency({id: idEdit, symbol:symbolEdit,description:descriptionEdit})
        .then(() => {
            message.success("Updated "+ symbolEdit);
            handleGetCurrencies();
            handleCancelEditModal();
        })
        .catch((err) => {
            console.log("error: " +err);
            message.error("Failed to update "+ symbolEdit);
        })
    }

    const handleGetCurrencies = () => {
        getCurrencies()
        .then((response) => {
            setCurrencies(response.data);
        })
        .catch((err) => console.log(err))
    }

    const handleDeleteSymbol = (record) => {
        deleteCurrency(record.symbol)
        .then(() => handleGetCurrencies())
        .catch((error) => console.log(error))
    }

    const handleShowEditModal = (record) => {
        setIdEdit(record.id);
        setSymbolEdit(record.symbol);
        setDescriptionEdit(record.description);
        setShowEditModal(true);
    }

    const handleCancelEditModal = () => {
        setShowEditModal(false);
        setSymbolEdit('');
        setDescriptionEdit('');
    }
    const columns = [
        {
          title: 'Symbol',
          dataIndex: 'symbol',
          key: 'symbol',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <Button type="link" onClick={() => handleShowEditModal(record)}>Edit </Button>
                <Popconfirm
                    title="Are you sure?"
                    onConfirm={()=> handleDeleteSymbol(record)}
                    >
                    <Button type="link">Delete</Button>
                </Popconfirm>
              </Space>
            ),
        },
    ]

    return(
        <Layout>
            <Header className="header" style={{background: 'inherit'}}> <NavBar/> </Header>
            
            <Content style={{ padding: '2em 50px' }}>
                
                <Row gutter={8*4}>
                    <Col span={12}>
                    
                        <Form
                            name="currency"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            autoComplete="off"
                        >
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Title level={4}> Add a new currency</Title>
                            </Form.Item>
                            <Form.Item
                                label="Symbol"
                                rules={[{ required: true, message: 'Please input symbol!' }]}
                            >
                                <Input value={symbol} onChange={(e) => setSymbol(e.target.value)}/>
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                rules={[{ required: true, message: 'Please input description!' }]}
                            >
                                <Input value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" onClick={handleAddCurrency}>
                                    Add
                                </Button>
                            </Form.Item>
                            
                        </Form>
                    </Col>
                    <Col span={12}>
                        <Table columns={columns} dataSource={currencies} />
                    </Col>
                </Row>
                    
                    <>
                        <Modal title="Edit Currency" visible={showEditModal} onOk={handleUpdateCurrency} onCancel={handleCancelEditModal}>
                                        <Form
                                name="editCurrency"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                autoComplete="off"
                            >
                        
                                <Form.Item
                                    label="Symbol"
                                    rules={[{ required: true, message: 'Please input symbol!' }]}
                                >
                                    <Input value={symbolEdit} onChange={(e) => setSymbolEdit(e.target.value)}/>
                                </Form.Item>

                                <Form.Item
                                    label="Description"
                                    rules={[{ required: true, message: 'Please input description!' }]}
                                >
                                    <Input value={descriptionEdit} onChange={(e) => setDescriptionEdit(e.target.value)}/>
                                </Form.Item>
                                
                            </Form>
                        </Modal>
                    </>
            </Content>         
        </Layout>
    )
}
