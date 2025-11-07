import React from "react";
import FilterCountTransfers from "./FilterCountTransfers";
import FilterCompany from "./FilterCompany";
import style from "./main.module.scss";
import Ticket from "./Ticket";
import FilterMobile from "./FilterMobile";
import { useState, useEffect, useCallback } from "react";
import { fetchFlights } from "../../store/flightsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  sortTicketsCheap,
  sortTicketsFast,
  sortTicketsOptimal,
} from "../../store/flightsSlice";

const Main: React.FC = () => {
  const [isCheapActive, setIsCheapActive] = useState(false);
  const [isFastActive, setIsFastActive] = useState(false);
  const [isOptimalActive, setIsOptimalActive] = useState(false);
  const [displayedTickets, setDisplayedTickets] = useState<number>(3);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    if (displayedTickets < 15) {
      setDisplayedTickets(displayedTickets + 3);
    }
  }, [displayedTickets]);

	const flights = useAppSelector((state) => state.flights.filtered);
	const isLoading = useAppSelector((state) => state.flights.loading);

  const onFilterCheap = () => {
    if (!isCheapActive) {
      setIsCheapActive(true);
      setIsFastActive(false);
      setIsOptimalActive(false);
      dispatch(sortTicketsCheap());
    }
  };

  const onFilterFast = () => {
    if (!isFastActive) {
      setIsFastActive(true);
      setIsCheapActive(false);
      setIsOptimalActive(false);
      dispatch(sortTicketsFast());
    }
  };

  const onFilterOptimal = () => {
    if (!isOptimalActive) {
      setIsOptimalActive(true);
      setIsCheapActive(false);
      setIsFastActive(false);
      dispatch(sortTicketsOptimal());
    }
  };

  return (
    <div className={style.content}>
      <div className={style.content__filter}>
        <FilterCountTransfers />
        <FilterCompany />
      </div>
      <div className={style.content__info}>
        <div className={style.content__buttons}>
          <button
            className={style.content__button}
            onClick={onFilterCheap}
            style={{
              backgroundColor: isCheapActive ? "#4E148C" : "#E8EBF2",
              color: isCheapActive ? "#F7F9F7" : "#4E148C",
            }}
          >
            Самый дешевый
          </button>
          <button
            className={style.content__button}
            onClick={onFilterFast}
            style={{
              backgroundColor: isFastActive ? "#4E148C" : "#E8EBF2",
              color: isFastActive ? "#F7F9F7" : "#4E148C",
            }}
          >
            Самый быстрый
          </button>
          <button
            className={style.content__button}
            onClick={onFilterOptimal}
            style={{
              backgroundColor: isOptimalActive ? "#4E148C" : "#E8EBF2",
              color: isOptimalActive ? "#F7F9F7" : "#4E148C",
            }}
          >
            Самый оптимальный
          </button>
        </div>
			  <FilterMobile />
			  {isLoading ? <h2 style={{ fontSize: "2.4rem", fontWeight: "700"}}>Идет загрузка данных</h2> : ""}
        <div className={style.content__tickets}>
          {flights.slice(0, displayedTickets).map((flight) => (
            <Ticket key={flight.id} {...flight} />
          ))}
        </div>
        <button
          className={style.button}
          style={{ display: displayedTickets < flights.length ? "block" : "none" }}
          onClick={handleLoadMore}
        >
          Загрузить еще билеты
        </button>
      </div>
    </div>
  );
};

export default Main;
