export interface NavBarItemProps {
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  isActive: boolean;
  onGo?: () => void;
}
export const NavBarItem = ({
  icon,
  activeIcon,
  isActive,
  onGo,
}: NavBarItemProps) => {
  return (
    <div className={`nav-item ${isActive ? "active-2" : ""}`} onClick={onGo}>
      <div className="nav-icon">{isActive ? activeIcon : icon}</div>
    </div>
  );
};
