import React from "react";
import emailjs from "emailjs-com";
import "./Contact.css"; // Import the CSS file

function Contact() {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_9lohx6k', 'template_v28sct3', e.target, 'JZ8OdEdq8xzqzdIZ2')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    e.target.reset();
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={sendEmail}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" required></textarea>
        </div>
        <div className="form-group">
          <input type="submit" value="Send" />
        </div>
      </form>
    </div>
  );
}

export default Contact;
