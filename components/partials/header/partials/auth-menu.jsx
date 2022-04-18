import SignupModal from '~/components/features/modals/signup-modal';
import Link from '~/components/ui/link';
import { ROUTES } from '~/utils/routes';

export default function AuthMenu({ isAuthorized }) {
    return isAuthorized ? (
        <Link href={ROUTES.ACCOUNT}>
            <div className="icon">
                <i className="icon-user"></i>
            </div>
            <p>My Account</p>
        </Link>
    ) : (
        <SignupModal />
    );
}
