import React, { useState, useEffect, useCallback } from "react";
import styles from "./Questions.module.css";
import Mobile from "../../components/Mobile/Mobile";
import Desktop from "../../components/Desktop/Desktop";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";

//import * as uuid from "uuid";

const data = [
  {
    title: "Relación General:",
    question:
      "1. ¿Cuándo necesitas ayuda en tus responsabilidades a qué personas acudes?",
  },

  {
    title: "Relación Información:",
    question:
      "2. ¿Cuándo necesitas información actualizada y de confianza sobre la empresa a quienes acudes?",
  },
  {
    title: "Relación Inspiracional:",
    question:
      "3. ¿Cuándo necesitas consejos o feedback, quién es la personas indicada para ti?",
  },
  {
    title: "Relación Transaccional:",
    question:
      "4. ¿Cuándo necesitas autorizaciones para continuar con el desarrollo de tus funciones?",
  },
  {
    title: "Relación Técnico:",
    question:
      "5. ¿Cuándo necesitas ayuda especializada para el desarrollo de tus responsabilidades a qué personas acudes?",
  },
  {
    title: "Relación Last:",
    question:
      "6. Cuándo te necesitan o te contactan, ¿generalmente que personas son y que tipo de interacción es?",
  },
  {
    title: "Pregunta 7:",
    question:
      "7. ¿Aquí iría texto pregunta número 7",
  },
];

const breakPoint = 880;

export default function Questions() {
  const navigate = useNavigate();
  const companyInfo = JSON.parse(localStorage.getItem("companyInfo"));
  const [width, setWidth] = useState(window.innerWidth);
  const [success, setSuccess] = useState(false);
  const urlInfo = JSON.parse(localStorage.getItem("dataCookie"));
  const [questions, setQuestions] = useState(
    Array(data.length).fill({
      questionId: 0,
      general: Array(1).fill({
        name: "",
        frecuency: "",
        agility: "",
        quality: "",
        closeness: "",
      }),
    })
  );

  const handleData = useCallback(
    (key, row) => (event) => {
      let prop = event.target.name;
      let tmp = questions.map((item, i) => {
        if (key === i) {
          let ymp = item.general.map((val, y) => {
            if (y === row) {
              return { ...val, [prop]: event.target.value };
            } else {
              return val;
            }
          });
          return { ...item, general: ymp };
        } else {
          return item;
        }
      });
      setQuestions(tmp);
    },
    [questions]
  );

  const handleAdd = useCallback(
    (key) => {
      let tmp = questions.map((item, i) => {
        if (key === i) {
          let ymp = [...item.general];
          ymp.push({
            name: "",
            frecuency: "",
            agility: "",
            quality: "",
            closeness: "",
          });
          return { ...item, general: ymp };
        } else {
          return item;
        }
      });
      setQuestions(tmp);
    },
    [questions]
  );

  const handleDelete = useCallback(
    (key) => {
      let tmp = questions.map((item, i) => {
        if (key === i) {
          let ymp = [...item.general];
          ymp.splice(ymp.length - 1, 1);
          return { ...item, general: ymp };
        } else {
          return item;
        }
      });
      setQuestions(tmp);
    },
    [questions]
  );

  const handleSelect = useCallback(
    (key, index, value) => {
      let prop = "name";
      let tmp = questions.map((item, i) => {
        if (key === i) {
          let ymp = item.general.map((val, y) => {
            if (y === index) {
              return { ...val, [prop]: value !== null ? value : "" };
            } else {
              return val;
            }
          });
          return { ...item, general: ymp };
        } else {
          return item;
        }
      });
      setQuestions(tmp);
    },
    [questions]
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      personId: urlInfo.personId,
      companyId: companyInfo.idcompany,
      surveyId: urlInfo.versionId,
      questions: questions,
    };
    try {
      const response = await axios
        .create({
          baseURL:
            `${process.env.REACT_APP_API_URL}OnasSurvey`,
        })
        .post("/OnasResponse", {
          personId: data.personId,
          companyId: data.companyId,
          surveyId: data.surveyId,
          questions: data.questions,
          conexion: data.conexion,
        });
      navigate("/thanks");
    } catch (error) {
    }
  };

  useEffect(() => {
    if (!companyInfo) {
      navigate("/thanks");
    }
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return (_) => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [questions]);

  return (
    <div className={styles.screen}>
      <Navbar logo={companyInfo.logo} />
      {width > breakPoint ? (
        <Desktop
          questions={questions}
          setQuestions={setQuestions}
          handleData={handleData}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleSelect={handleSelect}
          Next={submitHandler}
        />
      ) : (
        <Mobile
          questions={questions}
          setQuestions={setQuestions}
          handleData={handleData}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleSelect={handleSelect}
          Next={submitHandler}
        />
      )}
    </div>
  );
}
