import { connect, styled } from "frontity"
import Link from "./link"
import { Icon, Slide } from "../components/theme"

const Settings = ({ state, actions }) => {
  const { settings, isSettingsOpen } = state.theme

  return (
    <SettingsWrapper open={isSettingsOpen}>
      {isSettingsOpen && <Overlay onClick={actions.theme.toggleSettings} />}
      <Slide down open={isSettingsOpen} >
        <SettingsDropdown sticky={state.theme.isHeaderSticky}>
          <Title>Settings</Title>
          {settings.map(([name, link, icon]) => {
            const ItemIcon = icon ? Icon[icon] : Icon.Help
            return (
              <SettingsLink key={name} link={link}>
                <ItemIcon />
                <span>{name}</span>
              </SettingsLink>
            )
          })}
        </SettingsDropdown>
        {isSettingsOpen && <ArrowDecor />}
      </Slide>
      <SettingsToggle open={isSettingsOpen} onClick={actions.theme.toggleSettings}>
        <Icon.Gear />
      </SettingsToggle>
    </SettingsWrapper>
  )
}

export default connect(Settings)

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden auto;
  position: fixed;
  top: 0;
  left: 0;
`;

const Title = styled.span`
  padding: 0.5rem 1rem;
  color: #888;
  font-variant: all-small-caps;
  font-weight: 600;
  letter-spacing: 1px;
`

const SettingsWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const SettingsToggle = styled.button`
  background: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 4px;
  margin: 0 2px;
  border-color: transparent !important;
  z-index: 1;
  width: 36px;

  svg {
    height: 24px;
    fill: ${props => props.open ? '#f9c959' : '#444'};
  }

  :hover svg {
    fill: #f9c959;
  }
`

const SettingsDropdown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100%;
  right: -1rem;
  padding: 0.5rem 0;
  background: #fffff0;
  border: 1px solid #888;
  border-radius: 8px;
  color: #444;
  width: 220px;
  margin-top: 1rem;
`

const ArrowDecor = styled.div`
  position: absolute;
  top: 100%;
  right: 14px;
  margin-top: 10px;
  border: 1px solid #888;
  background: #fffff0;
  transform: rotate(45deg);
  width: 12px;
  height: 12px;

  :after {
    content: ' ';
    position: absolute;
    background: #fffff0;
    width: 12px;
    height: 12px;
  }
`

const SettingsLink = styled(Link)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-variant: all-small-caps;
  font-weight: 600;

  span {
    font-size: 1rem;
  }

  > *:first-of-type {
    margin-right: 0.5rem;
  }

  svg {
    height: 24px;
    fill: #444;
  }

  :hover {
    background: #f9c959;
    text-decoration: none;
  }
`