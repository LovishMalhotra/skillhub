import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import axios from "axios";

export function Training() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8080/skills/getSkills"
      );
      // console.log(response.data);
      setSkills(response.data);
    };
    fetchData();
    // setEmployees(empData);
  }, []);

  const responsiveOptions = [
    {
      breakpoint: "1440px",
      numVisible: 4,
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
          <h4 className="mb-2 text-xl font-bold text-lg">{skills.skillName}</h4>
         
          <Tag value={`trainees`} className="mb-3" />
        </div>
      </div>
    );
  };

  return (
    <div className="mt-5 mx-10" >
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
  const [skillName, setSkillName] = useState("");
  const [skillImage, setSkillImage] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [options, setOptions] = useState([
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ]);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const handleAddOption = () => {
    if (
      newOption.trim() &&
      !options.some((option) => option.name === newOption)
    ) {
      const newOptionObj = {
        name: newOption,
        code: newOption.slice(0, 2).toUpperCase(),
      };
      setOptions([...options, newOptionObj]);
      setNewOption("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const techStack = selectedOptions;
    const formData = new FormData();
    formData.append("skillName", skillName);
    formData.append("techStack", JSON.stringify(techStack));
    if (skillImage) formData.append("skillImage", skillImage);
    try {
      const response = await fetch("http://localhost:8080/skills/create", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showConfirmDialog = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () =>
        toast.current.show({
          severity: "info",
          summary: "Confirmed",
          detail: "Skill details accepted",
          life: 2000,
        }),
      reject: () =>
        toast.current.show({
          severity: "warn",
          summary: "Rejected",
          detail: "You have rejected",
          life: 2000,
        }),
    });
  };

  return (
    <>
      <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Header"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="d-flex align-items-center flex-column ">
            <InputText
              type="text"
              placeholder="Skill Name"
              tooltip="Upload Skill Image Also"
              style={{ width: "80%" }}
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
            />
            <FileUpload
              onSelect={(e) => setSkillImage(e.files[0])}
              style={{ width: "80%" }}
              name="demo[]"
              url={"/api/upload"}
              multiple
              accept="image/*"
              maxFileSize={1000000}
              emptyTemplate={
                <p className="m-0">Drag and drop files to here to upload.</p>
              }
            />
            <div className="d-flex align-items-center m-4 p-d-flex p-ai-center">
              <MultiSelect
                value={selectedOptions}
                onChange={(e) => setSelectedOptions(e.target.value)}
                options={options}
                optionLabel="name"
                filter
                placeholder="Select or add an option"
                maxSelectedLabels={3}
                className="w-full md:w-20rem"
              />
              <InputText
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add new tech"
                className="p-mr-2"
              />
              <Button
                label="Add"
                icon="pi pi-plus"
                onClick={handleAddOption}
                disabled={!newOption.trim()}
                className="rounded-6"
              />
            </div>
            <Toast ref={toast} />
            <div className="card flex flex-wrap gap-2 justify-content-center">
              <Button
                onClick={showConfirmDialog}
                icon="pi pi-check"
                label="Save"
                className="rounded-6"
                style={{ width: "20vw" }}
              />
            </div>
          </div>
        </form>
      </Dialog>
      <ConfirmDialog />
    </>
  );
}
