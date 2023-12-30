import React from 'react';

const MemberSelect = ({ members, handleSelect,selectedMember }) => {
  return (  
    <select value= {selectedMember} id='memberSelect' onChange={(e) => handleSelect(e.target.value)} >
      <option value="" disabled>Select a member</option>
      {members && members.map((member) => (
        <option key={member.mail} value={member.mail}>
          {member.mail}
        </option>
      ))}
    </select>
  );
};

export default MemberSelect;