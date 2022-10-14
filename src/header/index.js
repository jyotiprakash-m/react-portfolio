import React, { useState } from "react";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { BsFillUnlockFill, BsFillLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logotext, socialprofils } from "../content_option";
import Themetoggle from "../components/themetoggle";
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: "380px",
    position: "relative",
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    zIndex: 1000
  },
};
const Headermain = ({ isLock, setIsLock }) => {
  let subtitle;
  const [key, setKey] = useState("")

  const [isActive, setActive] = useState("false");
  // Modal to login
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };
  const handleLock = () => {
    if (isLock) {
      setIsLock(false)
    } else {
      setModalIsOpen(true);
    }
  }

  const handelAuthenticate = (e) => {
    e.preventDefault();
    if (!isLock && key !== "") {
      if (key === "Welcome1") {
        setIsLock(true);
        setModalIsOpen(false);
      } else {
        alert("Entered wrong credential")
      }
    } else {
      setIsLock(false)
    }

  }



  return (
    <>
      <header className="fixed-top site__header">
        <div className="d-flex align-items-center justify-content-between">
          <Link className="navbar-brand nav_ac" to="/">
            {logotext}
          </Link>
          <div className="d-flex align-items-center">
            <Themetoggle />
            <div className="menu__button  nav_ac" >
              {!isLock ? <BsFillLockFill onClick={handleLock} /> : <BsFillUnlockFill onClick={handleLock} />}
            </div>
            <button className="menu__button  nav_ac" onClick={handleToggle}>
              {!isActive ? <VscClose /> : <VscGrabber />}
            </button>

          </div>
        </div>

        <div className={`site__navigation ${!isActive ? "menu__opend" : ""}`}>
          <div className="bg__menu h-100">
            <div className="menu__wrapper">
              <div className="menu__container p-3">
                <ul className="the_menu">
                  <li className="menu_item ">
                    <Link onClick={handleToggle} to="/" className="my-3">Home</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/portfolio" className="my-3"> Portfolio</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/about" className="my-3">About</Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/contact" className="my-3"> Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="menu_footer d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3">
            <div className="d-flex">
              <a href={socialprofils.github} target="_blank" rel="noreferrer">Github</a>
              <a href={socialprofils.linkedin} target="_blank" rel="noreferrer">Linkedin</a>
            </div>
            <p className="copyright m-0">copyright __ {logotext}</p>
          </div>
        </div>
      </header>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 className="modal_heading" ref={(_subtitle) => (subtitle = _subtitle)}>Enter the key</h3>
        <form onSubmit={handelAuthenticate}>
          <input onChange={(e) => setKey(e.target.value)} className="modal_input" modal />
          <button type="submit" style={{ display: "none" }} />
        </form>
        {/* <button className="modal_close" onClick={closeModal}>close</button> */}
      </Modal>
      <div className="br-top"></div>
      <div className="br-bottom"></div>
      <div className="br-left"></div>
      <div className="br-right"></div>


    </>
  );
};

export default Headermain;
