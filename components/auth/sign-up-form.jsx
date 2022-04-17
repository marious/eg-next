import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import ALink from '~/components/features/alink';
import { useRegisterMutation } from '~/framework/rest/auth/auth.query';
import { authorizationAtom } from '~/store/authorization-atom';

const registerFormSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const defaultValues = {
    email: '',
    password: '',
};

export default function SignUpForm() {
    const router = useRouter();
    const { t } = useTranslation();
    const [errorMessage, setErrorMessage] = useState('');
    const [_, authorize] = useAtom(authorizationAtom);
    const { mutate: signUp, isLoading } = useRegisterMutation();

    return (
        <>
            <form action="#">
                <div className="form-group">
                    <label htmlFor="register-email-2">
                        Your email address *
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="register-email-2"
                        name="register-email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="register-password-2">Password *</label>
                    <input
                        type="password"
                        className="form-control"
                        id="register-password-2"
                        name="register-password"
                        required
                    />
                </div>

                <div className="form-footer">
                    <button type="submit" className="btn btn-outline-primary-2">
                        <span>SIGN UP</span>
                        <i className="icon-long-arrow-right"></i>
                    </button>

                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="register-policy-2"
                            required
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="register-policy-2"
                        >
                            I agree to the privacy policy *
                        </label>
                    </div>
                </div>
            </form>
            <div className="form-choice">
                <p className="text-center">or sign in with</p>
                <div className="row">
                    <div className="col-md-6">
                        <ALink href="#" className="btn btn-login btn-g">
                            <i className="icon-google"></i>
                            Login With Google
                        </ALink>
                    </div>
                    <div className="col-md-6 mt-1 mt-md-0">
                        <ALink href="#" className="btn btn-login  btn-f">
                            <i className="icon-facebook-f"></i>
                            Login With Facebook
                        </ALink>
                    </div>
                </div>
            </div>
        </>
    );
}
