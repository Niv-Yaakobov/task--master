import React,{useState} from 'react'
import './addGroupPage.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const AddGroupPage = () => {

    const history = useHistory();
    const [groupTitle, setGroupTitle] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
  
    const handleAddMember = () => {
      if (memberEmail.trim() !== '' && !members.includes(memberEmail)) {
        setMembers([...members, memberEmail]);
        setMemberEmail('');
      }
    };

    const handleRemoveMember = (index) => {
      const updatedMembers = [...members];
      updatedMembers.splice(index, 1);
      setMembers(updatedMembers);
    };

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        const groupData = {
          title: groupTitle,
          members: members,
        };
        // Reset state
        setGroupTitle('');
        setMemberEmail('');
        setMembers([]);
        const userId = '0' // don't need the userId
        await axios.post(`http://localhost:4001/${userId}/groups` , groupData)
        setIsLoading(false)
        history.push('/home');
      };

      
    return ( 
      <form onSubmit={handleSubmit}>

        <div className="add-group-page-container login-container">
            <h2 className='login-page-headline create-new-group-headline'>Create a New Group</h2>
            <div className="data-container mail-container add-group-data-container">
            <input
            className="input-login-page "
            placeholder='Group title'
                type="text"
                value={groupTitle}
                onChange={(e) => setGroupTitle(e.target.value)}
            />
            </div>

            <div className="data-container mail-container add-group-data-container">
              <input
              placeholder='Member mail'
              className="input-login-page"
                  type="text"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
              />
              <button className='add-member-button' onClick={handleAddMember} type='button'>Add Member</button>
            </div>
            
            <button className='create-group-button' type='submit'>{isLoading ? 'loading...' : 'Create Group'}</button>

            <div className='members-container'> 
            {members.map((member, index) => (
            <div className='member'key={index}>
              <span>{member}</span>
              <button className='remove-member-button' type='button' onClick={() => handleRemoveMember(index)}>X</button>
            </div>
            ))}
            </div>
        </div>
        </form>

     );
}
 
export default AddGroupPage;