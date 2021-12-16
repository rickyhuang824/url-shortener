import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../reponsive";
import { publicRequest } from "../requestMethods";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgrey;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  ${mobile({ width: "75%" })};
`;
const Header = styled.h1`
  text-align: center;
  font-weight: 300;
  width: 100%;
  ${mobile({
    fontSize: "16px",
    marginTop: "30px",
  })};
`;

const Form = styled.form`
  display: flex;
  margin: 20px 10px;
  /* height: 40px; */
  justify-content: center;
  width: 90%;
  ${mobile({
    flexDirection: "column",
    justifyContent: "space-between",
  })};
`;

const Input = styled.input`
  flex: 5;
  border: none;
  margin-right: 10px;
  padding: 5px;
  border-radius: 10px;
  height: 40px;
  ${mobile({
    flex: 1,
    margin: "0 0 10px 0",
  })};
`;
const Button = styled.button`
  flex: 1;
  border: none;
  color: black;
  font-size: 16px;
  background-color: teal;
  border-radius: 10px;
`;

const Messsage = styled.div`
  color: ${(props) => (props.type === "error" ? "red" : "green")};
  margin: 20px 10px;
  background-color: white;
  padding: 10px 5px;
  border-radius: 10px;
  width: 90%;
  text-align: center;
`;

const Link = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

const MyTableContainer = styled(TableContainer)`
  margin: 20px 10px;
  max-width: 90%;
`;

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortenUrl, setShortenUrl] = useState("");
  const [error, setError] = useState("");
  const [allUrls, setAllUrls] = useState([]);

  const handleSumit = (e) => {
    e.preventDefault();
    const submitUrl = async () => {
      try {
        const res = await publicRequest.post("/shorten", { url: url });
        setShortenUrl(`${process.env.REACT_APP_API_URL}${res.data.shortUrl}`);
        setError("");
        setUrl("");
      } catch (err) {
        setError(err.response.data);
      }
    };
    submitUrl();
  };

  useEffect(() => {
    const getAllUrls = async (req, res) => {
      try {
        const res = await publicRequest.get("/");
        res.data.map(
          (data) =>
            (data.shortUrl = `${process.env.REACT_APP_API_URL}${data.shortUrl}`)
        );
        setAllUrls(res.data);
        console.log(allUrls);
      } catch (err) {
        console.log(err);
      }
    };

    getAllUrls();
  }, [shortenUrl]);

  return (
    <Container>
      <Wrapper>
        <Header>Ricky's Url Shorterner</Header>
        <Form>
          <Input
            placeholder="URL"
            type="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <Button onClick={handleSumit}>Submit</Button>
        </Form>
        {shortenUrl && (
          <Messsage>
            The shortURl is:{" "}
            <Link href={shortenUrl} target="_blank">
              {shortenUrl}
            </Link>
          </Messsage>
        )}
        {error && <Messsage type="error">Error: {error}</Messsage>}
        <MyTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="50%">Full URL</TableCell>
                <TableCell>Short URL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUrls.map((url) => {
                return (
                  <TableRow key={url._id}>
                    <TableCell component="th" scope="row">
                      <Link href={url.fullUrl} target="_blank">
                        {url.fullUrl}
                      </Link>
                    </TableCell>
                    <TableCell component="th">
                      <Link href={url.shortUrl} target="_blank">
                        {url.shortUrl}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </MyTableContainer>
      </Wrapper>
    </Container>
  );
};

export default Home;
