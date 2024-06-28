import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom'; // React Router'dan useNavigate hook'u

const WelcomePage = () => {
    const navigate = useNavigate(); // React Router'dan useNavigate hook'u

    const handleGoToHome = () => {
        navigate('/home'); // Ana sayfaya yönlendir
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#9CECE7', // Arka plan rengi
            color: '#000000', // Yazı rengi siyah olarak değiştirildi
            padding: '0 20px' // İçerik kenar boşlukları
        }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Hoş Geldiniz!</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center', maxWidth: '400px' }}>
                Online Ödünç Alıp Verme Sitesine Hoşgeldiniz. Ana Sayfaya Tıklayarak Ödünç Alıp Verebilirsiniz
            </p>
            <Button type="primary" size="large" onClick={handleGoToHome}>Ana Sayfaya Git</Button>
        </div>
    );
};

export default WelcomePage;
