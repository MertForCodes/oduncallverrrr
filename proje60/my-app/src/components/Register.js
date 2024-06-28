import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Layout, Alert, Modal } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Content } = Layout;

const Register = () => {
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Modal gösterim durumu için state
    const navigate = useNavigate();

    const onFinish = (values) => {
        const { username, email, password } = values;

        // Kullanıcı verilerini localStorage'da kontrol et
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            setError('Bu e-posta ile kayıtlı bir kullanıcı zaten var.');
        } else {
            // Yeni kullanıcıyı localStorage'a ekle
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            setShowModal(true); // Başarılı kayıt durumunda modalı göster
        }
    };

    const handleModalOk = () => {
        setShowModal(false);
        navigate('/login'); // Modalı kapatıp giriş sayfasına yönlendir
    };

    return (
        <Content style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Kayıt Ol</h2>
            {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />}
            <Form
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                style={{ backgroundColor: '#f9f9f9', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Kullanıcı adınızı giriniz!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Kullanıcı adı" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Geçerli bir e-posta adresi giriniz!',
                        },
                        {
                            required: true,
                            message: 'E-posta adresinizi giriniz!',
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="E-posta adresi" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Şifrenizi giriniz!',
                        },
                        {
                            min: 6,
                            message: 'Şifre en az 6 karakter olmalıdır!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Şifre" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Şifrenizi tekrar giriniz!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Girdiğiniz şifreler eşleşmiyor!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Şifreyi tekrar giriniz" />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="agreement" valuePropName="checked" noStyle rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Kullanım koşullarını kabul etmelisiniz!')) }]}>
                        <Checkbox>
                            Kullanım koşullarını okudum ve kabul ediyorum
                        </Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Kayıt Ol
                    </Button>
                    Zaten bir hesabınız var mı? <Link to="/login">Giriş Yap!</Link>
                </Form.Item>
            </Form>

            {/* Onay Modalı */}
            <Modal
                title="Kayıt Onayı"
                visible={showModal}
                onOk={handleModalOk}
                onCancel={() => setShowModal(false)}
                okText="Tamam"
                cancelText="İptal"
            >
                <p>Onay maili adresinize gönderildi.</p>
            </Modal>
        </Content>
    );
};

export default Register;
