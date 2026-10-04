import React from "react";
import OriginalFooter from "@theme-original/BlogPostItem/Footer";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import WritingReactions from "@site/src/components/WritingReactions";

export default function BlogPostItemFooterWrapper() {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { siteConfig } = useDocusaurusContext();
  const apiUrl = siteConfig.customFields?.reactionsApiUrl;
  const postId = metadata.permalink.replace(/\/+$/, "");

  return (
    <>
      {isBlogPostPage && typeof apiUrl === "string" && apiUrl && (
        <WritingReactions
          key={`${apiUrl}:${postId}`}
          postId={postId}
          apiUrl={apiUrl}
        />
      )}
      <OriginalFooter />
    </>
  );
}
