import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import RegenerativeTextileEvent from "../../components/RegenerativeTextileEvent";
import { groupByYearAndDate, formatMonth } from "../../domain/EventUtils";

import Layout from "../../components/Layout";

const CALENDAR_URL =
  `https://www.googleapis.com/calendar/v3/calendars/eedb2a1aebdf13ba993438c4e0cbd932a84523ef8940377e55547f89ac716bf9@group.calendar.google.com/events/?key=AIzaSyBT8_ImmXQitWNktBpubp3pg7udKzBAZDc&maxResults=50&singleEvents=true&orderBy=startTime&timeMin=${(new Date().toISOString())}`;

export default function EventsPage() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    let ignore = false;
    axios
      .get(CALENDAR_URL)
      .then((gEvents) => {
        setEvents(gEvents.data.items);
      })
      .catch((err) => {
        console.log(`Error getting events: {${err}}`);
        setEvents([]);
      });
    return () => {
      ignore = true;
    };
  }, []);

  let eventsRender = <div>Loading events...</div>;

  if (events && events.length === 0) {
    eventsRender = <div>No events.</div>;
  } else if (events) {
    const byYearAndDate = groupByYearAndDate(events);
    const renderedEvents = Object.keys(byYearAndDate).map((year) => {
      const yearEvents = byYearAndDate[year];
      const yearRender = Object.keys(yearEvents).map((month) => {
        const monthEvents = yearEvents[month];
        const renderedMonthEvents = monthEvents.map((e, idx) => {
          return (
            <tr key={`regenevent:${idx}`}>
              <RegenerativeTextileEvent 
                data={e} />
            </tr>);
          });
        return (
          <div 
            className="mb-4"
            key={`regenevent:year-${year}-month-${month}}`}>
             <h3 className="is-underlined">{formatMonth(month)}</h3>
             <table className="table">
              <tbody>{renderedMonthEvents}</tbody>
            </table> 
          </div>
        );
      });
      return (
        <div key={`regenevent:year-${year}}`}>
          <h2>{year}</h2>
          {yearRender}
        </div>
      );
    });
    eventsRender = 
      <div>
        <h2>Upcoming Regenerative Textile Events</h2>
        <div>{renderedEvents}</div>
      </div>;
  }

  return (
    <Layout>
      <div>
        <h1
          className="has-text-weight-bold is-size-1 fibreshed-page-title"
          style={{
            boxShadow: "0.5rem 0 0 #f40, -0.5rem 0 0 #f40",
            backgroundColor: "#e7e3de",
            padding: "1rem",
          }}
        >
          Events
        </h1>
      </div>
      <section className="section">
        <div className="container">
          <div className="content">{eventsRender}</div>
        </div>
      </section>
    </Layout>
  );
}
