import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import Navbar from "../../components/Navbar";

const config = {
  headers: { "Content-type": "application/json" },
};

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  let { code } = queryString.parse(location.search);

  let personId = code?.split("/")[0];
  let versionId = code?.split("/")[1];

  const dataCookie = JSON.parse(localStorage.getItem("dataCookie"));
  if (!code) {
    if (!dataCookie) {
      navigate("/thanks");
    } else {
      personId = dataCookie.personId;
      versionId = dataCookie.versionId;
    }
  }
  if (!dataCookie) {
    localStorage.setItem(
      "dataCookie",
      JSON.stringify({
        personId: personId,
        versionId: versionId,
      })
    );
  }

  const verify = async () => {
    try {
      await axios
        .create({
          baseURL:
            "https://peopleintelligenceapi.azurewebsites.net/api/OnasSurvey/",
        })
        .get(`${personId}/${versionId}`, config)
        .then((res) => {
          localStorage.setItem(
            "urlInfo",
            JSON.stringify({ personId: personId, versionId: versionId })
          );
          setData(res.data);
          setSuccess(true);
        });
    } catch (error) {
      navigate("/thanks");
    }
  };

  const click = () => {
    navigate("/policy");
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("companyInfo", JSON.stringify(data));
    } else {
      verify();
    }
  }, [success]);
  return (
    <div className={styles.screen}>
      <Navbar logo={data?.logo} />
      <div className={styles.inner_box}>
        <h3>
          Hola <strong className={styles.red}>{data?.nombrePersona}</strong>
        </h3>
        <p>
          Bienvenido a nuestra herramienta de recolecci??n de datos para el
          desarrollo del an??lisis de redes organizacionales que People
          Intelligence est?? desarrollando para
          <strong className={styles.red + " " + styles.top}>
            {" "}
            {data?.empresa}{" "}
          </strong>
        </p>
        <p className={styles.top}>
          A continuaci??n te formularemos{" "}
          <strong style={{ fontWeight: "bold" }}>siete</strong> preguntas, que
          te tomaran alrededor de 10 minutos responder.
        </p>
        <p className={styles.top}>
          Esta informaci??n nos ayudar?? a entender las redes internas de
          interacci??ny nos permitir?? definir acciones para fortalecer el trabajo
          colaborativo en la organizaci??n.
        </p>
        <div className={styles.bullets}>
          <span className={styles.active}></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.next}>
          <IconButton aria-label="next" color="info" onClick={click}>
            <ArrowCircleRightOutlinedIcon
              style={{ fontSize: 50, color: "black" }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
