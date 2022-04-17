import React from "react";
import Header from "./header";

function Layout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <main className="container mx-auto mt-16">
        {children}
      </main>
    </React.Fragment>
  );
};

export default Layout;