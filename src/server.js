const { ApolloServer } = require("apollo-server");
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

(async function () {
  try {
    const db = await sqlite.open({
      filename: "./db.sqlite",
      driver: sqlite3.Database,
    });

    const typeDefs = `
    type Item {
        id: Int,
        category: String,
        description: String,
        price: Float
    }

    type Query {
        items: [Item]
    }

    input ItemInput {
      category: String
      description: String
      price: Float
    }

    type Mutation {
      saveItem(item:ItemInput) : Item
    }
    `;

    const resolvers = {
      Query: {
        async items() {
          return await db.all("select * from item");
        },
      },
      Mutation: {
        async saveItem(_, args) {
          const item = args.item;
          item.id = Math.floor(Math.random() * 1000);
          const newItem = await db.run(
            "INSERT INTO item(id,category,description,price) VALUES (?,?,?,?)",
            [item.id, item.category, item.description, item.price]
          );
          return item;
        },
      },
    };

    const server = new ApolloServer({ typeDefs, resolvers });

    server.listen("3333");
  } catch (err) {
    console.log("Error", err);
  }
})();
