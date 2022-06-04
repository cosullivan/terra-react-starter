import classNames from "classnames";
import { UIElementProps } from "components/UIElementProps";
import { Theme, useTheme } from "themes";
import styles from "./ThemeToggle.module.sass";

export const ThemeToggle = (props: UIElementProps) => {
  const { className } = props;

  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.Light ? Theme.Dark : Theme.Light));
  };

  return (
    <button
      className={classNames(styles.button, className)}
      onClick={toggleTheme}
    >
      {theme === Theme.Light ? "Dark" : "Light"}
    </button>
  );
};
