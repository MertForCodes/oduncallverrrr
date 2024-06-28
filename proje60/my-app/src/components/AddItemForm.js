import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const AddItemForm = ({ addItem }) => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [durationType, setDurationType] = useState('gün');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem(name, duration, durationType, price, category, city, district);
        setName('');
        setDuration('');
        setDurationType('gün');
        setPrice('');
        setCategory('');
        setCity('');
        setDistrict('');
    };

    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit}
            style={{ background: '#f0f2f5', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}
        >
            <Form.Item label="Ürün Adı">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Süre">
                <Input.Group compact>
                    <Input style={{ width: 'calc(70% - 8px)' }} type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    <Select
                        value={durationType}
                        onChange={(value) => setDurationType(value)}
                        style={{ width: '30%' }}
                    >
                        <Option value="gün">Gün</Option>
                        <Option value="hafta">Hafta</Option>
                        <Option value="ay">Ay</Option>
                    </Select>
                </Input.Group>
            </Form.Item>
            <Form.Item label="Fiyat">
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </Form.Item>
            <Form.Item label="Ürün Cinsi">
                <Input value={category} onChange={(e) => setCategory(e.target.value)} />
            </Form.Item>
            <Form.Item label="Şehir">
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </Form.Item>
            <Form.Item label="İlçe">
                <Input value={district} onChange={(e) => setDistrict(e.target.value)} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Ürün Ekle
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddItemForm;
