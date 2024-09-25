# Assignment 2 - Development of Large Scale Systems

## Table of Contents

- [Introduction](#introduction)
- [GitHub Projects Workflow](#github-projects-workflow)
- [User Stories and Tasks](#user-stories-and-tasks)
- [Project Board Columns](#project-board-columns)
- [Branching and Pull Requests](#branching-and-pull-requests)
- [Final Product](#final-product)
- [How to Run the Client](#how-to-run-the-client)
- [Reflections](#reflections)

## Introduction

The goal of this assignment is to learn how to effectively integrate GitHub Projects into a development workflow. For this purpose, we implement two user stories related to a Chemical Warehouse system. GitHub Issues are used to manage these user stories, with tasks broken down within each issue to track progress.

## GitHub Projects Workflow

We utilize **GitHub Projects** to manage the workflow. Each user story is represented by an issue, and within these issues, individual tasks are created. The issues are labeled to differentiate between types, using labels like `User Story` and `TASK` for clarity.

![image](https://github.com/user-attachments/assets/bf35f5dd-31b8-4ae0-ad3f-995ed5a3c4ca)

## User stories and Tasks

Tasks are generated from user stories and are converted into issues for better tracking. Each issue is assigned labels for easy identification. We use the labels:

- **User Story**: Represents a high-level feature or requirement.
- **TASK**: Represents a specific task or piece of work associated with a user story.

![image](https://github.com/user-attachments/assets/782fbb53-f4e7-49ba-aa08-9330f1559d81)

All current existing issues are allocated to our GitHub project, named DLS Assignment 2.

![image](https://github.com/user-attachments/assets/bcad0e6e-8a0a-4a5d-b79b-78ca07f7e920)

## Project Board Columns

Our GitHub project board is organized into several columns to reflect the status of issues:

- **Backlog**: Displays all user stories and tasks that are yet to be worked on.
- **Current Sprint**: Contains issues that are scheduled for the current sprint.
- **In Progress**: Issues that are actively being worked on.
- **Ready for Review**: Issues completed by the assignee, awaiting peer review.
- **Approved**: Issues that have been reviewed and approved, ready for merging.
- **Done**: Issues that have been successfully merged and completed.
- **Archived**: Issues from previous sprints.

## Branching and Pull Requests

Each task is assigned to a team member and is associated with a dedicated feature branch. Work is completed within this branch, and when a task is ready to be merged, a pull request is created. The pull request links to the corresponding issue and branch.

![image](https://github.com/user-attachments/assets/69978a78-98ec-44fc-9f54-af922413728c)

In the issue, we assign a feature branch, from which we will do our work.

![image](https://github.com/user-attachments/assets/baee6245-5061-4f36-b116-77506d75e521)

When the issue is ready to be merged into the master branch, we create a pull request associated to the branch and issue.

![image](https://github.com/user-attachments/assets/ac23ddc0-681a-46d9-9a92-c5f10534cb51)

After the reviewer apporves the pull request, the assignee of the pull request merges the feature branch into master branch.
Afterward, the issue in GitHub projects will be in the column 'Done'.

When a task issue has been moved to done, it will automatically update the associated user story issue.

![image](https://github.com/user-attachments/assets/613e67b8-7072-4282-9ebb-c7a1a82886b5)

![image](https://github.com/user-attachments/assets/075fb6ab-aeee-4e5c-ab65-9ea18e738360)

# Final product

We have developed a simple client-server application. The server exposes the following endpoints:

![image](https://github.com/user-attachments/assets/92e20f64-8572-4e91-a03d-4abc914eed73)

Here is the link to our GitHub projects:
https://github.com/orgs/SoftDev2425/projects/2/views/1

# How to run the client

Start by cloning the folder 'Assignment_2'.

## Server
1. `cd` into the `server` folder
2. Run `npm i`
3. Now run your docker desktop.
4. Then run the following command in your terminal (make sure you are in /server) to run a postgres container:
   `docker-compose up -d` <br>
5. Create an `.env` with the following content:

```
DATABASE_URL="postgresql://user:mypassword@localhost:5432/assignment2"
PORT = 4000
```
6. Now run ```npm run dev``` to start the server.


## Client
1. `cd` into the `client` folder
2. Run `npm i`
3. Run `npm run dev`

# Reflections

For future GitHub projects, we will consider adding time estimates to better plan the duration for issues.
We might also refine the specificity of the labels we use.
In this project, we distinguished issues using 'User Story' and 'TASK', but we could further detail tasks, such as specifying if a task involves creating a new model or method.
