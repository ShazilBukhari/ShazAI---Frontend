import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <button
            data-mdb-collapse-init
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">ChatGPT</a>
              </li>
            </ul>
            

            <div className="d-flex align-items-center">
              <Link to="/login" data-mdb-ripple-init type="button" className="btn btn-link px-3 me-2">
                Login
              </Link >
              <Link to="/signup" data-mdb-ripple-init type="button" className="btn btn-primary me-3">
                Sign up for free
              </Link >
              <a
                data-mdb-ripple-init
                className="btn btn-dark px-3"
                href="https://github.com/ShazilBukhari"
                role="button"
              ><i className="fab fa-github"></i></a>
            </div>
          </div>
          
        </div>
        
      </nav>

    </>
  )
}

export default Navbar