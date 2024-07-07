import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image"
import { FiList, FiUser, FiInstagram, FiArrowLeftCircle } from "react-icons/fi";
import Layout from "../components/layout";
import { graphql, Link } from 'gatsby'
import Calltoaction from '../elements/calltoaction/calltoaction'

const ProjectDetails = ({data}) => {
    const projectData = data.markdownRemark.frontmatter;
    const projectImage = data.markdownRemark.frontmatter.features;
    console.log("projectImage", projectImage)
    return (
        <Layout>
            <div className="rn-project-details-area rn-section-gap bg-color-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner">
                                <div className="portfolio-content">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-12">
                                            <div className="content-left" >
                                              <Link to="/#portfolio"><FiArrowLeftCircle size={50} /></Link>
                                                <div className="page-top" style={{display: "flex", justifyContent: "center", textAlign: "center"}}>
                                                    <h1 className="title_holder">{projectData.title}</h1>
                                                </div>
                                                <div className="thumbnail mt--90 mt_md--40 mt_sm--40" style={{display: "flex", justifyContent: "center"}}>
                                                    <GatsbyImage image={projectData.featured_image.childImageSharp.fixed} />
                                                </div>
                                                <h3 className="mt--20" style={{textAlign: "Center"}}>Details</h3>
                                                <ul className="list_holder" style={{textAlign: "Center"}}>
                                                    <li><span className="icon"><FiList />Category:</span><span className="projectinfo">{projectData.category}</span></li>
                                                </ul>
                                                <p className="mt--20" style={{textAlign: "Center"}} dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <Link style={{display: "flex", justifyContent: "center"}} to='/contact'><Calltoaction title="" buttonText="Book this Offering" /></Link>
                                <div className="image-group" style={{display: "grid", justifyContent: "center"}}>
                                    {projectImage.map((data, index) => (
                                        <div className="single-image mt--30" key={index}>
                                            <GatsbyImage image={data.childImageSharp.gatsbyImageData} />
                                        </div>
                                    ))}
                                </div>
                                  <Link to="/#portfolio"><FiArrowLeftCircle size={50} /></Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql `
    query($id: String!) {
        markdownRemark (frontmatter: {id: {eq: $id}}) {
          frontmatter {
            id
            title
            category
            featured_image {
              childImageSharp {
                fixed: gatsbyImageData(layout: FIXED, width: 500, height: 374)
              }
            }
            features {
              childImageSharp {
                gatsbyImageData(width: 500, height: 500)
              }
            }
          }
          html
        }
    }
`;
export default ProjectDetails;
