export const TableOfContents = ({ children }) => {
  const table = children[0];
  const contents = children[1];
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <div
        css={css`
          position: sticky;
          display: flex;
          flex: 30% 0 0;
        `}
      >
        {table}
      </div>
      <div
        css={css`
          display: flex;
          flex: 70% 1 0;
        `}
      >
        {contents}
      </div>
    </div>
  );
};

export default TableOfContents;
