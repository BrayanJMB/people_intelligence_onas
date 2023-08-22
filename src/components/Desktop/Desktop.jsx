import React, { useRef, useState, useEffect } from "react";
import styles from "./Desktop.module.css";
import InfoIcon from "@mui/icons-material/Info";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useNavigate } from "react-router-dom";

import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Autocomplete,
  Radio,
  RadioGroup,
  IconButton,
  FormControlLabel,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
const data = [
  {
    title: "Relación Frecuente:",
    question:
      "1. ¿Con quiénes interactúas más en el ejercicio de las funciones de tu cargo? ",
  },
  {
    title: "Relación Información:",
    question:
      "2. Cuando necesitas información para el desarrollo de tus funciones, ¿a quién(es) acudes?",
  },
  {
    title: "Relación de Orientación / Confianza / Consejería / Mentoría:",
    question:
      "3. Cuando necesitas guía o consejos en el trabajo, ¿a quién(es) buscas?",
  },
  {
    title: "Relación Transaccional:",
    question:
      "4. Cuando necesitas autorizaciones / validaciones para continuar con el desarrollo de tus labores, ¿a quién(es) acudes?",
  },
  {
    title: "Relación Inspiracional:",
    question:
      "5. En la organización, ¿a quién(es) consideras un punto de referencia positivo en el marco profesional y/ó personal?",
  },
  {
    title: "Relaciones de Entrada:",
    question:
      "6. ¿Quiénes son las personas que en tu día a día más te buscan para que les colabores con su trabajo?",
  },
  {
    title: "Pregunta 7:",
    question: "7. ¿Aquí iría texto pregunta número 7",
  },
];
const name = ["frecuency", "agility", "quality", "closeness"];

const info = [
  {
    title: "Frecuencia",
    tooltipMessage:
      "Número de veces con la que interactúas en un horizonte de tiempo de un mes",
    data: [
      "Diariamente",
      "Casi todos los días",
      "Varias veces a la semana",
      "Varias veces al mes",
    ],
  },
  {
    title: "Agilidad",
    tooltipMessage:
      "Cumplimiento de la expectativa del tiempo de entrega y/o respuesta de los requerimientos",
    data: [
      "Por encima de las expectativas",
      "Cumple expectativas",
      "Por debajo de las expectativas",
    ],
  },
  {
    title: "Calidad",
    tooltipMessage:
      "Valoración que hace respecto a precisión y entendimiento de los requerimientos",
    data: [
      "Por encima de las expectativas",
      "Cumple expectativas",
      "Por debajo de las expectativas",
    ],
  },
  {
    title: "Cercanía",
    tooltipMessage:
      "Nivel de confianza, amistad y cordialidad en la interacción",
    data: [
      "Relación Fluída",
      "Relación estrictamente laboral",
      "Relación con fricciones",
    ],
  },
];

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

export default function Desktop(props) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [employe, setEmploye] = useState([]);
  const paginationRefs = useRef([]);
  const dataCookie = JSON.parse(localStorage.getItem("dataCookie"));
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const autoCompleteRefs = useRef({});
  const radioGroupRefs = useRef({});
  const [errors, setErrors] = useState({});

  const getEmployee = async () => {
    await axios
      .create({
        baseURL: `${process.env.REACT_APP_API_URL}ONasSurvey/EmpleadosSurveyOnas/`,
      })
      .get(`${dataCookie.personId}/${dataCookie.versionId}`, config)
      .then((res) => {
        let filter = [];
        res.data.map((val, key) => {
          if (!filter.includes(val.names)) {
            filter.push(val.names);
          }
        });
        setEmploye(filter);
      });
  };

  const theme = createTheme({
    palette: {
      blue: {
        main: "#00b0f0",
      },
    },
  });
  const handlePage = (event, value) => {
    let element = paginationRefs.current[value - 1];
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const addtopaginationRefs = (el) => {
    if (el && !paginationRefs.current.includes(el)) {
      paginationRefs.current.push(el);
    }
  };

  const validateAndFocus = () => {
    let hasErrors = false;
    const newErrors = {};

    for (let key1 = 0; key1 < data.length; key1++) {
      const questionSection = props.questions[key1].general;
      let sectionHasError = false;

      for (let index = 0; index < questionSection.length; index++) {
        const selectedValue = questionSection[index].name;
        if (!selectedValue) {
          newErrors[`${key1}-${index}`] = true;
          sectionHasError = true;

          if (!hasErrors) {
            if (autoCompleteRefs.current[`${key1}-${index}`]) {
              autoCompleteRefs.current[`${key1}-${index}`].scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
            hasErrors = true; // Mueve esta línea aquí
          }
        }

        for (let key4 = 0; key4 < info.length; key4++) {
          const selectedRadioValue = questionSection[index][name[key4]];
          if (!selectedRadioValue) {
            newErrors[`${key1}-${index}-${key4}`] = true;
            sectionHasError = true;
            if (!hasErrors) {
              // Verifica nuevamente aquí para los radios
              if (radioGroupRefs.current[`${key1}-${index}-${key4}`]) {
                radioGroupRefs.current[
                  `${key1}-${index}-${key4}`
                ].scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
              hasErrors = true;
            }
          }
        }
      }

      if (sectionHasError) {
        newErrors[`${key1}`] = true; // Marca toda la sección con error
      }
    }

    console.log(newErrors);
    setErrors(newErrors);
    return !hasErrors;
  };

  // Una función auxiliar para realizar el focus si es el primer error
  const focusIfFirstError = (ref, hasErrors) => {
    if (!hasErrors && ref) {
      ref.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return true;
    }
    return hasErrors;
  };

  const handleSubmit = (e) => {
    if (validateAndFocus()) {
      console.log("melos");
      props.Next(e);
    } else {
      console.log("error");
    }
  };

  const updateQuestionsWithId = () => {
    const updatedQuestions = props.questions.map((question, index) => {
      return { ...question, questionId: index + 1 };
    });
    props.setQuestions(updatedQuestions);
  };

  useEffect(() => {
    if (employe.length === 0) {
      getEmployee();
    } else {
      updateQuestionsWithId();
    }
  }, [props.questions]);

  const handlePrevious = () => {
    navigate("/guide-response");
  };

  return (
    <div className={styles.inner_box}>
      {data.map((val, key1) => {
        return (
          <div key={key1} className={styles.top} ref={addtopaginationRefs}>
            <Stack id={key1}>
              <ThemeProvider theme={theme}>
                <Pagination
                  page={key1 + 1}
                  count={data ? data.length : 1}
                  hidePrevButton
                  hideNextButton
                  className={styles.pagination}
                  size="large"
                  onChange={handlePage}
                  color="blue"
                />
              </ThemeProvider>
            </Stack>
            <h2>{val.title}</h2>
            <p>{val.question}</p>
            <Typography variant="subtitle2">
              Por favor seleccione una opción según corresponda
            </Typography>
            <TableContainer component={Paper} style={{ boxShadow: "none" }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        width: "14%",
                        border: "none",
                        padding: "0",
                        paddingBottom: "2rem",
                      }}
                      align="center"
                    >
                      Nombre Empleado
                    </TableCell>
                    {info.map((val, key2) => {
                      return (
                        <TableCell
                          align="center"
                          key={key2}
                          style={{ fontWeight: "bolder", border: "none" }}
                        >
                          {val.title}
                          <Tooltip title={val.tooltipMessage} placement="top">
                            <IconButton aria-label="info">
                              <InfoIcon style={{ color: "black" }} />
                            </IconButton>
                          </Tooltip>

                          <TableRow
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {val.data.map((val, key3) => {
                              return (
                                <TableCell
                                  key={key3}
                                  align="center"
                                  style={{
                                    fontSize: "0.55rem",
                                    color: "grey",
                                    fontWeight: "bold",
                                    border: "none",
                                  }}
                                  sx={{
                                    width: "30%",
                                    lineHeight: "1rem",
                                    padding: "0.1rem",
                                    border: "none",
                                  }}
                                >
                                  {val}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {props.questions[key1].general.map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell
                          style={{ border: "none", padding: "0.2rem" }}
                          align="center"
                        >
                          <Autocomplete
                            id="combo-box-demo"
                            options={employe.filter((emp) => {
                              const namesInCurrentSection = props.questions[
                                key1
                              ].general.map((q) => q.name);
                              const isNameSelectedInCurrentSection =
                                namesInCurrentSection.includes(emp);
                              return (
                                !isNameSelectedInCurrentSection ||
                                emp ===
                                  props.questions[key1].general[index].name
                              );
                            })}
                            clearOnEscape
                            value={props.questions[key1].general[index].name}
                            onChange={(event, value) => {
                              const currentSelected = [...selectedEmployees];

                              const oldVal =
                                props.questions[key1].general[index].name;
                              if (oldVal) {
                                const oldIndex =
                                  currentSelected.indexOf(oldVal);
                                if (oldIndex > -1) {
                                  currentSelected.splice(oldIndex, 1);
                                }
                              }

                              if (value) {
                                currentSelected.push(value);
                              }
                              setSelectedEmployees(currentSelected);
                              props.handleSelect(key1, index, value);
                            }}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            noOptionsText={"No se encuentran empleados"}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Nombre empleado"
                                error={!!errors[`${key1}-${index}`]}
                                inputRef={(el) =>
                                  (autoCompleteRefs.current[
                                    `${key1}-${index}`
                                  ] = el)
                                }
                              />
                            )}
                          />
                        </TableCell>
                        {info.map((val, key4) => {
                          return (
                            <TableCell
                              align="center"
                              style={{
                                border: "none",
                                borderRight:
                                  key4 !== info.length - 1
                                    ? "2px solid #00B0F0"
                                    : "none",
                                padding: "0rem",
                              }}
                              key={key4}
                            >
                              <FormControl
                                style={{ width: "100%", color: "green" }}
                                ref={(el) =>
                                  (radioGroupRefs.current[
                                    `${key1}-${index}-${key4}`
                                  ] = el)
                                }
                              >
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                  style={{
                                    flexWrap: "nowrap",
                                    justifyContent: "space-around",
                                  }}
                                  onChange={props.handleData(key1, index)}
                                  value={
                                    props.questions[key1].general[index][
                                      name[key4]
                                    ]
                                  }
                                >
                                  {val.data.map((val, key5) => {
                                    return (
                                      <FormControlLabel
                                        name={name[key4]}
                                        value={val}
                                        control={
                                          <Radio
                                            color="primary"
                                            sx={{
                                              "& .MuiSvgIcon-root": {
                                                fontSize: 16,
                                              },
                                              color: errors[
                                                `${key1}-${index}-${key4}`
                                              ]
                                                ? "red"
                                                : "",
                                            }}
                                          />
                                        }
                                        key={key5}
                                        style={{ margin: "0" }}
                                      />
                                    );
                                  })}
                                </RadioGroup>
                              </FormControl>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {props.questions[key1].general.length < 10 && (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                style={{
                  marginLeft: "1.5rem",
                  marginTop: "2rem",
                  color: "#00b0f0",
                  border: "none",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  props.handleAdd(key1);
                }}
              >
                Agregar
              </Button>
            )}
            {props.questions[key1].general.length > 1 && (
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                style={{
                  marginLeft: "3rem",
                  marginTop: "2rem",
                }}
                onClick={() => {
                  props.handleDelete(key1);
                }}
              >
                Eliminar
              </Button>
            )}
          </div>
        );
      })}

      <div className={styles.move}>
        <IconButton aria-label="previous" color="info" onClick={handlePrevious}>
          <ArrowCircleLeftOutlinedIcon
            style={{ fontSize: 50, color: "black" }}
          />
        </IconButton>
        <IconButton
          aria-label="next"
          color="info"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          <ArrowCircleRightOutlinedIcon
            style={{ fontSize: 50, color: "black" }}
          />
        </IconButton>
      </div>
      <div className={styles.bullets}>
        <span></span>
        <span></span>
        <span className={styles.active}></span>
        <span></span>
      </div>
    </div>
  );
}
