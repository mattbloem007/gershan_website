/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import Slider from "react-slick";
import { GatsbyImage } from "gatsby-plugin-image"

import bannerImage from '../images/banner/bg-image-02.jpg';
import bannerImage2 from '../images/banner/bg-image-04.jpg';
import bannerImage3 from '../images/banner/bg-image-05.jpg';



const Banner = () => {
    const banenrQueryData = useStaticQuery (graphql`
        query BannerDefaultQuery {
          markdownRemark(frontmatter: {id: {eq: "main-banner"}}) {
            frontmatter {
              site_title
              site_subtitle
              slider_images {
                childImageSharp{
                  gatsbyImageData(layout: FULL_WIDTH)
                }
                publicURL
              }
            }
          }
        }
    `);

    // const BannerImages = banenrQueryData.homedefaultJson.bgImage.childImageSharp.fluid;
    const PortfolioImages = banenrQueryData.markdownRemark.frontmatter.slider_images;
    const Title = banenrQueryData.markdownRemark.frontmatter.site_title;
    const SubTitle = banenrQueryData.markdownRemark.frontmatter.site_subtitle;



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
                            <div className="inner">
                                <div className="content text-center">
                                    <h1 className="title wow fadeInLeft" sx={{color: "headings_color", fontFamily: "heading"}} data-wow-delay="200ms" data-wow-duration="1000ms" dangerouslySetInnerHTML={{ __html: Title }}></h1>
                                    <h4 className="subtitle wow fadeInLeft" sx={{color: "body_color", fontFamily: "body"}} data-wow-delay="200ms" data-wow-duration="1000ms" dangerouslySetInnerHTML={{ __html: SubTitle }}></h4>
                                </div>
                            </div>
                </div>
                <div className="thumbnail">
                    <Slider {...settings}>
                    {PortfolioImages && PortfolioImages.map(image => {
                      return(
                        <div className="thumbnail-inner">
                        {!!image && !!image.childImageSharp
                          ? <GatsbyImage image={image.childImageSharp.gatsbyImageData} />
                          : <img src={image.publicURL} />
                        }
                        </div>
                        )
                      })
                    }
                    </Slider>
                </div>
            </div>
            {/* End Single Slider  */}


        </div>
    )
}
export default Banner;
