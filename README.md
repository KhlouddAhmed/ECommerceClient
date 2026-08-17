# ECommerce Client — Angular Frontend

A full-featured e-commerce frontend built with Angular 22, consuming the ECommerceAPI backend. Includes role-based access, shopping cart, order management, and an admin dashboard.

---

## Tech Stack

![Angular](https://img.shields.io/badge/Angular_22-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![NgRx](https://img.shields.io/badge/NgRx_SignalStore-BA2BD2?style=for-the-badge&logo=reactivex&logoColor=white)

---

## Pages

| Page | Role | Description |
|------|------|-------------|
| Home / Products | All | Browse and filter products by category |
| Product detail | All | View product info and add to cart |
| Login / Register | Guest | JWT-based authentication |
| Shopping cart | Customer | Manage cart items and place orders |
| Order history | Customer | View past orders and status |
| Admin dashboard | Admin | Stats, analytics, manage products and users |
| Add / Edit product | Admin, Seller | Full product CRUD |

---

## Project Structure

```
src/
app/
├── core/
│   ├── models/          # TypeScript interfaces (Product, User, Order)
│   ├── services/        # HTTP services (auth, products, orders)
│   ├── interceptors/    # JWT token interceptor
│   └── guards/          # Auth and role-based route guards
├── features/
│   ├── auth/            # Login and register pages
│   ├── products/        # Product list and detail
│   ├── cart/            # Shopping cart
│   ├── orders/          # Order history
│   └── admin/           # Admin dashboard
└── shared/
    └── components/      # Navbar, footer, loading spinner
```

---

## Key Concepts

### HTTP Interceptor
Automatically attaches the JWT token to every outgoing request so services stay clean.

### Route Guards
- `authGuard` — blocks unauthenticated users from protected pages
- `adminGuard` — restricts admin pages to Admin role only
- `guestGuard` — redirects logged-in users away from login/register

### NgRx SignalStore
Used for cart state management — keeps cart items in sync across components without prop drilling.

### Lazy Loading
Each feature module loads only when the user navigates to it, keeping the initial bundle small and the app fast.

---

## Getting Started

### Prerequisites
- [Node.js 18+](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

```bash
npm install -g @angular/cli
```

### Setup

1. Clone the repository

```bash
git clone https://github.com/KhlouddAhmed/ECommerceClient.git
cd ECommerceClient
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
ng serve
```

App runs on `http://localhost:4200`

> Make sure the [ECommerceAPI](https://github.com/KhlouddAhmed/ECommerceAPI) backend is running on `https://localhost:7012`

---

## Backend

This project consumes the ECommerceAPI — an ASP.NET Core 8 Web API with SQL Server.

Repository: [ECommerceAPI](https://github.com/KhlouddAhmed/ECommerceAPI)

---

## Author

Khloud Ahmed
- GitHub: [@KhlouddAhmed](https://github.com/KhlouddAhmed)
- LinkedIn: [linkedin.com/in/khloud-ahmed](https://linkedin.com/in/khloud-ahmed)

---

## License

This project is open source and available under the [MIT License](LICENSE).