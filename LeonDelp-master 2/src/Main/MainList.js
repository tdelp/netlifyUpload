const MainList = ({ purchased }) => {
  return (
    <div>
      <ul>
        {purchased.map((item) => (
          <li key={item.id}>
            Animal Name - {item.name} : Sponser Amount - ${item.cost} : Sponser Name - {item.buyer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainList;
