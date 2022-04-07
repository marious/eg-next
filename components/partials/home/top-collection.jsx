import { Tab, Tabs, TabPanel, TabList } from "react-tabs";

import ProductTwelve from "~/components/features/products/product-twelve";
import { useFeaturedCategoriesQuery } from "~/framework/rest/categories/featured-categories-query";
import { useLatestProductsQuery } from "~/framework/rest/products/latest-products.query";

import { catFilter } from "~/utils";

function TopCollection() {
 const {data: products, isLoading: loading, isError} = useLatestProductsQuery({limit: 10});
 const {data: categories, isLoading: loadingCategories} = useFeaturedCategoriesQuery({limit: 5});

  if (loadingCategories) {
    return <div>Loading...</div>
  }

  return (
    <Tabs defaultIndex={0} selectedTabClassName="show">
      <div className="container">
        <div className="heading heading-center mb-3">
          <h2 className="title">Top Selling Products</h2>
          <TabList className="nav nav-pills nav-border-anim justify-content-center">
            <Tab className="nav-item">
              <span className="nav-link">All</span>
            </Tab>

            {!loadingCategories &&
              categories.map((category) => (
                <Tab className="nav-item" key={category.id}>
                  <span className="nav-link">{category.name}</span>
                </Tab>
              ))}
          </TabList>
        </div>

        <TabPanel>
          <div className="products">
            <div className="row">
              {loading || products.length == 0
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                    <div
                      className="col-6 col-md-4 col-lg-3 col-xl-5col"
                      key={index}
                    >
                      <div className="skel-pro"></div>
                    </div>
                  ))
                : products.map((item, index) => (
                    <div
                      className="col-6 col-md-4 col-lg-3 col-xl-5col"
                      key={index}
                    >
                      <ProductTwelve product={item} />
                    </div>
                  ))}
            </div>
          </div>
        </TabPanel>

        {categories.length &&
          categories.map((category) => (
            <TabPanel key={category.id}>
              <div className="products">
                <div className="row">
                  {loading || products.length == 0
                    ? [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div
                          className="col-6 col-md-4 col-lg-3 col-xl-5col"
                          key={index}
                        >
                          <div className="skel-pro"></div>
                        </div>
                      ))
                    : catFilter(products, category.name).map((item, index) => (
                        <div
                          className="col-6 col-md-4 col-lg-3 col-xl-5col"
                          key={index}
                        >
                          <ProductTwelve product={item} />
                        </div>
                      ))}
                </div>
              </div>
            </TabPanel>
          ))}

        {/* <TabPanel>
          <div className="products">
            <div className="row">
              {loading || products.length == 0
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                    <div
                      className="col-6 col-md-4 col-lg-3 col-xl-5col"
                      key={index}
                    >
                      <div className="skel-pro"></div>
                    </div>
                  ))
                : catFilter(products, ["decoration"]).map((item, index) => (
                    <div
                      className="col-6 col-md-4 col-lg-3 col-xl-5col"
                      key={index}
                    >
                      <ProductTwelve product={item} />
                    </div>
                  ))}
            </div>
          </div>
        </TabPanel> */}
        {/* <TabPanel>
          <div className="products">
            <div className="row">
              {loading || products.length == 0
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                    <div
                      className="col-6 col-md-4 col-lg-3 col-xl-5col"
                      key={index}
                    >
                      <div className="skel-pro"></div>
                    </div>
                  ))
                : catFilter(products, ["lighting"]).map((item, index) => (
                    <div
                      className="col-6 col-md-4 col-lg-3 col-xl-5col"
                      key={index}
                    >
                      <ProductTwelve product={item} />
                    </div>
                  ))}
            </div>
          </div>
        </TabPanel> */}
      </div>
    </Tabs>
  );
}

export default TopCollection;
