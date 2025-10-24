const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-4 text-center text-sm">
        <p className="tracking-wide">
          &copy; {new Date().getFullYear()} Butiko. Tüm hakları saklıdır.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Geliştirme: Butiko Stajyer
        </p>
      </div>
    </footer>
  );
};

export default Footer;