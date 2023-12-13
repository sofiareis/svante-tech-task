# CSV Viewer with Graphs and Configurable Options

## Description
A react app for viewing CSV data and visualizing graphs based on the data provided.
Users can configure the graph to display specific data points, such as plotting over all the rows in a given column.

## Features
- CSV Parser
- Scrollable tables to visualize the data
- Graphical visualization based on the data
- Possibility to select which data points to display on the graph
- Pause, restart, speed up, and slow down graph animation buttons
- Tooltip to better see the data 

## Installation

### Prerequisites

This project requires NodeJS and NPM. To make sure you have them available on your machine, try running the following command:

```bash
npm -v && node -v
```

### Project dependencies

* `fontawesome` - For icons;
* `mui` - For the data table visualization;
* `react-virtuoso` - For the data table visualization;
* `d3` - For the graphical visualization;
* `papaparse`- For parsing the .csv data files;

To install the dependencies, run the following command:

```bash
npm install
```

### Running the application

To start the application, run the development server:

```bsah
npm start
```

The server will be available on `localhost:3000`.