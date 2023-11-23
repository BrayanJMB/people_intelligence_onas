import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import styles from "./GuideResponse.module.css";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";


export const GuideResponse = () => {
  const navigate = useNavigate();
  const companyInfo = JSON.parse(localStorage.getItem("companyInfo"));
  const handleNext = () => {
    navigate("/questions");
  };

  const handlePrevious = () => {
    navigate("/policy");
  };
  return (
    <div className={styles.screen}>
      <Navbar logo={companyInfo?.logo} />
      <div className={styles.inner_box}>
        <h4>
          Hola bienvenido, esta es una guía para ayudarte a responder
          correctamente la encuesta
        </h4>
        
        <img src="/images/guide-response/Guia.jpg" alt="Descripción imagen" style={{ width: '100%' }}/>
        <div className={styles.move}>
          <IconButton
            aria-label="previous"
            color="info"
            onClick={handlePrevious}
          >
            <ArrowCircleLeftOutlinedIcon
              style={{ fontSize: 50, color: "black" }}
            />
          </IconButton>
          <IconButton aria-label="next" color="info" onClick={handleNext}>
            <ArrowCircleRightOutlinedIcon
              style={{ fontSize: 50, color: "black" }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
