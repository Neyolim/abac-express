# 🔐 ABAC Express

A compact, beginner-friendly implementation of **Attribute-Based Access Control (ABAC)** built with **Node.js**, **Express**, and **JWT**. This repo demonstrates how to authenticate users with JWT and enforce access control *dynamically* using user attributes and resource attributes (department, role, accessLevel, team membership).

---

## 🔎 What this project demonstrates (plain + technical)

**Plain English:**
You create a token that describes *who* the user is (their role, department, team membership, etc.). When the user asks to view or update a project, the server uses those attributes and the project's attributes to decide whether the user is allowed.

**Technical summary:**

* Authentication: JWT tokens represent the user (signed with `JWT_SECRET`).
* Authorization: ABAC policies are plain functions that accept `(user, resource)` and return `true/false`. Middleware wires that policy into request handling so checks run per-request.

**Real-world use case:**
Large organizations with cross-functional teams (HR, IT, Finance) where permissions depend on a mix of attributes (role, department, clearance/access level, project membership). ABAC lets you express fine-grained rules without hard-coding roles.

---

## 🔐 Authentication & Authorization (how it works)

### Authentication (`verifyToken`)

* Looks for `Authorization: Bearer <token>` header (falls back to `req.cookies.token`).
* Verifies token with `jwt.verify(token, jwtSecret)`.
* On success, attaches decoded user object to `req.user`.

### Authorization (`authorize(policy)`)

* `authorize` is a higher-order middleware: `authorize(policy)` returns middleware that checks `policy(req.user, req.project)` and either calls `next()` or responds `403`.
* In controllers we call `authorize` with a project object: e.g. `authorize(canViewProject, project)(req, res, next)` so the policy can evaluate both user and resource attributes.

---


