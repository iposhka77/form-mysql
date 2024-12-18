import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const FormComponent = () => {
  const { register, handleSubmit, reset } = useForm();
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false); 

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('contact', data.contact);
    formData.append('gender', data.gender);
    formData.append('subject', data.subject);
    formData.append('url', data.url);
    formData.append('about', data.about);
    formData.append('resume', file);

    try {
      const response = await axios.post('http://localhost:5000/api/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setSubmitted(true); 
      reset(); 
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="form-container">
      <h2>Form in React</h2>
      {submitted && <p>Форма успешно отправлена!</p>} 
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>First Name*</label>
          <input type="text" {...register('firstName', { required: true })} />
        </div>
        <div className="form-group">
          <label>Last Name*</label>
          <input type="text" {...register('lastName', { required: true })} />
        </div>
        <div className="form-group">
          <label>Enter Email*</label>
          <input type="email" {...register('email', { required: true })} />
        </div>
        <div className="form-group">
          <label>Contact*</label>
          <input type="text" {...register('contact', { required: true })} />
        </div>
        <div className="form-group">
          <label>Gender*</label>
          <div className="gender-options">
            <label>
              <input type="radio" {...register('gender', { required: true })} value="Male" /> Male
            </label>
            <label>
              <input type="radio" {...register('gender', { required: true })} value="Female" /> Female
            </label>
            <label>
              <input type="radio" {...register('gender', { required: true })} value="Other" /> Other
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Your best Subject</label>
          <select {...register('subject', { required: true })}>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="English">English</option>
            <option value="Art">Art</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Literature">Literature</option>
            <option value="Philosophy">Philosophy</option>
          </select>
        </div>
        <div className="form-group">
          <label>Upload Resume*</label>
          <input type="file" onChange={onFileChange} required />
        </div>
        <div className="form-group">
          <label>Enter URL*</label>
          <input type="url" {...register('url', { required: true })} />
        </div>
        <div className="form-group">
          <label>About</label>
          <textarea {...register('about')} />
        </div>
        <div className="button-group">
          <button type="button" onClick={() => reset()} className="reset-btn">Reset</button>
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
