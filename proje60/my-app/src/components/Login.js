import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Row, Col, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import backgroundImage from './arkaplan.jpg'; // Arkaplan resmi

const { Title } = Typography;

const Login = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        const { email, password } = values;
        // LocalStorage'dan kullanıcı verilerini kontrol et
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Başarılı giriş durumunda yönlendirme
            navigate('/welcome'); // WelcomePage'e yönlendir
        } else {
            setError('Geçersiz e-posta veya şifre. Lütfen tekrar deneyin.');
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card style={{ width: '400px', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Row justify="center" style={{ marginBottom: '40px' }}>
                    <Col>
                        <Title level={3} style={{ marginBottom: '0' }}>Giriş Yap</Title>
                    </Col>
                </Row>
                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />}
                <Form
                    onFinish={handleSubmit}
                    initialValues={{ email: '', password: '' }}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'E-posta adresinizi giriniz!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="E-posta" size="large" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Şifre boş bırakılamaz' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Şifre" size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>Giriş Yap</Button>
                    </Form.Item>
                </Form>
                <Row justify="center">
                    <Col>
                        <Button type="link">Şifremi Unuttum</Button>
                    </Col>
                </Row>
                <Row justify="center" style={{ marginTop: '20px' }}>
                    <Col>
                        veya <Link to="/register">Hesap Oluştur</Link>
                        {/* login sayfasından registere yönlendirme */}
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default Login;
