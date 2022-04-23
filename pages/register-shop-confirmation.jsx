import React from 'react';
import { useTranslation } from 'react-i18next';

export default function RegisterShopConfirmation() {
    const { t } = useTranslation('common');
    return (
        <div className="main">
            <div className="container">
                <div className="col-md-8 mx-auto">
                    <img src="images/shop-confirmation.jpg" alt="" />
                    <h3 className="text-center">
                        {t('Thanks for registering your shop')}
                    </h3>
                    <h5 className="text-center">
                        {t('We will get back to you very soon')}
                    </h5>
                </div>
            </div>
        </div>
    );
}
