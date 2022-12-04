# Transactions Frontend

Transactions Frontend for Friday Finance's challenge.

## 🚀 How to run it?

1. Clone the repository `git clone git@github.com:debugferro/transactions-frontend.git`
2. Get into the repository folder

##### 🐳 Running with docker:

Make sure you have the [apollo server](https://github.com/debugferro/transactions-backend) and that it is running.

Run the following:

- `docker-compose build` and
- `docker-compose up` to start it all.

Now you can access the client at `http://localhost:3000`
Remember to run `docker-compose down` after using it.

## ❓ How to use it?

On the main page, there is a list of transactions with an infinite scroll. Filtering the table's content by reference, date, and category is possible.
Clicking on one of the rows will be shown the details page, where it is possible to see all the data and change the transaction's category.

## 🏗️ Built with:
- JavaScript
- React v18.2
- Apollo Client v3
- Emotion
- Material UI
- React Router Dom

