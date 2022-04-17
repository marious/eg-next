import ALink from '~/components/features/alink';

export default function LoginForm() {
    return (
        <div>
            <form action="#">
                <div className="form-group">
                    <label htmlFor="singin-email-2">
                        Username or email address *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="singin-email-2"
                        name="singin-email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="singin-password-2">Password *</label>
                    <input
                        type="password"
                        className="form-control"
                        id="singin-password-2"
                        name="singin-password"
                        required
                    />
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
