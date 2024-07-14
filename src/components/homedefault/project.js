/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import ProjectOne from "../../elements/project/projectOne";


const Project = () => {
    const portfolioData = useStaticQuery(graphql`
        query portfolioDataQuery {
          markdownRemark(frontmatter: {id: {eq: "portfolio"}}) {
            frontmatter {
              id
              title
            }
            html
          }
        }
    `);

    const Title = portfolioData.markdownRemark.frontmatter.title;
    const Description = portfolioData.markdownRemark.html;
    return (
        <div className="rn-portfolio-area pt--200 pb--150 portfolio-style-1" sx={{bg: "second_color"}}>
            <div className="container">
                <div className="row mb--10">
                    <div className="col-lg-12">
                        <div className="section-title" sx={{color: "headings_color", fontFamily: "heading"}}>
                            <h3 className="title">
                                {Title}
                            </h3>
                        </div>
                    </div>
                </div>
                <ProjectOne />
                {/**<div className="row">
                    <div className="col-lg-12">
                        <div className="button-group mt--60 justify-content-center">
                            <a className="rn-button" href="#downloadbutton"><span>View All Works</span></a>
                        </div>
                    </div>
                </div>*/}
            </div>
        </div>
    )
}
export default Project
