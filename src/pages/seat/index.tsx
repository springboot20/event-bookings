import { seat_data } from '../../data/data';
import { classNames, LocalStorage } from '../../util';
import { useState, useEffect } from 'react';

export default function Seats() {
  const [seats, setSeats] = useState(seat_data);
  const [selectedSeat, setSelectedSeat] = useState<any[]>([]);

  const handleClick = (id: number) => {
    setSeats(
      seats.map((seat: any) => {
        if (seat.number === id) {
          setSelectedSeat((prevSeats) => [...prevSeats, seat]);
          return { ...seat, isReserved: !seat.isReserved };
        }
        return seat;
      })
    );
  };

  useEffect(() => {
    const _selectedSeats = seats.filter((s) => {
      return s.isReserved;
    });

    setSelectedSeat(_selectedSeats);

    LocalStorage.set('seats', seats);
  }, [seats]);
  console.log(selectedSeat);
  return (
    <div className='grid place-items-center mt-20 gap-1 grid-flow-col'>
      {seats.slice(0, 25).map((s: any, i: number) => {
        return (
          <Seat
            key={s.number}
            s={s}
            index={i}
            columnStart={0}
            rowStart={0}
            maximumColumns={5}
            maximumRows={5}
            handleClick={handleClick}
          />
        );
      })}

      {seats.slice(25, 75).map((s: any, i: number) => {
        return (
          <Seat
            key={s.number}
            s={s}
            index={i}
            columnStart={10}
            rowStart={0}
            maximumColumns={15}
            maximumRows={15}
            handleClick={handleClick}
          />
        );
      })}

      {seats.slice(75, 100).map((s: any, i: number) => {
        return (
          <Seat
            key={s.number}
            s={s}
            index={i}
            columnStart={30}
            rowStart={0}
            maximumColumns={5}
            maximumRows={5}
            handleClick={handleClick}
          />
        );
      })}

      {selectedSeat.map((s, i) => {
        return (
          <Seat
            key={i}
            s={s}
            index={i}
            columnStart={30}
            rowStart={6}
            maximumColumns={5}
            maximumRows={5}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
}

const Seat: React.FC<{
  index: number;
  maximumColumns: number;
  columnStart: number;
  maximumRows: number;
  rowStart: number;
  handleClick: (id: number) => void;
  s: {
    number: number;
    isReserved: boolean;
  };
}> = ({ index, maximumColumns, maximumRows, columnStart, rowStart, s, handleClick }) => {
  return (
    <button
      onClick={() => handleClick(s.number)}
      // disabled={s.isReserved}
      className={classNames(
        'size-7 text-xs sm:size-8 lg:size-10 rounded-full text-white border flex items-center justify-center',
        s.isReserved ? 'bg-blue-400' : 'bg-blue-700 hover:bg-blue-500 transition-colors'
      )}
      style={{
        gridColumn: `${(index % maximumColumns) + 1 + columnStart}`,
        gridRow: `${Math.ceil((index + 1) / maximumRows) + rowStart}`,
      }}>
      {s.number}
    </button>
  );
};
