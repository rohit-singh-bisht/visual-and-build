import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { aboutLinks } from "../../constants/FooterLinks";
import { contactFormStateObj } from "../../utils/constants";
import { useRequest } from "../../hooks/useRequest";
import Progress from "../../components/common/Progress";
import { toast } from "react-toastify";

const ContactStyle = styled.div`
  padding: 60px 0;
  .container {
    &.wrapper {
      display: flex;
      gap: 42px;
    }
  }
  .contact__form {
    flex: 1;
    .page__title {
      color: #303030;
      font-size: 27px;
      font-weight: 600;
      line-height: 34.5px;
      margin-bottom: 8.5px;
    }
    .page__subtitle {
      color: #303030;
      font-size: 15px;
      font-weight: 400;
      line-height: 22.5px;
      margin-bottom: 35px;
    }
  }
  .contact__details {
    border-radius: 7.5px;
    border: 0.75px solid #d9d9d9;
    background: #fcfcfc;
    padding: 30px;
    max-width: 450px;
    .contact__details__title {
      color: #303030;
      font-size: 18px;
      font-weight: 600;
      line-height: 22.5px;
      margin-bottom: 12px;
    }
    .contact__details__subtitle {
      color: #303030;
      font-size: 15px;
      font-weight: 400;
      line-height: 22.5px;
      margin-bottom: 30px;
    }
    .contact__details__links {
      color: #303030;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      margin-bottom: 9px;
      display: flex;
      gap: 18px;
      svg {
        path {
          fill: #303030;
        }
      }
    }
  }
  form {
    .form__group {
      margin-bottom: 24px;
      flex: 1;
      label {
        color: #303030;
        font-size: 15px;
        font-weight: 700;
        line-height: 22.5px;
        display: block;
        margin-bottom: 8.5px;
      }
      input {
        border-radius: 7.5px;
        border: 0.75px solid #30303040;
        background: #fff;
        height: 60px;
        width: 100%;
        padding-left: 24px;
        padding-right: 24px;
        display: flex;
        align-items: center;
      }
      &.phone {
        flex: 0 0 260px;
      }
    }
    .form__wrapper {
      display: flex;
      gap: 12px;
    }
  }
`;

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(contactFormStateObj);
  const [sendMessage, { isLoading }] = useRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendMessage({
      path: `/contact`,
      method: "POST",
      body: JSON.stringify(contactInfo),
    });
    if (response.success) {
      toast.success(response.message, { toastId: "success" });
      setContactInfo(contactFormStateObj);
    } else {
      toast.error(response.message, { toastId: "error" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <ContactStyle>
        <div className="container wrapper">
          <div className="contact__form">
            <h2 className="page__title">Contact Us</h2>
            <p className="page__subtitle">
              Have any questions for us? Don’t hesitate to contact us.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form__group">
                <label className="required">Name</label>
                <input
                  value={contactInfo?.name}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
              </div>
              <div className="form__wrapper">
                <div className="form__group phone">
                  <label>Phone Number</label>
                  <input
                    value={contactInfo?.phone}
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    onChange={handleChange}
                  />
                </div>
                <div className="form__group">
                  <label className="required">Email Address</label>
                  <input
                    value={contactInfo?.email}
                    type="email"
                    name="email"
                    placeholder="Enter your name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form__wrapper">
                <div className="form__group">
                  <label className="required">Message</label>
                  <input
                    value={contactInfo?.message}
                    type="text"
                    name="message"
                    placeholder="Enter your message..."
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="submit__button__wrapper">
                <Button title={"Submit"} />
              </div>
            </form>
          </div>
          <div>
            <div className="contact__details">
              <h3 className="contact__details__title">Let’s Keep in Touch!</h3>
              <p className="contact__details__subtitle">
                We would love to hear from you. Contact us for any inquiries you
                might have for us.
              </p>

              {aboutLinks?.map((item) => (
                <div className="contact__details__links">
                  {item?.icon} {item?.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContactStyle>
      {isLoading && <Progress />}
    </>
  );
};

export default Contact;
