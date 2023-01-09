import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const IndexPage = ({ data }) => {
  console.log(data)
  const {
    allMarkdownRemark: { edges },
  } = data
  return (
    <Layout>
      <div className={styles.textCenter}>
        <StaticImage
          src="../images/example.png"
          loading="eager"
          width={64}
          quality={95}
          formats={["auto", "webp", "avif"]}
          alt=""
          style={{ marginBottom: `var(--space-3)` }}
        />
        <h1>
          <b>TECH DOCS</b>
        </h1>
        <div>
          {edges.map(({ node }) => (
            <div key={node.id}>
              <StyledLink to={node.fields.slug}>
                <h2>{node.frontmatter.title}</h2>
                <p>{node.excerpt}</p>
              </StyledLink>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            date
            tags
          }
          html
          timeToRead
          fields {
            slug
          }
        }
      }
    }
  }
`
