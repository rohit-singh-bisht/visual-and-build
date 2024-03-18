import React from "react";
import styled from "styled-components";
import BlogSidebar from "../../components/blogs/BlogSidebar";
import { useAppContext } from "../../context/useAppContext";
import { useNavigate } from "react-router-dom";

const BlogDetailsStyle = styled.div`
  padding: 60px 0;
  @media (min-width: 1024px) {
    .gap-30 {
      height: 30px;
    }
  }
`;

const BlogDetails = () => {
  const { isDesktop } = useAppContext();
  const navigate = useNavigate();

  const onCategoryClick = () => {};

  return (
    <BlogDetailsStyle>
      <div className="container">
        <div className="blog__details__body">
          {isDesktop && <BlogSidebar />}
        </div>
      </div>
    </BlogDetailsStyle>
  );
};

export default BlogDetails;
