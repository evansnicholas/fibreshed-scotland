import * as React from "react";
import { DateTime } from "luxon";
import { HTMLContent } from "./Content";

function formatDate(date) {
    if (date.dateTime) {
      return DateTime.fromISO(date.dateTime).toLocaleString(DateTime.DATETIME_FULL);
    }
    return DateTime.fromISO(date.date).toLocaleString(DateTime.DATE_FULL);
}

export default function RegenerativeTextileEvent({ data }) {
  const formattedStartDate = formatDate(data.start);
  const formattedEndDate = formatDate(data.end);
  return (
    <div className="card mb-2">
      <div class="card-content">
        <div class="content">
          <h2 className="has-text-weight-bold mb-0">{data.summary}</h2>
          <p>{formattedStartDate} - {formattedEndDate}</p>
          <p>
            <HTMLContent content={data.description} />
          </p>
        </div>
      </div>
    </div>
  );
}