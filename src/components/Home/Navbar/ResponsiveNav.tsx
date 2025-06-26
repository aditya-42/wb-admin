import React from "react";
import MobileNav from "./MobileNav";
import Nav from "./Nav";

function ResponsiveNav() {
  return (
    <div>
      <Nav />
      <MobileNav />
    </div>
  );
}

export default ResponsiveNav;
