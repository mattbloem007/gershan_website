import React from "react";
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContactOfferings from "../elements/contact/contactOfferings";
import { Link } from 'gatsby'
import { FiArrowLeftCircle } from "react-icons/fi";
import {useStaticQuery, graphql} from 'gatsby';



const Contact = () => {
  const OfferingsData = useStaticQuery(graphql`
      query OfferingsQuery {
        allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/project/"}}) {
          edges {
            node {
              frontmatter {
                id
                title
              }
            }
          }
        }
      }
  `);

  const projectsData = OfferingsData.allMarkdownRemark.edges;
  console.log("projectsData", projectsData)

return(
    <Layout>
      <SEO title="Contact" />
        <div className="rn-project-details-area rn-section-gap bg-color-tertiary">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="inner">
                          <Link to="/#portfolio"><FiArrowLeftCircle size={50} /></Link>
                            <div className="portfolio-content" style={{display: "flex", justifyContent: "center"}}>
                                <div className="row" style={{width: "50%"}}>
                                <div className="col-lg-12 col-6 mt--50 mt_md--30 mt_sm--40 wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1000ms">
                                    <div className="info mb--50 ml--10">
                                        <p style={{fontWeight: "bold"}}>Contact me here</p>
                                    </div>
                                    <ContactOfferings url={"getform_url"} offerings={projectsData}/>
                                </div>

                                </div>
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
export default Contact
