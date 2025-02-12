import { SeatInterface } from "../../types/seat";
import { classNames } from "../../app/util";
import { motion } from "framer-motion";

export const Seat: React.FC<{
  index: number;
  maximumColumns: number;
  columnStart: number;
  maximumRows: number;
  rowStart: number;
  handleClick: (id: string) => void;
  s: SeatInterface;
}> = ({ index, maximumColumns, maximumRows, columnStart, rowStart, s, handleClick }) => {
  return (
    <motion.button
      layout
      onClick={() => handleClick(s?._id)}
      disabled={s.isReserved}
      className={classNames(
        "size-7 text-xs sm:size-8 lg:size-10 rounded-full text-white border flex items-center justify-center",
        s.isReserved ? "bg-blue-400" : "bg-blue-700 hover:bg-blue-500 transition-colors"
      )}
      style={{
        gridColumn: `${(index % maximumColumns) + 1 + columnStart}`,
        gridRow: `${Math.ceil((index + 1) / maximumRows) + rowStart}`,
      }}
    >
      {s.number}
    </motion.button>
  );
};
