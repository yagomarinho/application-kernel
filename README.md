# Application Kernel

## Overview

This repository contains an **Application Kernel** designed to support the construction, composition, and evolution of backend applications through explicit architectural principles.

The goal of this project is to provide a **stable, evolvable core** for building applications using different architectural styles—such as Hexagonal Architecture, Clean Architecture, and simplified or experimental variants—while keeping transports, frameworks, and infrastructure concerns clearly separated from application logic.

This is a **personal repository**, actively used in both **professional and personal projects**. Although it is not presented as a general-purpose framework or product, it is publicly available and may be freely used, studied, or adapted by others.

---

## Intent

The primary intent of this repository is to:

- Serve as an **application runtime / kernel**, not a finished application
- Encourage **explicit ports and adapters**
- Keep application logic **transport-agnostic** (HTTP, WebSocket, events, etc.)
- Enable **incremental architectural evolution** (v1, v2, v3…)
- Support both **robust** and **minimal** application models
- Favor **composition over inheritance** and **explicit dependencies over implicit containers**

Architectural styles implemented here are treated as **first-class versions**, allowing different generations and approaches to coexist without breaking compatibility.

---

## Scope

This repository focuses on:

- Application composition
- Request / event handling pipelines
- Declarative input adapters
- Explicit environment and dependency boundaries
- Architectural experimentation and refinement

It intentionally does **not** aim to:

- Replace established frameworks (e.g. NestJS, Express)
- Provide UI, ORM, or database abstractions
- Hide infrastructure behind opaque magic

Frameworks and drivers are treated strictly as **external adapters**.

---

## Structure (High-Level)

The repository is organized around **architectural variants and versions**, for example:

- Multiple versions of a Hexagonal-based application model (v1, v2, v3)
- Alternative or simplified application kernels
- Experimental or event-driven variants

This structure allows architectural decisions to evolve deliberately over time, rather than being rewritten or replaced.

---

## Usage

This project is primarily intended for:

- Personal experimentation
- Professional backend systems
- Long-lived services requiring architectural stability

While it is used internally by the author, **anyone is free to use it** under the terms of the license. No guarantees of backward compatibility or long-term support are implied.

---

## Philosophy

- Architecture is a **tool**, not a goal
- Dependencies must point **inward**
- Infrastructure is a **detail**
- Explicitness is preferred over convenience
- Evolution is expected and embraced

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
