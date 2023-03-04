import { Button, Card } from "antd";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RealmContext } from "../context/realmProvider";
import {
  deleteCard,
  deleteCards,
  fetchCards,
  insertCard,
  searchCards,
  selectCards,
  updateCard,
  updateCards,
} from "../redux/cardsSlice";

function Cards() {
  const { mongo, user } = useContext(RealmContext);
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  useEffect(() => {
    dispatch(fetchCards({ mongo, user }));
  }, [user]);
  const handleInsert = () => {
    dispatch(
      insertCard({
        mongo,
        user,
        entity: {
          name: "Name_" + Math.random(),
        },
      })
    );
  };
  const handleDelete = (id) => {
    dispatch(deleteCard({ mongo, id }));
  };
  const handleUpdate = (entity) => {
    dispatch(
      updateCard({
        mongo,
        id: entity._id,
        update: {
          name: "Update_" + Math.random(),
        },
      })
    );
  };
  const handleUpdateMany = () => {
    dispatch(
      updateCards({
        mongo,
        ids: cards.map((card) => card._id),
        update: { name: "Update All" },
      })
    );
  };
  const handleDeleteMany = () => {
    dispatch(deleteCards({ mongo, ids: cards.map((card) => card._id) }));
  };
  const handleSearch = () => {
    dispatch(searchCards("keyworld_" + Math.random()));
  };
  return (
    <div>
      <Button onClick={handleSearch}>Search</Button>
      <Button onClick={handleInsert}>Insert</Button>
      <Button onClick={handleUpdateMany}>Update Many</Button>
      <Button onClick={handleDeleteMany}>Delete Many</Button>
      <Card title="Danh sách" bodyStyle={{ padding: "20px" }}>
        {cards.map((card) => (
          <Card.Grid key={card._id}>
            {card.name}{" "}
            <Button
              onClick={() => {
                handleDelete(card._id);
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                handleUpdate(card);
              }}
            >
              Edit
            </Button>
          </Card.Grid>
        ))}
      </Card>
      {/* <pre> {JSON.stringify(cards, null, 2)}</pre> */}
    </div>
  );
}

export default Cards;
