import { useContext } from "react";
import { EventContext } from "../../context/events/EventContext";

export const useEvent = () => useContext(EventContext);
