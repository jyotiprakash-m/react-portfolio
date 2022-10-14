import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  meta,
  skills,
  services,
} from "../../content_option";
import { AiFillEdit, AiFillPlusCircle, AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from 'react-modal';
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",

};
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: "450px",
    position: "relative",
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    zIndex: 1000
  },
};
export const About = ({ isLock, setIsLock }) => {
  let subtitle;
  const [about, setAbout] = useState([]);
  let [loading, setLoading] = useState(true);

  // Update data
  const [aboutme, setAboutme] = useState("")
  //Get data

  // Modals control
  const [isDataAboutModal, setIsDataAboutModal] = useState(false);

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeDataAboutModal() {
    setIsDataAboutModal(false);
  }

  const getData = async () => {
    setLoading(true)
    axios.get("/dataabout").then((res) => {
      setAbout(previousState => {
        return { ...previousState, dataabout: res.data }
      });
      // Getting work time
      axios.get("/worktimeline").then((res) => {
        setAbout(previousState => {
          return { ...previousState, worktimeline: res.data }
        });
        // Getting skills
        axios.get("/skills").then((res) => {
          setAbout(previousState => {
            return { ...previousState, skills: res.data }
          });

          // Getting service
          axios.get("/services").then((res) => {
            setAbout(previousState => {
              return { ...previousState, services: res.data }
            });
            // Getting dataportfolio
            axios.get("/dataportfolio").then((res) => {
              setAbout(previousState => {
                return { ...previousState, dataportfolio: res.data }
              });

            }).then(() => {
              setLoading(false)
            }).catch(error => {
              console.log(error.response.data)
            })

          }).catch(error => {
            console.log(error.response.data)
          })
        }).catch(error => {
          console.log(error.response.data)
        })
      }).catch(error => {
        console.log(error.response.data)
      })
    }).catch((error) => {
      console.log(error.response.data)
    })
  }
  // Intial state
  useEffect(() => {

    getData();
  }, [])


  // Update data about
  const submitDataAbout = (e) => {
    e.preventDefault();
    axios.patch("/dataabout", { aboutme }).then((res) => {
      console.log(res.data)
    }).then(() => {
      setIsDataAboutModal(false)
      getData();
    }).catch(error => {
      console.log(error.response.data)
    })
  }

  // ***** Work time functionality **********
  // Delete work
  const deleteWorkTime = (workTime) => {
    let text = `Are you want to delete ${workTime.jobtitle}`;
    if (window.confirm(text) === true) {
      axios.delete(`/worktimeline/${workTime.id}`).then((res) => {
        console.log(res.data)
      }).then(() => {
        getData();
      }).catch((error) => {
        console.log(error.response.data)
      })
    }
  }

  return (
    <HelmetProvider>
      {loading ?
        <ClipLoader
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
        <Container className="About-header">
          <Helmet>
            <meta charSet="utf-8" />
            <title> About | {meta.title}</title>
            <meta name="description" content={meta.description} />
          </Helmet>
          <Row className="mb-5 mt-3">
            <Col lg="8">
              <h1 className="display-4 mb-4">About me</h1>
              <hr className="t_border my-4 ml-0 text-left" />
            </Col>
          </Row>
          <Row className="sec_sp">
            <Col lg="5">
              <h3 className="color_sec py-4">{about && about.dataabout && about.dataabout.title} {isLock && <span className="action_icon" onClick={() => setIsDataAboutModal(true)}><AiFillEdit /></span>}</h3>
            </Col>
            <Col lg="7" className="d-flex align-items-center">
              <div>
                <p>{about && about.dataabout && about.dataabout.aboutme}</p>
              </div>
            </Col>
          </Row>
          <Row className=" sec_sp">
            <Col lg="5">
              <h3 className="color_sec py-4">Work Timline {isLock && <span className="action_icon"><AiFillPlusCircle /></span>}</h3>
            </Col>
            <Col lg="7">
              <table className="table caption-top">
                <tbody>
                  {about && about.worktimeline.map((data) => {
                    return (
                      <tr key={data.id}>
                        <th scope="row">{data.jobtitle}</th>
                        <td>{data.where}</td>
                        <td>{data.startDate}</td>
                        <td>{data.endDate}</td>
                        <td>{isLock && <span className="action_icon"><AiFillEdit /></span>}{isLock && <span className="action_icon" onClick={() => deleteWorkTime(data)}><AiTwotoneDelete /></span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Col>
          </Row>
          <Row className="sec_sp">
            <Col lg="5">
              <h3 className="color_sec py-4">Skills {isLock && <span className="action_icon"><AiFillPlusCircle /></span>}</h3>
            </Col>
            <Col lg="7">
              {skills.map((data, i) => {
                return (
                  <div key={i}>
                    <h3 className="progress-title">{data.name} {isLock && <span className="action_icon"><AiFillEdit /></span>}{isLock && <span className="action_icon"><AiTwotoneDelete /></span>}</h3>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${data.value}%`,
                        }}
                      >
                        <div className="progress-value">{data.value}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Col>
          </Row>
          <Row className="sec_sp">
            <Col lang="5">
              <h3 className="color_sec py-4">services {isLock && <span className="action_icon"><AiFillPlusCircle /></span>}</h3>
            </Col>
            <Col lg="7">
              {services.map((data, i) => {
                return (
                  <div className="service_ py-4" key={i}>
                    <h5 className="service__title">{data.title} {isLock && <span className="action_icon"><AiFillEdit /></span>}{isLock && <span className="action_icon"><AiTwotoneDelete /></span>}</h5>
                    <p className="service_desc">{data.description}</p>
                  </div>
                );
              })}
            </Col>
          </Row>
        </Container>
      }

      {/* About Data modal */}
      <Modal
        isOpen={isDataAboutModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeDataAboutModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 className="modal_heading" ref={(_subtitle) => (subtitle = _subtitle)}>A bit about myself</h3>
        <form onSubmit={submitDataAbout}>
          <textarea onChange={(e) => setAboutme(e.target.value)} className="modal_input" modal />
          <div className="modal_button_container">
            <button type="submit" className="modal_button">Update</button>
          </div>
        </form>
        {/* <button className="modal_close" onClick={closeModal}>close</button> */}
      </Modal>
    </HelmetProvider>
  );
};
