import React, { useState, useEffect, useCallback } from "react";
import styles from "./Questions.module.css";
import Mobile from "../../components/Mobile/Mobile";
import Desktop from "../../components/Desktop/Desktop";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
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
];

const breakPoint = 880;

export default function Questions() {
  const navigate = useNavigate();
  const companyInfo = JSON.parse(localStorage.getItem("companyInfo"));
  const [width, setWidth] = useState(window.innerWidth);
  const [success, setSuccess] = useState(false);
  const [questions, setQuestions] = useState(
    Array(data.length).fill({
      questionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      general: Array(4).fill({
        name: "",
        frecuency: "",
        agility: "",
        quality: "",
        closeness: "",
      }),
    })
  );

  const handledata = useCallback(
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

  const handleadd = useCallback(
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

  const handledelete = useCallback(
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

  const handleselect = useCallback(
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

  const next = () => {
    let filter = questions.map((item, index) => {
      let tmp = [];
      for (let i of item.general) {
        if (
          i.name.length !== 0 &&
          i.frecuency.length !== 0 &&
          i.agility.length !== 0 &&
          i.quality.length !== 0 &&
          i.closeness.length !== 0
        ) {
          tmp.push(i);
        }
      }
      //, questionId: 1234567
      //uuid.v4()
      return { ...item, general: tmp, questionId: index + 1 };
    });
    setSuccess(true);
    setQuestions(filter);
  };

  useEffect(() => {
    if (!companyInfo) {
      navigate("/thanks");
    }
    if (success) {
      navigate("/connexion", { state: questions });
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
          handleData={handledata}
          handleAdd={handleadd}
          handleDelete={handledelete}
          handleSelect={handleselect}
          Next={next}
        />
      ) : (
        <Mobile
          questions={questions}
          handleData={handledata}
          handleAdd={handleadd}
          handleDelete={handledelete}
          handleSelect={handleselect}
          Next={next}
        />
      )}
    </div>
  );
}
