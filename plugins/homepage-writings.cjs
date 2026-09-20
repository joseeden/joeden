// Reuse published, localized blog metadata instead of parsing articles again.
module.exports = function homepageWritings() {
  return {
    name: 'homepage-writings',
    allContentLoaded({allContent, actions}) {
      const blog = allContent['docusaurus-plugin-content-blog'].default;
      const posts = blog.blogPosts
        .filter(({metadata}) => !metadata.unlisted)
        .sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date))
        .slice(0, 5)
        .map(({metadata: {title, permalink, date, readingTime}}) => ({
          title, permalink, date, readingTime,
        }));
      actions.setGlobalData({posts});
    },
  };
};
