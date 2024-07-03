import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import Slider from "react-slick";

import bannerImage from '../images/banner/bg-image-02.jpg';
import bannerImage2 from '../images/banner/bg-image-04.jpg';
import bannerImage3 from '../images/banner/bg-image-05.jpg';



const Banner = () => {
    // const banenrQueryData = useStaticQuery (graphql`
    //     query BannerDefaultQuery {
    //       mainBannerJson{
    //         title
    //         subtitle
    //         bgImage {
    //           childImageSharp{
    //             gatsbyImageData
    //           }
    //         }
    //       }
    //     }
    // `);

    // const BannerImages = banenrQueryData.homedefaultJson.bgImage.childImageSharp.fluid;
    //const PortfolioImages = banenrQueryData.file.childImageSharp.fixed;
    const Title = "banenrQueryData.mainBannerJson.title";
    const SubTitle = "banenrQueryData.mainBannerJson.subtitle";



    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <div className="rn-slider-area" id="home">
            {/* Start Single Slider  */}
            <div className="rn-slide slider-style-01 banner-fixed-height">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-xl-6">
                            <div className="inner">
                                <div className="content text-left">
                                    <h1 className="title wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms" dangerouslySetInnerHTML={{ __html: Title }}></h1>
                                    <h4 className="subtitle wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms" dangerouslySetInnerHTML={{ __html: SubTitle }}></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Single Slider  */}
            <div className="thumbnail">
                <Slider {...settings}>

                    <div className="thumbnail-inner">
                        <img src={bannerImage2} alt="Testimonail Images" />
                    </div>
                    <div className="thumbnail-inner">
                        <img src={bannerImage3} alt="Testimonail Images" />
                    </div>
                </Slider>
            </div>

        </div>
    )
}
export default Banner;
