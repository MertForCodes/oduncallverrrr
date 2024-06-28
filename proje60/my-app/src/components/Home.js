import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Button, Modal, List, Form, Input, Select, message } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Profile from './Profile';
import ItemList from './ItemList';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './arkaplan.jpg'; // Arkaplan resmi

const { Header, Content, Sider } = Layout;
const { Option } = Select;

const items1 = [
    { key: '1', label: 'Profil' },
    { key: '2', label: 'Ürün Ekleme' },
    { key: '3', label: 'Diğer' },
];

const items2 = [
    {
        key: 'sub1',
        icon: <UserOutlined />,
        label: 'Profil',
        children: [
            { key: 'option1-profile', label: 'Profil' },
            { key: 'option2-address', label: 'Adreslerim' },
            { key: 'option3-payment', label: 'Ödeme' }
        ],
    },
    {
        key: 'sub2',
        icon: <LaptopOutlined />,
        label: 'Ürünler',
        children: [
            { key: 'option1-sub2', label: 'Tüm Ürünler' },
        ],
    },

];

const Home = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('1');
    const [selectedSubMenu, setSelectedSubMenu] = useState('option1-profile');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const savedItems = localStorage.getItem(`${user}-items`);
            if (savedItems) {
                const parsedItems = JSON.parse(savedItems);
                setItems(parsedItems);
                setFilteredItems(parsedItems);
            }
        }
    }, [user]);

    const handleMenuItemClick = (key) => {
        setSelectedMenuItem(key);
        setSelectedSubMenu(null);
    };

    const handleSubMenuClick = ({ key }) => {
        setSelectedSubMenu(key);
    };

    const addItem = (values) => {
        const newItem = {
            name: values.name,
            duration: values.duration,
            durationType: values.durationType,
            price: parseFloat(values.price),
            city: values.city,
            district: values.district,
        };

        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        setFilteredItems(updatedItems);
        localStorage.setItem(`${user}-items`, JSON.stringify(updatedItems));
        message.success('Ürün başarıyla eklendi.');
    };

    const deleteItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        setFilteredItems(newItems);
        localStorage.setItem(`${user}-items`, JSON.stringify(newItems));
    };

    const filterItems = (values) => {
        const { minPrice, maxPrice, minDuration, maxDuration, sortField, sortOrder } = values;
        let filtered = items.filter((item) => {
            const priceCheck = (!minPrice || item.price >= minPrice) && (!maxPrice || item.price <= maxPrice);
            const durationCheck = (!minDuration || item.duration >= minDuration) && (!maxDuration || item.duration <= maxDuration);
            return priceCheck && durationCheck;
        });

        if (sortField) {
            filtered = filtered.sort((a, b) => {
                if (sortOrder === 'ascend') {
                    return a[sortField] > b[sortField] ? 1 : -1;
                } else {
                    return a[sortField] < b[sortField] ? 1 : -1;
                }
            });
        }

        setFilteredItems(filtered);
    };

    const addToCart = (item) => {
        setCart([...cart, item]);
        Modal.success({
            title: 'Ürün Sepete Eklendi',
            content: `${item.name} sepete eklendi.`,
        });
    };

    const deleteFromCart = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const renderContent = () => {
        if (selectedMenuItem === '1') {
            switch (selectedSubMenu) {
                case 'option1-profile':
                    return <Profile setUser={setUser} />;
                default:
                    return null;
            }
        } else if (selectedMenuItem === '2') {
            return (
                <div className="product-add-form">
                    <Form layout="vertical" onFinish={addItem}>
                        <Form.Item label="Ürün Adı" name="name" rules={[{ required: true, message: 'Lütfen ürün adını girin!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Süre" name="duration" rules={[{ required: true, message: 'Lütfen süreyi girin!' }]}>
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item label="Süre Tipi" name="durationType" rules={[{ required: true, message: 'Lütfen süre tipini seçin!' }]}>
                            <Select>
                                <Option value="gün">Gün</Option>
                                <Option value="hafta">Hafta</Option>
                                <Option value="ay">Ay</Option>
                                <Option value="saat">Saat</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Fiyat" name="price" rules={[{ required: true, message: 'Lütfen fiyatı girin!' }]}>
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item label="Şehir" name="city" rules={[{ required: true, message: 'Lütfen şehir adını girin!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="İlçe" name="district" rules={[{ required: true, message: 'Lütfen ilçe adını girin!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Ürün Ekle</Button>
                        </Form.Item>
                    </Form>
                </div>
            );
        } else if (selectedMenuItem === '3') {
            return (
                <div>
                    Burada "Diğer" içeriği gösterilebilir
                </div>
            );
        }
        return null;
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[selectedMenuItem]}
                    onClick={({ key }) => handleMenuItemClick(key)}
                    style={{ flex: 1 }}
                >
                    {items1.map(item => (
                        <Menu.Item key={item.key}>{item.label}</Menu.Item>
                    ))}
                </Menu>
                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => setIsCartVisible(true)}
                    className="cart-button"
                >
                    Sepetim ({cart.length})
                </Button>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['option1-sub2']}
                        defaultOpenKeys={['sub2']}
                        selectedKeys={[selectedSubMenu]}
                        onClick={handleSubMenuClick}
                    >
                        {items2.map(item => (
                            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                                {item.children.map(child => (
                                    <Menu.Item key={child.key}>{child.label}</Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        ))}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Ana Sayfa</Breadcrumb.Item>
                        <Breadcrumb.Item>Liste</Breadcrumb.Item>
                        <Breadcrumb.Item>Uygulama</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background" style={{
                            padding: 24, margin: 0, minHeight: 280, backgroundImage: `url(${backgroundImage})`
                        }}>
                        {selectedSubMenu === 'option1-sub2' && (
                            <div>
                                <Form layout="inline" onFinish={filterItems}>
                                    <Form.Item label="Min Fiyat" name="minPrice">
                                        <Input type="number" />
                                    </Form.Item>
                                    <Form.Item label="Max Fiyat" name="maxPrice">
                                        <Input type="number" />
                                    </Form.Item>
                                    <Form.Item label="Min Süre" name="minDuration">
                                        <Input type="number" />
                                    </Form.Item>
                                    <Form.Item label="Max Süre" name="maxDuration">
                                        <Input type="number" />
                                    </Form.Item>
                                    <Form.Item label="Sıralama Kriteri" name="sortField">
                                        <Select>
                                            <Option value="price">Fiyat</Option>
                                            <Option value="duration">Süre</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Sıralama Yönü" name="sortOrder">
                                        <Select>
                                            <Option value="ascend">Artan</Option>
                                            <Option value="descend">Azalan</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">Filtrele</Button>
                                    </Form.Item>
                                </Form>
                                <ItemList items={filteredItems} deleteItem={deleteItem} addToCart={addToCart} />
                            </div>
                        )}
                        {selectedSubMenu !== 'option1-sub2' && renderContent()}
                    </Content>
                </Layout>
            </Layout>
            <Modal title="Sepetim" visible={isCartVisible} onCancel={() => setIsCartVisible(false)} footer={null}>
                <List
                    dataSource={cart}
                    renderItem={(item, index) => (
                        <List.Item key={index}>
                            {item.name} - {item.duration} {item.durationType} - {item.price.toFixed(2)} TL
                            <Button onClick={() => deleteFromCart(index)} className="delete-button">Sil</Button>
                        </List.Item>
                    )}
                />
                <div className="total-price">
                    Toplam Fiyat: {calculateTotalPrice()} TL
                </div>
                <Button
                    type="primary"
                    onClick={() => navigate('/payment')}
                    style={{ marginTop: '16px' }}
                >
                    Sepeti Onayla
                </Button>
            </Modal>
        </Layout>
    );
};

export default Home;
