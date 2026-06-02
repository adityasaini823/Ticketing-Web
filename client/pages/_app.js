import "../styles/globals.css"; // Make sure this path points to your CSS file
import {buildClient} from "../api/build-client";
import Header from "../components/header";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Header currentUser={pageProps.currentUser} />
      <Component {...pageProps} />
    </>
  );
}

App.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps: {
      ...pageProps,
      currentUser: data.currentUser,
    },
  };
};
