import React from 'react';

type FormatPriceProps = {
    price: number;
}

const FormatPrice: React.FC<FormatPriceProps> = ({ price }) => {
    return new Intl.NumberFormat('ru-RU').format(price);
};

export default FormatPrice;