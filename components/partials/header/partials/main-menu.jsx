import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ALink from '~/components/features/alink';
import { useFeaturedCategoriesQuery } from '~/framework/rest/categories/featured-categories-query';

function MainMenu() {
    const router = useRouter();
    let path = router.asPath;
    let query = router.query;
    let locale = router.locale;

    function showAllDemos(e) {
        let demoItems = document.querySelectorAll('.demo-item.hidden');

        for (let i = 0; i < demoItems.length; i++) {
            demoItems[i].classList.toggle('show');
        }

        document
            .querySelector('.view-all-demos')
            .classList.toggle('disabled-hidden');
        e.preventDefault();
    }

    const {
        data: categories,
        isLoading,
        isError,
    } = useFeaturedCategoriesQuery({ limit: 5, locale });

    return (
        <nav className="main-nav">
            <ul className="menu sf-arrows">
                {categories &&
                    categories.map(category => (
                        <li
                            key={category.slug}
                            className={
                                path.indexOf('element') > -1 ? 'active' : ''
                            }
                        >
                            <ALink
                                href={`/search?category=${category.slug}`}
                                className={`${
                                    category.children.data.length
                                        ? 'sf-with-ul'
                                        : ''
                                }`}
                            >
                                {category.name}
                            </ALink>

                            {category.children.data.length != 0 && (
                                <ul>
                                    {category.children.data.map(item => (
                                        <li key={item.slug}>
                                            <ALink href="/pages/contact">
                                                {item.name}
                                            </ALink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
            </ul>
        </nav>
    );
}

export default MainMenu;
