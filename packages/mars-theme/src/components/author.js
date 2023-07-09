import { css } from "frontity";
import { H4 } from "./headings";
import Image from "@frontity/components/image";

const imageUrl =
  "https://noderesources.visitauschwitz.info/wp-content/uploads/2023/06/Lukasz-the-Auschwitz-guide.jpg";

export const Author = () => (
  <div
    css={css`
      width: 100%;
      margin: 4rem 0 0;
      padding: 2rem 0 0;
      border-top: 2px solid #4442;
    `}
  >
    <H4>Author</H4>
    <div
      css={css`
        width: 100%;

        @media (min-width: 768px) {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 4rem;
        }
      `}
    >
      <div>
        <Image
          alt="Łukasz, a guide educator"
          src={imageUrl}
          css={css`
            width: 100%;
            object-fit: cover;
            background: #4444;

            @media (max-width: 767px) {
              margin: 0 0 2rem;
            }
          `}
        />
      </div>
      <div
        css={css`
          grid-column: 2 / span 2;

          p {
            font-size: 1rem;
          }
        `}
      >
        <p>
          My name is Łukasz, I have been a guide at the Auschwitz Memorial since
          2006. I was taught the history of the camp by my parents. They are
          also guides and we all live near the Museum.
        </p>
        <p> If you find this article valuable, share it.</p>
      </div>
    </div>
  </div>
);

export default Author;
