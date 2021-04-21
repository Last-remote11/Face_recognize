import React, { useState } from 'react'
import './Profile.css'

const Profile = ({ isProfileOpen, toggleModal, user, loadUser}) => {

  const [name, setName] = useState(user.name)
  const [age, setAge] = useState(user.age)
  const [pet, setPet] = useState(user.pet)

  const onFormchange = (event) => {
    switch(event.target.name) {
      case 'name':
        setName(event.target.value)
        break
      case 'age':
        setAge(event.target.value)
        break
      case 'pet':
        setPet(event.target.value)
        break
      default:
        return
    }
  }

  const onProfileSubmit = async ( submit ) => {
    const token = window.sessionStorage.getItem('token')
    try {
      const response = await fetch(`http://localhost:3000/profile/${user.id}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ formInput: submit })
      })
      if (response.status === 200 || response.status === 304) {
        toggleModal()
        loadUser({...user, ...submit})
      }
    } catch(err) {console.log(err)}
  }

  return (
  <div className='profile-modal'>
    <article className="ph0 ma3 br2 ba dark-gray b--black-10 mv4 w-80 w-50-m w-30-l center shadow-3 bg-white">
      <main className="pa4 black-80 w-80">
      <img
        src="http://tachyons.io/img/logo.jpg"
        className="br-100 ba h3 w3 dib" alt="avatar" />
      <h1>{`Name : ${name}`}</h1>
      <h4>{`Images submitted: ${user.entries}`}</h4>
      <p>{`Member since: ${new Date (user.joined).toLocaleDateString()}`}</p>
      <hr />
      <form onChange={onFormchange} className="measure">
          <label className='mt2 fw6'>Name:</label>
          <input className="pa2 ba hover-bg-black hover-white w-100" 
            type="text" name="name"  id="name" placeholder={name} />
          <label className='mt2 fw6'>Age:</label>
          <input  className="pa2 ba hover-bg-black hover-white w-100" 
            type="text" name="age" id="age" placeholder={age} />
          <label className='mt2 fw6'>Pet:</label>
          <input className="b pa2 ba hover-bg-black hover-white w-100" 
            type="text" name="pet"  id="pet" placeholder={pet} />
        <div className="">
        <hr />

        <div className='mt4' style={{display:'flex', justifyContent:'space-evenly'}}>
          <button onClick={() => onProfileSubmit({name, age, pet})}
          className="b pa2 ba b--black bg-transparent w-40 pointer f6 dib hover-blue" value="save">Save</button>
          <button onClick={toggleModal}
          className="b pa2 ba b--black bg-transparent w-40 pointer f6 dib hover-red" value="close">Close</button>
        </div>
        </div>
      </form>
      </main>  
    </article>
  </div>
  )
}

export default Profile