import { SideBarButtonIdle, SideBarButtonActive} from '../styles/buttons';
import { IconStyle } from '../styles/icons';

const SidebarButton = ({ text, icon, isActive }) => {
  const Button = isActive ? SideBarButtonActive : SideBarButtonIdle;

  return (
    <Button>
      <IconStyle src={icon} />
      {text}
    </Button>
  );
};

export default SidebarButton;