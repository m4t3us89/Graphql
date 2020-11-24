# Query

query {
  items {
    description
    price
  }
}


# Mutation

mutation {
  saveItem(item: {category: "Bebida", description:"Vodka", price:10}) {
    id
  }
}
