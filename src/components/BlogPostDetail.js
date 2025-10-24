import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import posts from '../data/posts';
import { FaFacebookF, FaTwitter, FaPinterest, FaWhatsapp } from 'react-icons/fa';

// Yorumlar için başlangıç verisi oluşturun
// Gerçek bir uygulamada bu veriler bir API'den gelecektir.
const initialComments = [
  { id: 1, author: 'Ayşe Yılmaz', text: 'Çok güzel bir yazı olmuş, Butiko’dan alışveriş yapmayı seviyorum!', date: '2025-09-10' },
  { id: 2, author: 'Mehmet Kara', text: 'Sonbahar kombinleri için harika fikirler, teşekkürler!', date: '2025-09-12' },
];

const BlogPostDetail = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  const postUrl = window.location.href;

  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !newCommentAuthor.trim()) {
      alert('Lütfen isminizi ve yorumunuzu girin.');
      return;
    }

    const commentObject = {
      id: comments.length + 1,
      author: newCommentAuthor,
      text: newComment,
      date: new Date().toISOString().split('T')[0],
    };

    setComments([...comments, commentObject]);
    setNewComment('');
    setNewCommentAuthor('');
  };

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 text-center">
        <h1 className="text-5xl font-bold text-red-700 mb-4">404 - Sayfa Bulunamadı</h1>
        <p className="text-gray-600 text-lg mb-6">Aradığınız blog yazısı mevcut değil.</p>
        <Link to="/" className="px-6 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors duration-300">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 py-16 px-4 min-h-[calc(100vh-100px)]">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="text-sm text-gray-500 mb-8">
            Yayınlanma Tarihi: {new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="prose max-w-none text-gray-800 text-lg leading-relaxed">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-6">{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-center sm:justify-start gap-4">
            <span className="text-gray-700 font-medium text-sm">Paylaş:</span>
            {/* Sosyal medya butonları... */}
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(postUrl)}&media=${encodeURIComponent(post.image)}&description=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors">
              <FaPinterest size={20} />
            </a>
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + postUrl)}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500 transition-colors">
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>

        {/* Yorum Bölümü */}
        <div className="bg-gray-100 p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Yorumlar ({comments.length})</h3>

          {/* Yorumları Listeleme */}
          <div className="space-y-6 mb-8">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                    {comment.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-semibold text-gray-800">{comment.author}</div>
                    <div className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString('tr-TR')}</div>
                  </div>
                </div>
                <p className="text-gray-700 mt-2 leading-relaxed">{comment.text}</p>
              </div>
            ))}
          </div>

          {/* Yorum Ekleme Formu */}
          <div className="mt-8 pt-6 border-t border-gray-300">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Bir Yorum Bırakın</h4>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">İsminiz</label>
                <input
                  id="author"
                  type="text"
                  value={newCommentAuthor}
                  onChange={(e) => setNewCommentAuthor(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Yorumunuz</label>
                <textarea
                  id="comment"
                  rows="4"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-red-700 text-white rounded-md font-bold hover:bg-red-800 transition-colors"
              >
                Yorumu Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPostDetail;