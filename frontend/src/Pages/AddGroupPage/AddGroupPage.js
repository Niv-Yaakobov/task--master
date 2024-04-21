import React, { useState, useRef } from 'react';
import './addGroupPage.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddGroupPage = () => {
  const history = useHistory();
  const [groupTitle, setGroupTitle] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userMail = localStorage.getItem('userMail');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const errorMessages = ["User already chosen to the group", "Group Title is empty"];
  const [errorIndex, setErrorIndex] = useState(0);

  const groupTitleInputRef = useRef(null); // Define groupTitleInputRef
  const memberEmailInputRef = useRef(null); // Define memberEmailInputRef

  const handleAddMember = () => {
    if (memberEmail.trim() !== '' && !members.includes(memberEmail)) {
      setMembers([...members, memberEmail]);
      setMemberEmail('');
    } else if(memberEmail.trim() !== '') {
      setShowErrorMessage(true);
      setErrorIndex(0);
    }
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(groupTitle.trim() !== ''){
      setIsLoading(true);
      var finalMembersArray = [...members];

      if (!members.includes(userMail)) {
        finalMembersArray.push(userMail);
      }

      const groupData = {
        title: groupTitle,
        members: finalMembersArray,
      };

      // Reset state
      setGroupTitle('');
      setMemberEmail('');
      setMembers([]);
      const userId = '0'; // don't need the userId
      try {
        await axios.post(`http://localhost:4001/${userId}/groups`, groupData);
        setIsLoading(false);
        history.push('/home');
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
  }
  else{
    setShowErrorMessage(true)
    setErrorIndex(1);
  }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target === groupTitleInputRef.current) {
        memberEmailInputRef.current.focus();
      } else {
        handleAddMember();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-group-page-container login-container">
        <h2 className="login-page-headline create-new-group-headline">Create a New Group</h2>
        <div className="data-container mail-container add-group-data-container">
          <input
            ref={groupTitleInputRef} // Assign ref to group title input field
            className="input-login-page"
            placeholder="Group title"
            type="text"
            value={groupTitle}
            onChange={(e) =>{
               setGroupTitle(e.target.value)
               if (errorIndex === 1) {
                setShowErrorMessage(false);
              }
              }}
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className="data-container mail-container add-group-data-container">
          <input
            ref={memberEmailInputRef} // Assign ref to member email input field
            placeholder="Member mail"
            className="input-login-page"
            type="text"
            value={memberEmail}
            onChange={(e) => {
              setMemberEmail(e.target.value);
              if (errorIndex === 0) {
                setShowErrorMessage(false);
              }
            }}
            onKeyDown={handleKeyPress}
          />
          <button className="add-member-button" onClick={handleAddMember} type="button">
            Add Member
          </button>
        </div>

        {showErrorMessage && <p className="error">{errorMessages[errorIndex]}</p>}

        <button className="create-group-button" type="submit">
          {isLoading ? 'loading...' : 'Create Group'}
        </button>

        <div className="members-container">
          {members.map((member, index) => (
            <div className="member" key={index}>
              <span>{member}</span>
              <button className="remove-member-button" type="button" onClick={() => handleRemoveMember(index)}>
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default AddGroupPage;
