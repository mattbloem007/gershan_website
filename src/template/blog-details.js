/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react';
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"
import { slugify } from "../utils/utilityFunctions";
import Layout from "../components/layout";

const BlogDetails = ({data, pageContext}) => {
    const {
        title , image, category
    } = data.markdownRemark.frontmatter;

    const imageSrc = image.childImageSharp;
    const {html} = data.markdownRemark;

    return (
        <Layout>
            <div className="blog-details-wrapper rn-section-gap" sx={{bg: "main_color"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="post-image">
                                <GatsbyImage image={imageSrc.gatsbyImageData} alt={title}/>
                            </div>
                            <div className="post-single-title" sx={{color: "headings_color", fontFamily: "heading"}}>
                                <h1 className="post-title">{title}</h1>
                            </div>
                            <div className="post-content" sx={{color: "body_color", fontFamily: "body"}} dangerouslySetInnerHTML={{__html: html}}/>
                            {/**<div className="tag-list d-flex align-items-center">
                                <span sx={{color: "headings_color", fontFamily: "heading"}}>Tags:</span>
                                <div className="tags-cloud">
                                    {tags.map((tag) => (
                                        <a key={tag} href={`/tag/${slugify(tag)}`}>{tag}</a>
                                    ))}
                                </div>
                            </div>*/}

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const blogDetailsData = graphql`
query blogDetailsQuery ($id: String!) {
    markdownRemark (frontmatter: {id: {eq: $id}}) {
        id
        html
        frontmatter {
          category
          title
          date(formatString: "MMM Do, YYYY")
          format
          image {
            childImageSharp {
                gatsbyImageData
            }
          }
        }
      }
    }
`

export default BlogDetails;
