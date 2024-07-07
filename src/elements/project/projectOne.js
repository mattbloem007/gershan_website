import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import Projectcard from "./projectcard";

const ProjectOne = () => {
    const ProjectData = useStaticQuery(graphql`
        query ProjectDataQuery {
          allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/project/"}}) {
            edges {
              node {
                frontmatter {
                  id
                  title
                  category
                  featured_image {
                    childImageSharp {
                      gatsbyImageData(layout: FIXED, width: 374, height: 374)
                    }
                  }
                }
              }
            }
          }
        }
    `);

    const projectsData = ProjectData.allMarkdownRemark.edges;
    return (
        <div className="row row--45 mt_dec--30">
            {projectsData.map( data => (
                <Projectcard key={data.node.frontmatter.id}
                    column="col-lg-4 col-md-6 col-12"
                    portfolioStyle="portfolio-style-1"
                    key={data.node.frontmatter.id}
                    id={data.node.frontmatter.id}
                    image={data.node.frontmatter.featured_image.childImageSharp}
                    title={data.node.frontmatter.title}
                    category={data.node.frontmatter.category}
                />
            ))}
        </div>
    )
}

export default ProjectOne;
