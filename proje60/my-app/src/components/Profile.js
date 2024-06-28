import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Layout, Radio, message } from 'antd';

const { Content } = Layout;

const Profile = ({ setUser }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        gender: '',
    });

    useEffect(() => {
        const email = formData.email;
        const savedData = localStorage.getItem(email);
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, [formData.email]);

    const handleSubmit = (values) => {
        setFormData(values);
        localStorage.setItem(values.email, JSON.stringify(values));
        setUser(values.email); // Oturum açan kullanıcıyı ayarla
        message.success('Profil başarıyla güncellendi.');
    };

    return (
        <Content style={{ padding: '24px', background: '#fff', borderRadius: '4px' }}>
            <h1>Profil Düzenle</h1>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
                onFinish={handleSubmit}
                initialValues={formData}
            >
                <Form.Item
                    label="İsim"
                    name="firstName"
                    rules={[{ required: true, message: 'Lütfen isminizi girin!' }]}
                >
                    <Input onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                </Form.Item>

                <Form.Item
                    label="Soyisim"
                    name="lastName"
                    rules={[{ required: true, message: 'Lütfen soyisminizi girin!' }]}
                >
                    <Input onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                </Form.Item>

                <Form.Item
                    label="Telefon Numarası"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Lütfen telefon numaranızı girin!' }]}
                >
                    <Input onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                </Form.Item>

                <Form.Item
                    label="E-posta"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Lütfen geçerli bir e-posta adresi girin!' }]}
                >
                    <Input onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </Form.Item>

                <Form.Item
                    label="Cinsiyet"
                    name="gender"
                    rules={[{ required: true, message: 'Lütfen cinsiyetinizi seçin!' }]}
                >
                    <Radio.Group onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                        <Radio value="male">Erkek</Radio>
                        <Radio value="female">Kadın</Radio>
                        <Radio value="other">Diğer</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                    <Button type="primary" htmlType="submit">
                        Kaydet
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    );
};

export default Profile;
