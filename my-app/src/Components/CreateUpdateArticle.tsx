// Page 1: Create / Update News Articles
// Design a web page with a form to create or update news articles. The form should include the following fields for a news article:

// Article Title (text input)
// Article Summary (textarea)
// Article date (date input)
// Publisher Of Article (text input)
// When the form is submitted:

// If all fields are filled, the article should be created or updated in the database.
// If any field is missing, show appropriate error messages and prevent submission.
// After successful submission, clear the form fields so that user can input next article
// Provide a navigation link to the fetch/display page.

import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const CreateUpdateArticle: React.FC = () => {
    const [article, setArticle] = useState({
      title: '',
      summary: '',
      date: '',
      publisher: '',
    });

    const [errors, setErrors] = useState({
        title: '',
        summary: '',
        date: '',
        publisher: '',
    });

    // Handle form input changes 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the form 
        const newErrors = {...errors}; /// ... means what? 
        let isValid = true; 

        // Validate Title 
        if (!article.title){
            newErrors.title = "Title is required"; 
            isValid = false; 
        } else {
            newErrors.title = '';
        }

        // Validate Summary 
        if (!article.summary){
            newErrors.summary = "Summary is required"; 
            isValid = false; 
        } else { 
            newErrors.summary = ''; 
        }

        // Validate Date 
        if (!article.date){
            newErrors.date = "Date is required"; 
            isValid = false; 
        } else { 
            newErrors.date = ''; 
        }

        // Validate Publisher 
        if (!article.publisher){
            newErrors.publisher = 'Publisher is required'; 
            isValid = false; 
        } else {
            newErrors.publisher = ''; 
        }

        if (!isValid){
            setErrors(newErrors);
            return; 
        }
        

    // Submit the form data to the server or database
    // You can use Axios or fetch for this purpose
    // To send the form data to the database, need to make a HTTP POST request to the server's API endpoint 
    try{
        // Send the form data to the server using Axios 
        const response = await axios.post('/api/articles', article); // Replace '/api/articles' with your actual API endpoint

        // Handle the response from the server (eg: show success message)
        console.log('Form submitted successfully', response.data);
    
        // After successful submission, clear the form
        setArticle({
            title: '',
            summary: '',
            date: '',
            publisher: '',
        });

    } catch(error){
        // Handle errors (eg: display error message to the user)
        console.error("Error submitting form", error);
    }
};

    return (
        <div> 
            <h1> Create / Update News Articles</h1>
            <form onSubmit={handleSubmit}>
                <div> 
                    <label>Title:</label>
                    <input 
                        type = "text"
                        value = "{article.title}"
                        onChange={(e)=> setArticle({... article, title:e.target.value})}
                    /> 
                    <div className='error'>{errors.title}</div>
                </div>

                <div>
                    <label>Summary</label>
                    <textarea
                        value = {article.summary}
                        onChange={(e) => setArticle({...article, summary:e.target.value})}
                    /> 
                    <div className='error'>{errors.summary}</div>
                </div>

                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={article.date}
                        onChange={(e) => setArticle({ ...article, date: e.target.value })}
                    />
                    <div className="error">{errors.date}</div>
                </div>

                <div>
                    <label>Publisher:</label>
                    <input
                        type="text"
                        value={article.publisher}
                        onChange={(e) => setArticle({ ...article, publisher: e.target.value })}
                    />
                    <div className="error">{errors.publisher}</div>
                </div>

                <button type="submit">Submit</button>
            </form>

            {/* Navigation Link */ }
            <Link to="/fetch-page"> Go to Fetch/Display Page</Link>
        </div>
    ); 
}; 

export default CreateUpdateArticle;








    /*
SIMPLE FORM IN TYPESCRIPT
    import React, { useState } from 'react';

const MyForm: React.FC = () => {
  // Define state variables to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Here, you can perform actions with the form data, e.g., send it to an API
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
*/
