import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import styles from "./Policy.module.css";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Policy() {
  const navigate = useNavigate();
  const companyInfo = JSON.parse(localStorage.getItem("companyInfo"));

  const [checked, setChecked] = useState(false);
  const next = () => {
    navigate("/guide-response");
  };
  const previous = () => {
    const dataCookie = JSON.parse(localStorage.getItem("dataCookie"));
    navigate(`/?code=${dataCookie.personId}/${dataCookie.versionId}`);
  };
  const handlechange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (!companyInfo) {
      navigate("/thanks");
    }
  }, []);

  const [scroll, setScroll] = useState("paper");
  const [open, setOpen] = useState(false);
  const handlemodalOpen = () => setOpen(true);

  const [values, setValues] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });

  const handleClose = () => {
    setValues({ ...values, isOpen: false });
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCloseDialogAceptar = () => {
    setChecked(!checked);
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          POLÍTICA DE PROTECCIÓN DE DATOS PERSONALES DE PEOPLE INTELLIGENCE
          S.A.S.
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              align="justify"
            >
              PEOPLE INTELLIGENCE S.A.S, sociedad identificada con NIT.
              901.629.501-8, (en adelante, “PI”) es una entidad respetuosa de
              los datos personales e información que le suministra sus actuales
              y potenciales usuarios, trabajadores, contratistas, aliados
              comerciales, proveedores, distribuidores, accionistas, usuarios y
              posibles interesados en los servicios de PI; por tal razón,
              procede a emitir la presente Política de Privacidad y Tratamiento
              de Datos Personales (en adelante, la “Política”) donde se
              establecen las finalidades, alcance, medidas y procedimientos de
              bases de datos, así como los mecanismos con que los Titulares de
              la información cuentan para conocer, actualizar, rectificar o
              suprimir los datos suministrados, o revocar la autorización que se
              otorga con la aceptación de la presente Política.<br></br>
              La utilización de los servicios ofrecidos por PI (en adelante, los
              “Servicios”), la celebración de contratos de trabajo o de
              prestación de servicios, y/o la aceptación expresa e inequívoca de
              la presente Política, implica la aceptación de los Titulares de la
              información respecto de la Política y su autorización para los
              usos y otros tratamientos que aquí se describen.
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                align="center"
              >
                CAPÍTULO I <br></br>DEFINICIONES, ALCANCE, PRINCIPIOS Y
                GENERALIDADES DE LA POLÍTICA
              </Typography>
              1. Definiciones. Para el mejor entendimiento y cumplimiento de la
              presente Política se deben tener en cuenta las siguientes
              definiciones, las cuales tendrán el significado que a continuación
              se detalla, sea que su uso se presente de manera singular o plural
              a lo largo de la Política.<br></br>
              <br></br>
              “Aviso de privacidad”: comunicación verbal o escrita para darle a
              conocer a los Titulares de la información, la existencia y las
              formas de acceder a las políticas de tratamiento de la información
              y el objetivo de su recolección y uso. “Autorización”:
              consentimiento previo, expreso e informado del Titular para llevar
              a cabo el tratamiento de Datos Personales.<br></br>
              <br></br>
              “Base de Datos”: conjunto organizado de Datos Personales que son
              objeto de Tratamiento.<br></br>
              <br></br>
              “Cookies o Tecnologías Similares”: archivo de texto que se
              descarga al disco duro de la computadora o se guarda en la memoria
              del navegador web cuando los Titulares visitan la página web y PI
              Suite (en adelante, los “Sitios”).<br></br>
              “Consulta”: solicitud del Titular del Dato Personal, de las
              personas autorizadas por éste, o las autorizadas por ley, para
              conocer la información que reposa sobre él en las Bases de Datos
              de PI.<br></br>
              <br></br>
              “Datos Anonimizados”: datos que no identifican de manera personal
              al Titular y que pueden utilizarse por PI para la administración y
              el análisis estadístico, que incluye análisis de tendencias,
              productos y servicios personalizados, evaluación de riesgos y
              análisis de costos y cargos relacionados con nuestros servicios y
              soluciones.<br></br>
              <br></br>
              “Dato Personal”: cualquier información vinculada o que pueda
              asociarse a una o varias personas naturales determinadas o
              determinables.<br></br>
              <br></br>
              “Dato personal privado”: dato que por su naturaleza íntima o
              reservada sólo es relevante para el Titular.<br></br>
              <br></br>
              “Dato Personal Semiprivado”: dato que no tiene naturaleza íntima,
              reservada, ni pública y cuyo conocimiento o divulgación puede
              interesar no sólo a su Titular sino a cierto sector o grupo de
              personas, o a la sociedad en general. (e.g., datos financieros,
              crediticios, de la actividad comercial o de servicios, de
              seguridad social, etc.)<br></br>
              <br></br>
              “Dato Público”: es el dato calificado como tal según los mandatos
              de la ley o de la Constitución Política y todos aquellos que no
              sean semiprivado, privado o sensible de conformidad con la Ley
              1266 de 2008. Son públicos, entre otros, los datos relativos al
              estado civil de las personas, a su profesión u oficio, a su
              calidad de comerciante o de servidor público y aquellos que puedan
              obtenerse sin reserva alguna.<br></br>
              <br></br>
              “Datos Sensibles”: datos que afectan la intimidad del Titular o
              cuyo uso indebido puede generar su discriminación, (e.g., datos
              que revelen el origen racial o étnico, la orientación política,
              las convicciones religiosas o filosóficas, la pertenencia a
              sindicatos, organizaciones sociales, de derechos humanos o que
              promueva intereses de cualquier partido político o que garanticen
              los derechos y garantías de partidos políticos de oposición, así
              como los datos relativos a la salud, a la vida sexual y los datos
              biométricos, como la huella dactilar, entre otros).<br></br>
              <br></br>
              “Encargado del Tratamiento”: persona natural o jurídica, pública o
              privada, que realiza el Tratamiento de Datos Personales, a partir
              de una delegación que le hace el Responsable del Tratamiento,
              recibiendo instrucciones acerca de la forma en la que deberán ser
              administrados los datos.<br></br>
              <br></br>
              “PI SUITE” se refiere a la Plataforma de herramientas de
              diagnóstico relacionadas con analítica de recursos humanos (People
              Analytics), redes de análisis organizacionales, ciclo del
              colaborador, Conversaciones dinámicas en vivo, entre otras, que da
              soporte a una gestión estratégica del talento humano entregando
              reportes de medición a los Clientes.<br></br>
              <br></br>
              “Certificaciones virtuales”: se refiere a la Plataforma de cursos
              en línea suministrados por PI.<br></br>
              <br></br>
              “Reclamo”: solicitud del Titular o las personas autorizadas por
              éste o por la ley para corregir, actualizar o suprimir sus Datos
              Personales o para advertir que existe un presunto incumplimiento
              del régimen de protección de datos. “Responsable del Tratamiento”:
              persona natural o jurídica, pública o privada, que por sí misma o
              en asocio con otros, decida sobre la Base de Datos y/o el
              Tratamiento de los datos.<br></br>
              <br></br>
              “Requisito de Procedibilidad”: paso previo que debe surtir el
              Titular antes de interponer una queja ante la Superintendencia de
              Industria y Comercio. Este consiste en una reclamación directa al
              Encargado o Responsable de sus Datos Personales.<br></br>
              <br></br>
              “Titular”: persona natural cuyos Datos Personales sean objeto de
              Tratamiento.<br></br>
              <br></br>
              “Tratamiento”: cualquier operación o conjunto de operaciones sobre
              Datos Personales como, la recolección, el almacenamiento, el uso,
              la circulación, transferencia, transmisión, actualización o
              supresión de los Datos Personales, entre otros. El Tratamiento
              puede ser nacional (dentro de Colombia) o internacional (fuera de
              Colombia).<br></br>
              <br></br>
              “Transmisión”: Tratamiento de Datos Personales que implica la
              comunicación de los mismos dentro o fuera del territorio de la
              República de Colombia cuando tenga por objeto la realización de un
              Tratamiento por el Encargado por cuenta del Responsable.<br></br>
              <br></br>
              “Transferencia”: Tratamiento de Datos Personales que tiene lugar
              cuando el Responsable y/o Encargado del Tratamiento de Datos
              Personales, envía los Datos Personales a un receptor, que a su vez
              es Responsable del Tratamiento y se encuentra dentro o fuera del
              país.<br></br>
              <br></br>
              2. Alcance. Esta Política aplica para toda la información personal
              registrada en las Bases de Datos de PI, quien actúa en calidad de
              Encargado del Tratamiento de los Datos Personales para estos
              efectos.<br></br>
              <br></br>
              3. Principios del Tratamiento de Datos Personales. El Tratamiento
              de Datos Personales bajo esta Política estará orientado por los
              principios dispuestos en el artículo 4 de la Ley 1581 de 2012 y
              las normas que la actualicen o modifiquen.<br></br>
              <br></br>
              Todas las actividades relacionadas con el tratamiento de Datos
              Personales que se encuentran en la Base de Datos de PI deben
              cumplir con los principios reconocidos por la ley y la
              jurisprudencia de la Corte Constitucional colombiana, los cuales
              se resumen a continuación:<br></br>
              <br></br>
              a. Principio de finalidad: el Tratamiento debe obedecer a una
              finalidad legítima de acuerdo con la Constitución y la Ley, la
              cual debe ser informada al Titular.<br></br>
              <br></br>
              b. Principio de necesidad y proporcionalidad: los Datos Personales
              registrados en la Base de Datos deben ser los estrictamente
              necesarios para cumplir las finalidades del Tratamiento. En tal
              sentido, deben ser adecuados, pertinentes y acordes con las
              finalidades para los cuales fueron recolectados.<br></br>
              <br></br>
              c. Principio de temporalidad: el período de conservación de los
              Datos Personales en las Base de Datos de PI debe ser el necesario
              para alcanzar la finalidad para la cual han sido recolectados.
              <br></br>
              <br></br>
              d. Principio de libertad: el Tratamiento sólo puede ejercerse con
              el consentimiento, previo, expreso e informado del Titular de los
              datos. Por ello, los Datos Personales no podrán ser obtenidos o
              divulgados sin previa autorización, o en ausencia de mandato legal
              o judicial.<br></br>
              <br></br>
              e. Principio de veracidad: la información sujeta a Tratamiento
              debe ser cierta, completa, exacta, actualizada, comprobable y
              comprensible. No está permitido el Tratamiento de datos parciales,
              incompletos, fraccionados o que induzcan a error.<br></br>
              <br></br>
              f. Principio de transparencia: en el Tratamiento se debe
              garantizar el derecho del Titular a obtener de PI, en cualquier
              momento y sin restricciones, información acerca de la existencia
              de datos que le conciernan.<br></br>
              <br></br>
              g. Principio de acceso y circulación restringida: los Datos
              Personales, salvo la información pública, sólo puede estar en
              Internet cuando el acceso sea técnicamente controlable para
              otorgar un conocimiento restringido únicamente a los Titulares de
              los Datos Personales o a terceros autorizados.<br></br>
              <br></br>
              h. Principio de seguridad: El Responsable y Encargado del
              Tratamiento de los Datos Personales deberán cumplir con todas las
              medidas técnicas, humanas y administrativas necesarias para
              otorgar seguridad a los registros evitando su adulteración,
              pérdida, consulta, uso o acceso no autorizado o fraudulento.
              <br></br>
              <br></br>
              i. Principio de confidencialidad: todas las personas que
              intervengan en el Tratamiento de Datos Personales que no tengan la
              naturaleza de públicos, están obligadas a garantizar la reserva de
              la información, inclusive después de finalizada su relación con
              alguna de las labores que comprende el Tratamiento.<br></br>
              <br></br>
              j. No discriminación: queda prohibido realizar cualquier acto de
              discriminación por las informaciones recaudadas en las Bases de
              Datos o archivos.<br></br>
              <br></br>
              k. Reparación: es obligación indemnizar los perjuicios causados
              por las posibles fallas en el Tratamiento de Datos Personales.
              <br></br>
              <br></br>
              l. Principio de limitación en la recolección: sólo deben
              recolectarse los Datos Personales que sean estrictamente
              necesarios para el cumplimiento de las finalidades del
              Tratamiento, de tal forma que se encuentra prohibido el registro y
              divulgación de datos que no guarden estrecha relación con el
              objetivo del Tratamiento. En consecuencia, debe hacerse todo lo
              razonablemente posible para limitar el procesamiento de Datos
              Personales al mínimo necesario. Es decir, los datos deberán ser:
              (i) adecuados, (ii) pertinentes y (iii) acordes con las
              finalidades para las cuales fueron previstos.<br></br>
              <br></br>
              4. Vigencia de la Política. Esta política se encuentra vigente
              desde enero de 2023.<br></br>
              <br></br>
              5. Legislación vigente: La legislación nacional vigente en materia
              de Protección de Datos Personales es la Ley 1581 de 2012, la Ley
              1266 de 2008, el Decreto 1377 de 2013, Decreto 1074 de 2015 y las
              normas que las reglamenten, reemplacen o modifiquen.<br></br>
              <br></br>
              6. Aplicación de garantías y derechos de la regulación establecida
              en el reglamento (UE) 2016/679: En el evento en que PI, tenga
              operaciones y actos que sean objeto y competencia de la regulación
              de la Unión Europea en materia de Protección de Datos Personales,
              en su calidad de Responsable o Encargado, garantizará el ejercicio
              de las prerrogativas, garantías y derechos conferidos en el
              Reglamento (UE) 2016/679.<br></br>
              <br></br>
              Para los efectos, el Titular deberá manifestar en su reclamo o
              petición las razones y hechos que fundamentan la aplicación de tal
              régimen a través de los canales habilitados para los efectos. En
              cualquier caso, en aplicación del régimen mencionado, PI
              garantizará el ejercicio de los derechos de restricción de
              procesamiento, objeción del procesamiento y de portabilidad de
              datos personales, cuando sean solicitados por parte de los
              Titulares y en los eventos de su procedencia de acuerdo con la
              regulación.<br></br>
              <br></br>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                align="center"
              >
                CAPÍTULO II DATOS PERSONALES TRATADOS Y FORMA DE OBTENCIÓN
              </Typography>
              7. Recolección de Datos. En general PI recolecta los Datos
              Personales de los Titulares en los siguientes casos:<br></br>
              <br></br>
              a. Cuando los Titulares visitan nuestra página web.<br></br>
              <br></br>
              b. Cuando los Titulares brindan Datos Personales de forma
              voluntaria, por ejemplo, al adherirse a los correos electrónicos
              de PI, completar formularios en nuestra página web para obtener
              información comercial, o registrarse para acceder a la plataforma.
              <br></br>
              <br></br>
              c. Cuando los Titulares participan en Webinars, y en otros de los
              eventos organizados por PI.<br></br>
              <br></br>
              d. Cuando los Titulares usan los servicios de PI.<br></br>
              <br></br>
              e. Cuando PI requiere aproximarse a los Titulares para brindar o
              solicitar nuevos servicios.<br></br>
              <br></br>
              f. Cuando PI contrata servicios de terceros que emplean datos
              Cookies o tecnologías similares orientadas, con el fin de
              publicitar anuncios según características que tengamos en común
              con el Titular, como la industria en la que se desempeña.<br></br>
              <br></br>
              g. Cuando los Titulares interactúan con nuestra página web y
              aceptan el aviso de Cookies o tecnologías similares.<br></br>
              <br></br>
              h. Cuando PI le informa con antelación sobre la recolección y el
              uso previsto para sus datos, mediante esta Política o en el
              momento de la recolección.<br></br>
              <br></br>
              8. Datos personales recolectados: PI podrá pedir expresamente a
              los titulares o recolectar de su comportamiento, salvo las
              excepciones relacionadas con datos sensibles o datos de niños,
              niñas y adolescentes, los datos que sean necesarios para cumplir
              la finalidad de las bases de datos, los cuales son –entre otros-
              los siguientes:<br></br>
              <br></br>
              8.1. En relación con la base de datos de empleados y contratistas:
              <br></br>
              <br></br>
              incluyen, pero no se limitan a nombre y apellidos, nacionalidad,
              edad, estado civil, número de identificación, libreta militar,
              tarjeta profesional, huella dactilar, caligrafía, fecha y lugar de
              nacimiento, estado civil, dirección de correspondencia, teléfono
              de contacto, correo electrónico, historial laboral, clínico o de
              salud, académico y patrimonial, referencias, antecedentes
              comerciales o información biográfica, financiera, judicial,
              disciplinaria y familiar, y la relacionada con otras compañías o
              con entidades públicas, fotografías recientes, imágenes en cámaras
              de vigilancia; historia clínica ocupacional; teléfono, sexo, fecha
              y lugar de nacimiento, lugar de trabajo cargo o profesión del
              cónyuge o compañero permanente de empleados y contratistas y de
              sus parientes hasta el cuarto grado de consanguinidad, segundo de
              afinidad y/o primero civil, y cualquier otro dato que fuere
              necesario para lograr las finalidades descritas.<br></br>
              <br></br>
              8.2. En relación con las bases de datos de clientes, proveedores y
              aliados comerciales: incluyen, pero no se limitan a nombre y
              apellidos, número de identificación, fecha de nacimiento, edad,
              dirección de correspondencia, teléfono de contacto, correo
              electrónico, información relacionada con su situación patrimonial,
              comercial, financiera, legal, administrativa, contable y personal
              que sean compartida con ocasión de las comunicaciones
              intercambiadas con PI, historial de navegación en la página web o
              Plataforma, permisos de funcionamiento, autorizaciones para
              desarrollar actividades relacionadas con los servicios ofrecidos
              por PI, historial de compras, historial de casos abiertos con
              servicio al cliente, antecedentes comerciales, judiciales,
              relaciones comerciales y familiares, e información relacionada con
              otras compañías o con entidades públicas, necesidades e intereses,
              lugar de trabajo, calificaciones y estudios de proveedores,
              permisos y autorizaciones requeridos para proveer servicios o
              vender productos, razón o denominación social de la empresa,
              identificación tributaria, fotografías y videos de la empresa,
              descripción, fotografías y videos del portafolio de servicios,
              historial de pedidos recibidos, calificación de satisfacción
              recibida, indicadores de desempeño operativo, comentarios de
              usuarios recibidos, las veces que ingresa a una página, tiempo que
              dura en cada página, y cualquier otro dato que fuere necesario
              para lograr las finalidades descritas y una adecuada prestación de
              los Servicios. PI no recolecta base de datos ni datos personales
              de los Colaboradores de los clientes. En el caso que lo Clientes
              decidan utilizar datos personales de sus Colaboradores estos se
              comprometen a tener previa autorización expresa de estos para
              compartirlos con terceros, y PI declara que no recolectara ningún
              tipo de dato personal de los Colaboradores de sus Clientes excepto
              los datos de registro del Administrador de las Plataformas.
              <br></br>
              <br></br>
              8.3. En relación con la base de datos de clientes potenciales,
              compradas o transferidas por terceros, conseguidas en el contexto
              de alianza comercial o conformada por PI que aún no han comprado
              servicios de la empresa, incluyen, pero no se limitan a nombre y
              apellidos, número de identificación, número de celular, fecha de
              nacimiento, dirección de correspondencia, teléfono de contacto,
              correo electrónico, cargo ejercido, perfil de redes sociales,
              intención de asistencia a eventos o webinar, y cualquier otro dato
              que fuere necesario para lograr las finalidades descritas en el
              presente documento.<br></br>
              <br></br>
              9. Datos de carácter sensible y su tratamiento. De acuerdo con la
              Ley 1581 de 2012, son considerados datos de carácter sensible los
              siguientes: el origen racial o étnico, orientación política,
              convicciones religiosas o filosóficas, pertenencia a sindicatos,
              organizaciones sociales, datos relacionados con el estado de
              salud, la vida sexual y los datos biométricos, o cualquier otro
              que pueda afectar la intimidad del Titular o cuyo uso indebido
              pueda generar discriminación. Teniendo en cuenta las
              características de PI, las actividades que desarrolla, y las
              finalidades descritas en la presente Política, PI requiere
              realizar el tratamiento de algunos datos sensibles, en la forma y
              condiciones que se indican a lo largo del documento.<br></br>
              <br></br>
              Sin embargo, PI solo recopilará y tratará Datos Sensibles en los
              casos permitidos por la ley. Para tales eventos, se informa a los
              Titulares que no están obligados a suministrar los referidos datos
              o a autorizar su Tratamiento. Una vez suministrados dichos datos y
              otorgado el correspondiente consentimiento, los datos serán
              recopilados y tratados únicamente para las finalidades descritas
              en la presente Política de Tratamiento, y tal Tratamiento solo
              será realizado mediante autorización cualificada.<br></br>
              <br></br>
              Los titulares que pretendan realizar peticiones a PI, donde sea
              necesario el suministro de información sensible, deberán
              advertirlo a PI, informando tal situación, para lo cual, teniendo
              en cuenta la naturaleza de las peticiones y del servicio ofrecido
              de la Plataforma, deberán otorgar su autorización de Tratamiento
              de Datos Personales Sensibles, para los efectos de usar la dar
              trámite al proceso de la petición de manera correcta.<br></br>
              <br></br>
              El cualquier caso, el Titular también deberá implementar la
              diligencia necesaria para mantener la reserva y seguridad de su
              información personal sensible.<br></br>
              <br></br>
              10. Datos personales relacionados con menores de edad. PI usará,
              almacenará y realizará tratamiento de datos personales de menores
              de edad que sean hijos, descendientes o que dependan o estén a
              cargo de los empleados o sus contratistas, y que sean de
              naturaleza pública y/o aquellos que se requieran para garantizar
              su bienestar. La finalidad de dicho tratamiento será únicamente la
              de planear y realizar actividades relacionadas con el bienestar
              personal y familiar de los empleados y los menores.<br></br>
              <br></br>
              En el evento en que algún menor requiera los Servicios de PI, se
              requerirá las respectivas autorizaciones de los representantes
              legales de los menores, sujeto a las particularidades del caso, y
              en cualquier caso la empresa tendrá en cuenta el respeto y
              prevalencia de los derechos de los menores, su interés superior y
              sus derechos fundamentales.<br></br>
              <br></br>
              11. Datos de imagen. Con el hecho de participar en cualquier
              videoconferencia patrocinada por PI, los Titulares aceptan y
              autorizan que sus nombres e imágenes aparezcan en los programas,
              publicaciones y demás medios publicitarios y en general en todo
              material de divulgación con fines promocionales o comerciales que
              PI desee hacer durante el término de 50 años, sin que ello
              implique la obligación de remunerarlos o compensarlos. Asimismo,
              renuncian a cualquier reclamo por derechos de imagen.<br></br>
              <br></br>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                align="center"
              >
                CAPÍTULO III FINALIDAD DEL TRATAMIENTO DE LOS DATOS PERSONALES
              </Typography>
              12. Generalidades de la Finalidad. El tratamiento que realizará PI
              será el de recolectar, almacenar, procesar, organizar, circular,
              usar, perfilar, analizar, contactar, invitar, actualizar,
              corregir, transferir, transmitir y suprimir, según corresponda,
              los datos personales, atendiendo de forma estricta los deberes de
              seguridad y confidencialidad ordenados por la Ley 1581 de 2012 y
              el Decreto 1377 de 2013 y demás regulaciones relacionadas con las
              siguientes finalidades:<br></br>
              <br></br>
              A. Finalidad del Tratamiento de la Base de Datos de empleados,
              contratistas y aspirantes a empleados, ex empleados y personal de
              PI. La finalidad de la presente Política en relación con las Bases
              de Datos que administra respecto de empleados, contratistas y
              aspirantes a empleados, ex empleados y personal de PI es:<br></br>
              <br></br>
              a. Conservar y administrar la información de la relación laboral,
              civil o comercial de los Titulares.<br></br>
              <br></br>
              b. Dar cumplimiento a los deberes legales, contables, comerciales
              y regulatorios que le aplican.<br></br>
              <br></br>
              c. Controlar y preservar la seguridad de las personas, bienes e
              información de PI.<br></br>
              <br></br>
              d. Cumplir el objeto de la relación laboral, comercial o civil que
              se hubiere adquirido con los Titulares.<br></br>
              <br></br>
              e. Proteger la salud de los empleados y contratistas de PI.
              <br></br>
              <br></br>
              f. Verificar conflictos de intereses en nuevos empleados o
              contratistas de PI, así como inhabilidades o incompatibilidades de
              los mismos.<br></br>
              <br></br>
              g. Cumplir con el objeto social de PI.<br></br>
              <br></br>
              h. Prevenir y constatar la comisión de delitos o conductas
              delictivas por parte de los empleados, contratistas, aspirantes y
              personal en general, para lo cual se podrán consultar distintas
              bases de datos y fuentes, tales como, bases de datos de la Policía
              Nacional, Contraloría, Interpol, FBI, SDNT list (o “Lista
              Clinton”), SARLAFT, así como las redes sociales correspondientes,
              en la forma en la que se encuentren dispuestas.<br></br>
              <br></br>
              i. Mantener comunicación directa con los Titulares para temas
              relacionados con su situación laboral, civil o comercial y para
              efectos contractuales, informativos y comerciales.<br></br>
              <br></br>
              j. Selección de personal, administración de contrataciones, manejo
              de relaciones laborales y cumplimiento de las obligaciones
              derivadas de la misma, otorgamiento de beneficios a sus empleados
              por sí mismo o a través de terceros, así como permitir el acceso
              de los empleados a los recursos informáticos de PI.<br></br>
              <br></br>
              k. Llevar un registro de las sanciones disciplinarias impuestas a
              contratistas y empleados PI.<br></br>
              <br></br>
              l. La realización de análisis estadísticos, comerciales,
              financieros, sociales, administrativos o técnicos.<br></br>
              <br></br>
              m. Comprobación y verificación de la identidad y antecedentes
              penales, disciplinarios, financieros y crediticios de los
              Titulares.<br></br>
              <br></br>
              n. Transmitir, transferir y suministrar la información y los Datos
              Personales de los Titulares a la casa matriz o demás empresas del
              grupo empresarial de PI, con el fin de que estas almacenen,
              consulten o actúen como Encargados o Responsables de los datos
              personales según el caso.<br></br>
              <br></br>
              o. Transmitir, transferir y suministrar la información y Datos
              Personales de los Titulares a aquellos terceros encargados de
              administrar el sistema de seguridad social en Colombia, así como a
              compañías aseguradoras.<br></br>
              <br></br>
              p. Guardar la memoria histórica y antecedentes de los ex
              empleados.<br></br>
              <br></br>
              q. Transmitir, transferir y suministrar la información y Datos
              Personales de los Titulares a terceros, en aquellos casos en que
              se presente sustitución patronal o en aquellos casos en que PI
              ceda su posición contractual, o cuando sea parte de un proceso de
              adquisición o integración empresarial.<br></br>
              <br></br>
              r. Transmitir, transferir y suministrar la información y Datos
              Personales de los Titulares a terceros, con el fin de dar
              referencias laborales y/o profesionales sobre los Titulares.
              <br></br>
              <br></br>
              s. Transmitir, transferir y suministrar la información y los Datos
              Personales de los Titulares a las empresas de outsourcing con las
              que PI tenga tercerizado su proceso de nómina.<br></br>
              <br></br>
              t. Para la evaluación y desarrollo de procesos de selección y su
              histórico.<br></br>
              <br></br>
              u. Para dar atención de Consultas, peticiones, solicitudes,
              acciones y Reclamos, hechas por el Titular de la información o por
              sus representantes o derecho habientes, o por entidades del
              sistema general de seguridad social integral a los que el titular
              esté o hubiere estado vinculado.<br></br>
              <br></br>
              v. Para participar en procesos de contratación pública o privada,
              y atender las condiciones o exigencias de dichos concursos,
              licitaciones, manifestaciones de interés públicas o privadas,
              precalificaciones públicas o privadas, presentación de propuestas,
              y en general, a la inscripción o participación en cualquier
              proceso de selección de contratación público o privado.<br></br>
              <br></br>
              w. La socialización de políticas, proyectos, programas y cambios
              organizacionales.<br></br>
              <br></br>
              x. Para contactar al titular a través de internet o de llamadas
              telefónicas, correspondencia física y telefónica, mensaje de
              texto, WhatsApp, Instagram, Facebook, Twitter, LinkedIn o
              cualquier otra red social y/o plataforma de videoconferencia con
              el fin del desarrollo contractual.<br></br>
              <br></br>
              y. Ofrecer programas de bienestar corporativo y planificar
              actividades empresariales, para el titular y sus beneficiarios
              (hijos, cónyuge, compañero permanente, amigo y cercano).<br></br>
              <br></br>
              B. Finalidades del Tratamiento en relación con la base de datos de
              actuales o potenciales clientes, proveedores y aliados
              comerciales. La finalidad de la presente Política en relación con
              las Bases de Datos que administra respecto actuales o potenciales
              clientes, proveedores y aliados comerciales de PI es:<br></br>
              <br></br>
              a. El cumplimiento del objeto social de PI.<br></br>
              <br></br>
              b. La realización de análisis estadísticos, comerciales,
              estratégicos, financieros, sociales y técnicos.<br></br>
              <br></br>
              c. El desarrollo, ejecución y cumplimiento de la relación
              contractual que el Titular tenga con PI.<br></br>
              <br></br>
              d. Cumplir con la propuesta de valor y el nivel de servicio
              ofrecido a cada segmento de usuarios y proveedores.<br></br>
              <br></br>
              e. El cumplimiento de deberes legales, contables, comerciales y
              regulatorios.<br></br>
              <br></br>
              f. La comunicación con los Titulares para efectos contractuales,
              informativos y comerciales.<br></br>
              <br></br>
              g. El control y la preservación de la seguridad de las personas,
              bienes e información de PI, para lo cual se podrán consultar
              distintas bases de datos y fuentes, tales como, bases de datos de
              la Policía Nacional, Contraloría, Interpol, FBI, SDNT list (o
              “Lista Clinton”), SARLAFT, centrales de riesgo crediticio, así
              como las redes sociales del titular, en la forma en la que se
              encuentren dispuestas.<br></br>
              <br></br>
              h. Comprobación y verificación de la identidad e información en
              general, y antecedentes penales, disciplinarios, financieros y
              crediticios de los Titulares.<br></br>
              <br></br>
              i. Transmitir, Transferir y suministrar la información y Datos
              Personales de los Titulares a las sociedades subsidiarias,
              filiales o afiliadas a PI, así como a aliados comerciales o a
              otras sociedades o personas nacionales y/o internacionales que PI
              encargue para realizar el Tratamiento de la información y cumplir
              con las finalidades descritas en la presente Política y el objeto
              de la relación comercial o civil con los Titulares, o para que
              dichos terceros asuman la posición de Responsables.<br></br>
              <br></br>
              j. Transmitir, Transferir y suministrar, a título gratuito u
              oneroso, la información y Datos Personales de los Titulares a
              aliados comerciales nacionales y/o internacionales para que estos
              contacten a los Titulares para ofrecerles sus productos,
              información o servicios que a juicio de PI puedan ser de interés
              del Titular.<br></br>
              <br></br>
              k. Transmitir, Transferir y suministrar la información y Datos
              Personales de los Titulares a terceros nacionales y/o
              internacionales, en aquellos casos en que PI participe en procesos
              de fusión, integración, escisión, liquidación, adquisición y/o
              enajenación de activos.<br></br>
              <br></br>
              l. Transmitir, transferir y suministrar la información y los Datos
              Personales de los Titulares a las compañías con quien PI tercerice
              sus procesos contables.<br></br>
              <br></br>
              m. Realizar actividades de mercadeo, como lo son estudios de
              mercado, y realizar actos de promoción de servicios, entre otros
              conceptos similares.<br></br>
              <br></br>
              n. La socialización de políticas, proyectos, programas y cambios
              organizacionales.<br></br>
              <br></br>
              o. La difusión de los casos o asuntos atendidos por PI que hayan
              sido exitosos y representativos.<br></br>
              <br></br>
              p. Transmitir, transferir y suministrar la información y datos
              personales de los Titulares a terceros nacionales o
              internacionales, para ejecutar de manera efectiva sus servicios
              dejando claridad que PI no tiene el interés de vender o
              comercializar en cualquier forma los datos como un activo o bien
              de naturaleza comercial.<br></br>
              <br></br>
              q. Para realizar reportes ante las bases de datos de operadores de
              información crediticios y de naturaleza comercial.<br></br>
              <br></br>
              r. Para gestionar el pago de sumas remuneradas, comisiones,
              descuentos y retenciones de naturaleza tributaria o parafiscal.
              <br></br>
              <br></br>
              s. Transmitir, transferir y suministrar, a título gratuito u
              oneroso, la información y Datos Personales de los Titulares a
              entidades gubernamentales nacionales y/o internacionales para los
              proyectos que gestionen tales entidades.<br></br>
              <br></br>
              t. Realizar invitaciones a eventos, mejorar servicios, y todas
              aquellas actividades asociadas a la relación comercial o vínculo
              existente con PI o aquel que llegare a tener.<br></br>
              <br></br>
              u. Para la evaluación y desarrollo de procesos de selección de
              proveedores y su histórico.<br></br>
              <br></br>
              v. Para contactar al titular a través de internet o de llamadas
              telefónicas, correspondencia física y telefónica, mensaje de
              texto, WhatsApp, Instagram, Facebook, Twitter, LinkedIn o
              cualquier otra red social y/o plataforma de videoconferencia con
              el fin del desarrollo contractual u objeto social.<br></br>
              <br></br>
              w. Contactar al Titular a través de correo electrónico para el
              envío de extractos, estados de cuenta o facturas en relación con
              las obligaciones derivadas del contrato celebrado entre las
              partes.<br></br>
              <br></br>
              x. Para ejecutar acciones de perfilamiento comercial, prospección,
              hábitos de consumo, analítica, identificación de tendencias de
              mercadeo, definición de patrones, labores de inteligencia
              artificial, entre otros métodos de aprovechamiento de datos con el
              propósito de mejorar los productos y/o servicios a ofrecer.
              <br></br>
              <br></br>
              y. Suministrar información de contacto a la fuerza comercial y/o
              red de distribución, Marketing Digital, investigación de mercados
              y cualquier tercero con el cual PI tenga un vínculo contractual
              para el desarrollo de actividades de ese tipo.<br></br>
              <br></br>
              C. Finalidades del Tratamiento en relación con la base de datos de
              futuros, eventuales, actuales y antiguos accionistas:<br></br>
              <br></br>
              a. El desarrollo, ejecución y cumplimiento de la relación
              contractual que el titular tenga con PI.<br></br>
              <br></br>
              b. El cumplimiento de deberes legales, contables, comerciales y
              regulatorios, y de requerimientos y solicitudes de información de
              autoridades públicas. c. La realización de análisis estadísticos,
              comerciales, estratégicos, financieros, sociales y técnicos.
              <br></br>
              <br></br>
              d. La comunicación con los Titulares para efectos contractuales,
              informativos y comerciales.<br></br>
              <br></br>
              e. El cumplimiento de deberes legales, contables, comerciales y
              regulatorios. f. Con el fin de preservar la seguridad de PI,
              analizar y verificar la información de los accionistas de sus
              accionistas.<br></br>
              <br></br>
              g. Transmitir, Transferir y suministrar la información y Datos
              Personales de los Titulares a las sociedades subsidiarias,
              filiales o afiliadas a PI, así como a aliados comerciales o a
              otras sociedades o personas nacionales y/o internacionales que
              encargue para realizar el Tratamiento de la información y cumplir
              con las finalidades descritas en la presente Política y el objeto
              de la relación comercial o civil con los Titulares, o para que
              dichos terceros asuman la posición de Responsables.<br></br>
              <br></br>
              h. Transmitir, transferir y suministrar la información y Datos
              Personales de los Titulares a terceros nacionales y/o
              internacionales, en aquellos casos en que PI participe en procesos
              de fusión, integración, escisión, liquidación y/o enajenación de
              activos.<br></br>
              <br></br>
              i. Para verificar antecedentes laborales, profesionales,
              comerciales y cualquier referencia que concierna a su idoneidad
              profesional y comercial.<br></br>
              <br></br>
              j. Comprobación y verificación de la identidad y antecedentes
              penales, disciplinarios financieros y crediticios de los
              Titulares.<br></br>
              <br></br>
              k. El control y la preservación de la seguridad de las personas,
              bienes e información de PI, para lo cual se podrán consultar
              distintas bases de datos y fuentes, tales como, bases de datos de
              la Policía Nacional, Contraloría, Interpol, FBI, SDNT list (o
              “Lista Clinton”), SARLAFT, centrales de riesgo crediticio, así
              como las redes sociales del titular, en la forma en la que se
              encuentren dispuestas.<br></br>
              <br></br>
              l. Para el ejercicio de desarrollo de los derechos del accionista
              y de la operación de la asamblea general de accionistas.<br></br>
              <br></br>
              m. Proteger la salud de sus accionistas y de quienes concurran a
              sus instalaciones.<br></br>
              <br></br>
              D. Finalidades del Tratamiento en relación con la base de datos de
              los usuarios de la Plataforma.<br></br>
              <br></br>
              a. El desarrollo de las actividades económicas de PI.<br></br>
              <br></br>
              b. La comunicación con los Titulares para efectos contractuales,
              comerciales o informativos.<br></br>
              <br></br>
              c. El cumplimiento de deberes legales, contables, comerciales y
              regulatorios. d. El control y la preservación de la seguridad de
              las personas, bienes e información de PI.<br></br>
              <br></br>
              e. La socialización de políticas, proyectos, programas y cambios
              organizacionales. f. Definir perfiles de consumo de sus usuarios,
              con el fin de realizar análisis estadísticos o mejorar los
              procesos de mercadeo y venta de los servicios de PI.<br></br>
              <br></br>
              g. La realización de análisis estadísticos, comerciales,
              estratégicos, financieros, sociales, técnicos y de calificación de
              riesgo.<br></br>
              <br></br>
              h. El cumplimiento del objeto social de PI y el cumplimiento del
              objeto contractual o civil con los Titulares.<br></br>
              <br></br>
              i. Transmitir, transferir y suministrar, la información y datos
              personales de los Titulares a aliados para desarrollar todos los
              programas y proyectos que PI desarrollo en función de su objeto
              social.<br></br>
              <br></br>
              j. Transmitir, transferir y suministrar, a título gratuito u
              oneroso, la información y Datos Personales de los Titulares a
              entidades gubernamentales nacionales y/o internacionales para los
              proyectos que gestionen tales entidades.<br></br>
              <br></br>
              k. Para optimizar las funcionalidades de la Plataforma.<br></br>
              <br></br>
              l. Para realizar estudios de perfilamiento de usuarios.<br></br>
              <br></br>
              m. Para realizar estudios y estrategias de mercadeo y publicidad.
              <br></br>
              <br></br>
              n. Para fines de seguridad, mejoramiento del servicio, la
              experiencia en los servicios, los Datos Personales podrán ser
              utilizados, entre otros, como prueba en cualquier tipo de proceso.
              <br></br>
              <br></br>
              o. Transmitir, transferir y suministrar la información y Datos
              Personales de los Titulares a terceros nacionales o
              internacionales, en aquellos casos en que PI participe en procesos
              de fusión, integración, escisión, liquidación y/o enajenación de
              activos.<br></br>
              <br></br>
              p. Transmitir, transferir y suministrar la información y Datos
              Personales de los Titulares a terceros nacionales o
              internacionales, en aquellos casos en que PI tenga el interés de
              vender o comercializar en cualquier forma los datos como un activo
              o bien de naturaleza comercial.<br></br>
              <br></br>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                align="center"
              >
                CAPÍTULO IV AUTORIZACIÓN PARA RECOLECCIÓN Y TRATAMIENTO DE DATOS
                PERSONALES
              </Typography>
              13. Manifestaciones de los Titulares de los Datos Personales. Al
              momento de suministrar voluntariamente los datos y/o conceder la
              autorización expresa verbal o por escrito, el Titular manifiesta
              que:<br></br>
              <br></br>
              a. Mediante el suministro voluntario de alguno de los Datos
              Personales en la forma señalada en la Política, la Autorización
              expresa verbal o por escrito, el registro o creación de un perfil
              o cuenta en la Plataforma, o la autenticación o ingreso a la
              Plataforma por medio de la autenticación con la cuenta del titular
              suscrita a un tercero, incluyendo, pero sin limitarse a Microsoft,
              Google o Facebook, el titular autoriza expresa e inequívocamente a
              PI para recolectar Datos Personales y cualquier otra información
              que suministre, así como para realizar el Tratamiento sobre sus
              Datos Personales, de conformidad con esta Política y la ley.
              <br></br>
              <br></br>
              b. Autoriza a PI para solicitarle, cuando lo requieran las leyes
              aplicables, que brinde su consentimiento expreso para las
              actividades de marketing directo, electrónico y en línea, y para
              el uso de las Cookies o tecnologías similares. De ser necesario,
              PI solicitará que se brinde su consentimiento expreso para
              recolectar y utilizar Datos Personales como se indica en esta
              Política. Dicho consentimiento se solicitará en la Plataforma o el
              formulario en copia impresa que se usa para recolectar datos
              personales o para confirmar las inscripciones o preferencias (por
              ejemplo, para actividades fuera de línea, como las ferias
              comerciales, seminarios y otros eventos).<br></br>
              <br></br>
              c. Autoriza a que PI en algunos casos le solicite que confirme su
              consentimiento mediante un vínculo en un correo electrónico de
              seguimiento, con el fin de contar con una doble autorización para
              llevar a cabo la recolección y Tratamiento de los datos.<br></br>
              <br></br>
              d. Fue informado y entiende que los Datos Sensibles son aquellos
              que afectan la intimidad del Titular o cuyo uso indebido puede
              generar discriminación. Así mismo, que ellos pueden identificarse
              como los de origen racial o étnico, orientación política,
              convicciones religiosas o filosóficas, pertenencia a sindicatos,
              organizaciones sociales, datos relacionados con el estado de
              salud, la vida sexual y los datos biométricos. e. Fue informado de
              que, en caso de recolección de información sensible, tiene derecho
              a no contestar las preguntas que le sean formuladas y a no
              entregar los datos solicitados.<br></br>
              <br></br>
              f. Fue informado acerca de las finalidades para las cuales se
              utilizarán los datos sensibles recolectados, los cuales se
              encuentran descritos en esta Política.<br></br>
              <br></br>
              g. Fue informado y comprende las medidas de seguridad que PI
              implementa para brindar protección a los Datos Personales que
              recolecta y, por tanto, acepta las mismas.<br></br>
              <br></br>
              h. Se les informó acerca de sus derechos en relación con sus Datos
              Personales y mecanismos para ejercerlos.<br></br>
              <br></br>
              14. Término de la Autorización: El término de la Autorización para
              el Tratamiento de los Datos Personales será desde que se otorga la
              Autorización, hasta el día en que PI se disuelva y se liquide o
              hasta que se termine la finalidad para la cual fueron recolectados
              los Datos Personales.<br></br>
              <br></br>
              15. Autorización para el Tratamiento de Datos Sensibles o de
              menores de edad: Cuando se trate de la recolección de Datos
              Sensibles o de menores de edad se deben cumplir los siguientes
              requisitos:<br></br>
              <br></br>
              a. La autorización debe ser explícita;<br></br>
              <br></br>
              b. Se debe informar al Titular que no está obligado a autorizar el
              Tratamiento de dicha información;<br></br>
              <br></br>
              c. Se debe informar de forma explícita y previa al Titular cuáles
              de los datos que serán objeto de Tratamiento son sensibles y la
              finalidad del mismo;<br></br>
              <br></br>
              d. Se requiere autorización por parte del representante o tutor
              para el Tratamiento de datos de niños, niñas y adolescentes.
              <br></br>
              <br></br>
              16. Autorización para nuevos usos o finalidades: PI podrá
              solicitar Autorización de los Titulares para nuevos usos de sus
              Datos Personales o información, para lo cual publicará los cambios
              en la presente Política de Tratamiento en su página web,
              Plataforma o en cualquier medio que estime conveniente según el
              caso.<br></br>
              <br></br>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                align="center"
              >
                CAPÍTULO V TRATAMIENTO DE LOS DATOS PERSONALES ALMACENADOS EN
                LAS BASES DE DATOS DE PI
              </Typography>
              17. Usos bajo la Política. PI solo tratará los Datos Personales y
              otra información de los Titulares para las finalidades descritas y
              los usos autorizados en esta Política o en las leyes vigentes. En
              adición a lo mencionado en otras secciones, el Titular
              expresamente autoriza a PI para el Tratamiento de sus Datos
              Personales y otra información para los siguientes propósitos y en
              las siguientes circunstancias:<br></br>
              <br></br>
              a. Establecer comunicación entre PI y los Titulares para cualquier
              propósito relacionado con las finalidades que se establecen en la
              presente Política, ya sea mediante llamadas, mensajes de texto,
              correos electrónicos y/o físicos.<br></br>
              <br></br>
              b. Auditar, estudiar y analizar la información de las Bases de
              Datos para diseñar y ejecutar estrategias administrativas,
              laborales, de seguridad y financieras relacionadas con el personal
              de PI.<br></br>
              <br></br>
              c. Suministrar la información y Datos Personales de los Titulares
              a las sociedades subsidiarias, filiales o afiliadas a PI, aliados
              comerciales o a otras sociedades o personas que PI encargue para
              realizar el tratamiento de la información y cumplir con las
              finalidades descritas en la presente Política y el objeto de la
              relación laboral, comercial o civil con los Titulares.<br></br>
              <br></br>
              d. Con el fin de preservar la seguridad de PI, analizar y
              verificar la información de los empleados, contratistas y
              colaboradores de PI y de aquellos que participen en procesos de
              selección.<br></br>
              <br></br>
              e. Transferir, transmitir y suministrar, a título gratuito u
              oneroso, la información y Datos Personales de los Titulares a
              aliados comerciales nacionales y/o extranjeros para que estos
              contacten a los Titulares para ofrecerles sus productos,
              información o servicios que a juicio de PI puedan ser de interés
              del Titular.<br></br>
              <br></br>
              f. Transferir, transmitir y suministrar la información y Datos
              Personales de los Titulares a terceros, en aquellos casos en que
              PI participe en procesos de fusión, integración, escisión,
              adquisición y/o liquidación.<br></br>
              <br></br>
              g. Verificar conflictos de intereses o posibles irregularidades
              con los nuevos contratistas, aliados, proveedores, usuarios y/o
              empleados de PI.<br></br>
              <br></br>
              h. Realizar calificación de riesgo financiero, jurídico, comercial
              y de seguridad.<br></br>
              <br></br>
              i. Consultar, almacenar y usar la información financiera obtenida
              que terceros administradores de bases de datos, previa
              autorización del Titular para dicha consulta.<br></br>
              <br></br>
              j. Combinar los Datos Personales con la información que se obtenga
              de otros aliados o compañías o enviarla a los mismos para
              implementar estrategias comerciales conjuntas.<br></br>
              <br></br>
              k. Cuando la información deba ser revelada para cumplir con leyes,
              regulaciones o procesos legales, para detener o prevenir fraudes,
              ataques a la seguridad de PI o de otros, así como para prevenir
              problemas técnicos o proteger los derechos de otros.<br></br>
              <br></br>
              l. Auditar, estudiar y analizar la información de las Bases de
              Datos para diseñar estrategias comerciales y aumentar y/o mejorar
              los servicios que ofrece PI.<br></br>
              <br></br>
              m. Auditar, estudiar, analizar y utilizar la información de las
              Bases de Datos para diseñar, implementar y desarrollar, programas,
              proyectos y eventos.<br></br>
              <br></br>
              n. Auditar, estudiar, analizar y utilizar la información de la
              Base de Datos para la socialización de políticas, proyectos,
              programas, resultados y cambios organizacionales.<br></br>
              <br></br>
              o. Realizar actividades de mercadeo de los servicios ofrecidos, en
              el marco de actividades de marketing directo. PI garantiza que el
              marketing directo o el estudio de mercado que reciba o acerca del
              cual se lo contacte por correo electrónico, brindarán medios
              sencillos para que no reciba más esa comunicación por correo
              electrónico. Por ejemplo, en el correo electrónico, PI le brindará
              un vínculo para "cancelar la suscripción" o un correo electrónico
              para enviar una solicitud de exclusión. En estos casos, no
              necesariamente se removerán los Datos Personales de las Bases de
              Datos, sino que se tendrá presente y se respetará el cambio en las
              preferencias de marketing directo.<br></br>
              <br></br>
              p. Informar sobre el alcance y características de los servicios de
              PI, soluciones, Webinars, y otros eventos nuevos y existentes,
              además de promociones y ofertas.<br></br>
              <br></br>
              q. Administrar la página web y las cuentas de los Titulares para
              mejorar la funcionalidad de nuestra Plataforma y analizar
              tendencias.<br></br>
              <br></br>
              r. Personalizar nuestro sitio web y Plataforma, y algunos sitios
              web de terceros según las preferencias que el usuario seleccionó y
              personalizar y mejorar su experiencia en línea, que puede incluir
              anuncios orientados sobre nuestros servicios y soluciones para que
              reciba información relevante.<br></br>
              <br></br>
              s. Según se considere necesario, para que PI proteja sus derechos
              legales y su propiedad, así como para proteger a otros usuarios de
              la Plataforma o terceros, o evitar una lesión personal o pérdida.
              <br></br>
              <br></br>
              t. Generar clientes y/o usuarios potenciales (identificar el
              interés particular que un cliente o y/o usuario potencial cliente
              y/o usuario tenga en nuestros servicios).<br></br>
              <br></br>
              u. Invitar a los Titulares a realizar comentarios o participar en
              encuestas de usuarios, comprender mejor la naturaleza y calidad de
              la provisión de los servicios de PI, así como para mejorar y
              desarrollar productos, servicios y soluciones.<br></br>
              <br></br>
              v. Compartir la información con proveedores de servicios y
              subcontratistas seleccionados que brindan servicios a PI o los
              prestan en su nombre, como sitios de alojamiento web, envío de
              información, realización de encuestas, prestación de servicios de
              tecnología, análisis de datos, outsourcing y otros servicios
              profesionales. Los proveedores de servicios solo reciben los Datos
              Personales que necesitan para brindar sus servicios a PI o en su
              nombre.<br></br>
              <br></br>
              w. Compartir la información con proveedores de servicios y
              subcontratistas seleccionados que brindan servicios a PI o en su
              nombre, como proveedores de desarrollo de software y aliados
              estratégicos encargados de administrar y manejar las bases de
              datos de las plataformas, servicios de marketing y publicidad, que
              incluyen el marketing digital, a quienes se les brinda
              información, como, por ejemplo, información recolectada sobre los
              usuarios mediante las Cookies o tecnologías similares para generar
              y brindar publicidad de servicios y soluciones más relevantes y
              útiles.<br></br>
              <br></br>
              x. Compartir la información con autoridades gubernamentales o
              entidades reguladoras según lo requiera la ley aplicable o de
              acuerdo con una orden administrativa, de un tribunal o similar.
              <br></br>
              <br></br>
              y. Cualquier otro uso que se enmarque en las finalidades ya
              expuestas y que se relacione con el objeto social de PI y su
              actividad.<br></br>
              <br></br>
              18. Abstención de Tratamiento de Datos referidos a antecedentes
              penales. PI se abstendrá de realizar el Tratamiento de Datos
              Personales que concierna a los antecedentes penales de las
              personas. No obstante, podrá verificar las bases datos públicas,
              donde consten este tipo información, con el único y exclusivo fin
              de garantizar legalidad de sus operaciones y la seguridad de PI y
              sus empleados.<br></br>
              <br></br>
              19. Medidas de seguridad para la protección de los Datos
              Personales y otra información. Las medidas de seguridad con las
              que cuenta PI busca proteger los datos de los Titulares en aras de
              impedir su adulteración, pérdida, usos y accesos no autorizados.
              Para ello, PI de forma diligente implementa medidas de protección
              humanas, administrativas y técnicas que razonablemente están a su
              alcance. El Titular acepta expresamente esta forma de protección y
              declara que la considera conveniente y suficiente para todos los
              propósitos.<br></br>
              <br></br>
              20. Política para la eliminación y/o supresión de Datos
              Personales. PI en virtud de los principios de finalidad,
              necesidad, proporcionalidad, y temporalidad, realizará el
              Tratamiento de Datos Personales de los Titulares. Una vez,
              cumplido con la finalidad de dicho Tratamiento y viéndolo
              necesario, procederá a la supresión o eliminación de los datos de
              los Titulares, conforme a los siguientes parámetros:<br></br>
              <br></br>
              i. PI evaluará semestralmente la información de los Titulares, y
              de acuerdo con sus características y su estado, procederá a elegir
              aquellos datos que considere a su discreción que deben ser
              suprimidos o eliminados. Para los efectos, tendrá en cuenta si
              existen derechos en cabeza de los Titulares que impidan la
              supresión de los datos o si existen deberes legales, contractuales
              o constitucionales que impidan la eliminación.<br></br>
              <br></br>
              ii. PI informará previamente a los Titulares la decisión y el
              fundamento de la supresión de sus Datos Personales quienes,
              mediante los canales habilitados, podrán ejercer su derecho a
              interponer Consultas, peticiones o Reclamos respecto de dicha
              decisión dentro de los quince (15) días hábiles siguientes. Las
              Consultas, peticiones o Reclamos seguirán los procedimientos
              establecidos en esta Política. En el evento que no haya Reclamo o
              petición alguna en relación con la decisión se procederá a la
              supresión.<br></br>
              <br></br>
              iii. PI elevará las actas y registros que correspondan respecto de
              los procesos de supresión y eliminación de los Datos Personales de
              los Titulares, para los efectos de trazabilidad del procedimiento.
              <br></br>
              <br></br>
              21. Aviso de Privacidad. Mediante el Aviso de Privacidad se
              informa al Titular, la información relativa a la existencia de las
              políticas y procedimientos de Tratamiento de Datos Personales
              contenida en esta Política, así como las características del
              Tratamiento que se le dará a los Datos Personales, y contendrá,
              cuando menos, la siguiente información: (i) identidad, domicilio y
              datos de contacto del Responsable del Tratamiento; (ii) tipo de
              Tratamiento al cual serán sometidos los Datos Personales y su
              finalidad; y (iii) los mecanismos generales dispuestos por el
              Responsable para que el Titular conozca la Política de Tratamiento
              y los mecanismos para la consulta de los Datos Personales del
              Titular.<br></br>
              <br></br>
              PI conservará copia del modelo de Aviso de Privacidad que se
              transmite a los Titulares mientras se lleve a cabo el Tratamiento
              de los Datos Personales y perduren las obligaciones que de éste
              deriven. Para el almacenamiento del modelo, PI o quien éste
              designe podrá emplear medios informáticos, electrónicos o
              cualquier otra tecnología. El Aviso de Privacidad de Tratamiento
              de los Datos Personales está para la disposición y consulta a
              través de la Pagina Web.<br></br>
              <br></br>
              22. Uso de Cookies o tecnologías similares. El Titular acepta que
              PI puede hacer uso de Cookies y otras tecnologías similares, tanto
              en la Plataforma y en la PI SUITE (en adelante Las Plataformas),
              sus contenidos, servicios, como en los correos electrónicos
              enviados a los Titulares, con la finalidad de, entre otras,
              propósitos de autenticación, registrar las actividades en las
              Plataformas, mejorar la funcionalidad de la misma, optimizar los
              servicios ofrecidos, analizar tendencias del mercado, analizar la
              información demográfica de quienes visitan las Plataformas y hacen
              uso de los servicios que la mismo ofrece, evaluar la eficacia de
              la publicidad del mismo, comportamiento de consumo de los usuarios
              y Clientes de la Plataforma y resultado de las actividades allí
              ejecutadas, determinar quién ha abierto el correo electrónico
              enviado y el formato en que lo hace. Estas herramientas permiten
              la obtención de, entre otras, información referente al tipo de
              navegador y el sistema operativo que se utiliza, la dirección IP,
              el tiempo que se permanece en las Plataformas y el número de
              visitas realizadas a las Plataformas, el uso de las mismas, entre
              otros.<br></br>
              <br></br>
              Los Titulares puede configurar su navegador para deshabilitar y
              eliminar las cookies, en cuyo caso, a pesar de que se podrá
              continuar visitando las Plataformas, el acceso a determinadas
              características de las Plataformas se pueden restringirse.
              <br></br>
              <br></br>
              23. Tratamiento de Datos Personales automatizado. PI podrá
              realizar el Tratamiento de Datos Personales de forma automatizada,
              por lo que, podría llegar a utilizar aplicativos de inteligencia
              artificial, con el fin de lograr la eficiencia en sus procesos.
              <br></br>
              <br></br>
              No obstante, los Datos Personales que son sometidos a un proceso
              de automatización, no se utilizan para la toma decisiones
              individuales sobre los derechos de las personas, y no son el único
              referente para decisiones que rigen el Tratamiento de Datos
              Personales de PI.<br></br>
              <br></br>
              En cualquier caso, en el evento en que se realicen estudios de
              perfilamiento que eventualmente puedan llevar a afectar a los
              Titulares, PI informará a los Titulares y garantizará su derecho a
              la objeción frente al Tratamiento en mención y sus resultados.
              <br></br>
              <br></br>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                align="center"
              >
                CAPÍTULO VI DERECHOS DE LOS TITULARES, PROCEDIMIENTO PARA
                EJERCERLOS E INSTANCIAS DE ATENCIÓN A LOS TITULARES
              </Typography>
              24. Derecho de los Titulares en general. Los Titulares tienen el
              derecho de conocer, actualizar, rectificar su información, y/o
              revocar la autorización para su Tratamiento. En particular, son
              derechos de los Titulares según se establece en el artículo 8 de
              la Ley 1581 de 2012, los siguientes:<br></br>
              <br></br>
              a. Conocer, actualizar y rectificar sus Datos Personales. Para el
              efecto es necesario establecer previamente la identificación de la
              persona para evitar que terceros no autorizados accedan a los
              datos del Titular. b. Solicitar prueba de la autorización
              otorgada, salvo que se trate de uno de los casos en los que no es
              necesaria la autorización, de conformidad con lo previsto en el
              artículo 10 de la ley 1581 de 2012.<br></br>
              <br></br>
              c. Ser informado, previa solicitud, respecto del uso que les ha
              dado a sus Datos Personales.<br></br>
              <br></br>
              d. Presentar ante la Superintendencia de Industria y Comercio
              quejas por infracciones a lo dispuesto en la ley y demás normas
              que la modifiquen, adicionen o complementen.<br></br>
              <br></br>
              e. Revocar la autorización y/o solicitar la supresión del dato.
              <br></br>
              <br></br>
              f. Acceder en forma gratuita a sus Datos Personales que hayan sido
              objeto de Tratamiento.<br></br>
              <br></br>
              g. Mover, copiar, o transferir datos personales de un controlador
              a otro, de una forma segura, en un formato legible y comúnmente
              usado (derecho de portabilidad).<br></br>
              <br></br>
              h. Abstenerse de responder las preguntas sobre Datos Sensibles o
              sobre datos de las niñas, niños y adolescentes. En este caso, se
              comunica a los Titulares, o sus respectivos representantes
              legales, que no están obligados a proveer la autorización para el
              tratamiento de datos sensibles o datos de niños, niñas y
              adolescentes.<br></br>
              <br></br>
              i. La solicitud de supresión de la información y la revocatoria de
              la Autorización no procederá cuando el Titular tenga un deber
              legal o contractual de permanecer en la Base de Datos del
              Responsable.<br></br>
              <br></br>
              25. Procedimiento para ejercer sus derechos. En caso de que el
              Titular desee ejercer sus derechos, deberá enviar un correo
              electrónico a contacto@peopleintelligence.app o comunicarse al
              teléfono +57 (316) 461 1205 el cual será atendido por el área de
              protección de datos de PI. Dicho correo deberá estar dirigido a PI
              y se deberá especificar: (i) nombre e identificación del Titular o
              la persona legitimada; (ii) descripción precisa y completa de los
              hechos que dan lugar al Reclamo; (iii) pretensiones, (iv)
              dirección física o electrónica para remitir la respuesta; y (v)
              documentos y demás pruebas pertinentes que quiera hacer valer. El
              procedimiento que se seguirá para dicha comunicación, será el que
              se indica a continuación:<br></br>
              <br></br>
              a. Cuando el Titular de los datos o sus causahabientes deseen
              consultar la información que reposa en la Base de Datos, PI
              responderá la solicitud en plazo de máximo diez (10) días. En
              cumplimiento de lo dispuesto en la Ley 1581 de 2012, cuando no
              fuere posible atender la consulta dentro de dicho término, se
              informará a los Titulares, se le expresará los motivos de la
              demora y se le señalará la fecha en que se atenderá su consulta,
              la cual no podrá superar los cinco (5) días hábiles siguientes al
              vencimiento del primer término.<br></br>
              <br></br>
              b. Cuando el Titular o sus causahabientes consideren que la
              información contenida en las Bases de Datos debe ser objeto de
              corrección, actualización o supresión, o cuando adviertan el
              presunto incumplimiento de cualquiera de los deberes contenidos en
              la Ley 1581 de 2012, podrán presentar un reclamo ante PI, el cual
              será tramitado bajo las siguientes reglas:<br></br>
              <br></br>o El reclamo se formulará mediante solicitud dirigida a
              PI con la identificación de los Titulares, la descripción de los
              hechos que dan lugar al Reclamo, la dirección, y se anexarán los
              documentos que se quieran hacer valer. Si el Reclamo resulta
              incompleto, PI podrá requerir al interesado dentro de los cinco
              (5) días siguientes a la recepción del reclamo para que subsane
              las fallas. Transcurridos dos (2) meses desde la fecha del
              requerimiento, sin que el solicitante presente la información
              requerida, se entenderá que ha desistido del reclamo.<br></br>
              <br></br>o En caso de que PI no sea competente para resolver el
              reclamo, dará traslado a quien corresponda en un término máximo de
              dos (2) días hábiles e informará de la situación al Titular, con
              lo cual quedará relevada de cualquier reclamación o
              responsabilidad por el uso, rectificación o supresión de los
              datos.<br></br>
              <br></br>o Una vez recibido el Reclamo completo, se incluirá en la
              Base de Datos una leyenda que diga "reclamo en trámite" y el
              motivo del mismo, en un término no mayor a dos (2) días hábiles.
              Dicha leyenda deberá mantenerse hasta que el Reclamo sea decidido.
              <br></br>
              <br></br>o El término máximo para atender el reclamo será de
              quince (15) días hábiles contados a partir del día siguiente a la
              fecha de su recibo. Cuando no fuere posible atender el Reclamo
              dentro de dicho término, se informará al Titular los motivos de la
              demora y la fecha en que se atenderá su Reclamo, la cual en ningún
              caso podrá superar los ocho (8) días hábiles siguientes al
              vencimiento del primer término. El retiro o supresión no procederá
              cuando exista un deber contractual de permanecer en la Base de
              Datos de PI.<br></br>
              <br></br>
              26. Quejas ante la Superintendencia de Industria y Comercio: El
              Titular, sus causahabientes o apoderados, deberán agotar el
              trámite de consulta ante PI o quien éste designe, con anterioridad
              a la presentación de cualquier queja ante la Superintendencia de
              Industria y Comercio como Requisito de Procedibilidad.<br></br>
              <br></br>
              27. Deberes de PI en su calidad de Responsable del Tratamiento de
              Datos Personales. PI está obligada a cumplir los deberes impuestos
              por la ley. Por ende, debe obrar de tal forma que cumpla con los
              siguientes deberes:<br></br>
              <br></br>
              a. Garantizar al Titular, en todo tiempo, el pleno y efectivo
              ejercicio de los derechos mencionados en esta Política.<br></br>
              <br></br>
              b. Observar los principios establecidos en esta política en el
              Tratamiento de Datos Personales.<br></br>
              <br></br>
              c. Conservar la información bajo las condiciones de seguridad
              necesarias para impedir su adulteración, pérdida, consulta, uso o
              acceso no autorizado o fraudulento.<br></br>
              <br></br>
              d. Actualizar la información cuando sea necesario.<br></br>
              <br></br>
              e. Rectificar los Datos Personales cuando ello sea procedente.
              <br></br>
              <br></br>
              f. Suministrar al Encargado del Tratamiento únicamente los Datos
              Personales cuyo Tratamiento esté previamente autorizado.<br></br>
              <br></br>
              g. Garantizar que la información que se suministre al Encargado
              del Tratamiento sea veraz, completa, exacta, actualizada,
              comprobable y comprensible.<br></br>
              <br></br>
              h. Comunicar de forma oportuna al Encargado del Tratamiento, todas
              las novedades respecto de los datos que previamente le haya
              suministrado y adoptar las demás medidas necesarias para que la
              información suministrada a este se mantenga actualizada.<br></br>
              <br></br>
              i. Informar de manera oportuna al Encargado del Tratamiento las
              rectificaciones realizadas sobre los Datos Personales para que
              éste proceda a realizar los ajustes pertinentes.<br></br>
              <br></br>
              j. Exigir al Encargado del Tratamiento en todo momento, el respeto
              a las condiciones de seguridad y privacidad de la información del
              Titular.<br></br>
              <br></br>
              k. Informar al Encargado del Tratamiento cuando determinada
              información se encuentra en discusión por parte del Titular, una
              vez se haya presentado la reclamación y no haya finalizado el
              trámite respectivo.<br></br>
              <br></br>
              l. Informar a la Superintendencia de Industria y Comercio cuando
              se presenten violaciones a los códigos de seguridad y existan
              riesgos en la administración de la información de los Titulares.
              <br></br>
              <br></br>
              m. Cumplir las instrucciones y requerimientos que imparta la
              Superintendencia de Industria y Comercio.<br></br>
              <br></br>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                align="center"
              >
                CAPÍTULO VII MISCÉLANEOS
              </Typography>
              28. Contacto. Cualquier duda o información adicional será recibida
              y tramitada mediante su envío a las direcciones de contacto
              establecidas en la presente Política.<br></br>
              <br></br>
              29. Cambios en la política de Tratamiento y protección de Datos
              Personales. Cualquier cambio sustancial en la Política, será
              comunicado oportunamente a los Titulares mediante la publicación
              en la página web de PI.<br></br>
              <br></br>
              30. Confidencialidad, derechos fundamentales y anonimización de
              los Datos Personales.<br></br>
              <br></br>
              PI es respetuoso de los derechos fundamentales de a la intimidad,
              a la libertad de expresión y al buen nombre y honra de los
              Titulares de sus Bases de Datos, razón por la cual, para los
              efectos de garantizar tales derechos, tomará las medidas que
              considere pertinentes en materia de confidencialidad, tales como
              las siguientes:<br></br>
              <br></br>
              i. Se abstendrá de divulgar parcial o totalmente la información
              confidencial recibida a cualquier persona natural o jurídica,
              entidades gubernamentales o privadas, que no haya sido autorizada
              previamente.<br></br>
              <br></br>
              ii. Se abstendrá de utilizar, explotar, emplear, publicar o
              divulgar la información confidencial en una forma diferente a la
              autorizada en la presente Política.<br></br>
              <br></br>
              iii. Instruirá a todas aquellas personas que eventualmente tengan
              acceso a la información confidencial sobre la forma de
              manipulación, utilización, manejo de medidas de seguridad y demás,
              para que dicha información permanezca con el debido manejo y
              protegida.<br></br>
              <br></br>
              iv. El uso de la información confidencial se realizar observando
              los principios de la ética y buenas prácticas en materia de
              protección de Datos Personales. Para ello, PI manifiesta
              expresamente que emplea todos los medios a su alcance para impedir
              esa utilización irregular o no autorizada de la información
              confidencial.<br></br>
              <br></br>
              v. PI realizará la anonimización de los Datos Personales de los
              Titulares, cuando considere que pueden afectar su derecho a la
              intimidad, buen nombre y honra. En todo caso, PI, a petición los
              Titulares y presentándose las razones para ello, realizará la
              correspondiente anonimización de cualquier Dato Personal.<br></br>
              <br></br>
              vi. PI no censurara la información personal de los Titulares,
              siempre y cuando, este dentro del marco de las buenas costumbres,
              la ley y la constitución, garantizando el derecho fundamental de
              los Titulares a su libertad de expresión.<br></br>
              <br></br>
              31. Condiciones a las cuales se someten los Datos Sensibles. PI
              aplicará las medidas necesarias para realizar el Tratamiento de
              Datos Sensibles de los Titulares conforme a lo estipulado en la
              Ley 1581 de 2012, razón por la cual se abstendrá de realizar el
              Tratamiento de Datos Personales que no esté autorizado de manera
              expresa por parte del Titular. Igualmente, implementara las
              medidas de seguridad y de confidencialidad necesarias para evitar
              cualquier incidente y/o violación a dicha información. El
              Tratamiento será excepcional y de acuerdo con el Tratamiento y las
              finalidades estipuladas en la autorización cualificada y de
              conformidad con el principio de responsabilidad demostrada. En
              cualquier caso, el Titular deberá implementar la diligencia
              necesaria para mantener la reserva y seguridad de su información
              personal sensible.<br></br>
              <br></br>
              32. Políticas de veracidad y calidad de la información. En
              desarrollo del principio de veracidad y calidad de la información,
              PI tomará las medidas necesarias para que la información que
              conste en sus Bases de Datos, sea cierta, completa, exacta,
              actualizada, comprobable y comprensible. Por tal razón, solicita a
              los Titulares la información que sea necesaria e integral para las
              finalidades del Tratamiento respectivo. Igualmente, solicitara los
              soportes necesarios, para que la información de sus Bases de Datos
              sea comprobable y cierta. Para los efectos anteriores PI
              implementara las siguientes medidas.<br></br>
              <br></br>
              a. Tomará todas las medidas para que, en la recolección de la
              información de los Titulares, se obtenga información completa,
              exacta, actualizada, comprobable y comprensible. En tal sentido,
              implementará medidas de debida diligencia en los medios de
              recolección de datos para tales fines.<br></br>
              <br></br>
              b. Ofrecerá formularios de actualización a los Titulares, para que
              actualicen sus Datos Personales, cuando lo considere pertinente.
              <br></br>
              <br></br>
              c. Se abstendrá de realizar el Tratamiento de Datos Personales de
              los Titulares, con información parcial, incompleta, fraccionada o
              confusa.<br></br>
              <br></br>
              d. Verificará la identidad de los Titulares y de la información
              que le sea suministrada, solicitando los documentos de
              acreditación que sean necesarios en cada caso particular, pudiendo
              solicitar entre otros, los siguientes: Cédula de ciudadanía, Rut,
              antecedentes judiciales y de policía, historial crediticio,
              certificaciones de entidades privadas y/o públicas.<br></br>
              <br></br>
              e. PI realizará auditorias semestrales sobre la veracidad y
              calidad de su información, de encontrar irregularidad y/o
              falencias en la misma, requerirá a los Titulares que suministren
              la información y soportes que sean necesarios.<br></br>
              <br></br>
              33. Integralidad. Se entienden incorporadas a esta Política todas
              aquellas políticas corporativas de PI que se relacionen con la
              misma.<br></br>
              <br></br>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleCloseDialogAceptar}>Aceptar</Button>
        </DialogActions>
      </Dialog>

      <div className={styles.screen}>
        <Navbar logo={companyInfo?.logo} />
        <div className={styles.inner_box}>
          <h3>
            <strong style={{ fontWeight: "bold" }}>
              Política de tratamiento de datos
            </strong>
          </h3>
          <p className={styles.top}>
            La información capturada por nuestro sistema será utilizada
            expresamente para uso interno de la compañía y será usada
            exclusivamente el desarrollo de este ejercicio.
          </p>
          <p className={styles.top}>
            Para conocer más acerca de nuestra política de tratamiento de datos
            puede hacer clic en el siguiente{" "}
            <strong
              style={{
                color: "blue",
                fontStyle: "italic",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={handlemodalOpen}
            >
              enlace
            </strong>
          </p>
          <div className={styles.check}>
            <Checkbox onChange={handlechange} checked={checked} />
            <p style={{ color: "grey ", marginLeft: "2rem", fontSize:"12px" }}>
              ¿Autoriza el manejo y uso de información personal según los
              descrito en el Política, el Manual Institucional y la Ley 1581 de
              Protección de Datos Personales?
            </p>
          </div>

          <div className={styles.bullets}>
            <span></span>
            <span className={styles.active}></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.move}>
            <IconButton aria-label="previous" color="info" onClick={previous}>
              <ArrowCircleLeftOutlinedIcon
                style={{ fontSize: 50, color: "black" }}
              />
            </IconButton>

            {checked && (
              <IconButton aria-label="next" color="info" onClick={next}>
                <ArrowCircleRightOutlinedIcon
                  style={{ fontSize: 50, color: "black" }}
                />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
