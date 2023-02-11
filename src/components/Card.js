import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Radio } from "antd";
import { Spin } from "antd";
import { Image } from "antd";
import { Card } from "antd";
import { Skeleton } from "antd";

export default function CardDisplay() {
  const [card, setCard] = useState(null);
  const [language, setLanguage] = useState("pt");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNewCard(language);
  }, [language]);

  const getNewCard = (language) => {
    setLoading(true);
    axios
      .get(`https://api.scryfall.com/cards/random?q=lang=${language}`)
      .then((response) => {
        setCard(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCardById = (id) => {
    setLoading(true);
    axios
      .get(`https://api.scryfall.com/cards/${id}`)
      .then((response) => {
        setCard(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlerChange = (e, id) => {
    setLanguage(e.target.value);
    getCardById(id);
  };

  return (
    <div>
      {card ? (
        <Card
          title={card.printed_name ? card.printed_name : card.name}
          style={{
            width: 400,
            height: 600
          }}
        >
          {loading ? (
            <Skeleton active />
          ) : (
            <Image
              width={345}
              src={card.image_uris.border_crop}
              alt={card.name}
            />
          )}
        </Card>
      ) : (
        <Spin></Spin>
      )}

      <Button type="primary" onClick={() => getNewCard(language)}>
        Random Card
      </Button>

      <Radio.Group
        value={language}
        onChange={(e) => handlerChange(e, card.id)}
        buttonStyle="solid"
        size="small"
      >
        <Radio.Button value="en">en</Radio.Button>
        <Radio.Button value="pt">pt </Radio.Button>
        <Radio.Button value="fr">fr</Radio.Button>
        <Radio.Button value="de">de</Radio.Button>
        <Radio.Button value="it">it</Radio.Button>
        <Radio.Button value="es">es</Radio.Button>
        <Radio.Button value="ja">ja</Radio.Button>
        <Radio.Button value="ko">ko</Radio.Button>
        <Radio.Button value="ru">ru</Radio.Button>
        <Radio.Button value="zh">zh</Radio.Button>
      </Radio.Group>
    </div>
  );
}
