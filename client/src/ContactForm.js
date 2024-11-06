import React, { useState } from "react";
import "./ContactForm.css";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

  const areAllFieldsFilled = () => {
    for (const key in formData) {
      if (formData[key].trim() === "") {
        return false;
      }
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitMail = async (e) => {
    e.preventDefault();

    if (!areAllFieldsFilled()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const formDataToSubmit = new FormData();
      for (const key in formData) {
        formDataToSubmit.append(key, formData[key]);
      }
      //myzyzoyq
      const response = await fetch("https://formspree.io/f/xpwzqzve", {
        method: "POST",
        body: formDataToSubmit,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitted(true); // Hide form fields after submission
        toast.success("Email sent successfully!");
      } else {
        toast.error("Failed to send email. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error.message);
    }
  };

  const handleEmailAgain = () => {
    // Reset form data and show the form fields again
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div className="contact-container">
      <div className="contact-left">
        <h1>We'd love to hear from you</h1>
      </div>
      <div className="contact-right">
        <h2>Contact us</h2>

        {/* Display form fields if not submitted, otherwise show the "Email Again" button */}
        {!isSubmitted ? (
          <form onSubmit={submitMail}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  type="tel"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Submit →
            </button>
          </form>
        ) : (
          <div className="email-again-container">
            <p className="success-message">Email has been sent successfully!</p>
            <button onClick={handleEmailAgain} className="email-again-button">
              Email Again
            </button>
          </div>
        )}
        <p className="contact-info">EMAIL US: enquiry@glassmoon.co</p>
      </div>
    </div>
  );
};

export default ContactForm;
