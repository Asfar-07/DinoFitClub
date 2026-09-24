# 🏋️ DinoFitClub Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Cloud](https://img.shields.io/badge/Spring_Cloud-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![OAuth2](https://img.shields.io/badge/OAuth2-EB5424?style=for-the-badge&logo=auth0&logoColor=white)

> A production-grade full-stack Gym Management Platform built with
> Spring Cloud Microservices architecture, Google OAuth2 authentication,
> and a React + TypeScript frontend. 🚧 Under active development.

---

## 🏗️ Architecture

This platform follows a **Spring Cloud Microservices Architecture** where each
service is independently deployable with its own dedicated database.

```
┌─────────────────────────────────┐
│     React + TypeScript          │
│         Frontend                │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│          API Gateway            │
│    Routing + Load Balancing     │
└──────────────┬──────────────────┘
               │
┌──────────────▼──────────────────┐
│       Discovery Service         │
│       (Eureka Registry)         │
└───┬──────┬──────────┬───────────┘
    │      │          │        │
┌───▼──┐ ┌─▼────┐ ┌───▼────┐ ┌─▼──────┐
│Auth  │ │User  │ │Dash-   │ │Support │
│Serv. │ │Serv. │ │board   │ │Service │
│OAuth2│ │Roles │ │Analyt. │ │Tickets │
│+ JWT │ │Perms │ │        │ │        │
└──┬───┘ └──┬───┘ └────┬───┘ └───┬────┘
   │        │          │         │
  DB       DB         DB        DB
```

## 🧩 Services Overview

| Service | Port | Responsibility |
|---|---|---|
| **API Gateway** | 8080 | Central entry point, request routing & load balancing |
| **Discovery Service** | 8761 | Eureka service registry for dynamic service discovery |
| **Auth Service** | 8081 | Google OAuth2 + JWT-based secure authentication |
| **User Service** | 8082 | User management, roles & permissions |
| **Dashboard Service** | 8083 | Business analytics and account overview |
| **Support Service** | 8084 | In-app support and ticket management |

> Each service runs independently with its own dedicated MySQL database.
