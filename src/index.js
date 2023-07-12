import { App } from "./App";
import { createRoot } from "react-dom/client";
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
// Render your React component instead

const client = new ApolloClient({
  uri: "https://apollo-petgram-server-production.up.railway.app/",
  cache: new InMemoryCache(),
});
const root = createRoot(document.getElementById("app"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
