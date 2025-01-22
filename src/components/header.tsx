import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#CCB577',
        color: '#6F3C00',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Left: Feng Shui title */}
      <Link href="/" style={{ textDecoration: 'none', color: '#6F3C00' }}>
        <h1
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: '28px',
            margin: 0,
            cursor: 'pointer',
          }}
        >
          Feng Shui
        </h1>
      </Link>

      {/* Right: Navigation Links */}
      <nav>
        <ul
          style={{
            display: 'flex',
            gap: '15px',
            listStyleType: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link href="/layout" style={linkStyle}>
              Create Room Layout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#6F3C00',
  fontSize: '18px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
};

export default Header;
