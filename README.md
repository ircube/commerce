# Gapsi e-Commerce - Angular v21 Challenge

**🚀 Live Demo: [https://ircube.github.io/commerce/](https://ircube.github.io/commerce/)**

This project is a modern e-commerce product explorer built with **Angular v21**. It features a high-performance product list with virtual scrolling, dynamic loading, and a seamless drag-and-drop shopping cart experience.

## 🚀 Getting Started

### Prerequisites
- Node.js v24.x or superior
- Angular CLI v21

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
Run the application in development mode:
```bash
ng serve
```
Navigate to `http://localhost:4200/`.

### Production Build
Generate a production build (minified and optimized):
```bash
ng build
```

## 🛠️ Requirements Fulfillment

| Requirement | Weight | Status |
| :--- | :---: | :---: |
| **Functional** | | |
| Header with Gapsi logo & "e-Commerce Gapsi" | 3 | ✅ |
| Welcome screen (Candidate Image, Name, Version from API) | 5 | ✅ |
| List products from REST service | 4 | ✅ |
| Pagination/Dynamic Loading via scroll | 5 | ✅ |
| Drag & Drop products to cart | 5 | ✅ |
| Filter products already in cart | 4 | ✅ |
| Application reset button | 3 | ✅ |
| **Non-Functional** | | |
| Virtual Scroll & Dynamic Loading (CDK) | 5 | ✅ |
| 2 Design Patterns (Indicated in code) | 4 | ✅ |
| PWA Feature (Online/Offline status) | 2 | ✅ |
| Angular Material Implementation | 4 | ✅ |
| Clean Code & Simplicity | 2 | ✅ |

## 📐 Architecture & Design Patterns

The application follows clean code principles and implements the following design patterns:

### 1. Singleton Pattern (Shared State)
Services like `CartService` and `ProductService` are implemented as Singletons (`providedIn: 'root'`). They manage the global state of the application using **Angular Signals**, ensuring a single source of truth for product and cart data.

- **Files:** `src/app/services/cart.service.ts`, `src/app/services/product.service.ts`

### 2. Data Mapper / Adapter Pattern (Data Transformation)
Used to transform raw API responses into well-defined domain models. This decouples the application's internal logic from external API structures, making the codebase more resilient to backend changes.

- **Files:** `src/app/mappers/product.mapper.ts`, `src/app/mappers/visitor.mapper.ts`

### 3. Repository Pattern (Data Access)
Encapsulates the logic for accessing data sources (API), providing a clean API for services to consume data without worrying about HTTP implementation details.

- **Files:** `src/app/services/product.repository.ts`, `src/app/services/visitor.repository.ts`

## 📱 PWA Features
- **Online/Offline Status:** The application monitors the user's connection status and provides feedback via `MatSnackBar`.
- **Manifest Support:** Fully configured `manifest.webmanifest` for standalone installation.
- **Service Worker:** Configured via `ngsw-config.json` for offline caching of essential assets.

## ✨ Creativity & Polish
- **Animations:** Smooth CSS-based `fadeIn` and `scale` transitions for cards and welcome screen (optimized for performance and compatibility).
- **Responsive Design:** Grid layout optimized for different screen sizes.
- **Visual Feedback:** Interactive tooltips, loading spinners, and drag-and-drop handles.
