# sanskargurung_02250368_DSO101_A3

##  Live Deployment

##  Repository Structure

todo-app/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions CI/CD pipeline
├── public/
│   └── index.html            # Frontend UI
├── index.js                  # Express.js backend
├── index.test.js             # Jest test suite
├── package.json              # Node.js dependencies & scripts
├── Dockerfile                # Docker build instructions
├── .dockerignore             # Files excluded from Docker image
├── .gitignore
└── README.md


##  Steps Taken

### Task 1 – GitHub Repository Setup
- Created a public GitHub repository.
- Added `package.json` with `start` and `test` scripts.
- Pushed Node.js To-Do app source code.

### Task 2 – Docker Setup
- Wrote a `Dockerfile` using `node:20-alpine` base image.
- Configured working directory, dependency installation, and app startup.
- Tested the container locally:
  
  docker build -t todo-app .
  docker run -p 3000:3000 todo-app


### Task 3 – GitHub Actions Workflow
- Created `.github/workflows/deploy.yml`.
- Pipeline steps:
  1. Checkout repository
  2. Setup Node.js and run tests
  3. Login to DockerHub
  4. Build & push Docker image to DockerHub
  5. Trigger Render.com redeployment via webhook

### Task 4 – Render.com Deployment
- Created a new Web Service on Render.com.
- Selected **"Deploy from an existing image"** and linked DockerHub image.
- Added `RENDER_DEPLOY_HOOK_URL` to GitHub Secrets for automated redeploy.

## 📸 Screenshots

###  GitHub Actions – Successful Workflow
![GitHub Actions](screenshots/github-actions.png)

###  DockerHub – Image Pushed
![DockerHub](screenshots/dockerhub.png)

###  Render.com – Live Deployment
![Render](screenshots/render.png)

## Challenges Faced

- **Render auto-deploy**: Render does not auto-redeploy when a new DockerHub image is pushed. Solved by using a Render deploy webhook triggered from GitHub Actions via `curl`.
- **Docker build with tests**: `RUN npm test` inside the Dockerfile sometimes fails if the environment differs. Moved tests to a separate GitHub Actions step to separate concerns.
- **Secrets management**: Ensured all tokens were added as GitHub repository secrets and referenced via `${{ secrets.SECRET_NAME }}` — never hardcoded.


##  Learning Outcomes

- Understood the end-to-end CI/CD pipeline: Code → Test → Build → Push → Deploy.
- Learned how to write GitHub Actions workflows using YAML syntax.
- Gained practical experience with Docker: writing Dockerfiles, building images, and pushing to DockerHub.
- Learned how to deploy containerized apps on Render.com and trigger automatic redeploys via webhooks.
- Understood the importance of secrets management in secure DevOps pipelines.