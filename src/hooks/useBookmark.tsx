import { useState } from "react";
import {
  useAddEventToBookmarkMutation,
  useRemoveItemFromBookmarkMutation,
  useUserBookmarkQuery,
} from "../features/bookmark/bookmark.slice";
import { BookmarkInterface } from "../types/bookmark";
import { SeatInterface } from "../types/seat";
import {
  useGetSeatsByEventQuery,
  useReserveSeatForEventMutation,
} from "../features/seat/seat.slice";

export const useBookmark = () => {
  const { data, refetch } = useUserBookmarkQuery();
  const [addItemToBookmark] = useAddEventToBookmarkMutation();
  const [removeItemToFromBookmark] = useRemoveItemFromBookmarkMutation();
  const [eventId, setEventId] = useState<string>("");
  const { data: seatData, isLoading, refetch: refetchSeats } = useGetSeatsByEventQuery(eventId);
  const [reserveSeatForEvent] = useReserveSeatForEventMutation();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [refreshTrigered, setRefreshTrigered] = useState(false);
  const bookmark: BookmarkInterface = data?.data?.bookmark;

  const [query, setQuery] = useState<string>("");
  const seats: SeatInterface[] = seatData?.data?.seats;

  const [selectedSeats, setSelectedSeats] = useState<SeatInterface[]>([]);
  const [selectedEventSeats, setSelectedEventSeats] = useState<SeatInterface[]>([]);
  const [newSelectedSeatIds, setNewSelectedSeatIds] = useState<string[]>([]);
  const [allSeats, setAllSeats] = useState<SeatInterface[]>([]);

  const handleSelectedSeats = (value: SeatInterface[]) => {
    setSelectedSeats(value);
    setAllSeats([...value, ...selectedEventSeats]);

    value.forEach((v) => {
      if (![...new Set([...newSelectedSeatIds])]?.includes(v?._id)) {
        setNewSelectedSeatIds([...new Set([...newSelectedSeatIds]), v?._id]);
      }
    });
  };

  const handleReserveSeatForEvent = async (eventId: string) => {
    await reserveSeatForEvent({
      eventId,
      seats: [...new Set([...newSelectedSeatIds])],
      reservedAt: Date.now(),
    }).unwrap();
  };

  const filteredSeats =
    query === ""
      ? seats
      : seats?.filter((seat) => {
          return seat?.number.toString() === query;
        });

  const handleEditClick = (eventId: string) => {
    const selectedItem = bookmark?.bookmarkItems?.find((item: any) => {
      return item?.event?._id === eventId;
    });

    if (selectedItem) {
      if (selectedItem) {
        const seats = selectedItem?.seats;

        setEventId(eventId);
        setSelectedEventSeats(seats);
        setSelectedItemId(eventId);
        setIsEditing(true);
      }
    }
  };

  const handleUpdateSeats = async (eventId: string) => {
    if (selectedItemId !== null && newSelectedSeatIds.length > 0) {
      await addNewItemToBookmark(eventId);
      setRefreshTrigered(!refreshTrigered);
      setSelectedItemId(null);
      setIsEditing(false);
    } else {
      console.error("Invalid quantity input.");
    }
  };

  const addNewItemToBookmark = async (eventId: string) => {
    await addItemToBookmark({
      eventId,
      seats: [...new Set([...newSelectedSeatIds])],
    }).unwrap();

    await handleReserveSeatForEvent(eventId);
    setSelectedSeats([]);
    setNewSelectedSeatIds([]);
  };

  const handleCancelEdit = () => {
    setSelectedItemId(null);
    setIsEditing(false);
  };

  const handleDelete = async (eventId: string) => {
    await removeItemToFromBookmark(eventId).unwrap();
    setRefreshTrigered(!refreshTrigered);
  };

  return {
    handleCancelEdit,
    handleDelete,
    handleEditClick,
    isEditing,
    bookmark,
    refreshTrigered,
    handleUpdateSeats,
    refetch,
    selectedItemId,
    addNewItemToBookmark,

    // seats variables
    isLoading,
    allSeats,
    selectedSeats,
    selectedEventSeats,
    newSelectedSeatIds,
    setQuery,
    seatData,
    setNewSelectedSeatIds,
    handleSelectedSeats,
    filteredSeats,
    setEventId,
    refetchSeats,
    setSelectedEventSeats,
  };
};
