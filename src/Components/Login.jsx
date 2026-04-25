import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast,Bounce } from 'react-toastify';


const Login = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post("https://shazai-backend.onrender.com/api/login", { username, password })
      localStorage.setItem("token",res.data.access_token)
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/chat")
      }, 3000);
    }catch(err){
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <section className="vh-100 bg-image"
        style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Log In</h2>

                    <form onSubmit={handleLogin}>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input type="text" className="form-control form-control-lg"
                          value={username}
                          onChange={(e) => setusername(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form3Example1cg">Your Userame</label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password" className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setpassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form3Example4cg">Your Password</label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button type="submit" data-mdb-button-init
                          data-mdb-ripple-init className="btn btn-success btn-block btn-lg gradient-custom-4 text-white ">Login</button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">You Do Not Have any account? Go to <Link to="/signup"
                        className="fw-bold text-body"><u>Signup here</u></Link></p>

                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login