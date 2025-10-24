const Header = () => {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        {/* Butiko logosu için bir <img> etiketi ekleyebilirsiniz */}
        <h1 className="text-2xl font-bold text-gray-800 tracking-widest uppercase">
          <a href="/" className="hover:text-red-700 transition-colors duration-300">
            Butiko Blog
          </a>
        </h1>
      </div>
    </header>
  );
};

export default Header;