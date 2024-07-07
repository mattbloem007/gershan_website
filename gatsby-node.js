
const { slugify } = require('./src/utils/utilityFunctions');
const path = require('path');
const _ = require('lodash');
const {fmImagesToRelative} = require('gatsby-remark-relative-images')


exports.onCreateNode = ({node , actions}) => {
    const { createNodeField } = actions;
    fmImagesToRelative(node)

    if (node.internal.type === 'MarkdownRemark') {
        const slugFromTitle = slugify(node.frontmatter.title)
        createNodeField({
            node,
            name: 'slug',
            value: slugFromTitle,
        });

        if (Object.prototype.hasOwnProperty.call(node.frontmatter, "author")) {
            createNodeField({
              node,
              name: "authorId",
              value: slugify(node.frontmatter.author)
            });
        }
    }

    if(node.internal.type === 'AuthorsJson'){
        createNodeField({
            node,
            name: "authorId",
            value: slugify(node.name)
        });
    }

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


            posts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/blogs/"}}) {
                edges {
                    node {
                        frontmatter {
                            id
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
                  path: `blog/${slugify(node.frontmatter.id)}`,
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
        let tags = []
        _.each(posts , edge => {
            if (_.get(edge , 'node.frontmatter.tags')) {
                tags = tags.concat(edge.node.frontmatter.tags)
            }
        })
        // Create Tag Posts Pages for indivedual Tag page
        tags.forEach(tag => {
            createPage({
                path: `/tag/${slugify(tag)}`,
                component: templates.tagPost,
                context: {
                    tag
                }
            })
        })
        // End Category Area



        // Start Create Authors Page
        let authors = []
        _.each(posts, edge => {
            if(_.get(edge, 'node.fields.authorId')){
                authors = authors.concat(edge.node.fields.authorId)
            }
        })
        authors = _.uniq(authors)
        authors.forEach(author => {
            createPage({
                path: `/author/${slugify(author)}`,
                component: templates.authorPage,
                context: {
                    author
                }
            })
        })
        // End Create Authors Page

}
