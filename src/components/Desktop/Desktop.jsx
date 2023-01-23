import React, { useRef, useState, useEffect } from "react";
import styles from "./Desktop.module.css";
import InfoIcon from "@mui/icons-material/Info";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
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
    title: "Relación de Orientación / Confianza / Consejería / Mentoría::",
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
];
const name = ["frecuency", "agility", "quality", "closeness"];

const info = [
  {
    title: "Frecuencia",
    data: [
      "Diariamente",
      "Casi todos los días",
      "Varias veces a la semana",
      "Varias veces al mes",
    ],
  },
  {
    title: "Agilidad",
    data: [
      "Por encima de las expectativas",
      "Cumple Expectativas",
      "Por debajo de las expectativas",
    ],
  },
  {
    title: "Calidad",
    data: [
      "Por encima de las expectativas",
      "Cumple Expectativas",
      "Por debajo de las expectativas",
    ],
  },
  {
    title: "Cercanía",
    data: [
      "Relación Fluída",
      "Relación Estrictamente laboral",
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
  const [checked, setChecked] = useState(false);
  const [employe, setEmploye] = useState([]);
  const paginationRefs = useRef([]);
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

  const handlePage = (event, value) => {
    let element = paginationRefs.current[value - 1];
    element.scrollIntoView({ behavior: "smooth" });
  };

  const addtopaginationRefs = (el) => {
    if (el && !paginationRefs.current.includes(el)) {
      paginationRefs.current.push(el);
    }
  };

  const checkquestions = () => {
    let fail = false;
    for (let question of props.questions) {
      if (
        question.general[0].name.length === 0 ||
        question.general[0].frecuency.length === 0 ||
        question.general[0].agility.length === 0 ||
        question.general[0].quality.length === 0 ||
        question.general[0].closeness.length === 0
      ) {
        fail = true;
        break;
      }
    }
    if (fail === true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  useEffect(() => {
    if (employe.length === 0) {
      getemploye();
    }
    checkquestions();
  }, [props.questions]);

  return (
    <div className={styles.inner_box}>
      {data.map((val, key1) => {
        return (
          <div key={key1} className={styles.top} ref={addtopaginationRefs}>
            <Stack id={key1}>
              <ThemeProvider theme={theme}>
                <Pagination
                  defaultPage={key1 + 1}
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
                          <IconButton aria-label="info">
                            <InfoIcon style={{ color: "black" }} />
                          </IconButton>

                          <TableRow>
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
                            options={employe}
                            clearOnEscape
                            value={props.questions[key1].general[index].name}
                            onChange={(event, value) => {
                              props.handleSelect(key1, index, value);
                            }}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            noOptionsText={"No Employe Found"}
                            renderInput={(params) => (
                              <TextField {...params} label="Name" />
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
                              <FormControl style={{ width: "100%" }}>
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
            {props.questions[key1].general.length > 4 && (
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
                Delete
              </Button>
            )}
          </div>
        );
      })}

      <div className={styles.move}>
        {checked && (
          <IconButton aria-label="next" color="info" onClick={props.Next}>
            <ArrowCircleRightOutlinedIcon
              style={{ fontSize: 50, color: "black" }}
            />
          </IconButton>
        )}
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
