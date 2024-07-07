import React from 'react'
import {useStaticQuery, graphql} from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"
import { Controller, Scene } from 'react-scrollmagic-r18';

const About = ( ) => {
    const aboutQueryData = useStaticQuery(graphql`
        query AboutDefaultQuery {
          markdownRemark(frontmatter: {id: {eq: "about"}}) {
            frontmatter {
              about_title
              about_subtitle
              cta
              about_image {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
            }
            html
          }
        }
    `);
    console.log(aboutQueryData)
    const title = aboutQueryData.markdownRemark.frontmatter.about_title;
    const Subtitle = aboutQueryData.markdownRemark.frontmatter.about_subtitle;
    const description = aboutQueryData.markdownRemark.html;
    const downloadButton = aboutQueryData.markdownRemark.frontmatter.cta;
    const AboutImage = aboutQueryData.markdownRemark.frontmatter.about_image.childImageSharp.gatsbyImageData

    return (
        <div className="rb-about-area about-style rn-section-gap bg-color-white" id="about">
            <div className="container">
                <div className="row row--45 align-items-center">
                    <div className="col-lg-5">
                        <div className="thumbnail">
                                    <div className="story-image">
                                        <GatsbyImage className="about-images" image={AboutImage} />
                                    </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="inner">
                            <div className="content">
                                <div className="section-title">
                                    <div className="title-wrap">
                                        <h3 className="title wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms">About</h3>
                                        {title && <h4 className="subtitle wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms" dangerouslySetInnerHTML={{ __html: Subtitle }}></h4>}
                                    </div>

                                    {description && <p className="description wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms" dangerouslySetInnerHTML={{ __html: description }}></p>}
                                </div>
                                <div className="button-group mt--30">
                                    {/**downloadButton && <a className="rn-button wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms" href="#downloadbutton"><span>{downloadButton}</span></a>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
