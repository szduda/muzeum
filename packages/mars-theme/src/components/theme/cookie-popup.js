import { css } from "frontity";
import { useState, useEffect } from "react";
import { CTA } from "./cta";

function setCookie(name, value, days = 365) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  if (!document) return null;

  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export const CookiePopup = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hide = getCookie("hideCookiePopup") === "true";
    if (hide === show) setShow(!hide);
  }, []);

  if (!show) return null;

  return (
    <div
      role="dialog"
      css={css`
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100vw;
        background: #fff;
        padding: 1rem max(1rem, 50% - 480px + 2rem);
        z-index: 1000000;
        border-top: 1px solid #4444;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;

        @media (min-width: 768px) {
          justify-content: space-between;
        }
      `}
    >
      <span
        css={css`
          display: flex;
          margin: 0 1rem 0.5rem 0;

          @media (min-width: 768px) {
            text-align: left;
            margin: 0 1rem 0 0;
          }
        `}
      >
        This site uses cookies to give you a better browsing experience.
      </span>
      <CTA
        onClick={() => {
          setCookie("hideCookiePopup", true);
          setShow(false);
        }}
      >
        Hide message
      </CTA>
    </div>
  );
};
