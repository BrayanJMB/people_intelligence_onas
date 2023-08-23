import React, { useState, useEffect, useRef } from "react";
import { createRef } from "react";
import styles from "./Mobile.module.css";
import {
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";

const data = [
  {
    title: "Relación General",
    question:
      "1. ¿Cuándo necesitas ayuda en tus responsabilidades a qué personas acudes?",
  },
  {
    title: "Relación Información",
    question:
      "2. ¿Cuándo necesitas información actualizada y de confianza sobre la empresa a quienes acudes?",
  },
  {
    title: "Relación Inspiracional",
    question:
      "3. ¿Cuándo necesitas consejos o feedback, quién es la personas indicada para ti?",
  },
  {
    title: "Relación Transaccional",
    question:
      "4. ¿Cuándo necesitas autorizaciones para continuar con el desarrollo de tus funciones?",
  },
  {
    title: "Relación Técnico",
    question:
      "5. ¿Cuándo necesitas ayuda especializada para el desarrollo de tus responsabilidades a qué personas acudes?",
  },
  {
    title: "Relación Last",
    question:
      "6. Cuándo te necesitan o te contactan, ¿generalmente que personas son y que tipo de interacción es?",
  },
  {
    title: "Otra pregunta",
    question: "7. Aquí iria texto pregunta",
  },
];

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

const name = ["frecuency", "agility", "quality", "closeness"];

const info = [
  {
    title: "Frecuencia",
    tooltipMessage:
      "Se refiere al número de veces en las que te comunicas y/o colaboras con tus colegas en las actividades especificas de la pregunta actual en un período de un mes.",
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
      "Se refiere a lo rápido y eficientemente que tus colegas responden a las necesidades específicas del tipo de colaboración.",
    data: [
      "Por encima de las expectativas",
      "Cumple expectativas",
      "Por debajo de las expectativas",
    ],
  },
  {
    title: "Calidad",
    tooltipMessage:
      "Se refiere a qué tan buena es la interacción en términos de la claridad de la información que se comparte y la calidad de los datos que necesitas.",
    data: [
      "Por encima de las expectativas",
      "Cumple expectativas",
      "Por debajo de las expectativas",
    ],
  },
  {
    title: "Cercanía",
    tooltipMessage:
      "Se refiere a qué tan cercana es la relación con la persona en el listado.",
    data: [
      "Relación Fluída",
      "Relación estrictamente laboral",
      "Relación con fricciones",
    ],
  },
];

export default function Mobile(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [employe, setEmploye] = useState([]);
  const dataCookie = JSON.parse(localStorage.getItem("dataCookie"));
  // Estados
  const [questionsState, setQuestionsState] = useState([...props.questions]);
  const [openAccordions, setOpenAccordions] = useState([]);
  const [errors, setErrors] = useState({});

  // Refs para los Accordions
  const accordionRefs = useRef(data.map(() => createRef()));

  const isAccordionCompleteBasedOnValue = (question) => {
    if (!question.name) return false;

    const fields = ["frecuency", "agility", "quality", "closeness"];
    for (let field of fields) {
      if (!question[field]) return false;
    }

    return true;
  };

  const getemploye = async () => {
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

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const updateQuestionsWithId = () => {
    const updatedQuestions = props.questions.map((question, index) => {
      return { ...question, questionId: index + 1 };
    });
    props.setQuestions(updatedQuestions);
  };

  const accordionHasErrors = (index) => {
    const fields = ["frecuency", "agility", "quality", "closeness"];
    return fields.some((field) => Boolean(errors[`${field}-${index}`]));
  };

  const validateCurrentStep = (step) => {
    let validationErrors = {};
    console.log(props.questions[step]);
    for (let i = 0; i < props.questions[step].general.length; i++) {
      const currentQuestion = props.questions[step].general[i];

      // Validación para el campo "name"
      if (!currentQuestion.name) {
        validationErrors[`autocomplete-${i}`] = "Campo requerido";
      }
      // Validación para los campos "frecuency", "agility", "quality" y "closeness"
      const fields = ["frecuency", "agility", "quality", "closeness"];
      for (let field of fields) {
        if (!currentQuestion[field]) {
          validationErrors[`${field}-${i}`] = "Campo requerido";
        }
      }
    }

    setErrors(validationErrors); // Establecer los errores
    return validationErrors;
  };

  const handleNext = (event, step) => {
    console.log(props.questions);
    if (Object.keys(validateCurrentStep(step)).length === 0) {
      if (activeStep === props.questions.length - 1) {
        props.Next(event);
        return;
      }
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleAccordionToggle = (index, isExpanded) => {
    if (isExpanded) {
      // Si el Accordion se está abriendo, lo añadimos a openAccordions.
      setOpenAccordions((prev) => [...prev, index]);
    } else {
      // Si el Accordion se está cerrando, lo removemos de openAccordions.
      setOpenAccordions((prev) => prev.filter((item) => item !== index));
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const areQuestionsUpdated = () => {
    return props.questions.every((question) => question.questionId);
  };

  useEffect(() => {
    props.questions[activeStep].general.forEach(
      (currentQuestion, currentIndex) => {
        if (isAccordionCompleteBasedOnValue(currentQuestion)) {
          handleAccordionToggle(currentIndex, false); // Cierra el acordeón
        }
      }
    );
  }, [props.questions[activeStep].general]);

  useEffect(() => {
    if (employe.length === 0) {
      getemploye();
    }
  }, []);

  useEffect(() => {
    if (!areQuestionsUpdated()) {
      updateQuestionsWithId();
    }
  }, [props.questions]);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.inner_box}>
        <Stepper activeStep={activeStep}>
          {data.map((label, index) => {
            const stepProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={index} {...stepProps}>
                <StepLabel></StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === data.length ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "8rem",
            }}
          >
            <Button
              variant="contained"
              color="blue"
              style={{
                color: "white",
              }}
              onClick={props.Next}
            >
              Move To Connexion Question
            </Button>
          </div>
        ) : (
          <div>
            <Card className={styles.card}>
              <CardContent
                style={{
                  padding: "0 2rem 0 2rem",
                  marginBottom: "1.5rem",
                }}
              >
                <h3 style={{ fontWeight: "bold" }}>{data[activeStep].title}</h3>
                <p>{data[activeStep].question}</p>
                {props.questions[activeStep].general.map((row, index) => {
                  const selectedNames = props.questions[activeStep].general.map(
                    (question) => question.name
                  );

                  const filteredEmploye = employe.filter(
                    (empName) => !selectedNames.includes(empName)
                  );
                  return (
                    <Accordion
                      key={index}
                      ref={accordionRefs.current[index]}
                      expanded={
                        openAccordions.includes(index) ||
                        accordionHasErrors(index)
                      }
                      onChange={(event, isExpanded) =>
                        handleAccordionToggle(index, isExpanded)
                      }
                    >
                      <AccordionSummary
                        expandIcon={
                          <ArrowDropDownCircleIcon
                            style={{ color: "#00b0f0" }}
                          />
                        }
                        aria-controls={index}
                        id={index}
                      >
                        <div className={styles.input} style={{display:"flex", flexDirection:"column"}}>
                          <h5>
                            Nombre Empleado
                            {isAccordionCompleteBasedOnValue(
                              props.questions[activeStep].general[index]
                            ) && (
                              <CheckCircleOutlineIcon
                                style={{ color: "green", marginLeft: "10px" }}
                              />
                            )}
                          </h5>
                          <Autocomplete
                            id="combo-box-demo"
                            options={filteredEmploye}
                            clearOnEscape
                            value={
                              props.questions[activeStep].general[index].name
                            }
                            onChange={(event, value) => {
                              event.stopPropagation();
                              props.handleSelect(activeStep, index, value);
                              handleAccordionToggle(index, true); 
                            }}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            style={{ marginRight: "1rem" }}
                            noOptionsText={"Empleados no encontrados"}
                            renderInput={(params) => (
                              <TextField
                                onClick={(event) => {
                                  event.stopPropagation(); // Esto detiene la propagación del evento de clic
                                }}
                                {...params}
                                label="Nombre Empleado"
                                error={
                                  Boolean(errors[`autocomplete-${index}`]) &&
                                  !props.questions[activeStep].general[index]
                                    .name
                                }
                              />
                            )}
                          />
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={styles.options}>
                          {info.map((val, key) => {
                            return (
                              <div key={key} className={styles.option} style={{diplay:"flex", flexDirection:"column"}}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems:"center"
                                  }}
                                >
                                  <div>{val.title}</div>
                                  <Tooltip
                                    title={val.tooltipMessage}
                                    placement="top"
                                    enterTouchDelay={0}
                                    leaveTouchDelay={3000}
                                  >
                                    <IconButton aria-label="info">
                                      <InfoIcon style={{ color: "black" }} />
                                    </IconButton>
                                  </Tooltip>
                                </div>

                                <FormControl>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={(event) => {
                                      // Creamos una copia del objeto currentQuestion de este índice específico
                                      const updatedQuestion = {
                                        ...props.questions[activeStep].general[
                                          index
                                        ],
                                      };

                                      // Aplicamos el cambio basado en el evento al objeto copiado.
                                      updatedQuestion[event.target.name] =
                                        event.target.value;

                                      // Usamos la función modificada para verificar el objeto copiado.
                                      if (
                                        isAccordionCompleteBasedOnValue(
                                          updatedQuestion
                                        )
                                      ) {
                                        handleAccordionToggle(index, false); // Cierra el acordeón
                                      }

                                      // Luego, procedemos a actualizar el estado como normalmente lo haces.
                                      props.handleData(
                                        activeStep,
                                        index
                                      )(event);
                                    }}
                                    value={
                                      props.questions[activeStep].general[
                                        index
                                      ][name[key]]
                                    }
                                    sx={{
                                      justifyContent: "flex-start",
                                      columnGap: "1rem",
                                      width: "100%",
                                      color:
                                        errors[`${name[key]}-${index}`] &&
                                        !props.questions[activeStep].general[
                                          index
                                        ][name[key]]
                                          ? "red"
                                          : "default",
                                    }}
                                  >
                                    {val.data.map((value, key5) => {
                                      return (
                                        <FormControlLabel
                                          label={value}
                                          name={name[key]}
                                          value={value}
                                          className={styles.text}
                                          control={
                                            <Radio
                                              sx={{
                                                "& .MuiSvgIcon-root": {
                                                  fontSize: 12,
                                                },
                                              }}
                                            />
                                          }
                                          key={key5}
                                        />
                                      );
                                    })}
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            );
                          })}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "15px",
                  }}
                >
                  {props.questions[activeStep].general.length < 10 && (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "green",
                      }}
                      onClick={() => {
                        props.handleAdd(activeStep);
                      }}
                    >
                      Agregar
                    </Button>
                  )}
                  {props.questions[activeStep].general.length > 1 && (
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => {
                        props.handleDelete(activeStep);
                      }}
                    >
                      Eliminar
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "15px",
              }}
            >
              {activeStep !== 0 && (
                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={<SkipPreviousIcon />}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Anterior pregunta
                </Button>
              )}

              <Button
                variant="contained"
                color="blue"
                startIcon={
                  activeStep === props.questions.length - 1 ? (
                    ""
                  ) : (
                    <SkipNextIcon />
                  )
                }
                style={{ color: "white" }}
                onClick={(event) => {
                  handleNext(event, activeStep);
                }}
              >
                {activeStep === props.questions.length - 1
                  ? "Finalizar"
                  : "Siguiente Pregunta"}
              </Button>
            </Box>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
