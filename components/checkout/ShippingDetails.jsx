import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import userUser from '~/framework/rest/auth/use-user';
import { useCitiesQuery } from '~/framework/rest/cities/cities.query';
import { useStatesQuery } from '~/framework/rest/states/states.query';
import { useAddAddressMutation } from '~/framework/rest/address/address.query';
import { useCustomerAddressesQuery } from '~/framework/rest/customer/customer.query';
import { useAtom } from 'jotai';
import { shippingAddressAtom } from '~/store/order-atom';

const addressSchema = yup.object().shape({
    full_name: yup.string().required('error-full-name-required'),
    state: yup.string().required(),
    city: yup.string().required('error-city-required'),
    email: yup.string().email('forms:email-error'),
    phone: yup.string().required('forms:phone-required'),
    address: yup.string().required('error-address-required'),
});

const defaultValues = {
    full_name: '',
    state: '',
    city: '',
    email: '',
    phone: '',
    address: '',
};

export default function ShippingDetails({ userId }) {
    const { locale } = useRouter();
    const { t } = useTranslation();
    const [selectedState, setSelectedState] = useState(null);
    const [selectedShipping, setSelectedShipping] =
        useAtom(shippingAddressAtom);

    const {
        status,
        data: customerAddresses,
        refetch,
        isLoading: loadingCustomerAddresses,
        isFetching,
    } = useCustomerAddressesQuery();

    const { data: states, isLoading: loadingStates } = useStatesQuery(locale);

    const { data: cities } = useCitiesQuery(selectedState, locale);

    const [newAddress, setNewAddress] = useState(false);

    const { mutate: createAddress, isLoading } = useAddAddressMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(addressSchema),
        defaultValues,
    });

    // useEffect(() => {
    //     if (status === 'success') {
    //         const address = customerAddresses.filter(
    //             address => address.default_shipping == 1
    //         );
    //         setSelectedShipping(address && address[0].id);
    //     }
    // }, [customerAddresses, selectedShipping]);

    function onSubmit({ full_name, state, city, email, phone, address }) {
        createAddress(
            {
                full_name,
                state,
                city,
                email,
                phone,
                address,
            },
            {
                onSuccess: data => {
                    console.log('success add address', data);
                    setNewAddress(false);
                    refetch();
                    return;
                },
                onError: error => {
                    console.log(error);
                },
            }
        );
    }

    return newAddress ? (
        <div className="col-lg-9">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <h2 className="checkout-title">Shipping Details</h2>
                <div className="row">
                    <div className="col-sm-12">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register('full_name')}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <label>Email </label>
                        <input
                            type="text"
                            className="form-control"
                            {...register('email')}
                        />
                    </div>

                    <div className="col-sm-6">
                        <label>Phone *</label>
                        <input
                            type="tel"
                            className="form-control"
                            {...register('phone')}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <label>City *</label>
                        <select
                            className="form-control"
                            {...register('state')}
                            onChange={e => {
                                // setValue('state', e.target.value, {
                                //     shouldValidate: true,
                                // });
                                setSelectedState(e.target.value);
                            }}
                        >
                            <option disabled>{t('Select City')}</option>
                            {states &&
                                states.map(state => (
                                    <option key={state.id} value={state.id}>
                                        {state.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="col-sm-6">
                        <label>Region *</label>
                        <select
                            className="form-control"
                            defaultValue={'DEFAULT'}
                            {...register('city')}
                        >
                            <option disabled value="DEFAULT">
                                {t('Select Region')}
                            </option>
                            {cities &&
                                cities.map(city => (
                                    <option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <label>Street address *</label>
                <textarea
                    className="form-control"
                    cols="30"
                    rows="4"
                    placeholder="Enter your address"
                    {...register('address')}
                ></textarea>
                <button type="submit" className="btn btn-outline-primary-2">
                    Save
                </button>
            </form>
        </div>
    ) : (
        <div className="col-lg-9">
            <div className="row">
                {!isFetching &&
                    customerAddresses &&
                    customerAddresses.map(address => (
                        <div
                            className="col-sm-4"
                            key={address.id}
                            onClick={() => setSelectedShipping(address.id)}
                        >
                            <div className="address-block">
                                <input
                                    type="radio"
                                    style={{ display: 'block', float: 'right' }}
                                    name="shipping"
                                    value={address.id}
                                    onChange={() =>
                                        setSelectedShipping(address.id)
                                    }
                                    checked={selectedShipping == address.id}
                                />

                                <ul>
                                    <li>Name: {address.full_name}</li>
                                    <li>Phone: {address.phone}</li>
                                    <li>Address: {address.address}</li>
                                    <li>City: {address.state}</li>
                                    <li>Region: {address.city}</li>
                                </ul>
                            </div>
                        </div>
                    ))}

                <div className="col-sm-4">
                    <div className="new-address">
                        <p>
                            <i className="las la-plus-circle"></i>
                        </p>
                        <a
                            href="#"
                            onClick={e => {
                                e.preventDefault();
                                setNewAddress(true);
                            }}
                        >
                            Add New Address
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
