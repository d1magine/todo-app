import { useTheme } from '../../contexts/ThemeContext';
import { Theme } from '../../types/theme';

import moonIcon from '../../assets/images/icon-moon.svg';
import sunIcon from '../../assets/images/icon-sun.svg';
import styles from './Header.module.scss';

export default function Header() {
  const { theme, setTheme } = useTheme();

  const handleThemeChanged = () => {
    if (theme === Theme.Dark) {
      setTheme(Theme.Light);
    } else {
      setTheme(Theme.Dark);
    }
  };

  return (
    <div className={styles.header}>
      <h1>todo</h1>
      <button onClick={handleThemeChanged}>
        <img src={theme === Theme.Dark ? sunIcon : moonIcon} />
      </button>
    </div>
  );
}
