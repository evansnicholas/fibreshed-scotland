import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <div>
      <h1
        className="has-text-weight-bold is-size-1 fibreshed-page-title"
        style={{
          boxShadow: "0.5rem 0 0 #f40, -0.5rem 0 0 #f40",
          backgroundColor: "#e7e3de",
          padding: "1rem",
        }}
        >
        {title}
      </h1>
      <section className="section section--gradient">

        <div className="container">

          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <PageContent 
                  className="content is-size-4 has-text-weight-medium" 
                  content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
