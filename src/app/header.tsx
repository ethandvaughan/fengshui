import Link from 'next/link';
import styles from './styles.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
        <Link href="/">
          <h1 className='text-xl font-medium'>
            Feng Shui
          </h1>
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/layout">
                Create Room Layout
              </Link>
            </li>
          </ul>
        </nav>
    </header>
  );
};

export default Header;
