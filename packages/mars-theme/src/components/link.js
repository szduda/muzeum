import { connect, useConnect } from "frontity";
import Link from "@frontity/components/link";

/**
 * The MarsLink component, which is a wrapper on top of the {@link Link}
 * component.
 *
 * @param props - It accepts the same props than the {@link Link} component.
 *
 * @example
 * ```js
 * <MarsLink link="/some-post">
 *   <div>Some Post</div>
 * </MarsLink>
 * ```
 *
 * @returns A {@link Link} component, which returns an HTML anchor element.
 */
const MarsLink = ({ children, ...props }) => {
  const { state, actions } = useConnect();
  const isCSR = state.frontity.rendering === 'csr'

  const htmlProps = Object.keys(props)
    .filter(key => !key.startsWith('$'))
    .reduce((obj, key) => {
      obj[key] = props[key]
      return obj
    }, {})

  /**
   * A handler that closes the mobile menu when a link is clicked.
   */
  const onClick = () => {
    if (state.theme.isMobileMenuOpen) {
      actions.theme.closeMobileMenu();
    }

    if (isCSR && props.link !== state.router.previous) {
      document.querySelector('#root').scrollTo(0, 0)
    }
  };

  return (
    <Link {...htmlProps} onClick={onClick}>
      {children}
    </Link>
  );
};

export default connect(MarsLink, { injectProps: false });
