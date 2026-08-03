
const { slugify } = require('./src/utils/utilityFunctions');
const path = require('path');
const _ = require('lodash');
const {fmImagesToRelative} = require('gatsby-remark-relative-images')
const { createFilePath } = require(`gatsby-source-filesystem`);


// Explicit schema so the build doesn't break when a Decap CMS collection has
// zero entries, or an entry omits an optional field (Gatsby otherwise infers
// each frontmatter field only from whatever content currently exists).
exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
        type MarkdownRemark implements Node {
            frontmatter: MarkdownRemarkFrontmatter
            fields: MarkdownRemarkFields
        }

        type MarkdownRemarkFrontmatter {
            id: String
            title: String
            category: String
            featured_image: File @fileByRelativePath
            features: [File] @fileByRelativePath
            date: Date @dateformat
            format: String
            image: File @fileByRelativePath
            testimonial_title: String
            testimonial_subtitle: String
            testimonial_image: File @fileByRelativePath
            site_title: String
            site_subtitle: String
            slider_images: [File] @fileByRelativePath
            about_title: String
            about_subtitle: String
            cta: String
            about_image: File @fileByRelativePath
            offerings_title: String
            blog_title: String
            contact_title: String
            contact_subtitle: String
            contact_image: File @fileByRelativePath
            footer_title: String
            footer_address: String
            footer_email: String
            footer_number: String
            footer_fb_link: String
            footer_insta_link: String
            site_logo: File @fileByRelativePath
            item_1: String
            item_2: String
            item_3: String
            item_4: String
            item_5: String
        }

        type MarkdownRemarkFields {
            slug: String
        }
    `)
}

exports.onCreateNode = ({node , actions, getNode }) => {
    const { createNodeField } = actions;
    fmImagesToRelative(node)

    if (node.internal.type === 'MarkdownRemark') {
        const slugFromTitle = slugify(node.frontmatter.title)
        const value = createFilePath({ node, getNode });
        createNodeField({
            node,
            name: 'slug',
            value
        });

        // if (Object.prototype.hasOwnProperty.call(node.frontmatter, "author")) {
        //     createNodeField({
        //       node,
        //       name: "authorId",
        //       value: slugify(node.frontmatter.author)
        //     });
        // }
    }

    // if(node.internal.type === 'AuthorsJson'){
    //     createNodeField({
    //         node,
    //         name: "authorId",
    //         value: slugify(node.name)
    //     });
    // }

}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const templates =  {
        projectDetails: path.resolve('src/template/project-details.js'),
        blogDetails: path.resolve('src/template/blog-details.js'),
        categoryPost: path.resolve('src/template/category-post.js'),
        tagPost: path.resolve('src/template/tag-template.js'),
        authorPage: path.resolve('src/template/archive.js'),
    }

    const result = await graphql(`
        {
          projects: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/project/"}}) {
            edges {
              node {
                frontmatter {
                  id
                  title
                }
              }
            }
          }


            posts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/blog/"}}) {
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
    `)
        if (result.errors) return Promise.reject(result.errors)
        const project = result.data.projects.edges
        const posts = result.data.posts.edges
         // Create Project Page
         project.forEach(({ node }) => {
            createPage({
                // path: node.fields.slug,
                path: `project/${slugify(node.frontmatter.title)}`,
                component: templates.projectDetails,
                context: {
                    id: node.frontmatter.id
                }
            })
        })

        // Create Single Blog Page
        posts.forEach(({ node }) => {
            if (node.frontmatter.id) {
              createPage({
                  path: `blog/${slugify(node.frontmatter.title)}`,
                  component: templates.blogDetails,
                  context: {
                      id: node.frontmatter.id
                  }
              })
            }
        })

        // Create Single Blog Page

        // Start Category Area

        // For get All Categiry Pages
        let categories = []
        _.each(posts , edge => {
            if (_.get(edge , 'node.frontmatter.category')) {
                categories = categories.concat(edge.node.frontmatter.category)
            }
        })

        // [design , code]
        let categoryPostCounts = {}
        categories.forEach( category => {
            categoryPostCounts[category] = (categoryPostCounts[category] || 0) + 1
        })
        categories = _.uniq(categories)


        // Create Tag Posts Pages for indivedual Tag page
        categories.forEach(category => {
            createPage({
                path: `/category/${slugify(category)}`,
                component: templates.categoryPost,
                context: {
                    category
                }
            })
        })
        // End Category Area



        // Start Tags Pages
        // let tags = []
        // _.each(posts , edge => {
        //     if (_.get(edge , 'node.frontmatter.tags')) {
        //         tags = tags.concat(edge.node.frontmatter.tags)
        //     }
        // })
        // // Create Tag Posts Pages for indivedual Tag page
        // tags.forEach(tag => {
        //     createPage({
        //         path: `/tag/${slugify(tag)}`,
        //         component: templates.tagPost,
        //         context: {
        //             tag
        //         }
        //     })
        // })
        // End Category Area



        // Start Create Authors Page
        // let authors = []
        // _.each(posts, edge => {
        //     if(_.get(edge, 'node.fields.authorId')){
        //         authors = authors.concat(edge.node.fields.authorId)
        //     }
        // })
        // authors = _.uniq(authors)
        // authors.forEach(author => {
        //     createPage({
        //         path: `/author/${slugify(author)}`,
        //         component: templates.authorPage,
        //         context: {
        //             author
        //         }
        //     })
        // })
        // End Create Authors Page

}
