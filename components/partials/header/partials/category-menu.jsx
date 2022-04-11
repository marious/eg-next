import { useRouter } from 'next/router';

import ALink from '~/components/features/alink';
import { useFeaturedCategoriesQuery } from '~/framework/rest/categories/featured-categories-query';

function CategoryMenu() {
    const query = useRouter().query;

    const {
        data: categories,
        isLoading,
        isError,
    } = useFeaturedCategoriesQuery({ limit: 5 });

    return (
        <div className="dropdown category-dropdown">
            <ALink
                href="/shop/sidebar/list"
                className="dropdown-toggle"
                title="Browse Categories"
            >
                Browse Categories
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
                                        href="/shop/sidebar/3cols?category=electronics"
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
