"use client"
import React, { useState } from 'react';
import './AddProject.css';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/navbar2/Navbar';

const AddProject = () => {
  const [project, setProject] = useState({
    projectName: '',
    budgetMin: '',
    budgetMax: '',
    endDate: '',
    description: '',
    keyOfferings: [''],
    skillsRequired: ['']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    setProject(prev => ({
      ...prev,
      endDate: e.target.value
    }));
  };

  const handleArrayChange = (type, index, value) => {
    setProject(prev => {
      const newArray = [...prev[type]];
      newArray[index] = value;
      return {
        ...prev,
        [type]: newArray
      };
    });
  };

  const addItem = (type) => {
    setProject(prev => ({
      ...prev,
      [type]: [...prev[type], '']
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out empty items from arrays
    const formattedProject = {
      ...project,
      keyOfferings: project.keyOfferings.filter(item => item.trim() !== ''),
      skillsRequired: project.skillsRequired.filter(item => item.trim() !== '')
    };
    
    // Here you would typically send the data to your API
    console.log('Project data to submit:', formattedProject);
    alert('Project added successfully!');
  };

  return (
    <div>
      <NavBar/>
    <div className="add-project-container">
      <h1 className="add-project-title">Add a Project</h1>
      
      <form onSubmit={handleSubmit} className="add-project-form">
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={project.projectName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group budget-group">
          <label>Budget</label>
          <div className="budget-inputs">
            <div className="budget-field">
              <span className="budget-label">Min:</span>
              <div className="budget-input-wrapper">
                <input
                  type="number"
                  name="budgetMin"
                  value={project.budgetMin}
                  onChange={handleChange}
                />
                <span className="currency">USD</span>
              </div>
            </div>
            
            <div className="budget-field">
              <span className="budget-label">Max:</span>
              <div className="budget-input-wrapper">
                <input
                  type="number"
                  name="budgetMax"
                  value={project.budgetMax}
                  onChange={handleChange}
                />
                <span className="currency">USD</span>
              </div>
            </div>
          </div>
        </div>
        
        
        <div className="form-group">
          <label htmlFor="endDate">End Date of Binding</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={project.endDate}
            onChange={handleDateChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            name="description"
            value={project.description}
            onChange={handleChange}
            minLength={100}
            rows={5}
          ></textarea>
          <div className="character-count">
            <span>min. 100 characters</span>
            <span>{project.description.length}/700</span>
          </div>
        </div>
        
        <div className="form-group">
          <label>Key Offering</label>
          {project.keyOfferings.map((offering, index) => (
            <div key={`offering-${index}`} className="array-input-wrapper">
              <input
                type="text"
                value={offering}
                onChange={(e) => handleArrayChange('keyOfferings', index, e.target.value)}
              />
              {index === project.keyOfferings.length - 1 && (
                <button 
                  type="button" 
                  className="add-item-btn"
                  onClick={() => addItem('keyOfferings')}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="form-group">
          <label>Skills Required</label>
          {project.skillsRequired.map((skill, index) => (
            <div key={`skill-${index}`} className="array-input-wrapper">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleArrayChange('skillsRequired', index, e.target.value)}
              />
              {index === project.skillsRequired.length - 1 && (
                <button 
                  type="button" 
                  className="add-item-btn"
                  onClick={() => addItem('skillsRequired')}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="submit-container">
          <button type="submit" className="submit-button">Add</button>
        </div>
      </form>
    </div>
      <div style={{ backgroundColor: "#2f3c7e", marginTop: "50px" }}>
                <Footer />
      </div>
      </div>
    
  );
};

export default AddProject;