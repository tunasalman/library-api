# Invent Analytics Recruitment Task

# Installation

## Software Requirements

- Node.js **16.17.1**
- Docker **20.x+**

## How to install
### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
yarn install
```

---

# Configuration

### Setting up environments

1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```bash
    cp .env.example .env
    ```
3.  Change the values of the file to your environment. Helpful comments added to environment variables table to understand the constants.

---

# Development

| Var Name          | Type   | Default    | Description                    |
| ----------------- | ------ | ---------- | ------------------------------ |
| PORT              | number | `3000`     | Port to run the API server on  |
| POSTGRES_PORT     | number | `5432`     | Port to run the PostgresSQL on |
| POSTGRES_HOST     | string | postgresdb |
| POSTGRES_USER     | string | example    |
| POSTGRES_PASSWORD | string | example    |
| POSTGRES_DB       | string | example    |

## Start dev server

Starting API & Postgres as a docker container using the compose script at `docker-compose.yml`.

```
$ yarn dev
```

Running the above commands results in

- 🚀 Server ready at http://localhost:3000/api
- Press CTRL + C to stop the process.

---

# ESLint

### Running Eslint

```bash
yarn lint
```

You can set custom rules for eslint in `.eslintrc.js` file, Added at project root.

