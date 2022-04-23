import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useRegisterShopMutation } from '~/framework/rest/auth/auth.query';

const vendorFormSchema = yup.object().shape({
    email: yup
        .string()
        .email('forms:email-error')
        .required('forms:email-required'),
    password: yup.string().required('forms:password-required'),
    confirmPassword: yup
        .string()
        .required('forms:password-confirmation-required'),
    name: yup.string().required('forms:name-required'),
    // phone: yup.string().required('forms:phone-required'),
    shopAddress: yup.string().required('forms:name-required'),
    shopName: yup.string().required('forms:shop-name-required'),
    shopPhone: yup.string().required('forms:shop-phone-required'),
});

const defaultValues = {
    email: '',
    password: '',
    name: '',
    // phone: '',
    shopAddress: '',
    shopName: '',
    shopPhone: '',
    confirmPassword: '',
};

export default function VendorForm() {
    const router = useRouter();
    const { t } = useTranslation();
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { mutate: registerShop, isLoading } = useRegisterShopMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(vendorFormSchema), defaultValues });

    function onSubmit({
        email,
        password,
        name,
        shopAddress,
        shopName,
        shopPhone,
        confirmPassword,
    }) {
        registerShop(
            {
                email,
                phone,
                password,
                name,
                shopAddress,
                shopName,
                shopPhone,
                confirmPassword,
            },
            {
                onSuccess: data => {
                    if (data.success === false) {
                        setErrorMessage(data.message);
                    }
                    if (data.success === true) {
                        router.push('/register-shop-confirmation');
                    }
                },
                onError: error => {
                    console.log('error', error);
                },
            }
        );
    }

    return (
        <div>
            {errorMessage && (
                <div className="alert alert-danger m-5">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                    <label htmlFor="full_name">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="full_name"
                        name="full_name"
                        {...register('name')}
                    />
                    {errors.name && (
                        <p style={{ color: 'red' }}>{t(errors.name.message)}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <PhoneInput
                        country={'eg'}
                        inputProps={{
                            name: 'phone',
                            // required: true,
                        }}
                        value={phone}
                        onChange={phone => setPhone(phone)}
                        // {...register('phone')}
                    />
                    {/* {phone == '' && (
                        <p style={{ color: 'red' }}>{t('phone required')}</p>
                    )} */}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p style={{ color: 'red' }}>
                            {t(errors.email.message)}
                        </p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        {...register('password')}
                    />
                    {errors.password && (
                        <p style={{ color: 'red' }}>
                            {t(errors.password.message)}
                        </p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                        <p style={{ color: 'red' }}>
                            {t(errors.confirmPassword.message)}
                        </p>
                    )}
                </div>
                <h4>Shop Information</h4>
                <hr />
                <div className="form-group">
                    <label htmlFor="shop_name">Shop Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="shop_name"
                        name="shop_name"
                        {...register('shopName')}
                    />
                    {errors.shopName && (
                        <p style={{ color: 'red' }}>
                            {t(errors.shopName.message)}
                        </p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="shop_phone">Shop Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="shop_phone"
                        name="shop_phone"
                        {...register('shopPhone')}
                    />
                    {errors.shopPhone && (
                        <p style={{ color: 'red' }}>
                            {t(errors.shopPhone.message)}
                        </p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="shop_address">Shop Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="shop_address"
                        name="shop_address"
                        {...register('shopAddress')}
                    />
                    {errors.shopAddress && (
                        <p style={{ color: 'red' }}>
                            {t(errors.shopAddress.message)}
                        </p>
                    )}
                </div>
                <div className="form-footer">
                    <button type="submit" className="btn btn-outline-primary-2">
                        <span>Register</span>
                        <i className="icon-long-arrow-right"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}
