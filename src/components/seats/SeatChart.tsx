import { Seat } from './Seat';
import { SeatInterface } from '../../types/seat';
import { motion } from "framer-motion"

export const SeatChart: React.FC<{
  seats: SeatInterface[];
  handleClick: (id: string) => void;
}> = ({ seats, handleClick }) => {

  return (
    <motion.div layout className='grid place-items-center gap-1 grid-flow-col mt-4 overflow-x-scroll'>
      {seats?.slice(0, 25)?.map((s: any, i: number) => {
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

      {seats?.slice(25, 75)?.map((s: any, i: number) => {
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

      {seats?.slice(75, 100)?.map((s: any, i: number) => {
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
    </motion.div>
  );
};
