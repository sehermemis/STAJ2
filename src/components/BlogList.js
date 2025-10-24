import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import posts from '../data/posts';

// Blog yazılarını benzersiz kategorilere göre filtrelemek için
const uniqueCategories = [...new Set(posts.map(post => post.category))];
const POSTS_PER_PAGE = 6; // Her sayfada gösterilecek yazı sayısı

const BlogList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Arama yapıldığında sayfayı sıfırla
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm(''); // Kategori seçilince arama terimini sıfırla
    setCurrentPage(1); // Kategori değiştiğinde sayfayı sıfırla
  };

  // Filtrelenmiş yazıları hesapla
  const filteredPosts = posts.filter(post => {
    const categoryMatch = selectedCategory === 'Tümü' || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Sayfalama için toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // Mevcut sayfada gösterilecek yazıları al
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <main className="container mx-auto px-4 py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-8 tracking-tight">
        Butiko Blog
      </h2>

      {/* Arama ve Kategori Bölümü */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
        {/* Arama Çubuğu */}
        <input
          type="text"
          placeholder="Blog yazılarında ara..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Kategori Butonları */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          <button
            onClick={() => handleCategoryClick('Tümü')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${selectedCategory === 'Tümü' ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Tümü
          </button>
          {uniqueCategories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${selectedCategory === category ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {category.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.03]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <span className="inline-block text-gray-500 text-xs font-semibold mb-2 uppercase">
                  {post.category.replace(/-/g, ' ')}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{post.content.substring(0, 100)}...</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-red-700 font-medium hover:underline transition-colors duration-300"
                >
                  Devamını Oku &rarr;
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">Aradığınız kriterlere uygun yazı bulunamadı.</p>
        )}
      </div>

      {/* Sayfalama Butonları */}
      {totalPages > 1 && (
        <nav className="flex justify-center mt-12" aria-label="Pagination">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Önceki
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === index + 1 ? 'text-white bg-red-700 hover:bg-red-800' : 'text-gray-500 bg-white'}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sonraki
              </button>
            </li>
          </ul>
        </nav>
      )}
    </main>
  );
};

export default BlogList;