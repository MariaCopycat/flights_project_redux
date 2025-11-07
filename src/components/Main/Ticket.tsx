import style from "./main.module.scss";
import pobeda from "../../assets/pobeda.png";
import s7 from "../../assets/s7.png";
import redwings from "../../assets/redwings.png";

type Time = {
  startTime: string;
  endTime: string;
};

interface TicketProps {
  price: number;
  fromto: string;
	time: Time;
  company: string;
  duration: number;
  connectionAmount: number;
}

const Ticket: React.FC<TicketProps> = ({ price, fromto, time, company, duration, connectionAmount }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };
  return (
    <div className={style.ticket}>
      <div className={style.ticket__item}>
        <div className={style.ticket__price}>{`${formatPrice(price)} Р`}</div>
        <div className={style.ticket__info}>
          <div className={style.ticket__text}>{fromto}</div>
          <div
            className={style.ticket__time}
          >{`${time.startTime} - ${time.endTime}`}</div>
        </div>
      </div>
      <div className={style.ticket__item}>
        <div className={style.ticket__price}></div>
        <div className={style.ticket__info}>
          <div className={style.ticket__text}>В пути</div>
          <div className={style.ticket__time}>{`${Math.floor(
            duration / 60
          )} ч ${duration % 60} мин`}</div>
        </div>
      </div>
      <div className={style.ticket__item}>
        <div className={style.ticket__company}>
          <img src={company === "Победа" ? pobeda : company === "S7 Airlines" ? s7 : company === "Red Wings" ? redwings : ""} alt="победа" />
        </div>
        <div className={style.ticket__info}>
          <div className={style.ticket__text}>Пересадки</div>
          <div className={style.ticket__time}>
            {connectionAmount === 0
              ? "без пересадок"
              : connectionAmount === 1
              ? "1 пересадка"
              : `${connectionAmount} пресадки`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
