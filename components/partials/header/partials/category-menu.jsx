import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import ALink from '~/components/features/alink';
import { useFeaturedCategoriesQuery } from '~/framework/rest/categories/featured-categories-query';

function CategoryMenu() {
    const router = useRouter();
    const query = router.query;
    const locale = router.locale;
    const { t } = useTranslation('common');

    const {
        data: categories,
        isLoading,
        isError,
    } = useFeaturedCategoriesQuery({ limit: 5, locale });

    return (
        <div className="dropdown category-dropdown">
            <ALink
                href="/shop/sidebar/list"
                className="dropdown-toggle"
                title="Browse Categories"
            >
                {t('Browse Categories')}
            </ALink>

            <div className="dropdown-menu">
                <nav className="side-nav">
                    <ul className="menu-vertical sf-arrows">
                        {categories &&
                            categories.map(category => (
                                <li
                                    key={category.slug}
                                    className={
                                        query.category == 'electronics'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <ALink
                                        href={`/search?category=${category.slug}`}
                                        scroll={false}
                                    >
                                        {category.name}
                                    </ALink>
                                </li>
                            ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default CategoryMenu;
