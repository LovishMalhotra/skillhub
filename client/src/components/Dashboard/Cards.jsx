import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";
import axios from "axios";

export function Training() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/skills/getSkills");
      console.log(response.data);
      setSkills(response.data)
    };
    fetchData();
    // setEmployees(empData);
  }, []);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const employeeTemplate = (skills) => {
    return (
      <div
        className="card border-1 m-4 surface-border border-round  text-center  shadow-2"
        style={{ width: "90%" }}
      >
        <div className="mb-3">
          <Avatar
            image={skills.skillImage}
            size="xlarge"
            style={{ width: "300px", height: "200px" }}
          />
        </div>

        <div>
          <h4 className="mb-1 text-xl font-bold text-lg">{skills.skillName}</h4>
          <h6 className="mt-0 mb-3 text-sm text-gray-600">
            {skills.designation}
          </h6>
          <Tag value={skills.status} className="mb-3" />
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <Carousel
        value={skills}
        numScroll={1}
        numVisible={4}
        responsiveOptions={responsiveOptions}
        itemTemplate={employeeTemplate}
      />
    </div>
  );
}

export function CreateSkillForm() {
  const [skillName, setSkillName] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [techInputName, setTechInputName] = useState('');
  const [techInputImage, setTechInputImage] = useState(null);
  const [skillImage, setSkillImage] = useState(null);

  const handleTechNameChange = (e) => {
    setTechInputName(e.target.value);
  };

  const handleTechImageChange = (e) => {
    setTechInputImage(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    setSkillImage(e.target.files[0]);
  };

  const handleAddTech = () => {
    if (techInputName.trim()) {
      const techImage = techInputImage ? URL.createObjectURL(techInputImage) : ''; // Generate a URL for local file
      setTechStack([...techStack, { techName: techInputName, techImage }]);
      setTechInputName('');
      setTechInputImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('skillName', skillName);
    formData.append('techStack', JSON.stringify(techStack)); // Convert techStack array to JSON string
    if (skillImage) formData.append('skillImage', skillImage);

    try {
      const response = await fetch('http://localhost:8080/skills/create', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Skill Name:
        <input type="text" value={skillName} onChange={(e) => setSkillName(e.target.value)} required />
      </label>
      <label>
        Tech Stack:
        <div>
          <input
            type="text"
            value={techInputName}
            onChange={handleTechNameChange}
            placeholder="Enter technology name"
          />
          <input
            type="file"
            onChange={handleTechImageChange}
          />
          <button type="button" onClick={handleAddTech}>Add</button>
        </div>
        <ul>
          {techStack.map((tech, index) => (
            <li key={index}>
              {tech.techName}
              {tech.techImage && <img src={tech.techImage} alt={tech.techName} width="50" />}
            </li>
          ))}
        </ul>
      </label>
      <label>
        Skill Image:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Create Skill</button>
    </form>
  );
}
