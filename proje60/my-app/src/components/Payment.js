import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Card, Modal } from 'antd';
import { CreditCardOutlined, CalendarOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

const Payment = () => {
    const [form] = Form.useForm();
    const [showModal, setShowModal] = useState(false); // Modal gösterim durumu için state

    const handleFinish = (values) => {
        console.log('Submitted payment details: ', values);
        // Ödeme işleme kodunu buraya ekleyin.
        setShowModal(true); // Ödeme yapıldıktan sonra modalı göster
    };

    const handleModalOk = () => {
        setShowModal(false);
        // Modalı kapattıktan sonra yapılacak işlemler (örneğin: ana sayfaya yönlendirme)
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Ödeme Sayfası</h2>
            <Card style={styles.card}>
                <Form form={form} onFinish={handleFinish} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Kart Üzerindeki İsim"
                        rules={[{ required: true, message: 'Kart üzerindeki isim gerekli' }]}
                    >
                        <Input
                            prefix={<UserOutlined style={styles.icon} />}
                            placeholder="Kart üzerindeki isim"
                            style={styles.input}
                        />
                    </Form.Item>
                    <Form.Item
                        name="cardNumber"
                        label="Kart Numarası"
                        rules={[{ required: true, message: 'Kart numarası gerekli' }]}
                    >
                        <Input
                            prefix={<CreditCardOutlined style={styles.icon} />}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            style={styles.input}
                        />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="expiryDate"
                                label="Son Kullanma Tarihi"
                                rules={[{ required: true, message: 'Son kullanma tarihi gerekli' }]}
                            >
                                <Input
                                    prefix={<CalendarOutlined style={styles.icon} />}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    style={styles.input}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="cvc"
                                label="CVC"
                                rules={[{ required: true, message: 'CVC gerekli' }]}
                            >
                                <Input
                                    prefix={<LockOutlined style={styles.icon} />}
                                    placeholder="123"
                                    maxLength={3}
                                    style={styles.input}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block style={styles.button}>
                            Ödeme Yap
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            {/* Teşekkür Modalı */}
            <Modal
                title="Ödeme Başarılı"
                visible={showModal}
                onOk={handleModalOk}
                onCancel={() => setShowModal(false)}
                okText="Tamam"
                cancelText="İptal"
            >
                <p>Siparişiniz alındı, teşekkür ederiz!</p>
            </Modal>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: 400,
        margin: '0 auto',
        padding: '2rem',
    },
    header: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    card: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '2rem',
    },
    icon: {
        color: 'rgba(0,0,0,.25)',
    },
    input: {
        borderRadius: '4px',
    },
    button: {
        marginTop: '1rem',
        backgroundColor: '#1890ff',
        borderColor: '#1890ff',
        borderRadius: '4px',
        height: '40px',
        fontSize: '16px',
    }
};

export default Payment;
