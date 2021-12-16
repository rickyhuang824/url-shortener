# URL-SHORTENER

This project is to shorten long URLS

## How to run this application

1. Clone the repository into your machine
2. Need to have Docker installed on your machine to run this application. (https://docs.docker.com/get-docker/)
2. Run `docker-compose up` in your terminal under the directory (wait until you see something like `Compiled successfully!`).
3. Go to `http://localhost:3000/`, you should see the frondend of the application
4. The backend api url should be `http://localhost:8080/`

**Note: this one-line command would run the application both frontend and backend**

## Make API call in POSTMAN

1. get all the urls data: `http://localhost:8080/` with get method
2. get the page of the full url by short url: `http://localhost:8080/{short url value}` with get method
3. post a full url to the database: `http://localhost:8080/shorten` with post method and json body like `{"url": "your url"}`

## Tech Stack

### Frontend

* Library: React
* package: mui, styled-components, axios

### Backend

* Runtime environment: NodeJS
* Framework: ExpressJS
* Database: MongoDB
* package: nanoid, valid-url, dotenv

### Containerization platform

* Docker
