import { SideBarButtonIdle, SideBarButtonActive} from '../styles/buttons';
import { SidebarIconStyle } from '../styles/icons';

const SidebarButton = ({ text, icon, isActive }) => {
  const Button = isActive ? SideBarButtonActive : SideBarButtonIdle;

  return (
    <Button>
      <SidebarIconStyle src={icon} />
      {text}
    </Button>
  );
};

export default SidebarButton;