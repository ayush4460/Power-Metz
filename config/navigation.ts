export const navigationConfig = {
  mainNav: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { 
      title: "Solutions", 
      href: "/products",
      items: [
        { title: "BESS", href: "/products/bess", description: "Utility-scale BESS" },
        { title: "ESS", href: "/products/ess", description: "Commercial Energy Storage" },
        { title: "UPS / DATA CENTER BATTERY", href: "/products/ups-data-center", description: "Critical Power Systems" },
        { title: "OEMS CUSTOMISED", href: "/products/oems-customised", description: "Tailored Energy Solutions" },
        { title: "EV / TRACTION BATTERY SOLUTION", href: "/products/ev-traction", description: "Lithium packs for mobility" },
      ]
    },
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog" },
    { 
      title: "Join Us", 
      href: "/join-us",
      items: [
        { title: "Vendor", href: "/join-us#vendor", description: "Partner with us" },
        { title: "Customer", href: "/join-us#customer", description: "Become a customer" },
        { title: "Career", href: "/join-us#career", description: "Join our team" },
      ]
    },
  ],
  footerNav: [
    { title: "Join Us", href: "/join-us" },
    { title: "Reach Us", href: "/reach-us" },
  ],
};
