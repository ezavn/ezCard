import React, { useState } from "react";
import { useEffect } from "react";
import "./CardProfile.css";

export default function CardProfile({ card }) {
  const [download, setDownload] = useState();
  const [showLink1, setShowLink1] = useState(false);
  const [showLink2, setShowLink2] = useState(false);
  const [showLink3, setShowLink3] = useState(false);
  const [showLink4, setShowLink4] = useState(false);
  console.log({ card });

  const activeLink1 = () => {
    setShowLink1(true);
    setShowLink2(false);
    setShowLink3(false);
    setShowLink4(false);
  };
  const activeLink2 = () => {
    setShowLink1(false);
    setShowLink2(true);
    setShowLink3(false);
    setShowLink4(false);
  };
  const activeLink3 = () => {
    setShowLink1(false);
    setShowLink2(false);
    setShowLink3(true);
    setShowLink4(false);
  };
  const activeLink4 = () => {
    setShowLink1(false);
    setShowLink2(false);
    setShowLink3(false);
    setShowLink4(true);
  };

  function handleVcardDownload() {
    const test = URL.createObjectURL(
      new Blob(
        [
          `BEGIN:VCARD
VERSION:3.0
REV:2023-01-10T03:24:00Z
N;CHARSET=utf-8:${card?.name.toUpperCase()};;;;
FN;CHARSET=utf-8:${card?.name.toUpperCase()}
ORG;CHARSET=utf-8:${card?.company}
TITLE;CHARSET=utf-8:${card?.position}
ROLE;CHARSET=utf-8:${card?.position}
EMAIL;INTERNET:${card?.gmail}
TEL;PREF;WORK:${card?.phone}
TEL;WORK:
ADR;WORK;POSTAL;CHARSET=utf-8:${card?.address};;;;;;
URL;TYPE=Profile:${card?.brochure}
URL;TYPE=Website:${card?.website}
URL;TYPE=Website:
URL;TYPE=Facebook:${card?.facebook}

URL;TYPE=Zalo:https://zalo.me/${card?.zalo}
URL;TYPE=Viber:viber://chat?number=+84${card?.viber}
URL;TYPE=Whatsapp:https://wa.me/${card?.whatsapp}
URL;TYPE=Line:https://line.me/R/ti/p/${card?.line}
URL;TYPE=WeChat:weixin://dl/chat?${card?.wechat}
END:VCARD
      `,
        ],
        { type: "text/x-vcard" }
      )
    );
    console.log(test);
    return test;
  }
  useEffect(() => {
    if (card) setDownload(handleVcardDownload());
  }, [card]);

  return (
    <div className="relative ecard-container">
      <div className="ecard">
        <div className="ecard-header">
          <div className="ecard-cover"></div>
          <div className="ecard-avatar">
            <img
              src={`${card?.avatar ? card?.avatar : "/images/user-avatar.png"}`}
              alt="avatar"
            />
          </div>
          <h1 className="ecard-fullname">{card.name}</h1>
          <h2 className="ecard-company">{card.company}</h2>
          <h2 className="ecard-jobtitle">{card.position}</h2>
        </div>
        <div className="ecard-content">
          {card?.desctitle && (
            <div className="card-subtitle">{card?.desctitle}</div>
          )}
          {card?.content && (
            <div className="content">
              <div
                className="card-desc"
                dangerouslySetInnerHTML={{ __html: card?.content }}
              ></div>
            </div>
          )}
        </div>
        <div className="ecard-dashboard">
          <div className="ecard-section is-active" id="about">
            <div className="ecard-social">
              {card?.facebook && (
                <a href={card?.facebook} target="_blank">
                  <img src="/icons/facebook.png" alt="" />
                </a>
              )}
              {card?.zalo && (
                <a href={`http://zalo.me/${card?.zalo}`} target="_blank">
                  <img src="/icons/zalo.png" alt="" />
                </a>
              )}
              {card?.viber && (
                <a href={`viber://add?number=84${card?.viber}`} target="_blank">
                  <img src="/icons/viber.png" alt="" />
                </a>
              )}
              {card?.gmail && (
                <a href={`mailto:${card?.gmail}`} target="_blank">
                  <img src="/icons/mail.png" alt="" />
                </a>
              )}
              {card?.whatsapp && (
                <a
                  href={`https://api.whatsapp.com/send?phone=${card?.whatsapp}`}
                  target="_blank"
                >
                  <img src="/icons/whatsapp.png" alt="" />
                </a>
              )}
              {card?.line && (
                <a
                  href={`https://line.me/R/ti/p/${card?.line}`}
                  target="_blank"
                >
                  <img src="/icons/line.png" alt="" />
                </a>
              )}
              {card?.wechat && (
                <a href={`weixin://dl/chat?${card?.wechat}`} target="_blank">
                  <img src="/icons/wechat.png" alt="" />
                </a>
              )}
            </div>
          </div>
          <div className="ecard-buttons">
            <a
              onClick={() => activeLink1(true)}
              className={`${showLink1 ? "is-active" : ""}`}
              href={card?.website}
              target="_blank"
              data-section="#experience"
            >
              WEBSITE
            </a>
            {card?.profile && (
              <a
                onClick={() => activeLink2(true)}
                className={`${showLink2 ? "is-active" : ""}`}
                href={card?.profile}
                target="_blank"
                data-section="#experience"
              >
                HỒ SƠ NĂNG LỰC
              </a>
            )}
            {card?.profileVN && (
              <a
                onClick={() => activeLink2(true)}
                className={`${showLink3 ? "is-active" : ""}`}
                href={card?.profileVN}
                target="_blank"
                data-section="#experience"
              >
                Profile VN
              </a>
            )}
            {card?.profileEN && (
              <a
                onClick={() => activeLink2(true)}
                className={`${showLink4 ? "is-active" : ""}`}
                href={card?.profileEN}
                target="_blank"
                data-section="#experience"
              >
                Profile EN
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="wrapper">
        <a className="btn-download" href={download} download="card.vcf">
          Lưu danh bạ
        </a>
      </div>
    </div>
  );
}
