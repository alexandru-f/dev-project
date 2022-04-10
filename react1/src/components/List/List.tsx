
type Props<T, As extends React.ElementType> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  as?: As;
}

export default function List<Item, As extends React.ElementType>({
  items,
  renderItem,
  as,
  ...rest
}: Props<Item, As> &
  Omit<React.ComponentPropsWithoutRef<As>, keyof Props<Item, As>>) {
  const Component = as ?? "ul";
  return <Component {...rest}>{items.map(renderItem)}</Component>;
}
