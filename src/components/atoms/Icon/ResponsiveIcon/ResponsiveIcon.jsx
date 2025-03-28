const ResponsiveIcon = ({ icon, iconSm, alt }) => {
  return (
    <button className="p-2 navbar-button-container">
      <img src={iconSm} alt={alt} className="md:hidden " />
      <img src={icon} alt={alt} className="hidden md:block" />
    </button>
  );
};

export default ResponsiveIcon;
