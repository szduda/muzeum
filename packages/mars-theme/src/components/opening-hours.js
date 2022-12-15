import { css } from "frontity";
import { useState } from "react";
import { useOpeningHours } from "./pages/home";
import { H3, H4 } from "./headings";

export const OpeningHours = () => {
  const [selectedMonth, setSelectedMonth] = useState("December");
  const data = useOpeningHours();

  if (!data) return null;

  const months = Object.keys(data);

  const { entry } = data?.[selectedMonth] ?? {};

  if (!entry) return null;

  const monthSelector = (
    <form
      css={css`
        margin: 0 0.5rem;
      `}
    >
      <select
        css={css`
          padding: 0.25rem;
          font-weight: bold;
          font-size: 1rem;
          border: none;
          background: #f0f0e0;
        `}
        value={selectedMonth}
        onChange={(event) => setSelectedMonth(event.target.value)}
      >
        {months.map((month) => (
          <option key={month}>{month}</option>
        ))}
      </select>
    </form>
  );

  return (
    <div
      css={css`
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        @media (min-width: 768px) {
          padding: 0 2rem;
        }
      `}
    >
      <H3
        css={css`
          text-align: center;
        `}
      >
        Opening hours
      </H3>

      <div
        css={css`
          width: 100%;
          padding: 2rem 0 0;
          @media (min-width: 768px) {
            display: grid;
            gap: 48px;
            grid-template-columns: 1fr 1fr;
          }
        `}
      >
        {entry && (
          <>
            <div
              css={css`
                @media (max-width: 767px) {
                  padding: 1rem 0 0;
                }
              `}
            >
              <div
                css={css`
                  display: flex;
                  font-weight: bold;
                  align-items: center;
                `}
              >
                in
                {monthSelector}
                enter between
              </div>
              <H4>
                <span>{entry.from}</span>
                <span> - </span>
                <span>{entry.to}</span>
              </H4>
            </div>
            <div>
              <strong>Leave the Museum before:</strong>
              <H4>{entry.leaveBefore}</H4>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OpeningHours;
