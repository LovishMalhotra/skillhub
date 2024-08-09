import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dropdown } from 'primereact/dropdown';

export function UserProfileDialog({ visible, onClose, onSave, userProfile }) {
  const [name, setName] = useState(userProfile?.name || '');
  const [designation, setDesignation] = useState(userProfile?.designation || '');
  const [department, setDepartment] = useState(userProfile?.department || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [skills, setSkills] = useState(userProfile?.skills || []);
  const [pendingSkills, setPendingSkills] = useState(userProfile?.pendingSkills || []);
  const [newSkill, setNewSkill] = useState({ skillName: '', level: 'Beginner' });
  const [newPendingSkill, setNewPendingSkill] = useState({ skillName: '', level: 'Beginner' });
  const [imageFile, setImageFile] = useState(null);
  const toast = useRef(null);

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleAddSkill = () => {
    if (newSkill.skillName.trim()) {
      setSkills(prevSkills => [...prevSkills, newSkill]);
      setNewSkill({ skillName: '', level: 'Beginner' });
    }
  };

  const handleAddPendingSkill = () => {
    if (newPendingSkill.skillName.trim()) {
      setPendingSkills(prevPendingSkills => [...prevPendingSkills, newPendingSkill]);
      setNewPendingSkill({ skillName: '', level: 'Beginner' });
    }
  };

  const handleFileUpload = (e) => {
    setImageFile(e.files[0]);
  };

  const handleSubmit = async () => {
    const profileData = new FormData();
    profileData.append('user','66b3a7a9a8b2720aa4cf12bb')
    profileData.append('name', name);
    profileData.append('designation', designation);
    profileData.append('department', department);
    profileData.append('phone', phone);
    profileData.append('skills', JSON.stringify(skills));
    profileData.append('pendingSkills', JSON.stringify(pendingSkills));
    if (imageFile) profileData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:8080/user/create/', {
        method: 'POST',
        body: profileData
      });

      if (!response.ok) throw new Error('Failed to update profile.');

      const responseData = await response.json();
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully', life: 3000 });
      onClose();
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update profile', life: 3000 });
    }
  };

  const showConfirmDialog = () => {
    confirmDialog({
      message: 'Are you sure you want to save the changes?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: handleSubmit,
      reject: () => toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Changes not saved', life: 2000 })
    });
  };

  return (
    <Dialog
      header="Edit User Profile"
      visible={visible}
      style={{ width: '50vw' }}
      onHide={onClose}
    >
      <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
        <div className="p-fluid">
          <div className="p-field">
            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
          </div>
          <div className="p-field">
            <InputText id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Designation" required />
          </div>
          <div className="p-field">
            <InputText id="department" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" required />
          </div>
          <div className="p-field">
            <InputText id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
          </div>
          <div className="p-field">
            <FileUpload name="image" customUpload uploadHandler={handleFileUpload} accept="image/*" chooseLabel="Select Image" />
          </div>
          <div className="p-field">
            <label>Skills</label>
            {skills.map((skill, index) => <div key={index}>{skill.skillName} - {skill.level}</div>)}
            <InputText value={newSkill.skillName} onChange={(e) => setNewSkill({ ...newSkill, skillName: e.target.value })} placeholder="Skill Name" />
            <Dropdown value={newSkill.level} options={skillLevels} onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })} placeholder="Select Level" />
            <Button label="Add Skill" icon="pi pi-plus" onClick={handleAddSkill} disabled={!newSkill.skillName.trim()} />
          </div>
         
          <div className="p-d-flex p-jc-between">
            <Button label="Cancel" icon="pi pi-times" onClick={onClose} className="p-button-secondary" />
            <Button label="Save" icon="pi pi-check" onClick={showConfirmDialog} className="p-button-primary" />
          </div>
          <Toast ref={toast} />
        </div>
      </form>
      <ConfirmDialog />
    </Dialog>
  );
}


export function Editlogic() {
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleSave = async (profileData) => {
    try {
      const response = await fetch(`http://localhost:8080/user/create/`, {
        method: 'POST',
        body: profileData
      });
     
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      console.log(profileData);
      Toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Profile updated successfully',
        life: 3000
      });
      console.log('Profile saved successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="App">
      <Button
        label="Edit Profile"
        icon="pi pi-pencil"
        onClick={() => setDialogVisible(true)}
        className="p-button-rounded p-button-success"
      />
      <UserProfileDialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        onSave={handleSave}
      />
    </div>
  );
}
