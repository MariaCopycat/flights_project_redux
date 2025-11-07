import React from "react";
import { useState } from "react";
import style from "./main.module.scss";
import mark from "../../assets/mark.svg";
import { useAppDispatch } from "../../store/hook";
import { filterTickets } from "../../store/flightsSlice";

export let countTransits: number[] = [];

const FilterCountTransfers:React.FC = () => {
  const [filterTransit0, setFilterTransit0] = useState(false);
  const [filterTransit1, setFilterTransit1] = useState(false);
  const [filterTransit2, setFilterTransit2] = useState(false);
	const [filterTransit3, setFilterTransit3] = useState(false);
	
	const dispatch = useAppDispatch();
	
  const checkCountTransit = (count: number) => {
    if (!countTransits.includes(count)) {
      countTransits.push(count);
    } else {
     countTransits = countTransits.filter((countTransitItem) => countTransitItem !== count)
	  }
  };

  const handleFilterTransitClick0 = () => {
    setFilterTransit0(!filterTransit0);
	  checkCountTransit(0);
	    dispatch(filterTickets())
  }

  const handleFilterTransitClick1 = () => {
    setFilterTransit1(!filterTransit1);
	  checkCountTransit(1);
	  dispatch(filterTickets())
  }

  const handleFilterTransitClick2 = () => {
    setFilterTransit2(!filterTransit2);
	  checkCountTransit(2);
	 dispatch(filterTickets());
  }

  const handleFilterTransitClick3 = () => {
    setFilterTransit3(!filterTransit3);
	  checkCountTransit(3);
	 dispatch(filterTickets());
  }

  return (
    <div className={style.filter}>
      <h2 className={style.filter__title}>Количество пересадок</h2>
      <div className={style.filter__items}>
        <div className={style.filter__row}>
          <input
            type="checkbox"
            id="transit0"
            className={style.filter__rowcheckbox}
            checked={filterTransit0}
            onChange={handleFilterTransitClick0}
            style={{
              backgroundImage: filterTransit0 ? `url(${mark})` : "none",
              backgroundColor: filterTransit0 ? "#e8ebf2" : "inherit",
            }}
          />
          <label htmlFor="transit0" className={style.filter__rowtext}>
            Без пересадок
          </label>
        </div>
        <div className={style.filter__row}>
          <input
            type="checkbox"
            id="transit1"
            className={style.filter__rowcheckbox}
            checked={filterTransit1}
            onChange={handleFilterTransitClick1}
            style={{
              backgroundImage: filterTransit1 ? `url(${mark})` : "none",
              backgroundColor: filterTransit1 ? "#e8ebf2" : "inherit",
            }}
          />
          <label htmlFor="transit1" className={style.filter__rowtext}>
            1 пересадка
          </label>
        </div>
        <div className={style.filter__row}>
          <input
            type="checkbox"
            id="transit2"
            className={style.filter__rowcheckbox}
            checked={filterTransit2}
            onChange={handleFilterTransitClick2}
            style={{
              backgroundImage: filterTransit2 ? `url(${mark})` : "none",
              backgroundColor: filterTransit2 ? "#e8ebf2" : "inherit",
            }}
          />
          <label htmlFor="transit2" className={style.filter__rowtext}>
            2 пересадки
          </label>
        </div>
        <div className={style.filter__row}>
          <input
            type="checkbox"
            id="transit3"
            className={style.filter__rowcheckbox}
            checked={filterTransit3}
            onChange={handleFilterTransitClick3}
            style={{
              backgroundImage: filterTransit3 ? `url(${mark})` : "none",
              backgroundColor: filterTransit3 ? "#e8ebf2" : "inherit",
            }}
          />
          <label htmlFor="transit3" className={style.filter__rowtext}>
            3 пересадки
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterCountTransfers;