const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repositorie);

  response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositorieIndex = repositories.findIndex((repo) => repo.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" });
  }

  const { likes } = repositories.find(
    (repo) => repo.id === id
  );

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes
  };

  repositories[repositorieIndex] = repositorie;

  response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex((repo) => repo.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" });
  }
  repositories.splice(repositorieIndex, 1);

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex((repo) => repo.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" });
  }

  const { title, url, techs, likes } = repositories.find(
    (repo) => repo.id === id
  );

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: likes + 1,
  };

  repositories[repositorieIndex] = repositorie;
  response.json({ likes: repositorie.likes })
  
});

module.exports = app;
