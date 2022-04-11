import React, { useState, useEffect } from 'react';

import ProductNine from '~/components/features/products/product-nine';
import ProductEleven from '~/components/features/products/product-eleven';
import ProductTwelve from '~/components/features/products/product-twelve';

function ShopListOne(props) {
    const { loading, products = [], perPage } = props;
    const [fakeArray, setFakeArray] = useState([]);
    const [gridClass, setGridClass] = useState('col-6');
    const [type, setType] = useState('3cols');

    useEffect(() => {
        let temp = [];
        for (let i = 0; i < perPage; i++) {
            temp.push(i);
        }
        setFakeArray(temp);
    }, [perPage]);

    useEffect(() => {
        if (type === 'list' || type === '2cols') setGridClass('col-6');
        if (type === '3cols') setGridClass('col-6 col-md-4 col-lg-4');
        if (type === '4cols') setGridClass('col-6 col-md-4 col-lg-4 col-xl-3');
    }, [type]);

    return (
        <div className="products mb-3">
            {products.length == 0 && !loading ? (
                <p className="no-results">
                    No products matching your selection.
                </p>
            ) : (
                <>
                    {type == 'list' ? (
                        loading ? (
                            fakeArray.map((item, index) => (
                                <div
                                    className="skel-pro skel-pro-list"
                                    key={index}
                                ></div>
                            ))
                        ) : (
                            products.data.map((product, index) => (
                                <ProductTwelve product={product} key={index} />
                            ))
                        )
                    ) : (
                        <div className="row">
                            {loading
                                ? [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
                                      (item, index) => (
                                          <div
                                              className={gridClass}
                                              key={index}
                                          >
                                              <div className="skel-pro"></div>
                                          </div>
                                      )
                                  )
                                : products.data.map((product, index) => (
                                      <div className={gridClass} key={index}>
                                          <ProductTwelve product={product} />
                                      </div>
                                  ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default React.memo(ShopListOne);
