import React, { useEffect } from "react";
import { useEvent } from "../../hooks/events/useEvent";
import { EventCard } from "../../components/events/Event";
import { useParams } from "react-router-dom";

const IndividualEvent: React.FC = () => {
  const { event, fetchEvent } = useEvent();

  const { id } = useParams();

  useEffect(() => {
    fetchEvent(id!);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:max-w-xl md:max-w-7xl mx-auto">
      <EventCard {...event} />
    </div>
  );
};

export default IndividualEvent;
