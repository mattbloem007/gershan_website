/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react';
import Contactform from "./contactform";
import GooglemapRn from "./googlemap";
import { GatsbyImage } from "gatsby-plugin-image"

const Contact = () => {
    const contactData = useStaticQuery(graphql`
        query contactDataQuery {
          markdownRemark(frontmatter: {id: {eq: "contactus"}}) {
            frontmatter {
              id
              contact_title
              contact_subtitle
              contact_image {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
            }
            html
          }
            site {
                siteMetadata {
                    getform_url
                }
            }

        }
    `);
    const Title = contactData.markdownRemark.frontmatter.contact_title;
    const description = contactData.markdownRemark.html
    const ContactImage = contactData.markdownRemark.frontmatter.contact_image.childImageSharp.gatsbyImageData

    const { site: { siteMetadata: { getform_url } } } = contactData;
    return (
        <div className="rn-contact-area rn-section-gapBottom pt--200" sx={{bg: "main_color"}} id="contact">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title" sx={{color: "headings_color", fontFamily: "heading"}}>
                            <h2 className="title">
                                {Title}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="row row--45">
                    {/* Start Contact Form  */}
                    <div className="col-lg-6 col-12 mt--70 mt_md--30 mt_sm--40 wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms">
                        <div className="info" sx={{color: "body_color", fontFamily: "body"}}>
                            <p dangerouslySetInnerHTML={{ __html: description }}></p>
                        </div>
                        <Contactform url={getform_url} />
                    </div>
                    {/* End Contact Form  */}

                    <div className="col-lg-6 col-12 mt--70 mt_md--30 mt_sm--40 wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms">
                        <div className="contact-info-list-wrapper">
                            <GatsbyImage image={ContactImage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
