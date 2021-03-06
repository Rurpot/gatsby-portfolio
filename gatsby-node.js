const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const portfolioItem = path.resolve(`./src/templates/portfolio-item.js`);
  return graphql(
    `
      {
        allContentfulItem {
          edges {
            node {
              slug
              title
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const posts = result.data.allContentfulItem.edges;

    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: post.node.slug,
        component: portfolioItem,
        context: {
          slug: post.node.slug,
          previous,
          next
        }
      });
    });
  });
};
