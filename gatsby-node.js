/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const { createFilePath } = require("gatsby-source-filesystem")

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(({ data: { allMarkdownRemark } }) => {
    const { edges } = allMarkdownRemark
    edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: require.resolve("./src/templates/blog-post.js"),
        context: {
          slug: node.fields.slug,
        },
        defer: true,
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
