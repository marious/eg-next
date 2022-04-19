import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { authorizationAtom } from '~/store/authorization-atom';
import { AUTH_TOKEN } from '../../utils/constants';
import { ROUTES } from '../../utils/routes';
import ALink from '~/components/features/alink';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '~/framework/rest/auth/auth.query';

const loginFormSchema = yup.object().shape({
    email: yup
        .string()
        .email('forms:email-error')
        .required('forms:email-required'),
    password: yup.string().required('forms:password-required'),
});

const defaultValues = {
    email: '',
    password: '',
};

export default function LoginForm({ closeModal }) {
    // const router = useRouter();
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState('');
    const [_, authorize] = useAtom(authorizationAtom);
    const { mutate: login, isLoading: loading } = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginFormSchema), defaultValues });

    function onSubmit({ email, password, remember_me }) {
        login(
            {
                email,
                password,
            },
            {
                onSuccess: data => {
                    if (data?.access_token) {
                        Cookies.set(AUTH_TOKEN, data.access_token, {
                            expires: remember_me ? 365 : undefined,
                        });
                        authorize(true);
                        closeModal();
                        return;
                    }
                    if (!data.access_token) {
                        setErrorMessage(t('forms:error-credential-wrong'));
                    }
                },
                onError: error => {
                    console.log(error.message);
                },
            }
        );
    }

    const styles = {
        errors: {
            password: errors.password ? { border: '1px solid red' } : {},
            password: errors.email ? { border: '1px solid red' } : {},
        },
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                )}
                <div className="form-group">
                    <label htmlFor="singin-email-2">Email Address *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="singin-email-2"
                        name="singin-email"
                        {...register('email')}
                        style={styles.errors.password}
                    />
                    {errors.email && (
                        <p style={{ color: 'red' }}>
                            {t(errors.email.message)}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="singin-password-2">Password *</label>
                    <input
                        type="password"
                        className="form-control"
                        id="singin-password-2"
                        name="singin-password"
                        {...register('password')}
                        style={styles.errors.password}
                    />
                    {errors.password && (
                        <p style={{ color: 'red' }}>
                            {t(errors.password.message)}
                        </p>
                    )}
                </div>

                <div className="form-footer">
                    <button type="submit" className="btn btn-outline-primary-2">
                        <span>LOG IN</span>
                        <i className="icon-long-arrow-right"></i>
                    </button>

                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="signin-remember-2"
                            {...register('remember_me')}
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="signin-remember-2"
                        >
                            Remember Me
                        </label>
                    </div>

                    <ALink href="#" className="forgot-link">
                        Forgot Your Password?
                    </ALink>
                </div>
            </form>
            <div className="form-choice">
                <p className="text-center">or sign in with</p>
                <div className="row">
                    <div className="col-sm-6">
                        <ALink href="#" className="btn btn-login btn-g">
                            <i className="icon-google"></i>
                            Login With Google
                        </ALink>
                    </div>
                    <div className="col-sm-6">
                        <ALink href="#" className="btn btn-login btn-f">
                            <i className="icon-facebook-f"></i>
                            Login With Facebook
                        </ALink>
                    </div>
                </div>
            </div>
        </div>
    );
}
