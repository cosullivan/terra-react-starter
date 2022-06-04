import { UIElementProps } from "components/UIElementProps";
import classNames from "classnames";
import styles from "./Container.module.sass";

type ComponentName =
  | "header"
  | "main"
  | "footer"
  | "section"
  | "div"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export interface ContainerProps extends UIElementProps {
  component?: ComponentName;
  direction?: "row" | "column";
  gap?: number;
}

const Container = (props: ContainerProps) => {
  const {
    className,
    children,
    component = "section",
    direction = "row",
    gap = 0,
  } = props;

  const Component = component;

  const style = { gap };

  return (
    <Component
      className={classNames(styles.root, className, styles[direction])}
      style={style}
    >
      {children}
    </Component>
  );
};

export { Container };
