import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

function Register() {
  const [info, setInfo] = useState({  
    name: "",
    email: "",
    password: "",
    location: ""
  });
  let navigate =useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...info })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
    else{
      navigate('/login');
    }
  }

  const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }

  return (
    <div className='container-fluid'>
      <div className='card text-black m-5' style={{ borderRadius: '25px', backgroundColor: '#2E8B57' }}>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-user me-3" style={{ fontSize: '1.5rem' }}></i>
                  <input type='text' className='form-control w-100' placeholder='Your Name' name='name' value={info.name} onChange={onChange} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-envelope me-3" style={{ fontSize: '1.5rem' }}></i>
                  <input type='email' className='form-control' placeholder='Your Email' name='email' value={info.email} onChange={onChange} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-lock me-3" style={{ fontSize: '1.5rem' }}></i>
                  <input type='password' className='form-control' placeholder='Password' name='password' value={info.password} onChange={onChange} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-lock me-3" style={{ fontSize: '1.5rem' }}></i>
                  <input type='text' className='form-control' placeholder='Location' name='location' value={info.location} onChange={onChange} />
                </div>

                <div className="d-flex justify-content-between w-100">
                  <button type="submit" className='btn btn-lg btn-primary w-50'>Register</button>
                  <Link to="/login" className="w-50 ms-2">
                    <button className='btn btn-lg btn-secondary w-100'>Login</button>
                  </Link>
                </div>
              </div>

              <div className='col-md-10 col-lg-6 order-1 order-lg-2 d-flex align-items-center'>
                <img src='https://source.unsplash.com/random/900x700?burger' className='img-fluid' alt='Illustration' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
