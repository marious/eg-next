import React from 'react';
import Link from '~/components/ui/link';

export default function AuthMenu({
    isAuthorized,
    href,
    className,
    btnProps,
    children,
}) {
    return isAuthorized ? (
        <Link href={href} className={className}>
            {children}
        </Link>
    ) : (
        <button {...btnProps} />
    );
}
