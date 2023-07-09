import { css } from "frontity";
import { useState } from "react";
import { useOpeningHours } from "./pages/home";
import { H3, h4style } from "./headings";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const today = new Date();

export const OpeningHours = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    monthNames[today.getMonth()]
  );

  const data = useOpeningHours();
  if (!data) return null;

  const { entry } = data?.[selectedMonth] ?? {};
  if (!entry) return null;

  const months = Object.keys(data);
  const monthSelector = (
    <form>
      <select
        css={css`
          padding: 0.5rem 0.75rem;
          margin: 0 0 3rem;
          font-weight: bold;
          font-size: 1.25rem;
          border: none;
          background: #f0f0e0;
          border-right: 0.75rem solid #f0f0f0;
          cursor: pointer;
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
        <div>
          <H3>Opening hours</H3>
          {monthSelector}
        </div>
        <div>
          <strong>You can enter between</strong>
          <div
            css={css`
              ${h4style}
            `}
          >
            <span>{entry.from}</span>
            <span> - </span>
            <span>{entry.to}</span>
          </div>

          <strong>With a free pass only after</strong>
          <div
            css={css`
              ${h4style}
            `}
          >
            {entry.freeFrom}
          </div>

          <strong>Leave the Museum before</strong>
          <div
            css={css`
              ${h4style}
            `}
          >
            {entry.leaveBefore}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningHours;
