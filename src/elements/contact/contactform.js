import React, { useState } from 'react';
import axios from 'axios'
import { useForm } from "react-hook-form";
import emailjs from 'emailjs-com';


const ContactForm = ({url}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onBlur"
	})
    const [serverState, setServerState] = useState({
		submitting: false,
		status: null
    });

	const [value, setValue] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
    });

    const handleServerResponse = (ok, msg, form) => {
		setServerState({
			submitting: false,
			status: { ok, msg }
		});
		if (ok) {
			form.reset();
			setValue({
				name: '',
				email: '',
				subject: '',
				message: ''
			})
		}
    };


    const onSubmit = (data, e) => {
		const form = e.target;
		setServerState({ submitting: true });
		axios({
			method: "post",
			url: url,
			data
		})
			.then(res => {
				handleServerResponse(true, "Thank you! Your email has been sent", form);
			})
			.catch(err => {
				handleServerResponse(false, err.response.data.error, form);
			});

      console.log("DATA", data)

      var template_params = {
                 "reply_to": data.email,
                 "from_name": data.name,
                 "to_name": "Gershan Lombard",
                 "message": data.message
              }

      var service_id = "gershan";
      var template_id = "gershan_email";
      var user_id = "Bw7NsLTy6IwMHr2UT";
      try {
        emailjs.send(service_id, template_id, template_params, user_id)
      }
      catch(e) {
        console.log("ERROR", e)
      }

	}

  const isErrors = Object.keys(errors).length !== 0 && true;

	const onChangeHandler = e => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`form-group ${(isErrors && errors.name) ? 'has-error' : ''} ${value.name ? 'has-value' : ''}`}>
              <input
                  type="text"
                  name="name"
                  id="name"
                  {...register('name', {
                    onChange: (e) => {onChangeHandler(e)},
                    required: 'Full Name Required'
                  })}
              />
              <label htmlFor="name">Full Name</label>
              {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          <div className={`form-group ${(isErrors && errors.email) ? 'has-error' : ''} ${value.email ? 'has-value' : ''}`}>
              <input
                  type="email"
                  name="email"
                  id="email"
                  {...register('email', {
                    onChange: (e) => {onChangeHandler(e)},
                    required: 'Email Required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "invalid email address"
                    }
                   })}
              />
              <label htmlFor="email">Enter Your Email</label>
              {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className={`form-group ${(isErrors && errors.subject) ? 'has-error' : ''} ${value.subject ? 'has-value' : ''}`}>
              <input
                  type="text"
                  name="subject"
                  id="subject"
                  {...register('subject', {
                    onChange: (e) => {onChangeHandler(e)},
                    required: 'Subject Required'
                  })}
              />
              <label htmlFor="subject">Subject</label>
              {errors.subject && <span className="error">{errors.subject.message}</span>}
          </div>

          <div className={`form-group ${(isErrors && errors.message) ? 'has-error' : ''} ${value.message ? 'has-value' : ''}`}>
              <textarea
                  name="message"
                  id="message"
                  {...register('message', {
                    onChange: (e) => {onChangeHandler(e)},
                    required: 'Message Required',
                    minLength: { value: 10, message: "Minimum length is 10" }
                  })}
              >
              </textarea>
              <label htmlFor="message">Write your message here.</label>
              {errors.message && <span className="error">{errors.message.message}</span>}
          </div>

          <div className="form-submit" sx={{fontFamily: "body"}}>
              <button className="rn-button" sx={{bg: "second_color", color: "body_color"}} type="submit" disabled={serverState.submitting}>
                  Send Message
              </button>
              {serverState.status && (
                  <p className={`form-output ${!serverState.status.ok ? "errorMsg" : "success"}`}>
                      {serverState.status.msg}
                  </p>
              )}
          </div>
      </form>
  )
}

export default ContactForm;
