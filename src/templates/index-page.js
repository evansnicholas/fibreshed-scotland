import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";
import FullWidthImage from "../components/FullWidthImage";
import { GatsbyImage } from "gatsby-plugin-image";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => {

  return (
    <div className="fibreshed-index">
      <section className="section section--gradient fibreshed-first-section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <GatsbyImage
                image={image.childImageSharp.gatsbyImageData}
                />
            </div>
            <div className="column is-half">
              <div className="is-size-3 is-underlined pb-2">{title}</div>
              <div className="is-size-1-tablet is-size-3">
                {mainpitch.title}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--gradient fibreshed-second-section">
        <div className="is-size-4 has-text-weight-bold has-text-centered pb-2">
          {mainpitch.description}
        </div>
        <div className="is-size-4 has-text-weight-bold has-text-centered">
          Do you want to get more involved? Connect with us though this <Link className="is-underlined" to="https://forms.gle/UXJJkjoyZMJ9J3Zg7">form</Link>.
        </div>
      </section>
      <section className="section section--gradient fibreshed-first-section">
        <div className="subtitle is-1 has-text-centered is-underlined is-size-1-tablet is-size-3 ">
          <Link to="/blog">
              News
          </Link>
        </div>
        <div> 
          <BlogRoll limit="3" />
        </div>
      </section>
      <section className="section section--gradient fibreshed-second-section">
        <GatsbyImage
          image={intro.blurbs[2].image.childImageSharp.gatsbyImageData}
          />
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
