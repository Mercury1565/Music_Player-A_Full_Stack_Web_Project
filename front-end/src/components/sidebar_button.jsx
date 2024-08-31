import { SideBarButtonIdle, SideBarButtonActive} from '../styles/buttons';
import { SidebarIconStyle } from '../styles/icons';

const SidebarButton = ({ text, icon, isActive, onClick }) => {
  const Button = isActive ? SideBarButtonActive : SideBarButtonIdle;

  return (
    <Button onClick={onClick}>
      <SidebarIconStyle src={icon} />
      {text}
    </Button>
  );
};

export default SidebarButton;