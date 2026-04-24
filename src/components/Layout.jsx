import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, wide = false }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main
        className="page-enter"
        style={{
          maxWidth: wide ? '100%' : '1080px',
          width: '100%',
          margin: '0 auto',
          padding: wide ? '0' : '48px 24px 0',
          flex: 1,
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
