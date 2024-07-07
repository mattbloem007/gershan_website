import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { FaQuoteRight } from 'react-icons/fa';
import {useStaticQuery, graphql} from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"


import testimonialOne from '../images/testimonial/1.jpg';
import testimonialTwo from '../images/testimonial/2.jpg';
import testimonialThree from '../images/testimonial/3.jpg';


const Testimonial = () => {
    const [activeTab, setActiveTab] = useState('0');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const testimonialData = useStaticQuery (graphql`
      query TestimonialDataQuery {
        allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/testimonials/"}}) {
          edges {
            node {
              html
              frontmatter {
                id
                testimonial_title
                testimonial_subtitle
                testimonial_image {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
    `);

    const TestimonialData = testimonialData.allMarkdownRemark.edges
    return (
        <div>
            <div className="testimonial-area testimonial-style-1 pb--110">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title mb--100 mb_sm--50 mb_md--50">
                                <h3 className="title">Testimonials</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <TabContent activeTab={activeTab}>
                                    {TestimonialData && TestimonialData.map((testimonial, index) => {
                                      console.log("DATA", testimonial)

                                      return (
                                        <TabPane tabId={index}>
                                            <div className="testimonial-inner">
                                                <div className="icon">
                                                    <FaQuoteRight />
                                                </div>
                                                <p dangerouslySetInnerHTML={{ __html: testimonial.node.html }}></p>
                                                <div className="client-info">
                                                    <div className="thumbnail">
                                                        <GatsbyImage image={testimonial.node.frontmatter.testimonial_image.childImageSharp.gatsbyImageData} alt="Testimonail Images" />
                                                    </div>
                                                    <div className="info">
                                                        <h3 className="title">{testimonial.node.frontmatter.testimonial_title}</h3>
                                                        <span>{testimonial.node.frontmatter.testimonial_subtitle}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPane>
                                      )
                                    })}
                                    </TabContent>
                                </div>

                                <div className="col-lg-6">
                                    <Nav className="rn-nav-image-item" tabs>
                                    {TestimonialData && TestimonialData.map((testimonial, index) => {
                                      return (
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === index })}
                                                onClick={() => { toggle(index); }}
                                                >
                                                  <GatsbyImage image={testimonial.node.frontmatter.testimonial_image.childImageSharp.gatsbyImageData} alt="Testimonail Images" />
                                            </NavLink>
                                        </NavItem>
                                      )
                                    })}
                                    </Nav>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial
