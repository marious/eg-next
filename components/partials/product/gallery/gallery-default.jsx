import { Magnifier } from "react-image-magnifiers";
import React, { useState, useEffect } from "react";
import LightBox from "react-image-lightbox";

function GalleryDefault(props) {
  const { product, adClass = "product-gallery-vertical" } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (product) {
      setIsOpen(false);
      setPhotoIndex(0);
    }
  }, [product]);

  function moveNextPhoto() {
    setPhotoIndex((photoIndex + 1) % product.photos.length);
  }

  function movePrevPhoto() {
    setPhotoIndex(
      (photoIndex + product.photos.length - 1) % product.photos.length
    );
  }

  function openLightBox() {
    let index = parseInt(
      document.querySelector(".product-main-image").getAttribute("index")
    );

    if (!index) {
      index = 0;
    }
    setIsOpen(true);
    setPhotoIndex(index);
  }

  function closeLightBox() {
    setIsOpen(false);
  }

  function changeBgImage(e, image, index) {
    let imgs = document.querySelectorAll(".product-main-image img");
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].src = image;
    }

    document
      .querySelector(".product-image-gallery .active")
      .classList.remove("active");

    document.querySelector(".product-main-image").setAttribute("index", index);
    e.currentTarget.classList.add("active");
  }

  if (!product) {
    return <div></div>;
  }

  return (
    <>
      <div className={`product-gallery ${adClass}`}>
        <div className="row m-0">
          <figure className="product-main-image" index="0">
            {product.new ? (
              <span className="product-label label-new">New</span>
            ) : (
              ""
            )}

            {product.sale_price ? (
              <span className="product-label label-sale">Sale</span>
            ) : (
              ""
            )}

            {product.top ? (
              <span className="product-label label-top">Top</span>
            ) : (
              ""
            )}

            {!product.stock || product.stock == 0 ? (
              <span className="product-label label-out">Out of Stock</span>
            ) : (
              ""
            )}

            <Magnifier
              imageSrc={product.photos[0]}
              imageAlt="product"
              largeImageSrc={product.photos[0]} // Optional
              dragToMove={false}
              mouseActivation="hover"
              cursorStyleActive="crosshair"
              id="product-zoom"
              className="zoom-image position-relative overflow-hidden"
              width={300}
              height={400}
              style={{ paddingTop: "350px" }}
              //   style={{
              //     paddingTop: `${
              //       (product.photos[0].height / product.photos[0].width) * 100
              //     }%`,
              //   }}
            />

            <button
              id="btn-product-gallery"
              className="btn-product-gallery"
              onClick={openLightBox}
            >
              <i className="icon-arrows"></i>
            </button>
          </figure>

          <div id="product-zoom-gallery" className="product-image-gallery">
            {product.photos.map((item, index) => (
              <button
                className={`product-gallery-item ${
                  0 === index ? "active" : ""
                }`}
                key={product.id + "-" + index}
                onClick={(e) => changeBgImage(e, `${item}`, index)}
              >
                <div className="img-wrapper h-100">
                  <img src={item} alt="product back" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isOpen ? (
        <LightBox
          mainSrc={product.photos[photoIndex]}
          nextSrc={
            // process.env.NEXT_PUBLIC_ASSET_URI +
            product.photos[(photoIndex + 1) % product.photos.length]
          }
          prevSrc={
            // process.env.NEXT_PUBLIC_ASSET_URI +
            product.photos[
              (photoIndex + product.photos.length - 1) % product.photos.length
            ]
          }
          onCloseRequest={closeLightBox}
          onMovePrevRequest={moveNextPhoto}
          onMoveNextRequest={movePrevPhoto}
          reactModalStyle={{
            overlay: {
              zIndex: 1041,
            },
          }}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default React.memo(GalleryDefault);
