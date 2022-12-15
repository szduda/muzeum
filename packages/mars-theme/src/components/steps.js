import { css } from "frontity";

export const Steps = ({ children }) => (
  <ol
    css={css`
      list-style: none;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      font-size: 16px;
      line-height: 1.5;

      @media (min-width: 768px) {
        flex-direction: row;
        margin: 0 -0.5rem;
      }
    `}
  >
    {children?.map((element, index) => (
      <div
        key={index}
        css={css`
          position: relative;
          margin: 0 2rem 2rem;
          padding: 0;

          @media (min-width: 768px) {
            margin: 0;
            padding: 1rem 1rem 2rem;
            flex: 1 0 200px;
            border-bottom: 1px solid #4444;

            ::after {
              content: "";
              background: #444;
              border-radius: 50%;
              width: 16px;
              height: 16px;
              bottom: -8px;
              left: 16px;
              position: absolute;
            }
          }
        `}
      >
        <div
          css={css`
            font-size: 2rem;
            font-weight: 200;
            color: #4448;
            margin: 0 0 1rem;

            @media (max-width: 767px) {
              text-align: center;
            }
          `}
        >
          {index + 1}
        </div>
        {element}
      </div>
    ))}
  </ol>
);

export default Steps;
