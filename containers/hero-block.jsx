import axios from 'axios';
import Link from 'next/link';
import Reveal from 'react-awesome-reveal';
import { useQuery } from 'react-query';
import ALink from '~/components/features/alink';
import OwlCarousel from '~/components/features/owl-carousel';
import { introSlider, fadeInUpShorter } from '~/utils/data';

async function getSliders() {
    const { data } = await axios.get(
        'http://egshop.test/api/v1/setting/home/sliders'
    );
    return data.data;
}

export default function HeroBlock() {
    const {
        data: slides,
        isLoading,
        isError,
        error,
    } = useQuery('heror-sliders', getSliders, {
        staleTime: 2000 * 5,
    });

    // if (isLoading) return <h3>Loading...</h3>;
    if (isError)
        return (
            <>
                <h3>Oops something went wrong</h3>
                <p>{error.tostring()}</p>
            </>
        );

    return (
        <div className="intro-slider-container">
            <OwlCarousel
                adClass="owl-simple owl-light owl-nav-inside"
                options={introSlider}
            >
                {isLoading ? (
                    <div className="skel-pro slide intro-slide"></div>
                ) : (
                    slides.one &&
                    slides.one.map((slide, index) => (
                        <Link href={slide.link} key={index}>
                            <a>
                                <div
                                    className="intro-slide slide"
                                    style={{
                                        backgroundImage: `url(${slide.img})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                    }}
                                ></div>
                            </a>
                        </Link>
                    ))
                )}
            </OwlCarousel>
        </div>
    );
}
