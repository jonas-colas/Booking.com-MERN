import './List.css';
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';

const List = () => {
  const { state: { destination, date, options } } = useLocation();
  
  const [getDestination, setGetDestination] = useState(destination);
  const [getDate, setGetDate] = useState(date);
  const [openDate, setOpenDate] = useState(false);
  const [getOptions, setGetOptions] = useState(options);


  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle"> Search </h1>
            <div className="lsItem">
              <label htmlFor="destination">Destination</label>
              <input type="text" placeholder={getDestination} />
            </div>
            <div className="lsItem">
              <label htmlFor="check-in">Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {
                  `${format(getDate[0].startDate, 'MM/dd/yyy')} 
                  to 
                  ${format(getDate[0].endDate, 'MM/dd/yyy')}`
                }
              </span>
              {openDate && <DateRange 
                onChange={item => setGetDate([item.selection])}
                minDate={new Date()}
                ranges={getDate}
              />}
            </div>
            <div className="lsItem">
              <label htmlFor="options">Options</label>
              <div className="lsOption">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Adult
                  </span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={getOptions.adult} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Children
                  </span>
                  <input type="number" min={0} className="lsOptionInput" placeholder={getOptions.children} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Room
                  </span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={getOptions.room} />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  )
}

export default List