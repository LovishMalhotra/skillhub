import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput,
} from "mdb-react-ui-kit";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [updatedSkill, setUpdatedSkill] = useState({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const toast = useRef(null);
  const authToken = localStorage.getItem("authToken");
  const { userId: paramUserId } = useParams();
  let userId;

  if (authToken) {
    const decodedToken = jwtDecode(authToken);
    const role = decodedToken.role;

    if (role === "Employee") {
      userId = decodedToken.id;
    } else {
      userId = paramUserId;
    }
  }

  useEffect(() => {
    if (!userId) return;
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/getProfile/${userId}`
        );
        setProfile(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchdata();
  }, [userId]);

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setUpdatedSkill(skill);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSkill({ ...updatedSkill, [name]: value });
  };

  const handleSaveSkill = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/user/updatePendingSkill/${userId}`,
        updatedSkill
      );
      setProfile(response.data);
      setEditingSkill(null);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSavePendingSkills = async (profileData) => {
    try {
      console.log(profileData);
      const response = await axios.put(
        `http://localhost:8080/user/updatePendingSkills/${userId}`,
        profileData
      );
  
      setProfile(response.data);
      setDialogVisible(false);
    } catch (error) {
      console.error('Error saving pending skills:', error.response ? error.response.data : error.message);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error.response ? error.response.data.message : error.message,
        life: 3000,
      });
    }
  };

  const showConfirmDialog = () => {
    confirmDialog({
      message: 'Are you sure you want to save the changes?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => handleSavePendingSkills({
        pendingSkills: profile.pendingSkills
      }),
      reject: () => toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Changes not saved', life: 2000 })
    });
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <Navbar />

      <MDBContainer className="py-3">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={
                    profile.imageUrl ||
                    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  }
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1">
                  {profile.designation || "Designation"}
                </p>
                <p className="text-muted mb-4">
                  {profile.department || "Department"}
                </p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">
                    Message
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="github fa-lg"
                      style={{ color: "#333333" }}
                    />
                    <MDBCardText>{profile.github || "mdbootstrap"}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="twitter fa-lg"
                      style={{ color: "#55acee" }}
                    />
                    <MDBCardText>
                      {profile.twitter || "@mdbootstrap"}
                    </MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {profile.name || "Johnatan Smith"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {profile.user.email || "example@example.com"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {profile.phone || "(097) 234-5678"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {profile.address || "Bay Area, San Francisco, CA"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">
                        Skills
                      </span>{" "}
                      Current Skills
                    </MDBCardText>
                    {profile.skills.map((skill, index) => (
                      <div key={index}>
                        <MDBCardText
                          className="mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          {skill.skillName}
                        </MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar
                            width={
                              skill.level === "Beginner"
                                ? 33
                                : skill.level === "Intermediate"
                                ? 66
                                : 100
                            }
                            valuemin={0}
                            valuemax={100}
                          />
                        </MDBProgress>
                      </div>
                    ))}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">
                        Skills
                      </span>{" "}
                      Pending Skills
                    </MDBCardText>
                    <MDBBtn
                          color="warning"
                          onClick={(skill)=>setDialogVisible(true)}
                        >
                          Update Pending Skills
                        </MDBBtn>
                    {profile.pendingSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <MDBCardText
                            className="mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            {skill.skillName}
                          </MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar
                              width={
                                skill.level === "Beginner"
                                  ? 33
                                  : skill.level === "Intermediate"
                                  ? 66
                                  : 100
                              }
                              valuemin={0}
                              valuemax={100}
                            />
                          </MDBProgress>
                        </div>
                        
                      </div>
                    ))}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <Dialog
        header="Edit Pending Skills"
        visible={dialogVisible}
        style={{ width: '50vw' }}
        onHide={() => setDialogVisible(false)}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="p-fluid">
            <div className="p-field">
              <label>Pending Skills</label>
              {profile.pendingSkills.map((skill, index) => (
                <div key={index} className="p-d-flex p-jc-between p-ai-center">
                  <div>
                    {skill.skillName} - {skill.level}
                  </div>
                  <Button
                    icon="pi pi-times"
                    className="p-button-danger p-button-rounded p-button-text"
                    onClick={() => setProfile({
                      ...profile,
                      pendingSkills: profile.pendingSkills.filter((_, i) => i !== index)
                    })}
                  />
                </div>
              ))}
              <div className="p-d-flex p-ai-center p-mt-2">
                <InputText
                  value={updatedSkill.skillName || ''}
                  onChange={(e) => setUpdatedSkill({ ...updatedSkill, skillName: e.target.value })}
                  placeholder="Skill Name"
                  className="p-mr-2"
                />
                <Dropdown
                  value={updatedSkill.level || 'Beginner'}
                  options={['Beginner', 'Intermediate', 'Advanced']}
                  onChange={(e) => setUpdatedSkill({ ...updatedSkill, level: e.target.value })}
                  placeholder="Select Level"
                  className="p-mr-2"
                />
                <Button
                  label="Add Skill"
                  icon="pi pi-plus"
                  onClick={() => {
                    if (updatedSkill.skillName.trim()) {
                      setProfile({
                        ...profile,
                        pendingSkills: [...profile.pendingSkills, updatedSkill]
                      });
                      setUpdatedSkill({ skillName: '', level: 'Beginner' });
                    }
                  }}
                />
              </div>
            </div>
            <div className="p-d-flex p-jc-between p-mt-3">
              <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={() => setDialogVisible(false)}
                className="p-button-secondary"
              />
              <Button
                label="Save"
                icon="pi pi-check"
                onClick={showConfirmDialog}
                className="p-button-primary"
              />
            </div>
            <Toast ref={toast} />
          </div>
        </form>
        <ConfirmDialog />
      </Dialog>
    </section>
  );
}
