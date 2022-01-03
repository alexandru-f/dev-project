import { SetStateAction, Dispatch, useMemo } from "react";

interface ISubscriptionCard {
  id: number;
  name: string;
  path: string;
  setSelected: (query: string) => void
  setHovered: Dispatch<SetStateAction<string | undefined>>
}

const SubscriptionCard: React.FC<ISubscriptionCard> = ({id, name, path, setSelected, setHovered}): JSX.Element => {
  return(
    <div 
      tabIndex={1} 
      className="subscription-item" 
      onClick={() => setSelected(name)}
      onMouseEnter={() => setHovered(name)}
      onMouseLeave={() => setHovered(undefined)}
    >
      <div className="subscription-item-inner">
        {name}
      </div>
    </div>
  );
};

export default SubscriptionCard;