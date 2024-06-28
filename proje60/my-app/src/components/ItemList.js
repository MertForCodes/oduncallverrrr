// ItemList.jsx
import React from 'react';
import { List, Button } from 'antd';

const ItemList = ({ items, deleteItem, addToCart }) => {
    return (
        <List
            dataSource={items}
            renderItem={(item, index) => (
                <List.Item key={index}>
                    <div>
                        <div>{item.name} - {item.duration} {item.durationType} - {item.price} TL</div>
                        <div>Şehir: {item.city} / İlçe: {item.district}</div>
                    </div>
                    <Button onClick={() => deleteItem(index)} style={{ marginLeft: 'auto' }}>Sil</Button>
                    <Button onClick={() => addToCart(item)} style={{ marginLeft: '8px' }}>Sepete Ekle</Button>
                </List.Item>
            )}
        />
    );
};

export default ItemList;
