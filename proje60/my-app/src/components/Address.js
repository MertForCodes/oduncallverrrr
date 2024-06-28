import React from 'react';
import { Card } from 'antd';

const Address = () => {
    // Burada adres bilgilerini alabiliriz, örnek olarak sabit bir adres kullanıyorum
    const address = {
        name: 'Mert Gürlevik',
        street: '1. Sokak',
        city: 'Edirne',
        state: 'IL',
        zip: '22000',
        country: 'Türkiye',
        evno: '10'
    };

    return (
        <Card title="Adres Bilgileri" style={{ width: 300 }}>
            <p><strong>İsim:</strong> {address.name}</p>
            <p><strong>No:</strong> {address.evno}</p>
            <p><strong>Sokak:</strong> {address.street}</p>
            <p><strong>Şehir:</strong> {address.city}</p>
            <p><strong>Posta Kodu:</strong> {address.zip}</p>
            <p><strong>Ülke:</strong> {address.country}</p>
        </Card>
    );
};

export default Address;
