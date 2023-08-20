import React, { useState, useEffect } from "react";
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
import axios from "axios";

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
];

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

const name = ["frecuency", "agility", "quality", "closeness"];

const info = [
  {
    title: "Frecuencia :",
    data: [
      "Varias veces por semana",
      "1 o mas veces a la semana",
      "1 o mas veces cada 2 semanas",
      "1 vez al mes",
    ],
  },
  {
    title: "Agilidad :",
    data: [
      "Con oportunidad de mejora",
      "Cumple expectativas",
      "Por encima de las expectativas",
    ],
  },
  {
    title: "Calidad :",
    data: [
      "Con oportunidad de mejora",
      "Cumple expectativas",
      "Por encima de las expectativas",
    ],
  },
  {
    title: "Cercanía :",
    data: [
      "Relación Cercana",
      "Relación Estrictamente laboral",
      "Relación con fricciones",
    ],
  },
];

export default function Mobile(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [employe, setEmploye] = useState([]);
  const dataCookie = JSON.parse(localStorage.getItem("dataCookie"));

  const getemploye = async () => {
    await axios
      .create({
        baseURL:
          "https://peopleintelligenceapi.azurewebsites.net/api/ONasSurvey/EmpleadosSurveyOnas/",
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

  const handleNext = (key) => {
    if (
      props.questions[key].general[0].name.length !== 0 &&
      props.questions[key].general[0].frecuency.length !== 0 &&
      props.questions[key].general[0].agility.length !== 0 &&
      props.questions[key].general[0].quality.length !== 0 &&
      props.questions[key].general[0].closeness.length !== 0
    ) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (employe.length === 0) {
      getemploye();
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
                  return (
                    <Accordion key={index}>
                      <AccordionSummary
                        expandIcon={
                          <ArrowDropDownCircleIcon
                            style={{ color: "#00b0f0" }}
                          />
                        }
                        aria-controls={index}
                        id={index}
                      >
                        <div className={styles.input}>
                          <h5>Nombre Empleado</h5>
                          <Autocomplete
                            id="combo-box-demo"
                            options={employe}
                            clearOnEscape
                            value={
                              props.questions[activeStep].general[index].name
                            }
                            onChange={(event, value) => {
                              props.handleSelect(activeStep, index, value);
                            }}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            style={{ width: "45%", marginRight: "1.8rem" }}
                            noOptionsText={"No Employe Found"}
                            renderInput={(params) => (
                              <TextField {...params} label="Name" />
                            )}
                          />
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={styles.options}>
                          {info.map((val, key) => {
                            return (
                              <div key={key} className={styles.option}>
                                <div className={styles.title}>{val.title}</div>
                                <FormControl>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={props.handleData(
                                      activeStep,
                                      index
                                    )}
                                    value={
                                      props.questions[activeStep].general[
                                        index
                                      ][name[key]]
                                    }
                                    sx={{
                                      justifyContent: "flex-start",
                                      columnGap: "1rem",
                                      width: "100%",
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
                                              color="blue"
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
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: 2,
                justifyContent: "space-around",
              }}
            >
              <Button
                variant="contained"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Previous Question
              </Button>
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

              {props.questions[activeStep].general.length > 4 && (
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  color="error"
                  onClick={() => {
                    props.handleDelete(activeStep);
                  }}
                >
                  Delete
                </Button>
              )}

              <Button
                variant="contained"
                color="blue"
                style={{ color: "white" }}
                onClick={() => {
                  handleNext(activeStep);
                }}
              >
                Next Question
              </Button>
            </Box>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
