import { Button, Card, QRCode } from "antd";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RealmContext } from "../context/realmProvider";
import ShortUniqueId from "short-unique-id";
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
import { Link } from "react-router-dom";
const uid = new ShortUniqueId({
  dictionary: "alphanum_lower",
  length: 5,
});
function Cards() {
  const { mongo, user } = useContext(RealmContext);
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  // useEffect(() => {
  //   dispatch(fetchCards({ mongo, user })); // dispatch thunk action creator
  // }, [user]);
  const handleInsert = () => {
    //dispatch(thunk_action_creator (thunk_action ()))
    dispatch(
      insertCard({
        mongo,
        user,
        entity: {
          name: "Name_" + Math.random(),
          company: "Company",
          avatar: "https://thutdon.anh",
          short: uid(),
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
      {/* <Button onClick={handleSearch}>Search</Button> */}
      <Button type="primary" size="large" className="mb-[10px]">
        <Link to="/add-profile">Tạo Card Mới</Link>
      </Button>
      {/* <Button onClick={handleDeleteMany}>Xoá Toàn Bộ Card</Button> */}
      {/* <Button onClick={handleUpdateMany}>Update Many</Button> */}
      <Card title="Danh sách" bodyStyle={{ padding: "20px" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[50px] gap-y-[30px]">
          {cards.map((card) => (
            <div key={card._id}>
              <div className="bg-black rounded-xl h-[250px] md:h-[280px] pt-[25px] pr-[25px] pb-[30px] pl-[40px] md:pl-[70px] shadow-lg">
                <QRCode
                  size={100}
                  className="ml-auto"
                  value={`https://ecard.ezapp.vn/profile/${card.short}`}
                ></QRCode>
                <h5 className="text-white font-bold text-[18px] md:text-[24px] uppercase mt-[40px] mb-[0]">
                  {card.name}
                </h5>
                <p className="font-medium text-white uppercase tracking-[2px]">
                  {card.position}
                </p>
              </div>
              <div className="mt-[15px] flex gap-x-[10px] items-center">
                <Button type="primary">
                  <Link to={`/profile/${card.short}`}>Xem ECard</Link>
                </Button>
                <Button type="primary">
                  <Link to={`/update-profile/${card._id.toString()}`}>
                    Cập Nhật
                  </Link>
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    handleDelete(card._id);
                  }}
                >
                  Xoá
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      {/* <pre> {JSON.stringify(cards, null, 2)}</pre> */}
    </div>
  );
}

export default Cards;
