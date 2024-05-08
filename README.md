# PaketMutfakApp 📦🚚

Welcome to PaketMutfakApp, an advanced Order Management System designed to streamline the handling and delivery of orders. Built with React Native, this app facilitates a seamless cross-platform experience, suitable for both iOS and Android devices. It features an interactive user interface for managing orders, grouping them into baskets, assigning couriers, and tracking their delivery statuses.

## Features 🌟

- **Order Listing**: Displays all orders along with detailed statuses.
- **Basket Management**: Create, modify, and manage baskets to organize orders before delivery.
- **Courier Assignment**: Dynamically assign couriers to specific baskets.
- **Real-Time Status Updates**: Track and update the status of orders from preparation to delivery.
- **Interactive User Interface**: Responsive and intuitive interface designed for efficient operation.

## Screens 📱

- **Orders Screen**: View and manage orders and baskets. Supports operations like creating new baskets and assigning orders.
- **Order Detail Screen**: Offers a detailed view of each order, including ID, address, and current status.
- **On The Way Screen**: Manage and update the status of current route orders.

## Components 🧩

- **OrderCard**: Component to display key information about each order.
- **BasketView**: Manages the functionalities related to baskets such as adding or removing orders and assigning couriers.
- **CourierSelector**: Component to select couriers for baskets.
- **OnTheWayBasketView**: Manages and updates the status of orders on their way to delivery.

## Setup and Installation 🛠️

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Arda66/PaketMutfakApp.git

2. **Local Server Setup**

    Before running the application, you need to set up and start the local server to manage data interactions. Follow these steps to get the server up and running:

    **Install JSON Server:**

      If you don't have JSON Server installed globally, you can install it using npm:

      
         npm install -g json-server


    **Start The Server:**

      Navigate to the root directory of your project where db.json is located and run the following command to start your local server:

      
         npx json-server --watch db.json --port 3000


