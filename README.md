# System Health Monitor
This project is a **System Health Dashboard** built using **Nodejs**, **React** and **TypeScript**. It visualizes real-time data for various regions and services, displaying system statuses and server statistics. The dashboard updates dynamically through the integration of **Pusher**, enabling real-time notifications for system status changes.

## Features

- **Real-time Data**: The dashboard receives live updates via **Pusher**, ensuring that system statuses are up-to-date.
- **Dynamic Visualization**: The UI dynamically renders services and server statistics for different regions.
- **CPU History Tracking**: Tracks the last 10 CPU usage data points for each region.

## Project Structure

- **React Components**: Organized into modular components for services, server statistics, and overall region status.
- **State Management**: Handles real-time data updates and CPU history using `useState` and `useEffect` hooks.
- **TypeScript Types**: Ensures type safety for service data, server statistics, and region statuses.

