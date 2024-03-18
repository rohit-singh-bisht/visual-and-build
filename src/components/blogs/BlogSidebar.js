import React from "react";
import BlogSearch from "./BlogSearch";
import BlogCategoryList from "./BlogCategoryList";
import RecentBlogs from "./RecentBlogs";

const BlogSidebar = () => {
  return (
    <aside>
      <BlogSearch />
      <div className="gap-30" />
      <BlogCategoryList
        title={"Categories"}
        blogCategories={["Tip", "Trend", "Growth", "Review"]}
      />
      <div className="gap-30" />
      {/* <BlogTags
        blogTagsList={["Categories", "Categories", "Categories", "Cat", "Dpgs"]}
      /> */}
      <div className="gap-30" />
      <RecentBlogs />
    </aside>
  );
};

export default BlogSidebar;
