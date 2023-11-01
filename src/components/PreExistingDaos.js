import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "../styles/SelectTemplate.scss";
import { Button, CardActions } from "@mui/material";
import img from "../assets/section3.jpg";
// import TemplateDetails from "./TemplateDetails";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.scss";
import YourDaos from "../components/YourDaos";
import AvailabelProposal from "../components/AvailabelProposal";
import AllDataDaos from "../components/AllDataDaos";
import DataDaoDetails from "../components/DataDaoDetails";
import YourDataDaoDetails from "../components/YourDataDaoDetails";
import Grid from "@mui/material/Unstable_Grid2";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";

function Dashboard() {
  const [dashboard, setDashboard] = useState(false);
  const [proposals, setProposals] = useState(false);
  const [yourDaos, setYourDaos] = useState(false);
  const [datadaos, setDatadaos] = useState(true);
  const [daoAddress, setDaoAddress] = useState();

  const [singleDataDao, setSingleDataDao] = useState(false);
  const [singleYourDataDao, setSingleYourDataDao] = useState(false);
  const [isSamhita, setIsSamhita] = useState();

  const dashboardLinks = (a) => {
    if (a === "Dashboard") {
      setDashboard(true);
      setProposals(false);
      setYourDaos(false);
      setDatadaos(false);
    }
    if (a === "Proposals") {
      setDashboard(false);
      setProposals(true);
      setYourDaos(false);
      setDatadaos(false);
    } else if (a === "YourDaos") {
      setDashboard(false);
      setProposals(false);
      setYourDaos(true);
      setDatadaos(false);
    } else if (a === "DataDAOs") {
      setDashboard(false);
      setProposals(false);
      setYourDaos(false);
      setDatadaos(true);
    }
  };

  const [data, setData] = useState([
    {
      cover: image1,
      title: "Proposals",
      link: "Proposals",
      info: "Check all the Active Proposals and contribute to your Language Dao ! ",
    },
    {
      cover: image2,
      title: "YourDaos",
      link: "YourDaos",
      info: "Check all the language daos that you have created and contribute in it to build your community !",
    },
    {
      cover: image3,
      title: "LanguageDAOs",
      link: "DataDAOs",
      info: "Check all the language daos available in the platform and be part of one you like the most !",
    },
  ]);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="dashboard-main">
      <div className="right-db">
        {dashboard ? (
          <>
            <div className="select-main" id="right-db-inside">
              <h1>check</h1>
              <p>Click on any Language DAO to open dashboard for that dao.</p>
              <div className="temdplates-div">
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {data.map((item, key) => {
                    return (
                      <Grid xs={2} sm={4} md={4} key={key}>
                        <Item>
                          <Card
                            sx={{
                              // width: "100%",
                              maxWidth: 300,
                            }}
                            key={key}
                            className="card"
                          >
                            <CardActionArea
                              onClick={() => {
                                dashboardLinks(`${item.link}`);
                              }}
                            >
                              <CardMedia
                                component="img"
                                height="180"
                                image={item.cover}
                                alt="green iguana"
                              />
                              <CardContent sx={{}}>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  sx={{ textAlign: "center", color: "#ffffff" }}
                                >
                                  {item.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  className="template-info"
                                  id="temp-info"
                                >
                                  {item.info}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Item>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            </div>
          </>
        ) : yourDaos ? (
          <YourDaos
            setSingleYourDataDao={setSingleYourDataDao}
            setYourDaos={setYourDaos}
            setDaoAddress={setDaoAddress}
            isSamhita={isSamhita}
          />
        ) : proposals ? (
          <AvailabelProposal />
        ) : datadaos ? (
          <AllDataDaos
            setSingleDataDao={setSingleDataDao}
            setDatadaos={setDatadaos}
            setDaoAddress={setDaoAddress}
            setIsSamhita={setIsSamhita}
          />
        ) : singleDataDao ? (
          <DataDaoDetails
            datadaos={datadaos}
            setDatadaos={setDatadaos}
            setSingleDataDao={setSingleDataDao}
            setYourDaos={setYourDaos}
            yourDaos={yourDaos}
            daoAddress={daoAddress}
            isSamhita={isSamhita}
          />
        ) : singleYourDataDao ? (
          <YourDataDaoDetails
            datadaos={datadaos}
            setDatadaos={setDatadaos}
            setSingleYourDataDao={setSingleYourDataDao}
            setYourDaos={setYourDaos}
            yourDaos={yourDaos}
            daoAddress={daoAddress}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
