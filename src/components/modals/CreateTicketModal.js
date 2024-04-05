import React, { useState } from "react";
import styled from "styled-components";
import { RxCross1 } from "react-icons/rx";
import StyledMask from "../common/StyledMask";
import Button from "../common/Button";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";

const CreateTicketModalStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  z-index: 8;
  background-color: rgba(0, 0, 0, 0.3);
  .create__ticket__modal {
    padding: 32px;
    max-width: 700px;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    z-index: 3;
    .modal__title__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .modal__title {
      font-size: 20px;
      line-height: 28px;
      font-weight: 600;
    }
    .cross__icon {
      font-size: 20px;
      cursor: pointer;
    }
    .form__group {
      label {
        font-size: 14px;
        line-height: 22px;
        display: block;
        margin: 20px 0 12px;
      }
      .input,
      .form__select {
        width: 100%;
        height: 40px;
        padding: 12px;
        border: 1px solid #d2d1d1;
        border-radius: 6px;
      }
      textarea {
        min-height: 100px !important;
        resize: vertical;
        &:focus {
          outline: none;
        }
      }
      .form__select {
        display: flex;
        align-items: center;
        select {
          width: 100%;
          border: 0px;
          &:focus {
            outline: none;
          }
          option {
            font-size: 14px;
            line-height: 22px;
          }
        }
      }
    }
    .form__buttons {
      margin-top: 16px;
      display: flex;
      justify-content: flex-end;
      button {
        line-height: 22px;
        font-weight: 500;
      }
    }
  }
`;

const CreateTicketModal = ({ handleClose }) => {
  const [data, setData] = useState({
    subject: "",
    priority: "",
    message: "",
  });
  const [handleRequest, {}] = useRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data?.subject || !data?.priority || !data?.message) {
      return toast.error("All fields are required.");
    }
    const path = `/ticket`;
    const formData = new FormData();
    formData.append("subject", data?.subject);
    formData.append("priority", data?.priority);
    formData.append("message", data?.subject);

    const repsonse = await handleRequest({
      path,
      method: "POST",
      body: formData,
    });
    if (!repsonse.success) {
      return toast.error(response.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <CreateTicketModalStyle>
      <StyledMask onClick={handleClose} zIndex={2} />
      <div className="create__ticket__modal">
        <div className="modal__title__wrapper">
          <div className="modal__title">Add Ticket</div>
          <RxCross1 className="cross__icon" onClick={handleClose} />
        </div>
        <form>
          <div className="form__group">
            <label>Subject</label>
            <input
              type="text"
              className="input"
              name="subject"
              value={data?.subject}
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label>Priority</label>
            <div className="form__select">
              <select name="priority" onChange={handleChange}>
                <option value={""} selected disabled>
                  Select Priority
                </option>
                <option value={"high"}>High</option>
                <option value={"medium"}>Medium</option>
                <option value={"low"}>Low</option>
              </select>
            </div>
          </div>
          <div className="form__group">
            <label>Message</label>
            <textarea
              type="text"
              className="input"
              name="message"
              value={data?.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form__buttons">
            <Button title={"Save"} onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </CreateTicketModalStyle>
  );
};

export default CreateTicketModal;
