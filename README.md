# BAAAD – Project 1: JobTrackr

**BAAAD** or "**B**uild **A**n **A**pp **A** **D**ay" is my challenge to build a new app every day using the C#/.NET stack — until I land my next software developer role.

---

## Project: **JobTrackr**

A job application tracker to stay organized during the job hunt.

### Features
- Add job applications with key metadata
- Track source, resume used, salary (if known), and notes
- Filter by application status, date, or company
- Built with clean, modular architecture

---

## Tech Stack

| Layer        | Tech                      |
|--------------|---------------------------|
| Frontend     | Angular 20                |
| Backend      | ASP.NET Core 9 Web API    |
| Database     | SQLite + EF Core          |
| Styling      | TailwindCSS               |

---

## Project Structure
```
DevSprint-Project1-JobTrackr/
├── API/ # ASP.NET Core Web API
├── client/ # Angular 20 frontend
└── README.md # You're here!
```

---

## Getting Started

### 1. API
```bash
cd API
dotnet ef database update
dotnet run
```

### 2. Client
```bash
cd client
npm install
ng serve
```
App runs at: http://localhost:4200

## Day 1 Reflection
I felt like the obvious thing to make on Day 1, was a job tracker. Like most people, I have been applying to several jobs a day, across several platforms.
It's hard to keep track of if I applied to the same job on to vs. the other. So this is my attempt to help not spam the poor recruiters.

## Connect With Me
* Github: [Here](https://github.com/Jereck)
* LinkedIn: [Here](https://www.linkedin.com/in/jake-reck/)
