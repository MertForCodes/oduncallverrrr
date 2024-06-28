import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

const FilterForm = ({ filterItems }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minDuration, setMinDuration] = useState('');
    const [maxDuration, setMaxDuration] = useState('');

    const handleFilter = () => {
        filterItems(
            minPrice === '' ? null : parseFloat(minPrice),
            maxPrice === '' ? null : parseFloat(maxPrice),
            minDuration === '' ? null : parseInt(minDuration),
            maxDuration === '' ? null : parseInt(maxDuration)
        );
    };

    return (
        <Form layout="vertical">
            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item label="Min Fiyat">
                        <Input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="Min Fiyat"
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Max Fiyat">
                        <Input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Max Fiyat"
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Min Süre">
                        <Input
                            type="number"
                            value={minDuration}
                            onChange={(e) => setMinDuration(e.target.value)}
                            placeholder="Min Süre"
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Max Süre">
                        <Input
                            type="number"
                            value={maxDuration}
                            onChange={(e) => setMaxDuration(e.target.value)}
                            placeholder="Max Süre"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" onClick={handleFilter}>
                    Filtrele
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FilterForm;
