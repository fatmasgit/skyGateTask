# Wizards Dashboard

A Wizards Dashboard implemented from a Figma design using React, TypeScript, Tailwind CSS v4, TanStack Table, TanStack Query, Shadcn UI, Axios, and Recharts.

## Live Demo
[View the live dashboard](https://sky-gate-task-q4zh.vercel.app/)


## Implementation

### 1. Reusable Table

The main focus of the implementation was building a reusable table structure rather than creating a table specifically for the Wizards feature.

The table is designed so that a feature only needs to provide its data and column definitions. The same table can therefore be reused across different features with their own columns and data.

TanStack Table handles the table logic, including client-side filtering and pagination, so the table does not require manually implementing the underlying table structure and pagination logic.

Shadcn UI was used and customized for the table UI, pagination, tooltips, and expandable rows.

### 2. TanStack Query

TanStack Query is used to manage the Wizards API data and makes the data-fetching layer easier to maintain by handling query state, caching, loading, errors, and refetching.

The API logic is separated from the table itself, allowing the reusable table to remain independent of the Wizards API.

### 3. Search

The required 400ms debounce was implemented using a reusable `useDebounce` hook.

The search flow is:

1. User searches by first or last name.
2. The input is debounced for 400ms.
3. The corresponding API query parameter is sent.
4. TanStack Query manages the request and its state.
5. The returned results are passed to the reusable table.
6. TanStack Table handles the client-side pagination of the results.
7. Clearing the search restores the complete results.

Loading, error, empty, and null-name cases are handled within the reusable table.

### 4. Styling & Theme

Tailwind CSS v4 is used with its CSS-first `@theme` approach, so a traditional `tailwind.config.js` file is not required for the theme configuration.

The dashboard colors are centralized in the theme using HSLA values instead of being scattered throughout the components.

Shadcn UI components were customized to match the Figma design.

### 5. Charts & Cards

All charts were implemented using Recharts with the static data and colors from the Figma design.

The KPI cards were also initially built as reusable components and then used by the dashboard features.

### 6. Project Structure

The project keeps reusable logic separated into dedicated hooks and services.

For example:

* `useDebounce` — reusable debounce logic
* Wizards fetching hook — handles Wizards data fetching
* Axios instance — centralized API configuration
* TanStack Query instance — centralized query configuration
* Reusable table — shared table structure for different features
* Reusable cards — shared dashboard card structure

## Approach

Although the task is a dashboard containing charts and a table, I approached it as a feature that could be part of a larger application.

The goal was to demonstrate how I would structure the code within a real team environment, focusing on reusable components, separation of concerns, and a foundation that can be extended with additional features rather than building everything specifically for this single screen.
