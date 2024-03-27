import React from "react";
import { useRequest } from "../../hooks/useRequest";
import styled from "styled-components";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";

const ClearCartStyle = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #ae0000;
  cursor: pointer;
  .icon {
    font-size: 14px;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const ClearCartButton = ({ title = "Clear cart", cartId, setIsCleared }) => {
  const [handleClearRequest] = useRequest();

  const handleClearCart = async (cartId) => {
    const path = `/cart/${cartId}/clear-cart`;
    const response = await handleClearRequest({ path, method: "DELETE" });
    if (!response.success) {
      return toast.error(response.message);
    }
    toast.success(response.message);
    setIsCleared && setIsCleared((prev) => !prev);
  };

  return (
    <ClearCartStyle
      className="clear__cart"
      onClick={() => handleClearCart(cartId)}
    >
      <MdOutlineDelete className="icon" />
      {title}
    </ClearCartStyle>
  );
};

export default ClearCartButton;
