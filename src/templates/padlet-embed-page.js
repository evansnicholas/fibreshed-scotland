import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const PadletEmbedPageTemplate = ({ content }) => {

  return (
    <div>
      <HTMLContent
        className="content is-size-4 has-text-weight-medium"
        content={content} />
    </div>
  );
};

PadletEmbedPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  embedCode: PropTypes.string
};

const PadletEmbedPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <PadletEmbedPageTemplate
        content={post.html}
        />
    </Layout>
  );
};

PadletEmbedPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PadletEmbedPage;

export const PadletEmbedPageQuery = graphql`
  query PadletEmbedPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
