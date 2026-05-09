# Reflection – Assignment III
## CI/CD with GitHub Actions, Docker & Render.com
## 1. Introduction

This assignment required me to set up a complete CI/CD pipeline for a Node.js To-Do application. The pipeline automates building a Docker container, pushing it to DockerHub, and deploying it to Render.com using GitHub Actions. This reflection documents what I learned, the challenges I faced, and how I overcame them.

## 2. What I Learned

### Understanding CI/CD
Before this assignment, I had a theoretical understanding of CI/CD but had never implemented a real pipeline from scratch. Through this process, I now understand how each stage connects: a developer pushes code to GitHub, tests run automatically, a Docker image is built and pushed to a registry, and the live server is updated — all without any manual steps. This automation reduces human error and speeds up the development cycle significantly.

### GitHub Actions
I learned how to write a YAML-based workflow file for GitHub Actions. I now understand how to define jobs, steps, and use pre-built actions like `actions/checkout@v4` and `docker/login-action@v3`. I also learned how to reference secrets securely using `${{ secrets.SECRET_NAME }}` syntax instead of hardcoding sensitive values.

### Docker and Containerization
Writing a Dockerfile helped me understand how containerization works in practice. Using `node:20-alpine` as a lightweight base image, setting a working directory, copying files, installing dependencies, and defining a startup command gave me a clear picture of how applications are packaged for consistent deployment across different environments.

### DockerHub as a Registry
I learned how to push Docker images to DockerHub and how to use personal access tokens instead of passwords for secure authentication. I also learned the difference between using a password and an access token and why tokens are safer for automated pipelines.

### Render.com Deployment
Deploying from an existing Docker image on Render.com taught me how cloud platforms pull and run containerized applications. I also learned a key limitation — Render does not auto-redeploy when a new image is pushed to DockerHub — and how to work around this using a deploy webhook triggered from the GitHub Actions pipeline.

### Secrets Management
One of the most important lessons was never hardcoding credentials. I learned to store sensitive values like DockerHub tokens and Render webhook URLs as GitHub repository secrets, making the pipeline secure and shareable without exposing credentials.


## 3. Challenges Faced and How I Overcame Them

### Challenge 1: Workflow file in the wrong location
My first workflow run never appeared in the GitHub Actions tab. After investigating, I discovered the `deploy.yml` file was inside the `todo-app` subfolder rather than the repository root `.github/workflows/` directory. GitHub only recognizes workflow files in the root `.github/workflows/` path. I fixed this by manually creating the correct folder structure and moving the file.

**What I learned**: GitHub Actions has strict requirements for file placement. The workflow file must be at `.github/workflows/` in the repository root, not in a subdirectory.

### Challenge 2: Working directory mismatch
Once the workflow file was in the right place, the pipeline failed because `npm install` and `npm test` were running in the repository root, where there was no `package.json`. My application files were inside a `todo-app` subfolder. I fixed this by adding `defaults: run: working-directory: todo-app` to the workflow, which tells GitHub Actions to run all shell commands from that subdirectory.

**What I learned**: When a project is organized in subdirectories, the workflow must be explicitly told where to run commands.

### Challenge 3: Incorrect secret name
I accidentally saved the DockerHub username secret as `DOCKERHUB_02250368` instead of `DOCKERHUB_USERNAME`. This caused the Docker build step to fail because the workflow referenced `secrets.DOCKERHUB_USERNAME` which did not exist. I deleted the wrong secret and created a new one with the correct name.

**What I learned**: Secret names must exactly match what is referenced in the workflow file. Even a small naming mistake breaks the entire pipeline.

### Challenge 4: Render does not auto-redeploy from DockerHub
After successfully pushing the Docker image to DockerHub, I expected Render to automatically pull and redeploy the new image. However, this does not happen automatically. I had to find the Deploy Hook URL in Render's Settings and add a `curl -X POST` step in the workflow to trigger redeployment programmatically.

**What I learned**: Cloud platforms often require explicit triggers for redeployment. Reading platform documentation and understanding webhooks is an important DevOps skill.

## 4. What I Would Do Differently

- I would structure my repository correctly from the beginning, placing the `.github/workflows/` folder in the root before writing any code.
- I would test the workflow file locally using tools like `act` (a GitHub Actions local runner) before pushing to avoid multiple failed runs.
- I would set up all secrets before triggering the first pipeline run to avoid partial failures.

## 5. Conclusion

This assignment gave me practical, hands-on experience with modern DevOps practices. Setting up a real CI/CD pipeline — even with the challenges I encountered — deepened my understanding of how professional software teams automate their build and deployment processes. The skills I gained, including writing GitHub Actions workflows, working with Docker, managing secrets, and deploying to cloud platforms, are directly applicable to real-world software engineering roles. I feel much more confident about CI/CD concepts after completing this assignment.