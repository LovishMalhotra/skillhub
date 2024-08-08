import React, { useEffect, useState } from 'react';
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
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const authToken = localStorage.getItem('authToken');
  const { userId: paramUserId } = useParams();
  let userId;
  console.log(userId)
  if (authToken) {
    const decodedToken = jwtDecode(authToken);
    const role = decodedToken.role;

    if (role === 'Employee') {
      userId = decodedToken.id; 
    } else {
      userId = paramUserId;
    }
  }

  // console.log(userId)

  useEffect(() => {
    const fetchdata = async() =>{
      try{
        const response  = await axios.get(`http://localhost:8080/user/getProfile/${userId}`);
        setProfile(response.data);
        console.log(response);
      }
      catch(e){
        console.log(e);
      }
    }
    fetchdata()
  }, [userId]);

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
                  src={profile.imageUrl || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid
                />
                <p className="text-muted mb-1">{profile.designation || "Designation"}</p>
                <p className="text-muted mb-4">{profile.department || "Department"}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  {/* Replace with user's social media links */}
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                    <MDBCardText>{profile.github || "mdbootstrap"}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                    <MDBCardText>{profile.twitter || "@mdbootstrap"}</MDBCardText>
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
                    <MDBCardText className="text-muted">{profile.name || "Johnatan Smith"}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profile.user.email || "example@example.com"}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profile.phone || "(097) 234-5678"}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profile.address || "Bay Area, San Francisco, CA"}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Skills</span> Current Skills</MDBCardText>
                    {profile.skills.map((skill, index) => (
                      <div key={index}>
                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>{skill.skillName}</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar
                            width={skill.level === 'Beginner' ? 33 : skill.level === 'Intermediate' ? 66 : 100}
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
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Skills</span> Pending Skills</MDBCardText>
                    {profile.pendingSkills.map((skill, index) => (
                      <div key={index}>
                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>{skill.skillName}</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar
                            width={skill.level === 'Beginner' ? 33 : skill.level === 'Intermediate' ? 66 : 100}
                            valuemin={0}
                            valuemax={100}
                          />
                        </MDBProgress>
                      </div>
                    ))}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
