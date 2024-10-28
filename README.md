# Product Delivery Estimator Web App

A responsive, dynamic e-commerce application built with React that displays product information, allows stock checking, and provides delivery estimation. Designed to handle large datasets efficiently with pagination.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [Features](#features)
- [Assumptions and Design Decisions](#assumptions-and-design-decisions)
- [Technologies Used](#technologies-used)
- [Live Demo](#live-demo)

---

## Setup Instructions

1. **Create a New Vite Project**

    ```bash
    npm create vite@latest my-product-app
    cd my-product-app
    ```

2. **Install Necessary Dependencies**

    - Install `papaparse` for CSV parsing:

      ```bash
      npm install papaparse
      ```

    - Install other dependencies:

      ```bash
      npm i
      ```

3. **Start the Development Server**

    ```bash
    npm run dev
    ```

4. **Folder Structure**

    After creating the project and adding the necessary files, your project structure should look like this:

    ```plaintext
    my-product-app/
    ├── public/
    │   ├── products.csv           # CSV file containing product information
    │   ├── stock.csv              # CSV file for stock status
    │   └── pincodes.csv           # CSV file for delivery TAT by pincode (25,000 entries)
    ├── src/
    │   ├── components/
    │   │   ├── ProductList.jsx         # Main component for rendering the product list with pagination
    │   │   ├── ProductItem.jsx         # Component to display each product
    │   │   ├── DeliveryEstimator.jsx   # Component for estimating delivery time
    │   │   └── CountdownTimer.jsx      # Timer component for delivery estimation
    │   ├── App.jsx                     # Main app component
    │   ├── main.jsx                    # Entry point
    │   └── styles.css                  # Styling for the application
    └── package.json                    # Project dependencies and scripts
    ```

## Features

- **Product Display**: Displays a paginated list of products with details like name, price, and availability.
- **Stock Checking**: Indicates if a product is available in stock.
- **Delivery Estimation**: Users can enter their pincode to see an estimated delivery date based on logistics data.
- **Pagination**: Supports smooth navigation through large datasets, displaying 10 items per page.
- **Responsive Design**: Optimized for both desktop and mobile screens.

## Assumptions and Design Decisions

### Assumptions

1. **CSV Data Structure**:
    - Products, stock, and logistics provider data are sourced from CSV files (`products.csv`, `stock.csv`, and `pincodes.csv`) in the `public` directory.
    - Each CSV file has a consistent structure:
      - `products.csv` contains columns for product ID, name, and price.
      - `stock.csv` provides product IDs with a Boolean indicating stock status.
      - `pincodes.csv` includes 25,000 entries with pincode, provider name, and delivery time (TAT).

2. **Data Loading**:
    - All CSV data is loaded asynchronously at the start of the app.
    - Assumes that these files are accessible and correctly formatted to avoid parsing errors.

### Key Design Decisions

1. **Pagination for Performance**:
    - To handle up to 5000 products, pagination displays only 10 items per page, reducing load and enhancing performance.
    - Simple pagination controls are implemented to navigate through pages.

2. **CSV Parsing**:
    - `papaparse` is used to handle CSV parsing, enabling robust data extraction and error handling.

3. **Responsive Styling**:
    - Chose a dark-themed, minimalist design to align with modern e-commerce styling.
    - Used CSS Flexbox for a responsive layout that adjusts to different screen sizes.

4. **Error Handling**:
    - Basic error messages are displayed if fetching or parsing CSV data fails, providing feedback for users.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **JavaScript (ES6+)**: Used for state management and logic.
- **CSS**: Custom styling for a clean, dark-themed design.
- **Vite**: Development environment for a fast, efficient build process.
- **PapaParse**: Library to parse CSV files.

## Live Demo

The app is live and can be accessed [here](https://product-delivery-estimator-app.vercel.app/).

---
