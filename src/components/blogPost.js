import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import Blog from "./blog";

const BlogPost = () => {
    const blogQueryData = useStaticQuery(graphql`
        query BlogListQuery {
            allMarkdownRemark (filter: {fileAbsolutePath: {regex: "/blogs/"}}, sort: {frontmatter: {date: DESC}}) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        excerpt(pruneLength: 83, format: PLAIN, truncate: true)
                        frontmatter {
                            title
                            date(formatString: "MMM Do, YYYY")
                            format
                            category
                            image {
                                childImageSharp {
                                    fluid(maxWidth: 374, maxHeight: 280, quality: 100) {
                                        ...GatsbyImageSharpFluid_withWebp
                                        presentationWidth
                                        presentationHeight
                                    }
                                }
                            }
                        }

                    }
                }
            }
        }
    `);


    const blogs = blogQueryData.allMarkdownRemark.edges;
    return (
        <div className="rn-post-area rn-section-gapBottom pt--200 bg-color-grey" id="news">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title mb--40">
                            <h2 className="title">News</h2>
                        </div>
                    </div>
                </div>

                <div className="row row--30">
                    {blogs.map(blog => {
                      console.log("BLOGS", blog.node)
                      return (
                        <div className="col-lg-4 col-md-6 col-12 wow fadeInDown" data-wow-delay="200ms" data-wow-duration="0.8s" key={blog.node.fields.slug}>
                            {blog.node.frontmatter.image && <Blog
                                image={blog.node.frontmatter.image.childImageSharp.fluid}
                                title={blog.node.frontmatter.title}
                                path={blog.node.fields.slug}
                            />}
                        </div>
                    )})}
                </div>
            </div>
        </div>
    )
}

export default BlogPost;
