import React from 'react';
import { graphql } from "gatsby";
import Post from "../components/post";
import Layout from "../components/layout";

const Archive = ({data , pageContext}) => {
    // const authorblogs = data.allMarkdownRemark.edges;
    // const {totalCount} = data.allMarkdownRemark;
    // const {author} = pageContext;
  //  const pageHeader = `${totalCount} Post${(totalCount === 1) ?'':'s'} By <span class="theme-color">${author}</span>`;
    return (
        <Layout>
            <div className="rn-post-list-page rn-section-gapBottom pt--90 bg-color-tertiary">
                <div className="container">
                    <div className="col-lg-12">
                        <div className="page-top">
                            <div className="breadcrumbs-area">
                                <ul className="breadcrumbs">
                                    <li><a href="/">Home</a></li>
                                    <li className="separator"><span></span></li>
                                    <li className="active">Archive</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row row--25">

                    </div>
                </div>
            </div>
        </Layout>
    )
}

// {authorblogs.map(blog => (
//     <div className="col-lg-4 col-md-6 col-12" key={blog.node.fields.slug}>
//         <Post
//             content={{
//                 ...blog.node.fields,
//                 ...blog.node.frontmatter,
//                 excerpt: blog.node.excerpt
//             }}
//         />
//     </div>
//
// ))}

//
// export const allauthorQueryData = graphql`
//     query allauthorQuery($author: String!){
//         allMarkdownRemark (
//           sort: {frontmatter: {date: DESC}}
//           filter: {fields: {authorId: {eq: $author}}}
//         ){
//         totalCount
//         edges {
//             node {
//             id
//             fields {
//                 slug
//                 authorId
//             }
//             excerpt
//             frontmatter {
//                 author {
//                     name
//                 }
//                 title
//                 tags
//                 format
//                 date(formatString: "MMM Do, YYYY")
//                 category
//                 image {
//                     childImageSharp {
//                         fluid(maxHeight: 300, maxWidth: 500, quality: 100, srcSetBreakpoints: 6) {
//                             ...GatsbyImageSharpFluid_withWebp
//                             presentationWidth
//                             presentationHeight
//                         }
//                     }
//                 }
//             }
//             }
//         }
//         }
//     }
// `
export default Archive;
