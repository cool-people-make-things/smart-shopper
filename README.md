<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="./frontend/public/icons/smart-shopper.png" alt="Smart shopper logo"></a>
</p>

<h3 align="center">Smart Shopper</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
  [![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

</div>

---

<p align="center"> Compare prices of grocery items from different grocery chains for the cheapest item. Inspired by the rising <i>and ridiculous</i> costs of butter in New Zealand.
    <br> 
</p>

## Deployment

| Notes | Production <br/> (`main` branch) | Development <br/> (`dev` branch) | 
|----------|----------|----------|
| `/frontend` | https://smart-grocery-shopper.vercel.app/ | https://dev-smart-shopper.emilyparkes-projects.vercel.app/ |
| `/backend`  | https://smart-shopper-ivke.onrender.com | https://smart-shopper-dev.onrender.com |


## 📝 Table of Contents

- [Getting Started](#getting_started)
- [Running the tests](#running_the_tests)
- [Deployment](#deployment)
- [Architecture Decision Records tooling](#architecture_decision_records_tooling)
- [Built Using](#built_using)
- [About](#about)
- [Authors](#authors)
- [License](#license)
<!-- - [Usage](#usage) -->
<!-- - [Acknowledgments](#acknowledgement) -->

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

This project is a monorepo made up of `/frontend` for our frontend code and `/backend` for our backend code. 

- [Getting started with the frontend](./frontend/README.md)

- [Getting started with the backend](./backend/README.md)

## 🔧 Running the tests <a name = "running_the_tests"></a>

### Frontend tests
Run all the unit tests for the frontend

```sh
npm run test
```

### Backend tests
Run all the tests for the backend

```sh
bin/run_tests
```

<!-- ## 🎈 Usage <a name="usage"></a> -->
<!-- Add notes about how to use the system. -->

## 🚀 Deployment <a name = "deployment"></a>
<!-- To be decided/done -->
This project is not yet deployed.

## 📄 Architecture Decision Records tooling <a name = "architecture_decision_records_tooling"></a> 
- All [ADRs](https://github.com/joelparkerhenderson/architecture-decision-record#what-is-an-architecture-decision-record) are stored in `/doc/architecture` folder.
- Follow [ADR-tooling-install-guide](doc/readme/ADR-tooling.md) if you want to use automate ADR tooling 

## ⛏️ Built Using <a name = "built_using"></a>

![CircleCI](https://img.shields.io/badge/circle%20ci-%23161616.svg?style=for-the-badge&logo=circleci&logoColor=white)
![shadcn](https://img.shields.io/badge/shadcn-000000?style=for-the-badge&logo=shadcn&logoColor=000000)
![tailwind](https://img.shields.io/badge/tailwind-00bcff?style=for-the-badge&logo=tailwind&logoColor=00bcff)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![react-router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)
![testing-library](https://img.shields.io/badge/testing%20library-323330?style=for-the-badge&logo=testing-library&logoColor=red)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![ruby](https://img.shields.io/badge/Ruby-585450?style=for-the-badge&logo=ruby&logoColor=841922)
![rails](https://img.shields.io/badge/rails-841922?style=for-the-badge&logo=rails&logoColor=841922)
![RSpec](https://img.shields.io/badge/rspec-477dca?style=for-the-badge&logo=rspec&logoColor=477dca)
![docker](https://img.shields.io/badge/docker-e7eaef?style=for-the-badge&logo=docker&logoColor=2560ff)

## 🧐 About <a name = "about"></a>
This project was a way for the three of us to work together, make something we'd use and practice and learn new things.

## ✍️ Authors <a name = "authors"></a>
- [@emilyparkes](https://github.com/emilyparkes)
- [@josh-liuaana](https://github.com/josh-liuaana)
- [@kelly-keating](https://github.com/kelly-keating)

## 🪪 License <a name = "license"></a>

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).

You are free to use, modify, and contribute to this project for non-commercial purposes. Commercial use is **not permitted** without explicit permission from the maintainers. Please contact us if you'd like to discuss commercial licensing.

<!-- ## 🎉 Acknowledgements <a name = "acknowledgement"></a> -->
<!-- - Hat tip to anyone whose code was used
- Inspiration
- References -->
