import { App } from "./App";
import { createRoot } from "react-dom/client";
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
// Render your React component instead

const client = new ApolloClient({
  uri: "https://petgram-server-nilia.vercel.app/graphql",
  cache: new InMemoryCache(),
});
const root = createRoot(document.getElementById("app"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
